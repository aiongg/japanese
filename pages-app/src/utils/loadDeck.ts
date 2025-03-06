import { Sentence, Deck, SRSData } from '../types';

// Default SRS data for new sentences
const DEFAULT_SRS_DATA: SRSData = {
  interval: 0,
  easeFactor: 2.5,
  dueDate: null,
  repetitions: 0,
  timesSeen: 0,
  lastResponse: null
};

export async function fetchDeckList(): Promise<string[]> {
  try {
    const response = await fetch('/japanese/sentences/');
    if (!response.ok) {
      throw new Error('Failed to fetch sentence directory');
    }
    
    // This would work if we had directory listing enabled, but for GitHub Pages
    // we'll need to hardcode the list or use another approach
    // For now, we'll return a hardcoded list based on what we saw in the repository
    return ['sentences_0001-0100'];
  } catch (error) {
    console.error('Error fetching deck list:', error);
    // Fallback to hardcoded list
    return ['sentences_0001-0100'];
  }
}

export async function fetchDeck(deckId: string): Promise<Deck | null> {
  try {
    const response = await fetch(`/japanese/sentences/${deckId}.json`);
    if (!response.ok) {
      throw new Error(`Failed to fetch deck: ${deckId}`);
    }
    
    const sentences = await response.json();
    console.log(`Parsed ${sentences.length} sentences from ${deckId}`);
    
    // Check if we successfully parsed any sentences
    if (sentences.length === 0) {
      console.error(`No sentences parsed from deck: ${deckId}`);
      return null;
    }
    
    // Validate and transform sentences if needed
    const validatedSentences = sentences.map((sentence: any): Sentence => ({
      id: String(sentence.id),
      sentence: {
        text: String(sentence.sentence.text),
        audio: String(sentence.sentence.audio)
      },
      translation: {
        text: String(sentence.translation.text),
        audio: String(sentence.translation.audio)
      },
      notes: Array.isArray(sentence.notes) ? sentence.notes.map(String) : [],
      gloss: Array.isArray(sentence.gloss) ? sentence.gloss : [],
      srs: DEFAULT_SRS_DATA
    }));
    
    return {
      id: deckId,
      title: formatDeckTitle(deckId),
      sentences: validatedSentences
    };
  } catch (error) {
    console.error(`Error fetching deck ${deckId}:`, error);
    return null;
  }
}

function formatDeckTitle(filename: string): string {
  // Convert "sentences_0001-0100" to "Sentences 1-100"
  const match = filename.match(/sentences_(\d+)-(\d+)/);
  if (match) {
    const start = parseInt(match[1], 10);
    const end = parseInt(match[2], 10);
    return `Sentences ${start}-${end}`;
  }
  return filename;
} 