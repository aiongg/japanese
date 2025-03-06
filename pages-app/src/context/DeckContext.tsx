import { useState, useEffect, ReactNode, useCallback } from 'react';
import { Deck, DeckMetadata } from '../types';
import { fetchDeckList, fetchDeck } from '../utils/loadDeck';
import { DeckContext } from './DeckContextType';

// Provider component
export function DeckProvider({ children }: { children: ReactNode }) {
  const [decks, setDecks] = useState<DeckMetadata[]>([]);
  const [currentDeck, setCurrentDeck] = useState<Deck | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load all decks with their sentence counts
  useEffect(() => {
    async function loadDecks() {
      try {
        setLoading(true);
        const deckFiles = await fetchDeckList();
        
        // Create initial metadata with placeholder counts
        const initialDeckMetadata: DeckMetadata[] = deckFiles.map(file => ({
          id: file,
          title: file.replace('sentences_', 'Sentences ').replace('-', ' to '),
          count: 0,
          dueCount: 0,
          newCount: 0,
          completedCount: 0
        }));
        
        // Set initial metadata to show something immediately
        setDecks(initialDeckMetadata);
        
        // Load each deck in parallel to get the sentence counts
        const deckPromises = deckFiles.map(async (deckId) => {
          try {
            const deck = await fetchDeck(deckId);
            return deck ? {
              id: deckId,
              title: deck.title,
              count: deck.sentences.length,
              dueCount: 0,
              newCount: deck.sentences.length,
              completedCount: 0
            } : null;
          } catch (error) {
            console.error(`Error loading deck ${deckId}:`, error);
            return null;
          }
        });
        
        // Wait for all deck metadata to load
        const loadedDecks = await Promise.all(deckPromises);
        
        // Update decks with actual counts, filtering out any that failed to load
        const validDecks = loadedDecks.filter((deck): deck is DeckMetadata => deck !== null);
        setDecks(validDecks);
      } catch (err) {
        setError('Failed to load deck list');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    
    loadDecks();
  }, []);

  // Memoize the loadDeck function to prevent unnecessary re-renders
  const loadDeck = useCallback(async (deckId: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const deck = await fetchDeck(deckId);
      
      if (deck) {
        setCurrentDeck(deck);
        
        // Update the deck metadata with the correct count
        setDecks(prevDecks => 
          prevDecks.map(d => 
            d.id === deckId 
              ? { ...d, count: deck.sentences.length } 
              : d
          )
        );
      } else {
        setError(`Failed to load deck: ${deckId}`);
      }
    } catch (err) {
      setError(`Error loading deck: ${deckId}`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <DeckContext.Provider value={{ decks, currentDeck, loading, error, loadDeck }}>
      {children}
    </DeckContext.Provider>
  );
} 