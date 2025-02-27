import { useState, useEffect, useCallback, useRef } from 'react';
import { useAudio } from './useAudio';
import { Deck } from '../types';

// Debug flag - set to true to enable debug logs
const DEBUG = true;

// Function to log debug messages
function debugLog(...args: any[]) {
  if (DEBUG) {
    console.log('[LISTEN MODE]', ...args);
  }
}

// Listen mode state type
type ListenModeState = 'idle' | 'japanese' | 'waiting1' | 'english' | 'waiting2';

interface UseListenModeProps {
  currentDeck: Deck | null;
  viewMode: string;
  getCurrentSentence: () => any;
  audioSettings: { pauseDuration: number };
  setIsAnswerRevealed: (revealed: boolean) => void;
  goToNext: () => void;
  isLastCard: boolean;
}

interface UseListenModeReturn {
  listenModeState: ListenModeState;
  startListenModeSequence: () => void;
  resetListenMode: () => void;
  restartCurrentPhase: () => void;
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
  // State to track the current state of the listen mode sequence
  const [listenModeState, setListenModeState] = useState<ListenModeState>('idle');
  const lastSentenceIdRef = useRef<number | null>(null);
  
  // Refs to track active timeouts
  const waiting1TimeoutRef = useRef<number | null>(null);
  const waiting2TimeoutRef = useRef<number | null>(null);
  
  // Get audio functions
  const { play, stop } = useAudio();
  
  // Function to clear all active timeouts
  const clearAllTimeouts = useCallback(() => {
    if (waiting1TimeoutRef.current !== null) {
      debugLog('Clearing waiting1 timeout');
      window.clearTimeout(waiting1TimeoutRef.current);
      waiting1TimeoutRef.current = null;
    }
    
    if (waiting2TimeoutRef.current !== null) {
      debugLog('Clearing waiting2 timeout');
      window.clearTimeout(waiting2TimeoutRef.current);
      waiting2TimeoutRef.current = null;
    }
  }, []);
  
  // Function to restart the current phase with the new delay
  const restartCurrentPhase = useCallback(() => {
    if (viewMode !== 'listen' || !currentDeck) {
      return;
    }
    
    const currentSentence = getCurrentSentence();
    if (!currentSentence) {
      return;
    }
    
    debugLog('Restarting current phase with new delay:', audioSettings.pauseDuration / 1000, 'seconds');
    
    // Clear any existing timeouts
    clearAllTimeouts();
    
    // Restart based on current state
    if (listenModeState === 'waiting1') {
      debugLog('Restarting waiting1 phase with new delay');
      
      // We're in the first waiting phase after Japanese audio
      waiting1TimeoutRef.current = window.setTimeout(() => {
        waiting1TimeoutRef.current = null;
        
        // Check if we're still in listen mode
        if (viewMode !== 'listen') {
          debugLog('Listen mode interrupted during waiting1 phase');
          return;
        }
        
        // Step 3: Reveal the answer
        debugLog('Revealing answer');
        setIsAnswerRevealed(true);
        
        // Step 4: Play English audio
        if (currentSentence.englishAudioPath) {
          debugLog('Playing English audio', { src: currentSentence.englishAudioPath });
          setListenModeState('english');
          
          play(currentSentence.englishAudioPath).then(() => {
            // Step 5: Wait for the pause duration again
            debugLog('English audio completed, waiting before advancing');
            setListenModeState('waiting2');
            
            waiting2TimeoutRef.current = window.setTimeout(() => {
              waiting2TimeoutRef.current = null;
              
              // Check if we're still in listen mode
              if (viewMode !== 'listen') {
                debugLog('Listen mode interrupted during waiting2 phase');
                return;
              }
              
              // Step 6: Advance to the next card if still in listen mode
              debugLog('Advancing to next card');
              setListenModeState('idle');
              
              if (!isLastCard) {
                goToNext();
              } else {
                debugLog('Reached last card, not advancing');
              }
            }, audioSettings.pauseDuration);
          }).catch(error => {
            debugLog('Error playing English audio', { error });
            setListenModeState('idle');
          });
        } else {
          // No English audio, just wait and advance
          debugLog('No English audio, waiting before advancing');
          setListenModeState('waiting2');
          
          waiting2TimeoutRef.current = window.setTimeout(() => {
            waiting2TimeoutRef.current = null;
            
            // Check if we're still in listen mode
            if (viewMode !== 'listen') {
              debugLog('Listen mode interrupted during waiting2 phase');
              return;
            }
            
            debugLog('Advancing to next card');
            setListenModeState('idle');
            
            if (!isLastCard) {
              goToNext();
            } else {
              debugLog('Reached last card, not advancing');
            }
          }, audioSettings.pauseDuration);
        }
      }, audioSettings.pauseDuration);
    } else if (listenModeState === 'waiting2') {
      debugLog('Restarting waiting2 phase with new delay');
      
      // We're in the second waiting phase after English audio
      waiting2TimeoutRef.current = window.setTimeout(() => {
        waiting2TimeoutRef.current = null;
        
        // Check if we're still in listen mode
        if (viewMode !== 'listen') {
          debugLog('Listen mode interrupted during waiting2 phase');
          return;
        }
        
        debugLog('Advancing to next card');
        setListenModeState('idle');
        
        if (!isLastCard) {
          goToNext();
        } else {
          debugLog('Reached last card, not advancing');
        }
      }, audioSettings.pauseDuration);
    }
  }, [
    viewMode,
    currentDeck,
    getCurrentSentence,
    listenModeState,
    clearAllTimeouts,
    audioSettings.pauseDuration,
    setIsAnswerRevealed,
    play,
    isLastCard,
    goToNext
  ]);
  
