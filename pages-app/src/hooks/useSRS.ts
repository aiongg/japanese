import { useState, useEffect, useCallback } from 'react';
import { Sentence, SRSResponse, StudySession, SessionStats } from '../types';
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
  const [currentAttempt, setCurrentAttempt] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sessionStats, setSessionStats] = useState<SessionStats | null>(null);

  // Get current card ID from session
  const getCurrentCardId = useCallback((currentSession: StudySession): string | null => {
    const { upcomingCards, currentCardIndex } = currentSession;
    return upcomingCards[currentCardIndex] ?? null;
  }, []);

  // Initialize or load existing session
  useEffect(() => {
    if (!enabled) {
      setSession(null);
      setCurrentCard(null);
      setCurrentAttempt(0);
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
      setCurrentAttempt(0);
      setSessionStats(null);
      
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
  }, [deckId, deck, maxNewCards, enabled, getCurrentCardId]);

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
      
      if (response === 'failed') {
        // For failed cards, reinsert 3-10 cards ahead
        const currentIndex = updatedSession.upcomingCards.indexOf(currentId!);
        if (currentIndex !== -1) {
          // Remove from current position
          updatedSession.upcomingCards.splice(currentIndex, 1);
          
          // Calculate new position (3-10 cards ahead)
          const reinsertPosition = Math.min(
            currentIndex + 3 + Math.floor(Math.random() * 8),
            updatedSession.upcomingCards.length
          );
          
          // Reinsert at new position
          updatedSession.upcomingCards.splice(reinsertPosition, 0, currentId!);
        }
        
        setCurrentAttempt(prev => prev + 1);
      } else {
        // For passed/easy responses, move to doneCards
        const currentIndex = updatedSession.upcomingCards.indexOf(currentId!);
        if (currentIndex !== -1) {
          updatedSession.upcomingCards.splice(currentIndex, 1);
          updatedSession.doneCards.push(currentId!);
        }
        setCurrentAttempt(0);
      }

      // Save updated card
      srsService.saveDeckProgress(deckId, [updatedCard]);
      
      // Check if session is complete
      if (updatedSession.upcomingCards.length === 0) {
        // Create session stats
        const stats: SessionStats = {
          cardsReviewed: session.totalCardsInSession,
          correctCount: updatedSession.doneCards.length,
          failedCount: session.totalCardsInSession - updatedSession.doneCards.length,
          completedAt: new Date().toISOString()
        };
        
        // Session complete
        srsService.clearSession(deckId);
        setSession(null);
        setCurrentCard(null);
        setCurrentAttempt(0);
        setSessionStats(stats);
      } else {
        // Update session
        updatedSession.lastStudied = new Date().toISOString();
        
        // Save and update session
        srsService.saveSession(deckId, updatedSession);
        setSession(updatedSession);
        
        // Load next card
        const nextCardId = getCurrentCardId(updatedSession);
        if (nextCardId) {
          const nextCard = deck.find(c => c.id === nextCardId);
          setCurrentCard(nextCard ?? null);
          if (nextCardId !== currentId) {
            setCurrentAttempt(0);
          }
        }
      }
    } catch (err) {
      console.error('Error handling SRS response:', err);
      setError('Failed to process response');
    }
  }, [session, currentCard, deckId, deck, getCurrentCardId]);

  // Get session progress
  const getProgress = useCallback(() => {
    if (!session) return { current: 0, total: 0, remaining: 0 };
    
    return {
      current: session.doneCards.length,
      total: session.totalCardsInSession,
      remaining: session.upcomingCards.length
    };
  }, [session]);

  // Get ordered list of session cards
  const getSessionCards = useCallback((): Sentence[] => {
    if (!session || !deck) return [];

    // Get all card IDs in order
    const orderedIds = [
      ...session.upcomingCards,
      ...session.doneCards
    ];

    // Map IDs to full sentence objects
    return orderedIds.map(id => {
      const sentence = deck.find(s => s.id === id);
      if (!sentence) {
        console.error(`Could not find sentence with ID ${id}`);
        return null;
      }
      return sentence;
    }).filter((s): s is Sentence => s !== null);
  }, [session, deck]);

  // Start next session
  const startNextSession = useCallback(() => {
    if (!session || !deck) return;
    
    debugLog('Starting next session');
    const newSession = srsService.continueSession(deck, session, 20);
    setSession(newSession);
    setSessionStats(null);
    
    const firstCardId = getCurrentCardId(newSession);
    if (firstCardId) {
      const firstCard = deck.find(c => c.id === firstCardId);
      setCurrentCard(firstCard ?? null);
    }
    setCurrentAttempt(0);
  }, [session, deck, getCurrentCardId]);

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

  // Function to update SRS data for a sentence
  const updateSentenceSRS = useCallback((sentenceId: string) => {
    if (!deckId) return;

    const srsData = srsService.loadDeckProgress(deckId);
    debugLog('Updating SRS data for sentence:', sentenceId, srsData);

    // Find and update the current card if it matches the sentenceId
    if (currentCard && currentCard.id === sentenceId) {
      const updatedCard = {
        ...currentCard,
        srs: srsData[sentenceId] || currentCard.srs
      };
      setCurrentCard(updatedCard);
    }
  }, [deckId, currentCard]);

  return {
    session,
    currentCard,
    currentAttempt,
    isLoading,
    error,
    handleResponse,
    getProgress,
    resetSession,
    updateSentenceSRS,
    getSessionCards,
    sessionStats,
    startNextSession
  };
} 