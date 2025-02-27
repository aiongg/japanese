export interface Sentence {
  id: number;
  japanese: string;
  english: string;
  notes?: string;
  glossTable: string;
  // Audio paths are optional since some sentences might not have audio
  japaneseAudioPath?: string;
  englishAudioPath?: string;
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

// Enum for different flashcard viewing modes
export type ViewMode = 'normal' | 'listen';

// Audio playback settings
export interface AudioSettings {
  autoPlayJapanese: boolean;
  autoPlayEnglish: boolean;
  pauseDuration: number; // in milliseconds
} 