  // Function to start the listen mode sequence
  const startListenModeSequence = useCallback(() => {
    if (!currentDeck || viewMode !== 'listen') {
      debugLog('Cannot start listen mode sequence', { 
        hasDeck: !!currentDeck, 
        viewMode
      });
      return;
    }
    
    const currentSentence = getCurrentSentence();
    if (!currentSentence) {
      debugLog('No current sentence found');
      return;
    }
    
    // Only start a new sequence if the sentence has changed
    if (lastSentenceIdRef.current === currentSentence.id) {
      debugLog('Skipping listen mode sequence - same sentence', { 
        currentSentenceId: currentSentence.id 
      });
      return;
    }
    
    debugLog('Starting listen mode sequence', { 
      sentenceId: currentSentence.id,
      lastSentenceId: lastSentenceIdRef.current
    });
    
    // Clear any existing timeouts
    clearAllTimeouts();
    
    // Update the last sentence ID
    lastSentenceIdRef.current = currentSentence.id;
    
    // Stop any playing audio
    stop();
    
    // Hide the answer initially
    setIsAnswerRevealed(false);
    setListenModeState('japanese');
    
    // Step 1: Play Japanese audio
    if (currentSentence.japaneseAudioPath) {
      debugLog('Playing Japanese audio', { src: currentSentence.japaneseAudioPath });
      play(currentSentence.japaneseAudioPath).then(() => {
        // Step 2: Wait for the pause duration
        debugLog('Japanese audio completed, waiting before revealing answer');
        setListenModeState('waiting1');
        
        waiting1TimeoutRef.current = window.setTimeout(() => {
          waiting1TimeoutRef.current = null;
          
          // Check if we're still in listen mode
          if (viewMode !== 'listen') {
            debugLog('Listen mode interrupted during waiting1 phase');
            return;
          }
          
          // Step 3: Reveal the answer
          debugLog('Revealing answer');
          setIsAnswerRevealed(true);
          
          // Step 4: Play English audio
          if (currentSentence.englishAudioPath) {
            debugLog('Playing English audio', { src: currentSentence.englishAudioPath });
            setListenModeState('english');
            
            play(currentSentence.englishAudioPath).then(() => {
              // Step 5: Wait for the pause duration again
              debugLog('English audio completed, waiting before advancing');
              setListenModeState('waiting2');
              
              waiting2TimeoutRef.current = window.setTimeout(() => {
                waiting2TimeoutRef.current = null;
                
                // Check if we're still in listen mode
                if (viewMode !== 'listen') {
                  debugLog('Listen mode interrupted during waiting2 phase');
                  return;
                }
                
                // Step 6: Advance to the next card if still in listen mode
                debugLog('Advancing to next card');
                setListenModeState('idle');
                
                if (!isLastCard) {
                  goToNext();
                } else {
                  debugLog('Reached last card, not advancing');
                }
              }, audioSettings.pauseDuration);
            }).catch(error => {
              debugLog('Error playing English audio', { error });
              setListenModeState('idle');
            });
          } else {
            // No English audio, just wait and advance
            debugLog('No English audio, waiting before advancing');
            setListenModeState('waiting2');
            
            waiting2TimeoutRef.current = window.setTimeout(() => {
              waiting2TimeoutRef.current = null;
              
              // Check if we're still in listen mode
              if (viewMode !== 'listen') {
                debugLog('Listen mode interrupted during waiting2 phase');
                return;
              }
              
              debugLog('Advancing to next card');
              setListenModeState('idle');
              
              if (!isLastCard) {
                goToNext();
              } else {
                debugLog('Reached last card, not advancing');
              }
            }, audioSettings.pauseDuration);
          }
        }, audioSettings.pauseDuration);
      }).catch(error => {
        debugLog('Error playing Japanese audio', { error });
        setListenModeState('idle');
      });
    } else {
      // No Japanese audio, reveal answer and play English audio
      debugLog('No Japanese audio, revealing answer immediately');
      setIsAnswerRevealed(true);
      
      if (currentSentence.englishAudioPath) {
        debugLog('Playing English audio', { src: currentSentence.englishAudioPath });
        setListenModeState('english');
        
        play(currentSentence.englishAudioPath).then(() => {
          debugLog('English audio completed, waiting before advancing');
          setListenModeState('waiting2');
          
          waiting2TimeoutRef.current = window.setTimeout(() => {
            waiting2TimeoutRef.current = null;
            
            // Check if we're still in listen mode
            if (viewMode !== 'listen') {
              debugLog('Listen mode interrupted during waiting2 phase');
              return;
            }
            
            debugLog('Advancing to next card');
            setListenModeState('idle');
            
            if (!isLastCard) {
              goToNext();
            } else {
              debugLog('Reached last card, not advancing');
            }
          }, audioSettings.pauseDuration);
        }).catch(error => {
          debugLog('Error playing English audio', { error });
          setListenModeState('idle');
        });
      } else {
        // No audio at all, just wait and advance
        debugLog('No audio at all, waiting before advancing');
        setListenModeState('waiting2');
        
        waiting2TimeoutRef.current = window.setTimeout(() => {
          waiting2TimeoutRef.current = null;
          
          // Check if we're still in listen mode
          if (viewMode !== 'listen') {
            debugLog('Listen mode interrupted during waiting2 phase');
            return;
          }
          
          debugLog('Advancing to next card');
          setListenModeState('idle');
          
          if (!isLastCard) {
            goToNext();
          } else {
            debugLog('Reached last card, not advancing');
          }
        }, audioSettings.pauseDuration);
      }
    }
  }, [
    currentDeck, 
    viewMode, 
    getCurrentSentence, 
    clearAllTimeouts,
    stop, 
    setIsAnswerRevealed, 
    play, 
    audioSettings.pauseDuration, 
    goToNext, 
    isLastCard
  ]);
  
  // Reset listen mode state
  const resetListenMode = useCallback(() => {
    debugLog('Resetting listen mode');
    setListenModeState('idle');
    lastSentenceIdRef.current = null;
    clearAllTimeouts();
    stop();
  }, [clearAllTimeouts, stop]);
  
  // Effect to start listen mode sequence when currentDeck or viewMode changes
  useEffect(() => {
    if (viewMode === 'listen' && currentDeck && listenModeState === 'idle') {
      debugLog('Auto-starting listen mode sequence');
      // Small delay to ensure state updates
      const timeoutId = setTimeout(() => {
        startListenModeSequence();
      }, 50);
      
      return () => clearTimeout(timeoutId);
    }
  }, [viewMode, currentDeck, listenModeState, startListenModeSequence]);
  
  // Clean up timeouts when component unmounts
  useEffect(() => {
    return () => {
      clearAllTimeouts();
    };
  }, [clearAllTimeouts]);
  
  return {
    listenModeState,
    startListenModeSequence,
    resetListenMode,
    restartCurrentPhase
  };
} 