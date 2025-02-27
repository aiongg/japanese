import boto3
import time
import os
import sys
import re
import csv

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

# Function to load AWS credentials from CSV file
def load_aws_credentials(csv_file_path):
    try:
        with open(csv_file_path, 'r') as file:
            csv_reader = csv.reader(file)
            # Skip header row
            next(csv_reader)
            # Get the first row with credentials
            for row in csv_reader:
                if len(row) >= 2:
                    return {
                        'aws_access_key_id': row[0],
                        'aws_secret_access_key': row[1]
                    }
        raise ValueError("No valid credentials found in CSV file")
    except Exception as e:
        print(f"Error loading AWS credentials: {e}")
        sys.exit(1)

# Function to generate and download audio using AWS Polly
def generate_audio(text, lang, pair_num, suffix, polly_client):
    try:
        # Set voice based on language
        if lang == "Japanese":
            voice_id = "Takumi"  # Male Japanese voice
            language_code = "ja-JP"
        else:
            voice_id = "Matthew"  # Male English voice
            language_code = "en-US"
        
        # Request speech synthesis
        response = polly_client.synthesize_speech(
            Text=text,
            OutputFormat="mp3",
            VoiceId=voice_id,
            LanguageCode=language_code,
            Engine="neural"  # Use neural engine for better quality
        )
        
        # Create filename: 4-digit number + A/B
        filename = f"{output_dir}/{pair_num:04d}{suffix}.mp3"
        
        # Save the audio stream to a file
        if "AudioStream" in response:
            with open(filename, "wb") as file:
                file.write(response["AudioStream"].read())
            print(f"Generated: {filename}")
        else:
            print(f"Failed to generate audio for: {text}")
        
        # Small delay to avoid overwhelming the AWS service
        time.sleep(0.5)
    except Exception as e:
        print(f"Error generating audio for '{text}': {e}")

# Main execution
if __name__ == "__main__":
    # Check if argument is provided
    if len(sys.argv) != 2:
        print("Usage: python polly.py <range> (e.g., python polly.py 1-10)")
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
    
    # Path to AWS credentials file
    credentials_file = os.path.join("..", "ShibaStudy_accessKeys.csv")
    
    if not os.path.exists(credentials_file):
        print(f"Error: AWS credentials file not found at {credentials_file}")
        sys.exit(1)
    
    # Load AWS credentials
    credentials = load_aws_credentials(credentials_file)
    
    # Initialize AWS Polly client
    try:
        polly_client = boto3.client(
            'polly',
            aws_access_key_id=credentials['aws_access_key_id'],
            aws_secret_access_key=credentials['aws_secret_access_key'],
            region_name='us-east-1'  # You can change this to your preferred region
        )
    except Exception as e:
        print(f"Error initializing AWS Polly client: {e}")
        sys.exit(1)
    
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
        generate_audio(japanese_sentence, "Japanese", pair_num, "A", polly_client)
        
        # English translation (B), if it exists
        if i + 1 < len(sentences):
            english_sentence = sentences[i + 1]
            generate_audio(english_sentence, "English", pair_num, "B", polly_client)

    print("All audio files generated successfully!") 