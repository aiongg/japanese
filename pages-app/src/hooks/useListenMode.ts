import { useRef, useCallback, useEffect } from 'react';
import { Sentence, ViewMode, AudioSettings } from '../types';
import { Deck } from '../types';
import { useAudio } from './useAudio';

// Debug flag - set to true to enable debug logs
const DEBUG = true;

// Function to log debug messages
function debugLog(...args: unknown[]) {
  if (DEBUG) {
    console.log('[LISTEN MODE]', ...args);
  }
}

interface UseListenModeProps {
  currentDeck: Deck | null;
  viewMode: ViewMode;
  getCurrentSentence: () => Sentence | null;
  audioSettings: AudioSettings;
  setIsAnswerRevealed: (revealed: boolean) => void;
  goToNext: () => void;
  isLastCard: boolean;
}

interface UseListenModeReturn {
  resetListenMode: () => void;
}

export function useListenMode({
  currentDeck,
  viewMode,
  getCurrentSentence,
  audioSettings,
  setIsAnswerRevealed,
  goToNext,
  isLastCard
}: UseListenModeProps): UseListenModeReturn {
  // Get audio functions
  const { play } = useAudio();

  // Ref to track the last sentence ID we played
  const lastSentenceIdRef = useRef<string | null>(null);
  
  // Ref to track if we're currently playing audio
  const isPlayingRef = useRef<boolean>(false);
  
  // Ref to track if we're in the process of revealing the answer
  const isRevealingRef = useRef<boolean>(false);
  
  // Ref to track if we're in the process of advancing to the next card
  const isAdvancingRef = useRef<boolean>(false);
  
  // Ref to track if we're in the process of playing English audio
  const isPlayingEnglishRef = useRef<boolean>(false);
  
  // Ref to track if we're in the process of playing Japanese audio
  const isPlayingJapaneseRef = useRef<boolean>(false);
  
  // Ref to track if we're in the process of pausing
  const isPausingRef = useRef<boolean>(false);
  
  // Ref to track if we're in the process of resetting
  const isResettingRef = useRef<boolean>(false);
  
  // Ref to track if we're in the process of stopping
  const isStoppingRef = useRef<boolean>(false);
  
  // Ref to track if we're in the process of starting
  const isStartingRef = useRef<boolean>(false);
  
  // Ref to track if we're in the process of resuming
  const isResumingRef = useRef<boolean>(false);
  
  // Ref to track if we're in the process of pausing between cards
  const isPausingBetweenCardsRef = useRef<boolean>(false);
  
  // Function to play English audio
  const playEnglishAudio = useCallback(async (currentSentence: Sentence) => {
    if (isPlayingEnglishRef.current) {
      debugLog('Already playing English audio, skipping');
      return;
    }
    
    try {
      isPlayingEnglishRef.current = true;
      
      if (currentSentence.translation.audio) {
        debugLog('Playing English audio', { src: currentSentence.translation.audio });
        
        // Play English audio
        await play(currentSentence.translation.audio).then(() => {
          debugLog('English audio finished');
          isPlayingEnglishRef.current = false;
          
          // After English audio finishes, pause before advancing
          return new Promise<void>((resolve) => {
            setTimeout(() => {
              debugLog('Pause after English audio finished');
              resolve();
            }, audioSettings.pauseDuration);
          });
        });
        
        // After pause, advance to next card if not the last card
        if (!isLastCard) {
          debugLog('Advancing to next card');
          goToNext();
        }
      } else {
        debugLog('No English audio available');
        isPlayingEnglishRef.current = false;
        
        // If no English audio, just pause before advancing
        await new Promise<void>((resolve) => {
          setTimeout(() => {
            debugLog('Pause after no English audio');
            resolve();
          }, audioSettings.pauseDuration);
        });
        
        // After pause, advance to next card if not the last card
        if (!isLastCard) {
          debugLog('Advancing to next card');
          goToNext();
        }
      }
    } catch (error) {
      console.error('Error playing English audio:', error);
      isPlayingEnglishRef.current = false;
    }
  }, [audioSettings.pauseDuration, goToNext, isLastCard]);
  
  // Function to reveal answer and play English audio
  const revealAnswerAndPlayEnglish = useCallback(async (currentSentence: Sentence) => {
    if (isRevealingRef.current) {
      debugLog('Already revealing answer, skipping');
      return;
    }
    
    try {
      isRevealingRef.current = true;
      
      // Reveal the answer
      setIsAnswerRevealed(true);
      
      // Pause briefly after revealing answer
      await new Promise<void>((resolve) => {
        setTimeout(() => {
          debugLog('Pause after revealing answer');
          resolve();
        }, audioSettings.pauseDuration);
      });
      
      // Play English audio
      await playEnglishAudio(currentSentence);
      
      isRevealingRef.current = false;
    } catch (error) {
      console.error('Error revealing answer:', error);
      isRevealingRef.current = false;
    }
  }, [audioSettings.pauseDuration, playEnglishAudio, setIsAnswerRevealed]);
  
  // Function to handle the listen mode sequence
  const handleListenMode = useCallback(async () => {
    const currentSentence = getCurrentSentence();
    
    if (!currentSentence) {
      debugLog('No current sentence');
      return;
    }
    
    // Check if we've already played this sentence
    if (lastSentenceIdRef.current === currentSentence.id) {
      debugLog('Already played this sentence');
      return;
    }
    
    // If we're already playing, don't start again
    if (isPlayingRef.current) {
      debugLog('Already playing, skipping');
      return;
    }
    
    try {
      isPlayingRef.current = true;
      
      // Update last played sentence ID
      lastSentenceIdRef.current = currentSentence.id;
      
      // Play Japanese audio first
      if (currentSentence.sentence.audio) {
        debugLog('Playing Japanese audio', { src: currentSentence.sentence.audio });
        await play(currentSentence.sentence.audio).then(() => {
          debugLog('Japanese audio finished');
          
          // After Japanese audio finishes, pause before revealing answer
          return new Promise<void>((resolve) => {
            setTimeout(() => {
              debugLog('Pause after Japanese audio');
              resolve();
            }, audioSettings.pauseDuration);
          });
        });
        
        // After pause, reveal answer and play English
        await revealAnswerAndPlayEnglish(currentSentence);
      } else {
        debugLog('No Japanese audio available');
        
        // If no Japanese audio, just reveal answer and play English
        await revealAnswerAndPlayEnglish(currentSentence);
      }
      
      isPlayingRef.current = false;
    } catch (error) {
      console.error('Error in listen mode sequence:', error);
      isPlayingRef.current = false;
    }
  }, [audioSettings.pauseDuration, getCurrentSentence, revealAnswerAndPlayEnglish]);
  
  // Effect to handle listen mode
  useEffect(() => {
    if (viewMode === 'listen' && currentDeck) {
      handleListenMode();
    }
  }, [viewMode, currentDeck, handleListenMode]);
  
  // Function to reset listen mode state
  const resetListenMode = useCallback(() => {
    lastSentenceIdRef.current = null;
    isPlayingRef.current = false;
    isRevealingRef.current = false;
    isAdvancingRef.current = false;
    isPlayingEnglishRef.current = false;
    isPlayingJapaneseRef.current = false;
    isPausingRef.current = false;
    isResettingRef.current = false;
    isStoppingRef.current = false;
    isStartingRef.current = false;
    isResumingRef.current = false;
    isPausingBetweenCardsRef.current = false;
  }, []);
  
  return {
    resetListenMode
  };
} 