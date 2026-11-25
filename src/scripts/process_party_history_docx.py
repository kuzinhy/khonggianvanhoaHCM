import docx
import json
import re

doc = docx.Document(r'C:\Users\nguye\.gemini\antigravity\brain\2bab77da-f729-4d0a-8965-3157a822ca0f\.user_uploaded\media_1795572184482_cd779f7f.docx')

paragraphs = [p.text.strip() for p in doc.paragraphs if p.text.strip()]
print(f'Total non-empty paragraphs: {len(paragraphs)}')

# Let us find the exact starting index for each section
def find_para_index(pattern, start_from=0):
    for i in range(start_from, len(paragraphs)):
        if re.search(pattern, paragraphs[i], re.I):
            return i
    return -1

idx_front = 0
idx_preface = find_para_index(r'^LỜI NÓI ĐẦU', 0)
idx_part1 = find_para_index(r'^PHẦN THỨ I', idx_preface)
idx_part2 = find_para_index(r'^PHẦN THỨ II', idx_part1)
idx_part2_c1 = find_para_index(r'^Chương I\b', idx_part2)
idx_part2_c2 = find_para_index(r'^Chương II\b', idx_part2_c1)
idx_part2_c3 = find_para_index(r'^Chương III\b', idx_part2_c2)
idx_part2_c4 = find_para_index(r'^Chương IV\b', idx_part2_c3)

idx_part3 = find_para_index(r'^PHẦN THỨ III', idx_part2_c4)
idx_part3_c1 = find_para_index(r'^Chương I\b', idx_part3)
idx_part3_c2 = find_para_index(r'^Chương II\b', idx_part3_c1)
idx_part3_c3 = find_para_index(r'^Chương III\b', idx_part3_c2)
idx_part3_c4 = find_para_index(r'^Chương IV\b', idx_part3_c3)

idx_part4 = find_para_index(r'^PHẦN THỨ IV', idx_part3_c4)
idx_part4_c1 = find_para_index(r'^Chương I\b', idx_part4)
idx_part4_c2 = find_para_index(r'^Chương II\b', idx_part4_c1)

idx_part5 = find_para_index(r'^PHẦN THỨ V', idx_part4_c2)

print(f'idx_front: {idx_front} -> {paragraphs[idx_front][:50]}')
print(f'idx_preface: {idx_preface} -> {paragraphs[idx_preface][:50]}')
print(f'idx_part1: {idx_part1} -> {paragraphs[idx_part1][:50]}')
print(f'idx_part2: {idx_part2} -> {paragraphs[idx_part2][:50]}')
print(f'idx_part2_c1: {idx_part2_c1} -> {paragraphs[idx_part2_c1][:50]}')
print(f'idx_part2_c2: {idx_part2_c2} -> {paragraphs[idx_part2_c2][:50]}')
print(f'idx_part2_c3: {idx_part2_c3} -> {paragraphs[idx_part2_c3][:50]}')
print(f'idx_part2_c4: {idx_part2_c4} -> {paragraphs[idx_part2_c4][:50]}')
print(f'idx_part3: {idx_part3} -> {paragraphs[idx_part3][:50]}')
print(f'idx_part3_c1: {idx_part3_c1} -> {paragraphs[idx_part3_c1][:50]}')
print(f'idx_part3_c2: {idx_part3_c2} -> {paragraphs[idx_part3_c2][:50]}')
print(f'idx_part3_c3: {idx_part3_c3} -> {paragraphs[idx_part3_c3][:50]}')
print(f'idx_part3_c4: {idx_part3_c4} -> {paragraphs[idx_part3_c4][:50]}')
print(f'idx_part4: {idx_part4} -> {paragraphs[idx_part4][:50]}')
print(f'idx_part4_c1: {idx_part4_c1} -> {paragraphs[idx_part4_c1][:50]}')
print(f'idx_part4_c2: {idx_part4_c2} -> {paragraphs[idx_part4_c2][:50]}')
print(f'idx_part5: {idx_part5} -> {paragraphs[idx_part5][:50]}')
print(f'End: {len(paragraphs)}')
