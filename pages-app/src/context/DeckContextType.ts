import { createContext } from 'react';
import { Deck, DeckMetadata } from '../types';

// Define the context type
export interface DeckContextType {
  decks: DeckMetadata[];
  currentDeck: Deck | null;
  loading: boolean;
  error: string | null;
  loadDeck: (deckId: string) => Promise<void>;
}

// Create the context with undefined as initial value
export const DeckContext = createContext<DeckContextType | undefined>(undefined); 