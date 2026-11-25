import json
import re

with open('public/data/tdm-party-history/lich-su-dang-bo-thu-dau-mot.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

CORRECTIONS = [
    (r'\bdi dần\b', 'di dân'),
    (r'\bđến sông ở\b', 'đến sống ở'),
    (r'\bdâu ấn\b', 'dấu ấn'),
    (r"1930'1945", '1930 - 1945'),
    (r'\bcửa mình\b', 'của mình'),
    (r'\btĩnh Thủ Dầu Một\b', 'tỉnh Thủ Dầu Một'),
    (r'\btính Thủ Dầu Một\b', 'tỉnh Thủ Dầu Một'),
    (r'\btình nằm sát Sài Gòn\b', 'tỉnh nằm sát Sài Gòn'),
    (r'\btháng 8 nam 1930\b', 'tháng 8 năm 1930'),
    (r'\brd A\.rộ\b', 'rầm rộ'),
    (r'\bthánh tra\b', 'thanh tra'),
    (r'\byêu sạch\b', 'yêu sách'),
    (r'\bkéo đài mây tuần lễ\b', 'kéo dài mấy tuần lễ'),
    (r'\bđổng đảo\b', 'đông đảo'),
    (r"'ố,", ''),
    (r'\bkhủng ì\^, đàn áp\?', 'khủng bố, đàn áp,'),
    (r'\blượng-vũ trang\b', 'lực lượng vũ trang'),
    (r'\bthị xãThủ Dầu Một\b', 'thị xã Thủ Dầu Một'),
    (r'\bchiến gsĩ\b', 'chiến sĩ'),
    (r'\bnrọi iniềh\b', 'mọi miền'),
    (r'\bchiến- đấm frên inffih\b', 'chiến đấu trên mình'),
    (r'\bnhân dân\. ta cỊìng nhau\b', 'nhân dân ta cùng nhau'),
    (r'-để khôi phục và xây dựng lại\. đất nước', 'để khôi phục và xây dựng lại đất nước'),
    (r'■ Nhìn lại\b', 'Nhìn lại'),
    (r'-kháng chiến\b', 'kháng chiến'),
    (r'\bnghiêm chính chấp hành\b', 'nghiêm chỉnh chấp hành'),
    (r'\bThủ Dầu Một từ\. một vùng\b', 'Thủ Dầu Một từ một vùng'),
    (r'\bNgày nay tạ đang\b', 'Ngày nay ta đang'),
    (r'\. 4 Thủ Dầu Một\b', 'Thủ Dầu Một'),
    (r'nước’ thực hiện\b', 'nước thực hiện'),
    (r'\bau thất bại ở Điện Biên Phủ\b', 'Sau thất bại ở Điện Biên Phủ'),
    (r'\bau khi đánh thắng\b', 'Sau khi đánh thắng'),
    (r'hiến lược “chiến tranh cục bộ”', 'Chiến lược “chiến tranh cục bộ”'),
    (r'\bbôn nghìn năm\b', 'bốn nghìn năm'),
    (r"lật nhào 'ách thống trị\b", 'lật nhào ách thống trị'),
    (r'\bđánh dâu\b', 'đánh dấu'),
]

fixed_count = 0
for p in data['pages']:
    if p.get('volumeId') == 'volume-1':
        txt = p.get('text', '')
        orig = txt
        for pattern, repl in CORRECTIONS:
            txt = re.sub(pattern, repl, txt)
        if txt != orig:
            p['text'] = txt
            p['rawText'] = txt
            p['paragraphs'] = [t.strip() for t in txt.split('\n\n') if t.strip()]
            fixed_count += 1

print(f'Cleaned typos in {fixed_count} pages.')

with open('public/data/tdm-party-history/lich-su-dang-bo-thu-dau-mot.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print('Updated JSON file successfully.')
