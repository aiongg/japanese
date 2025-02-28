import { useState, useEffect, MouseEvent } from 'react';
import { Sentence } from '../types';
import { marked } from 'marked';
import { useSwipeGestures } from '../hooks/useSwipeGestures';

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
  onPrevious: () => void; // New prop for previous card
  onPlayAudio?: () => void; // Prop for playing audio
  isPlayingAudio?: boolean; // Prop to indicate if audio is playing
  onRevealAnswer?: () => void; // New prop for revealing the answer
  useFlipAnimation?: boolean; // Prop to control flip animation
}

export default function Flashcard({ 
  sentence, 
  showAnswerByDefault, 
  onNext,
  onPrevious,
  onPlayAudio,
  isPlayingAudio = false,
  onRevealAnswer,
  useFlipAnimation = false
}: FlashcardProps) {
  const [showAnswer, setShowAnswer] = useState(showAnswerByDefault);
  const [renderedHTML, setRenderedHTML] = useState('');
  const [isSelecting, setIsSelecting] = useState(false);
  const [showCardBack, setShowCardBack] = useState(false);
  const [showRealContent, setShowRealContent] = useState(true);
  const [answerVisible, setAnswerVisible] = useState(showAnswerByDefault);
  
  // Use our new swipe gestures hook
  const [
    { swipeOffset, flipProgress, isAnimating, isFlipping },
    { handleTouchStart, handleTouchMove, handleTouchEnd, resetSwipeState }
  ] = useSwipeGestures({
    onSwipeLeft: showAnswer ? onNext : onRevealAnswer,
    onSwipeRight: onPrevious,
    onTap: onPlayAudio,
    shouldFlip: !showAnswer, // Only use flip animation when answer is hidden
    flipSensitivity: 0.8, // Lower value for more gradual flip
    minSwipeDistance: 50,
    maxSwipeDistance: 150,
    resistance: 0.5,
    useFlipAnimation
  });
  
  // Update showAnswer when showAnswerByDefault changes
  useEffect(() => {
    setShowAnswer(showAnswerByDefault);
    setAnswerVisible(showAnswerByDefault);
    
    // Check if we should use the flip animation (controlled by prop)
    if (showAnswerByDefault && useFlipAnimation) {
      // The flip animation is now handled by the hook
      // We just need to reset the swipe state when not using it
      resetSwipeState();
    }
  }, [showAnswerByDefault, useFlipAnimation, resetSwipeState]);
  
  // Reset showAnswer when sentence changes
  useEffect(() => {
    setShowAnswer(showAnswerByDefault);
    setAnswerVisible(showAnswerByDefault);
    // Reset swipe state when sentence changes
    resetSwipeState();
  }, [sentence, showAnswerByDefault, resetSwipeState]);

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

  // Handle card back visibility during flip
  useEffect(() => {
    if (isFlipping) {
      // Show card back when the card is at 90 degrees (halfway through the flip)
      if (Math.abs(flipProgress) >= 90) {
        setShowRealContent(false);
        setShowCardBack(true);
        
        // If we're revealing the answer, delay showing it until after the flip
        if (!showAnswer && Math.abs(flipProgress) >= 175) {
          // Set showAnswer first, but delay the visibility for a smooth transition
          setShowAnswer(true);
          setTimeout(() => {
            setAnswerVisible(true);
          }, 150); // Delay to allow the card back to be visible briefly
        }
      } else if (Math.abs(flipProgress) < 90) {
        setShowRealContent(true);
        setShowCardBack(false);
      }
    } else {
      // Reset when not flipping
      setShowRealContent(true);
      setShowCardBack(false);
      
      // Synchronize answer visibility with showAnswer state when not flipping
      if (!isFlipping && !isAnimating) {
        setAnswerVisible(showAnswer);
      }
    }
  }, [flipProgress, isFlipping, showAnswer, isAnimating]);

  // Handle click to play audio
  const handleClick = () => {
    // Only handle click if not in text selection mode and not swiping
    if (!isSelecting && onPlayAudio && swipeOffset === 0 && !isFlipping) {
      onPlayAudio();
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

  // Calculate transform and transition styles based on swipe state
  const cardStyle = {
    transform: isFlipping 
      ? `rotateY(${flipProgress}deg)` 
      : `translateX(${swipeOffset}px)`,
    transition: isAnimating 
      ? `transform 0.3s ${isFlipping ? 'ease-in-out' : 'ease-out'}` 
      : 'none',
    cursor: isPlayingAudio ? 'default' : 'pointer',
    transformStyle: 'preserve-3d' as const
  };

  return (
    <div 
      className={`flashcard ${isFlipping ? 'flipping' : ''}`}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={cardStyle}
    >
      {/* Front content - visible when not flipped */}
      <div className={`card-content front ${showRealContent ? '' : 'hidden'}`}>
        <div className="japanese-text">
          {sentence.japanese}
        </div>
        
        {/* Audio icon */}
        {sentence.japaneseAudioPath && (
          <div className="audio-icon">
            {isPlayingAudio ? '🔊' : '🔈'}
          </div>
        )}
      </div>
      
      {/* Card back - visible during flip transition */}
      <div className={`card-back ${showCardBack ? 'visible' : ''}`}>
        <div className="loading-text">Loading...</div>
      </div>
      
      {/* Answer content - visible after flip is complete */}
      <div className={`answer ${showAnswer ? '' : 'hidden'} ${answerVisible ? 'visible' : ''}`}>
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