import { useEffect } from 'react';

// Debug flag - set to true to enable debug logs
const DEBUG = true;

// Function to log debug messages
function debugLog(...args: unknown[]) {
  if (DEBUG) {
    console.log('[KEYBOARD SHORTCUTS]', ...args);
  }
}

export interface UseKeyboardShortcutsProps {
  onNext?: () => void;
  onPrevious?: () => void;
  onPlayAudio?: () => void;
  onRevealAnswer?: () => void;
  isAnswerRevealed?: boolean;
}

export function useKeyboardShortcuts({
  onNext,
  onPrevious,
  onPlayAudio,
  onRevealAnswer,
  isAnswerRevealed
}: UseKeyboardShortcutsProps) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      // Ignore key events when typing in input fields
      if (event.target instanceof HTMLInputElement || 
          event.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (event.code) {
        case 'Space':
          event.preventDefault();
          onPlayAudio?.();
          break;
        case 'ArrowRight':
          event.preventDefault();
          if (!isAnswerRevealed && onRevealAnswer) {
            onRevealAnswer();
          } else if (onNext) {
            onNext();
          }
          break;
        case 'ArrowLeft':
          event.preventDefault();
          onPrevious?.();
          break;
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onNext, onPrevious, onPlayAudio, onRevealAnswer, isAnswerRevealed]);
} 