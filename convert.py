import re
import json
import os
import glob

def parse_sentence_block(block):
    # Initialize the sentence data structure
    sentence_data = {
        "id": None,
        "sentence": {"text": "", "audio": ""},
        "translation": {"text": "", "audio": ""},
        "notes": [],
        "gloss": []
    }
    
    # Extract sentence number and text
    first_line = block.split('\n')[0]
    sentence_num = re.match(r'(\d+)\.', first_line).group(1)
    sentence_data["id"] = sentence_num
    
    # Set audio file names based on sentence number
    sentence_num_int = int(sentence_num)
    sentence_data["sentence"]["audio"] = f"{sentence_num_int:04d}A.mp3"
    sentence_data["translation"]["audio"] = f"{sentence_num_int:04d}B.mp3"
    
    # Extract Japanese text and English translation
    japanese_text = re.search(r'^\d+\.\s*(.+?)\s*$', first_line).group(1)
    sentence_data["sentence"]["text"] = japanese_text
    
    # Find English translation
    translation_match = re.search(r'\(\*(.*?)\*\)', block)
    if translation_match:
        sentence_data["translation"]["text"] = translation_match.group(1)
    
    # Extract notes (lines starting with -)
    notes = re.findall(r'^\s*-\s*(.+)$', block, re.MULTILINE)
    sentence_data["notes"] = notes
    
    # Extract vocabulary table
    # Split block into lines
    lines = block.split('\n')
    in_table = False
    header_found = False
    
    for line in lines:
        # Skip empty lines
        if not line.strip():
            continue
            
        # Check if this is a table row
        if line.strip().startswith('|') and line.strip().endswith('|'):
            # Skip separator line
            if '---' in line:
                continue
                
            # Skip header line
            if not header_found and '単語' in line:
                header_found = True
                continue
                
            # Process table row
            cells = [cell.strip() for cell in line.strip('|').split('|')]
            if len(cells) >= 4:
                gloss_entry = {
                    "word": cells[0].strip(),
                    "reading": cells[1].strip(),
                    "english": cells[2].strip(),
                    "romaji": cells[3].strip()
                }
                sentence_data["gloss"].append(gloss_entry)
    
    return sentence_data

def convert_md_to_json(md_file):
    # Read markdown file
    with open(md_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Split into sentence blocks (separated by ---)
    sentence_blocks = content.split('---\n\n')
    
    # Parse each sentence block
    sentences = []
    for block in sentence_blocks:
        if block.strip():  # Skip empty blocks
            sentence_data = parse_sentence_block(block)
            sentences.append(sentence_data)
    
    return sentences

def process_directory(input_dir, output_file):
    # Get all markdown files in the directory
    md_files = sorted(glob.glob(os.path.join(input_dir, "*.md")))
    
    if not md_files:
        print(f"No markdown files found in {input_dir}")
        return
    
    # Process each file and collect all sentences
    all_sentences = []
    for md_file in md_files:
        print(f"Processing {md_file}...")
        sentences = convert_md_to_json(md_file)
        all_sentences.extend(sentences)
    
    # Sort sentences by ID
    all_sentences.sort(key=lambda x: int(x["id"]))
    
    # Write the combined array to the final JSON file
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(all_sentences, f, ensure_ascii=False, indent=2)
    
    print(f"Successfully converted {len(md_files)} files with {len(all_sentences)} sentences to {output_file}")

if __name__ == "__main__":
    input_dir = "sentences"
    output_file = os.path.join(input_dir, "all_sentences.json")
    process_directory(input_dir, output_file) 