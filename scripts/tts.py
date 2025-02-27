import requests
import time
import os
import sys
import re

# Function to find the correct sentence file based on sentence number range
def find_sentence_file(sentence_dir, start_num, end_num):
    # List all sentence files in the directory
    files = [f for f in os.listdir(sentence_dir) if f.startswith('sentences_') and f.endswith('.md')]
    
    for file in files:
        # Extract the range from the filename (e.g., sentences_0001-0050.md)
        match = re.match(r'sentences_(\d+)-(\d+)\.md', file)
        if match:
            file_start = int(match.group(1))
            file_end = int(match.group(2))
            
            # Check if our target range overlaps with this file's range
            if (start_num <= file_end and end_num >= file_start):
                return os.path.join(sentence_dir, file)
    
    return None

# Function to parse sentences.md and extract sentence pairs based on range
def extract_sentences(file_path, start_num, end_num):
    sentences = []
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
        # Split into individual sentence blocks (assuming each block starts with a number followed by a period)
        blocks = re.split(r'\n(?=\d+\.\s)', content)
        
        for block in blocks:
            # Extract the number at the start of each block
            match_num = re.match(r'(\d+)\.\s', block)
            if match_num:
                num = int(match_num.group(1))
                if start_num <= num <= end_num:
                    # Extract Japanese sentence (first line after the number)
                    jap_match = re.search(r'(\d+\.\s)([^\n]+)', block)
                    if jap_match:
                        jap_sentence = jap_match.group(2).strip()
                        # Extract English translation (in parentheses with asterisk)
                        eng_match = re.search(r'\(\*([^\*]+)\*\)', block)
                        if eng_match:
                            eng_sentence = eng_match.group(1).strip()
                            sentences.extend([jap_sentence, eng_sentence])
    
    return sentences

# Base URL for ttsMP3.com
url = "https://ttsmp3.com/makemp3_new.php"

# Function to generate and download audio
def download_audio(text, lang, pair_num, suffix):
    # Set language code based on input
    if lang == "Japanese":
        voice = "Takumi"  # Male Japanese voice
    else:
        voice = "Matthew"  # Male English voice
    
    # Payload for the POST request
    payload = {
        "msg": text,
        "lang": voice,
        "source": "ttsmp3"
    }
    
    # Headers to mimic a browser request
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    }
    
    # Send POST request
    response = requests.post(url, data=payload, headers=headers)
    
    if response.status_code == 200:
        data = response.json()
        if data["Error"] == 0:
            audio_url = data["URL"]
            # Download the audio file
            audio_response = requests.get(audio_url)
            if audio_response.status_code == 200:
                # Create simple filename: 4-digit number + A/B
                filename = f"{output_dir}/{pair_num:04d}{suffix}.mp3"
                with open(filename, "wb") as f:
                    f.write(audio_response.content)
                print(f"Downloaded: {filename}")
            else:
                print(f"Failed to download audio for: {text}")
        else:
            print(f"Error from ttsMP3: {data['Message']} for: {text}")
    else:
        print(f"Request failed with status {response.status_code} for: {text}")
    
    # Small delay to avoid overwhelming the server
    time.sleep(1)

# Main execution
if __name__ == "__main__":
    # Check if argument is provided
    if len(sys.argv) != 2:
        print("Usage: python tts.py <range> (e.g., python tts.py 1-10)")
        sys.exit(1)
    
    # Parse the range argument (e.g., "1-10")
    try:
        start, end = map(int, sys.argv[1].split('-'))
        if start < 1 or end < start:
            raise ValueError("Range must be valid, with start <= end")
    except ValueError as e:
        print(f"Invalid range: {e}")
        sys.exit(1)
    
    # Path to sentences directory
    sentences_dir = os.path.join("..", "sentences")
    
    if not os.path.exists(sentences_dir):
        print(f"Error: {sentences_dir} directory not found")
        sys.exit(1)
    
    # Find the correct sentence file(s) for the given range
    sentence_file = find_sentence_file(sentences_dir, start, end)
    
    if not sentence_file:
        print(f"No sentence file found containing sentences in range {start}-{end}")
        sys.exit(1)
    
    print(f"Using sentence file: {sentence_file}")
    
    # Create output directory for audio files
    output_dir = os.path.join("..", "sentences", "audio")
    os.makedirs(output_dir, exist_ok=True)
    
    # Extract sentences dynamically based on range
    sentences = extract_sentences(sentence_file, start, end)
    
    if not sentences:
        print(f"No sentences found for range {start}-{end}")
        sys.exit(1)
    
    print(f"Found {len(sentences)//2} sentence pairs in range {start}-{end}")
    
    # Process sentences in pairs
    for i in range(0, len(sentences), 2):  # Step by 2 to handle pairs
        pair_num = start + (i // 2)  # Adjust pair number based on start of range
        
        # Japanese sentence (A)
        japanese_sentence = sentences[i]
        download_audio(japanese_sentence, "Japanese", pair_num, "A")
        
        # English translation (B), if it exists
        if i + 1 < len(sentences):
            english_sentence = sentences[i + 1]
            download_audio(english_sentence, "English", pair_num, "B")

    print("All downloads complete!")