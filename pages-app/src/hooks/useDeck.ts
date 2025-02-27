import { useContext } from 'react';
import { DeckContext, DeckContextType } from '../context/DeckContextType';

export function useDeck(): DeckContextType {
  const context = useContext(DeckContext);
  if (context === undefined) {
    throw new Error('useDeck must be used within a DeckProvider');
  }
  return context;
} 