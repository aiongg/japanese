import os

# Define the general template for each prompt, including the example format
template = """
You are generating a batch of 50 unique Japanese sentences for beginner learners. Follow these rules:

- Sentences must be natural, colloquial Japanese, avoiding textbook-like expressions.
- Include both statements (e.g., "I am a student.") and question-answer patterns (e.g., "What’s your name? It’s Tom.").
- Format each sentence as follows:
  - Japanese sentence on its own line.
  - English translation in parentheses and italicized on the next line (e.g., (*I am a student.*)).
  - Optional bullet points (between translation and gloss table) for additional context on grammar, vocabulary, or culture—add these only when helpful for learners. Do not prefix these bullet points with any label like "Note:", just write the contents directly.
  - Gloss Table with columns: 単語 (vocabulary), 読み (kana for kanji words, - for others), 英語 (English gloss), ローマ字 (romanization).
- Ensure sentences progress from N5 to N3 difficulty across the full set of 1,000 sentences.
- Do not duplicate sentences from previous batches. All previously generated sentences will be provided as context either following this prompt or as a separate file. Use this context to ensure that the new sentences are unique.
- Output the complete result in a code block using markdown formatting.

**For this prompt:**
- Generate sentences {start} to {end}.
- Difficulty level: {level}.
- Theme: {theme}.

**Example format:**
1. 私は学生です。  
(*I am a student.*)

| 単語 | 読み     | 英語          | ローマ字  |  
|------|----------|---------------|-----------|  
| 私   | わたし   | I             | watashi   |  
| は   | -        | topic marker  | wa        |  
| 学生 | がくせい | student       | gakusei   |  
| です | -        | is (copula)     | desu      |

Now, generate 50 unique sentences following the rules above.
"""

# Define the details for each batch: (level, theme)
batch_details = [
    ("N5-N4", "introductions and greetings"),
    ("N5-N4", "daily routines"),
    ("N5-N4", "family and friends"),
    ("N5-N4", "food and drinks"),
    ("N5-N4", "shopping and money"),
    ("N5-N4", "transportation and directions"),
    ("N5-N4", "weather and seasons"),
    ("N5-N4", "hobbies and interests"),
    ("N4", "travel and vacations"),
    ("N4", "school and education"),
    ("N4", "work and occupations"),
    ("N4", "health and body"),
    ("N4", "emotions and feelings"),
    ("N4", "technology and media"),
    ("N3", "social issues"),
    ("N3", "culture and traditions"),
    ("N3", "environment and nature"),
    ("N3", "politics and economy"),
    ("N3", "science and technology"),
    ("N3", "arts and literature"),
]

# Ensure output directory exists
output_dir = "prompts"
os.makedirs(output_dir, exist_ok=True)

# Generate prompts for each of the 20 batches and save to files
for batch_num in range(1, 21):
    # Get level and theme for the current batch
    level, theme = batch_details[batch_num - 1]
    
    # Calculate sentence range
    start = (batch_num - 1) * 50 + 1
    end = batch_num * 50
    
    # Fill in the template with specific details
    prompt = template.format(start=start, end=end, level=level, theme=theme)
    
    # Define the filename with zero-padded batch number (e.g., prompt_batch_01.txt)
    filename = f"prompt_batch_{batch_num:02d}.txt"
    filepath = os.path.join(output_dir, filename)
    
    # Write the prompt to a file
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(prompt)
    
    # Optional: Print a confirmation message to console
    print(f"Generated {filepath}")

print(f"\nAll 20 prompts have been saved in the '{output_dir}' directory.")