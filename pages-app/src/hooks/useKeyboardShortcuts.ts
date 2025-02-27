import { useEffect } from 'react';

// Debug flag - set to true to enable debug logs
const DEBUG = true;

// Function to log debug messages
function debugLog(...args: unknown[]) {
  if (DEBUG) {
    console.log('[KEYBOARD SHORTCUTS]', ...args);
  }
}

interface UseKeyboardShortcutsProps {
  onNext: () => void;
  onPrevious: () => void;
  onPlayAudio: () => void;
  onRevealAnswer: () => void;
  isAnswerRevealed: boolean;
}

export function useKeyboardShortcuts({
  onNext,
  onPrevious,
  onPlayAudio,
  onRevealAnswer,
  isAnswerRevealed
}: UseKeyboardShortcutsProps): void {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore keyboard events if an input element is focused
      if (document.activeElement?.tagName === 'INPUT' || 
          document.activeElement?.tagName === 'TEXTAREA' ||
          document.activeElement?.tagName === 'SELECT') {
        return;
      }

      debugLog('Keyboard event', { key: e.key, code: e.code });
      
      switch (e.key) {
        case ' ':  // Space
          e.preventDefault();
          // Play audio
          onPlayAudio();
          break;
        case 'ArrowRight':
          e.preventDefault();
          // If answer is not revealed, reveal it, otherwise go to next card
          if (!isAnswerRevealed) {
            onRevealAnswer();
          } else {
            onNext();
          }
          break;
        case 'ArrowLeft':
          e.preventDefault();
          // Go to previous card
          onPrevious();
          break;
      }
    };

    // Add event listener
    window.addEventListener('keydown', handleKeyDown);
    
    // Clean up
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onNext, onPrevious, onPlayAudio, isAnswerRevealed, onRevealAnswer]);
} 