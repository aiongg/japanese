import { Sentence, Deck } from '../types';

export async function fetchDeckList(): Promise<string[]> {
  try {
    const response = await fetch('/japanese/sentences/');
    if (!response.ok) {
      throw new Error('Failed to fetch sentence directory');
    }
    
    // This would work if we had directory listing enabled, but for GitHub Pages
    // we'll need to hardcode the list or use another approach
    // For now, we'll return a hardcoded list based on what we saw in the repository
    return ['sentences_0001-0050.md', 'sentences_0051-0100.md'];
  } catch (error) {
    console.error('Error fetching deck list:', error);
    // Fallback to hardcoded list
    return ['sentences_0001-0050.md', 'sentences_0051-0100.md'];
  }
}

export async function fetchDeck(deckId: string): Promise<Deck | null> {
  try {
    const response = await fetch(`/japanese/sentences/${deckId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch deck: ${deckId}`);
    }
    
    const markdown = await response.text();
    console.log('Raw markdown content for first 500 chars:', markdown.substring(0, 500));
    
    // Check if we actually got markdown content
    if (!markdown || markdown.trim() === '') {
      console.error(`Empty markdown content for deck: ${deckId}`);
      return null;
    }
    
    const sentences = parseMarkdown(markdown);
    console.log(`Parsed ${sentences.length} sentences from ${deckId}`);
    if (sentences.length > 0) {
      console.log('First sentence gloss table:', sentences[0].glossTable);
    }
    
    // Check if we successfully parsed any sentences
    if (sentences.length === 0) {
      console.error(`No sentences parsed from deck: ${deckId}`);
      return null;
    }
    
    return {
      id: deckId,
      title: formatDeckTitle(deckId),
      sentences
    };
  } catch (error) {
    console.error(`Error fetching deck ${deckId}:`, error);
    return null;
  }
}

function formatDeckTitle(filename: string): string {
  // Convert "sentences_0001-0050.md" to "Sentences 1-50"
  const match = filename.match(/sentences_(\d+)-(\d+)\.md/);
  if (match) {
    const start = parseInt(match[1], 10);
    const end = parseInt(match[2], 10);
    return `Sentences ${start}-${end}`;
  }
  return filename;
}

export function parseMarkdown(markdown: string): Sentence[] {
  const sentences: Sentence[] = [];
  
  // First, split the markdown into lines
  const allLines = markdown.trim().split('\n');
  
  // Find the indices of section separators (lines that contain only ---)
  const separatorIndices = [];
  for (let i = 0; i < allLines.length; i++) {
    if (allLines[i].trim() === '---') {
      separatorIndices.push(i);
    }
  }
  
  // Use the separator indices to split the markdown into sections
  const sections = [];
  let startIndex = 0;
  
  for (const sepIndex of separatorIndices) {
    // Only add a section if there's content between the start and the separator
    if (sepIndex > startIndex) {
      const sectionLines = allLines.slice(startIndex, sepIndex);
      const sectionText = sectionLines.join('\n');
      if (sectionText.trim()) {
        sections.push(sectionText);
      }
    }
    startIndex = sepIndex + 1;
  }
  
  // Add the last section if there's content after the last separator
  if (startIndex < allLines.length) {
    const sectionText = allLines.slice(startIndex).join('\n');
    if (sectionText.trim()) {
      sections.push(sectionText);
    }
  }
  
  console.log(`Found ${sections.length} sections in markdown`);
  
  sections.forEach((section, index) => {
    const lines = section.trim().split('\n');
    
    // Extract the sentence number and Japanese text
    const firstLine = lines[0];
    const match = firstLine.match(/^(\d+)\.\s+(.+)$/);
    
    if (!match) {
      console.warn(`Section ${index} doesn't match expected format. First line: "${firstLine}"`);
      return;
    }
    
    const id = parseInt(match[1], 10);
    const japanese = match[2].trim();
    
    // Extract the English translation
    const englishMatch = lines[1]?.match(/\(\*(.*)\*\)/);
    const english = englishMatch ? englishMatch[1].trim() : '';
    
    // Extract notes if present
    let notes = '';
    let glossTableStartIndex = 2;
    
    if (lines[2] && lines[2].startsWith('- ')) {
      notes = lines[2].substring(2).trim();
      glossTableStartIndex = 3;
    }
    
    // Look for all lines that start with | and collect them
    const tableLines = [];
    for (let i = glossTableStartIndex; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line.startsWith('|')) {
        tableLines.push(line);
      } else if (tableLines.length > 0 && line === '') {
        // Stop when we hit an empty line after finding table lines
        break;
      }
    }
    
    // Join the table lines with newlines
    const glossTable = tableLines.join('\n');
    
    sentences.push({
      id,
      japanese,
      english,
      notes: notes || undefined,
      glossTable
    });
  });
  
  return sentences;
} 