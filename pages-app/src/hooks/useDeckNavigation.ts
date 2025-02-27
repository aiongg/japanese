import { useState, useCallback, useEffect, useRef } from 'react';
import { Deck, Sentence } from '../types';

// Debug flag - set to true to enable debug logs
const DEBUG = true;

// Function to log debug messages
function debugLog(...args: any[]) {
  if (DEBUG) {
    console.log('[DECK NAVIGATION]', ...args);
  }
}

interface UseDeckNavigationProps {
  deck: Deck | null;
  showAnswerByDefault: boolean;
  onAnswerReveal: (revealed: boolean) => void;
}

interface UseDeckNavigationReturn {
  currentIndex: number;
  randomMode: boolean;
  getCurrentSentence: () => Sentence | null;
  goToNext: () => void;
  goToPrevious: () => void;
  toggleRandomMode: () => void;
  isFirstCard: boolean;
  isLastCard: boolean;
  progress: number;
  actualIndex: number;
}

export function useDeckNavigation({
  deck,
  showAnswerByDefault,
  onAnswerReveal
}: UseDeckNavigationProps): UseDeckNavigationReturn {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [randomMode, setRandomMode] = useState(false);
  const [randomIndices, setRandomIndices] = useState<number[]>([]);
  
  const lastSentenceIdRef = useRef<number | null>(null);
  const isAutoPlayingRef = useRef<boolean>(false);
  
  // Get the current sentence
  const getCurrentSentence = useCallback(() => {
    if (!deck) return null;
    const actualIndex = randomMode ? randomIndices[currentIndex] : currentIndex;
    return deck.sentences[actualIndex];
  }, [deck, currentIndex, randomMode, randomIndices]);
  
  // Generate random indices when randomMode changes
  useEffect(() => {
    if (deck && randomMode) {
      // Generate random order of indices
      const indices = [...Array(deck.sentences.length).keys()];
      for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
      }
      setRandomIndices(indices);
      setCurrentIndex(0);
      lastSentenceIdRef.current = null;
      isAutoPlayingRef.current = false; // Reset auto-playing flag when changing to random mode
      
      debugLog('Generated random indices', indices);
    }
  }, [randomMode, deck]);
  
  // Reset the current index when the deck changes
  useEffect(() => {
    if (deck) {
      debugLog('Deck changed, resetting index');
      setCurrentIndex(0);
      onAnswerReveal(showAnswerByDefault);
      lastSentenceIdRef.current = null;
      isAutoPlayingRef.current = false; // Reset auto-playing flag when deck changes
    }
  }, [deck?.id, showAnswerByDefault, onAnswerReveal]);
  
  // Navigation functions
  const goToNext = useCallback(() => {
    if (deck && currentIndex < deck.sentences.length - 1) {
      debugLog('Going to next card');
      setCurrentIndex(prev => prev + 1);
      onAnswerReveal(showAnswerByDefault);
      
      // Reset the last sentence ID to allow auto-play to trigger for the new card
      lastSentenceIdRef.current = null;
      
      // Reset auto-playing flag to ensure auto-play works for the new card
      isAutoPlayingRef.current = false;
    }
  }, [deck, currentIndex, showAnswerByDefault, onAnswerReveal]);
  
  const goToPrevious = useCallback(() => {
    if (currentIndex > 0) {
      debugLog('Going to previous card');
      setCurrentIndex(prev => prev - 1);
      onAnswerReveal(showAnswerByDefault);
      
      // Reset the last sentence ID to allow auto-play to trigger for the new card
      lastSentenceIdRef.current = null;
      
      // Reset auto-playing flag to ensure auto-play works for the new card
      isAutoPlayingRef.current = false;
    }
  }, [currentIndex, showAnswerByDefault, onAnswerReveal]);
  
  const toggleRandomMode = useCallback(() => {
    debugLog('Toggling random mode');
    setRandomMode(prev => !prev);
  }, []);
  
  // Calculate progress
  const totalCards = deck?.sentences.length || 0;
  const progress = ((currentIndex + 1) / totalCards) * 100;
  
  // Determine if we're at the first or last card
  const isFirstCard = currentIndex === 0;
  const isLastCard = deck ? currentIndex === deck.sentences.length - 1 : false;
  
  // Calculate the actual index (accounting for random mode)
  const actualIndex = randomMode && randomIndices.length > 0 ? 
    randomIndices[currentIndex] : 
    currentIndex;
  
  return {
    currentIndex,
    randomMode,
    getCurrentSentence,
    goToNext,
    goToPrevious,
    toggleRandomMode,
    isFirstCard,
    isLastCard,
    progress,
    actualIndex
  };
} 