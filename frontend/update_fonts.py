import os
import re

def increase_font_size(match):
    size_str = match.group(1)
    size = float(size_str)
    
    if size < 14:
        new_size = size + 3
        # Format to drop .0 if it's an integer
        if new_size.is_integer():
            return f"font-size: {int(new_size)}px;"
        else:
            return f"font-size: {new_size}px;"
    else:
        return match.group(0)

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
        
    new_content = re.sub(r'font-size:\s*([0-9\.]+)px;', increase_font_size, content)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)

styles_dir = r"c:\ASTRA\Astrra\src\styles"
for filename in os.listdir(styles_dir):
    if filename.endswith(".css"):
        process_file(os.path.join(styles_dir, filename))
print("Done updating font sizes.")
