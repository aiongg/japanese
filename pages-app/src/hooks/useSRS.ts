import { useState, useEffect, useCallback } from 'react';
import { Sentence, SRSResponse, StudySession } from '../types';
import { srsService } from '../services/srsService';

// Debug configuration
const DEBUG = true;
function debugLog(...args: unknown[]) {
  if (DEBUG) {
    console.log('[USE_SRS HOOK]', ...args);
  }
}

interface UseSRSOptions {
  deckId: string;
  deck: Sentence[];
  maxNewCards?: number;
  enabled?: boolean;
}

export function useSRS({ deckId, deck, maxNewCards = 20, enabled = true }: UseSRSOptions) {
  // State
  const [session, setSession] = useState<StudySession | null>(null);
  const [currentCard, setCurrentCard] = useState<Sentence | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize or load existing session
  useEffect(() => {
    if (!enabled) {
      setSession(null);
      setCurrentCard(null);
      setIsLoading(false);
      setError(null);
      return;
    }

    debugLog('Initializing SRS session for deck:', deckId);
    setIsLoading(true);
    
    try {
      // Try to load existing session
      let existingSession = srsService.loadSession(deckId);
      
      if (!existingSession) {
        debugLog('No existing session found, creating new session');
        existingSession = srsService.createSession(deck, maxNewCards);
      }
      
      setSession(existingSession);
      
      // Load current card
      if (existingSession) {
        const cardId = getCurrentCardId(existingSession);
        if (cardId) {
          const card = deck.find(c => c.id === cardId);
          setCurrentCard(card ?? null);
        }
      }
    } catch (err) {
      console.error('Error initializing SRS session:', err);
      setError('Failed to initialize study session');
    } finally {
      setIsLoading(false);
    }
  }, [deckId, deck, maxNewCards, enabled]);

  // Helper to get current card ID from session
  const getCurrentCardId = useCallback((currentSession: StudySession): string | null => {
    const { dueCards, newCards, failedCards, currentCardIndex } = currentSession;
    const allCards = [...failedCards, ...dueCards, ...newCards];
    return allCards[currentCardIndex] ?? null;
  }, []);

  // Handle SRS response
  const handleResponse = useCallback((response: SRSResponse) => {
    if (!session || !currentCard) return;

    debugLog('Handling response:', response, 'for card:', currentCard.id);

    try {
      // Update card with SRS data
      const updatedCard = srsService.updateCard(deckId, currentCard, response);
      
      // Update session state
      const updatedSession = { ...session };
      const currentId = getCurrentCardId(session);
      
      // Remove current card from its current list
      ['dueCards', 'newCards', 'failedCards'].forEach(listKey => {
        const list = updatedSession[listKey as keyof StudySession] as string[];
        const index = list.indexOf(currentId!);
        if (index !== -1) {
          list.splice(index, 1);
        }
      });

      // If failed, add to failed cards
      if (response === 'failed') {
        // Add to failed cards, 3-10 cards ahead or at the end
        const insertPosition = Math.min(
          session.currentCardIndex + 3 + Math.floor(Math.random() * 8),
          updatedSession.failedCards.length
        );
        updatedSession.failedCards.splice(insertPosition, 0, currentId!);
      }

      // Save updated card
      srsService.saveDeckProgress(deckId, [updatedCard]);
      
      // Move to next card
      const nextIndex = session.currentCardIndex + 1;
      const totalCards = [
        ...updatedSession.failedCards,
        ...updatedSession.dueCards,
        ...updatedSession.newCards
      ].length;

      if (nextIndex >= totalCards) {
        // Session complete
        srsService.clearSession(deckId);
        setSession(null);
        setCurrentCard(null);
      } else {
        // Update session
        updatedSession.currentCardIndex = nextIndex;
        updatedSession.lastStudied = new Date().toISOString();
        
        // Save and update session
        srsService.saveSession(deckId, updatedSession);
        setSession(updatedSession);
        
        // Load next card
        const nextCardId = getCurrentCardId(updatedSession);
        if (nextCardId) {
          const nextCard = deck.find(c => c.id === nextCardId);
          setCurrentCard(nextCard ?? null);
        }
      }
    } catch (err) {
      console.error('Error handling SRS response:', err);
      setError('Failed to process response');
    }
  }, [session, currentCard, deckId, deck, getCurrentCardId]);

  // Get session progress
  const getProgress = useCallback(() => {
    if (!session) return { current: 0, total: 0 };
    
    const total = session.dueCards.length + 
                 session.newCards.length + 
                 session.failedCards.length;
    
    return {
      current: session.currentCardIndex + 1,
      total,
      isComplete: session.currentCardIndex >= total
    };
  }, [session]);

  // Reset session
  const resetSession = useCallback(() => {
    debugLog('Resetting session for deck:', deckId);
    srsService.clearSession(deckId);
    const newSession = srsService.createSession(deck, maxNewCards);
    setSession(newSession);
    
    const firstCardId = getCurrentCardId(newSession);
    if (firstCardId) {
      const firstCard = deck.find(c => c.id === firstCardId);
      setCurrentCard(firstCard ?? null);
    }
  }, [deckId, deck, maxNewCards, getCurrentCardId]);

  return {
    session,
    currentCard,
    isLoading,
    error,
    handleResponse,
    getProgress,
    resetSession
  };
} 