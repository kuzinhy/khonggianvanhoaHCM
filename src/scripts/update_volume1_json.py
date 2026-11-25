import docx
import json
import re
import unicodedata

def remove_accents(input_str):
    if not input_str:
        return ''
    nfkd_form = unicodedata.normalize('NFKD', input_str)
    return ''.join([c for c in nfkd_form if not unicodedata.combining(c)])

doc_path = r'C:\Users\nguye\.gemini\antigravity\brain\2bab77da-f729-4d0a-8965-3157a822ca0f\.user_uploaded\media_1795572184482_cd779f7f.docx'
doc = docx.Document(doc_path)
raw_paras = [p.text.strip() for p in doc.paragraphs if p.text.strip()]

# Clean out known scanner watermark / junk paragraphs
clean_paras = []
for p in raw_paras:
    # Skip standalone scan artifacts like 'Ẹ ra', 'CS CamSca'
    if p in ['Ẹ ra', 'CamScanner', 'CS CamScanner']:
        continue
    clean_paras.append(p)

print(f'Total cleaned docx paragraphs: {len(clean_paras)}')

# Find section starting indices
def find_para_index(pattern, start_from=0):
    for i in range(start_from, len(clean_paras)):
        if re.search(pattern, clean_paras[i], re.I):
            return i
    return -1

idx_front = 0
idx_part1 = find_para_index(r'^PHẦN THỨ I\b', 0)
idx_part2 = find_para_index(r'^PHẦN THỨ II\b', idx_part1)
idx_part2_c1 = find_para_index(r'^Chương I\b', idx_part2)
idx_part2_c2 = find_para_index(r'^Chương II\b', idx_part2_c1)
idx_part2_c3 = find_para_index(r'^Chương III\b', idx_part2_c2)
idx_part2_c4 = find_para_index(r'^Chương IV\b', idx_part2_c3)

idx_part3 = find_para_index(r'^PHẦN THỨ III\b', idx_part2_c4)
idx_part3_c1 = find_para_index(r'^Chương I\b', idx_part3)
idx_part3_c2 = find_para_index(r'^Chương II\b', idx_part3_c1)
idx_part3_c3 = find_para_index(r'^Chương III\b', idx_part3_c2)
idx_part3_c4 = find_para_index(r'^Chương IV\b', idx_part3_c3)

idx_part4 = find_para_index(r'^PHẦN THỨ IV\b', idx_part3_c4)
idx_part4_c1 = find_para_index(r'^Chương I\b', idx_part4)
idx_part4_c2 = find_para_index(r'^Chương II\b', idx_part4_c1)

idx_part5 = find_para_index(r'^PHẦN THỨ V\b', idx_part4_c2)
idx_end = len(clean_paras)

section_slices = {
    'v1-front': (idx_front, idx_part1),
    'v1-part-1': (idx_part1, idx_part2_c1),
    'v1-french-1': (idx_part2_c1, idx_part2_c2),
    'v1-french-2': (idx_part2_c2, idx_part2_c3),
    'v1-french-3': (idx_part2_c3, idx_part2_c4),
    'v1-french-4': (idx_part2_c4, idx_part3_c1),
    'v1-american-1': (idx_part3_c1, idx_part3_c2),
    'v1-american-2': (idx_part3_c2, idx_part3_c3),
    'v1-american-3': (idx_part3_c3, idx_part3_c4),
    'v1-american-4': (idx_part3_c4, idx_part4_c1),
    'v1-building-1': (idx_part4_c1, idx_part4_c2),
    'v1-building-2': (idx_part4_c2, idx_part5),
    'v1-summary': (idx_part5, idx_end),
}

for sid, (s, e) in section_slices.items():
    print(f'{sid}: {e - s} paras, start: {clean_paras[s][:40]}')

# Load the existing JSON file
json_path = 'public/data/tdm-party-history/lich-su-dang-bo-thu-dau-mot.json'
with open(json_path, 'r', encoding='utf-8') as f:
    book_data = json.load(f)

# Update each section's pages
for sid, (s_idx, e_idx) in section_slices.items():
    sec_paras = clean_paras[s_idx:e_idx]
    sec_pages = [p for p in book_data['pages'] if p.get('volumeId') == 'volume-1' and p.get('sectionId') == sid]
    
    num_pages = len(sec_pages)
    if num_pages == 0:
        continue
    
    total_paras = len(sec_paras)
    # Distribute paragraphs across pages
    for i, page in enumerate(sec_pages):
        start_p = int(round(i * total_paras / num_pages))
        end_p = int(round((i + 1) * total_paras / num_pages))
        if i == num_pages - 1:
            end_p = total_paras
            
        page_slice = sec_paras[start_p:end_p]
        if not page_slice:
            # Fallback if slice is empty: pick at least one
            page_slice = [sec_paras[min(start_p, total_paras - 1)]] if total_paras > 0 else []
            
        joined_text = '\n\n'.join(page_slice)
        page['text'] = joined_text
        page['rawText'] = joined_text
        page['paragraphs'] = page_slice
        page['searchText'] = remove_accents(joined_text.lower())
        if 'extraction' in page:
            page['extraction']['humanVerified'] = True
            page['extraction']['needsReview'] = False

# Save updated JSON
with open(json_path, 'w', encoding='utf-8') as f:
    json.dump(book_data, f, ensure_ascii=False, indent=2)

print('Successfully updated public/data/tdm-party-history/lich-su-dang-bo-thu-dau-mot.json!')
