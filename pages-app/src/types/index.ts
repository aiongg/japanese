export interface Sentence {
  id: number;
  japanese: string;
  english: string;
  notes?: string;
  glossTable: string;
}

export interface Deck {
  id: string;
  title: string;
  sentences: Sentence[];
}

export interface DeckMetadata {
  id: string;
  title: string;
  count: number;
} 