import React from 'react';

interface KeyboardShortcutsInfoProps {
  isAnswerRevealed: boolean;
}

export default function KeyboardShortcutsInfo({ isAnswerRevealed }: KeyboardShortcutsInfoProps) {
  return (
    <div className="keyboard-shortcuts">
      <p>Keyboard shortcuts: Space = Play Audio, Right Arrow = {isAnswerRevealed ? 'Next' : 'Flip'}, Left Arrow = Previous</p>
      <p>Mobile: Tap card to play audio, swipe right for previous, swipe left to {isAnswerRevealed ? 'next' : 'flip'}</p>
    </div>
  );
} 