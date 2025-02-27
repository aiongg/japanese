import { useState, useEffect, MouseEvent } from 'react';
import { Sentence } from '../types';
import { marked } from 'marked';

// Configure marked for better table rendering
marked.setOptions({
  gfm: true, // GitHub Flavored Markdown - enables tables
  breaks: true
});

console.log('Marked configuration updated');

interface FlashcardProps {
  sentence: Sentence;
  showAnswerByDefault: boolean;
  onNext: () => void;
  onPlayAudio?: () => void; // New prop for playing audio
  isPlayingAudio?: boolean; // New prop to indicate if audio is playing
}

export default function Flashcard({ 
  sentence, 
  showAnswerByDefault, 
  onNext,
  onPlayAudio,
  isPlayingAudio = false
}: FlashcardProps) {
  const [showAnswer, setShowAnswer] = useState(showAnswerByDefault);
  const [renderedHTML, setRenderedHTML] = useState('');
  const [isSelecting, setIsSelecting] = useState(false);
  
  // Update showAnswer when showAnswerByDefault changes
  useEffect(() => {
    setShowAnswer(showAnswerByDefault);
  }, [showAnswerByDefault]);
  
  // Reset showAnswer when sentence changes
  useEffect(() => {
    setShowAnswer(showAnswerByDefault);
  }, [sentence, showAnswerByDefault]);

  // Render markdown when sentence changes
  useEffect(() => {
    // Ensure the markdown is properly formatted for tables
    try {
      const result = marked(sentence.glossTable);
      // Handle both string and Promise results
      if (typeof result === 'string') {
        setRenderedHTML(result);
      } else {
        // Handle Promise result
        result.then(html => {
          setRenderedHTML(html);
        });
      }
    } catch (error) {
      console.error('Error rendering markdown:', error);
      setRenderedHTML('<p>Error rendering table</p>');
    }
  }, [sentence]);

  const handleClick = () => {
    // Only handle click if not in text selection mode
    if (!isSelecting) {
      onNext();
    }
    // Reset selection state
    setIsSelecting(false);
  };

  // Track mouse events for text selection
  const handleMouseDown = () => {
    setIsSelecting(false);
  };

  const handleMouseMove = (e: MouseEvent) => {
    // If mouse is moved with button pressed, user is selecting text
    if (e.buttons === 1) {
      setIsSelecting(true);
    }
  };

  // Handle audio button click without propagating to parent
  const handleAudioButtonClick = (e: MouseEvent) => {
    e.stopPropagation(); // Prevent triggering card interaction
    if (onPlayAudio) {
      onPlayAudio();
    }
  };

  return (
    <div 
      className="flashcard"
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      style={{ cursor: 'pointer' }}
    >
      <div className="japanese-text">
        {sentence.japanese}
      </div>
      
      {/* Play button underneath the Japanese text */}
      {sentence.japaneseAudioPath && onPlayAudio && (
        <div className="audio-button-container">
          <button 
            className={`audio-button-inline ${isPlayingAudio ? 'playing' : ''}`}
            onClick={handleAudioButtonClick}
            disabled={isPlayingAudio}
          >
            {isPlayingAudio ? '🔊 Playing...' : '🔊 Play'}
          </button>
        </div>
      )}
      
      <div className={`answer ${showAnswer ? '' : 'hidden'}`}>
        <div className="english-text">{sentence.english}</div>
        
        {sentence.notes && (
          <div className="notes">{sentence.notes}</div>
        )}
        
        <div 
          className="gloss-table-container"
          dangerouslySetInnerHTML={{ __html: renderedHTML }}
        />
      </div>
    </div>
  );
} 