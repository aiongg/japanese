import { useState, useCallback, useEffect } from 'react';

// Debug flag - set to true to enable debug logs
const DEBUG = true;

// Function to log debug messages
function debugLog(...args: unknown[]) {
  if (DEBUG) {
    console.log('[FLASHCARD STATE]', ...args);
  }
}

interface UseFlashcardStateProps {
  showAnswerByDefault: boolean;
  onToggleShowAnswerByDefault?: (newValue: boolean) => void;
}

interface UseFlashcardStateReturn {
  isAnswerRevealed: boolean;
  useFlipAnimation: boolean;
  setIsAnswerRevealed: (revealed: boolean) => void;
  revealAnswer: () => void;
  toggleShowAnswerByDefault: () => void;
  showAnswerByDefault: boolean;
}

export function useFlashcardState({
  showAnswerByDefault: initialShowAnswerByDefault,
  onToggleShowAnswerByDefault
}: UseFlashcardStateProps): UseFlashcardStateReturn {
  const [showAnswerByDefault, setShowAnswerByDefault] = useState(initialShowAnswerByDefault);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(initialShowAnswerByDefault);
  const [useFlipAnimation, setUseFlipAnimation] = useState(false);

  // Sync internal state with prop when it changes
  useEffect(() => {
    setShowAnswerByDefault(initialShowAnswerByDefault);
    setIsAnswerRevealed(initialShowAnswerByDefault);
  }, [initialShowAnswerByDefault]);

  // Function to reveal the answer with flip animation
  const revealAnswer = useCallback(() => {
    debugLog('Revealing answer');
    // Use state instead of sessionStorage
    setUseFlipAnimation(true);
    setIsAnswerRevealed(true);
    // Clear the flag after a short delay
    setTimeout(() => {
      setUseFlipAnimation(false);
    }, 300); // Timeout to ensure animation completes
  }, []);

  // Toggle show answer by default setting
  const toggleShowAnswerByDefault = useCallback(() => {
    debugLog('Toggling show answer by default');
    const newValue = !showAnswerByDefault;
    
    // Update internal state
    setShowAnswerByDefault(newValue);
    setIsAnswerRevealed(newValue);
    
    // Notify parent component if callback is provided
    if (onToggleShowAnswerByDefault) {
      onToggleShowAnswerByDefault(newValue);
    }
  }, [showAnswerByDefault, onToggleShowAnswerByDefault]);

  return {
    isAnswerRevealed,
    useFlipAnimation,
    setIsAnswerRevealed,
    revealAnswer,
    toggleShowAnswerByDefault,
    showAnswerByDefault
  };
} 