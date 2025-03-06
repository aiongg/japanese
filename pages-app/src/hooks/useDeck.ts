import { useState, useCallback } from 'react';
import { Deck, Sentence } from '../types';
import { srsService } from '../services/srsService';
import { fetchDeck } from '../utils/loadDeck';

// Debug configuration
const DEBUG = true;
function debugLog(...args: unknown[]) {
  if (DEBUG) {
    console.log('[USE_DECK HOOK]', ...args);
  }
}

export function useDeck() {
  const [currentDeck, setCurrentDeck] = useState<Deck | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadDeck = useCallback(async (deckId: string) => {
    setLoading(true);
    setError(null);

    try {
      // Load deck data using fetchDeck
      const deck = await fetchDeck(deckId);
      if (!deck) {
        throw new Error('Failed to load deck');
      }
      debugLog('Loaded deck:', deck);

      // Load SRS data
      const srsData = srsService.loadDeckProgress(deckId);
      debugLog('Loaded SRS data:', srsData);

      // Initialize or merge SRS data for each sentence
      const initializedDeck: Deck = {
        ...deck,
        sentences: deck.sentences.map(sentence => ({
          ...sentence,
          srs: srsData[sentence.id] || srsService.initializeCard()
        }))
      };

      setCurrentDeck(initializedDeck);
    } catch (err) {
      console.error('Error loading deck:', err);
      setError(err instanceof Error ? err.message : 'Failed to load deck');
    } finally {
      setLoading(false);
    }
  }, []);

  // Function to update the entire deck's SRS data
  const updateDeckSRS = useCallback(() => {
    if (!currentDeck) return;

    const srsData = srsService.loadDeckProgress(currentDeck.id);
    debugLog('Updating entire deck with new SRS data:', srsData);

    setCurrentDeck(prevDeck => {
      if (!prevDeck) return null;
      return {
        ...prevDeck,
        sentences: prevDeck.sentences.map(sentence => ({
          ...sentence,
          srs: srsData[sentence.id] || sentence.srs
        }))
      };
    });
  }, [currentDeck]);

  return {
    currentDeck,
    loading,
    error,
    loadDeck,
    updateDeckSRS
  };
} 