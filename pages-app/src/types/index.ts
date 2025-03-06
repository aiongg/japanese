interface GlossEntry {
  word: string;
  reading: string;
  english: string;
  romaji: string;
}

interface SentenceText {
  text: string;
  audio: string;
}

// SRS-related types
export type SRSResponse = 'unseen' | 'failed' | 'passed' | 'easy';

export interface SRSData {
  interval: number;          // Days until next review
  easeFactor: number;       // Multiplier for interval (1.3-2.5)
  dueDate: string | null;   // ISO string for date comparison
  repetitions: number;      // Consecutive successful reviews
  timesSeen: number;        // Total number of reviews
  lastResponse: SRSResponse;
}

export interface Sentence {
  id: string;
  sentence: SentenceText;
  translation: SentenceText;
  notes: string[];
  gloss: GlossEntry[];
  srs: SRSData;            // Add SRS data
}

export interface Deck {
  id: string;
  title: string;
  sentences: Sentence[];
}

// Session management types
export interface StudySession {
  deckId: string;
  upcomingCards: string[];  // Cards to be reviewed next, in order
  doneCards: string[];      // Cards marked as done (passed/easy)
  currentCardIndex: number;
  totalCardsInSession: number;  // Total cards when session started
  startTime: string;       // ISO string
  lastStudied: string;     // ISO string
}

export interface SessionStats {
  cardsReviewed: number;
  correctCount: number;
  failedCount: number;
  completedAt: string;
}

export interface StudySessionProgress {
  current: number;    // Number of cards completed (passed/easy)
  total: number;      // Total cards in session
  remaining: number;  // Cards still to review
}

export interface DeckStats {
  lastStudyDate: string;  // ISO string
  cardsStudied: number;
  newCardsStudied: number;
  reviewsCompleted: number;
}

export interface DeckMetadata {
  id: string;
  title: string;
  count: number;
  dueCount: number;        // Number of cards due for review
  newCount: number;        // Number of unseen cards
  completedCount: number;  // Number of cards completed today
}

// Enum for different flashcard viewing modes
export type ViewMode = 'normal' | 'listen';

// Audio playback settings
export interface AudioSettings {
  autoPlayJapanese: boolean;
  autoPlayEnglish: boolean;
  pauseDuration: number; // in milliseconds
} 