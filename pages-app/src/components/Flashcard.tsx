import { useState, useEffect, MouseEvent, TouchEvent } from 'react';
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
  onPrevious: () => void; // New prop for previous card
  onPlayAudio?: () => void; // Prop for playing audio
  isPlayingAudio?: boolean; // Prop to indicate if audio is playing
  onRevealAnswer?: () => void; // New prop for revealing the answer
}

export default function Flashcard({ 
  sentence, 
  showAnswerByDefault, 
  onNext,
  onPrevious,
  onPlayAudio,
  isPlayingAudio = false,
  onRevealAnswer
}: FlashcardProps) {
  const [showAnswer, setShowAnswer] = useState(showAnswerByDefault);
  const [renderedHTML, setRenderedHTML] = useState('');
  const [isSelecting, setIsSelecting] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [swipeOffset, setSwipeOffset] = useState(0); // Track horizontal swipe distance
  const [flipProgress, setFlipProgress] = useState(0); // Track flip progress (0-180 degrees)
  const [isAnimating, setIsAnimating] = useState(false); // Track if card is animating
  const [isFlipping, setIsFlipping] = useState(false); // Track if card is flipping
  
  // Update showAnswer when showAnswerByDefault changes
  useEffect(() => {
    setShowAnswer(showAnswerByDefault);
    
    // Check if we should use the flip animation (set by the DeckView component)
    if (showAnswerByDefault && sessionStorage.getItem('useFlipAnimation') === 'true') {
      setIsFlipping(true);
      setFlipProgress(-180); // Use negative value for consistent flip direction
      // Reset flip state after animation completes
      setTimeout(() => {
        setIsFlipping(false);
      }, 600);
    }
  }, [showAnswerByDefault]);
  
  // Reset showAnswer when sentence changes
  useEffect(() => {
    setShowAnswer(showAnswerByDefault);
    // Reset swipe state when sentence changes
    setSwipeOffset(0);
    setFlipProgress(0);
    setIsAnimating(false);
    setIsFlipping(false);
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

  // Handle click to play audio
  const handleClick = () => {
    // Only handle click if not in text selection mode and not swiping
    if (!isSelecting && onPlayAudio && !isPlayingAudio && swipeOffset === 0 && !isFlipping) {
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

  // Handle touch events for swipe gestures
  const handleTouchStart = (e: TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
    setIsAnimating(false); // Reset animation state
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (touchStartX === null || isFlipping && isAnimating) return;
    
    const touchCurrentX = e.touches[0].clientX;
    const diff = touchCurrentX - touchStartX;
    
    // If answer is not revealed and swiping left, use flip animation
    if (!showAnswer && diff < 0) {
      // Convert swipe distance to rotation degrees (max 180 degrees)
      // Use a multiplier to make the flip more responsive
      const multiplier = 2.0; // Increased for more responsive flipping
      const maxFlip = 180;
      const newFlipProgress = Math.min(Math.abs(diff) * multiplier, maxFlip);
      // Use negative rotation for more intuitive flip direction when swiping left
      setFlipProgress(-newFlipProgress);
      setIsFlipping(true);
      // Keep swipeOffset at 0 to prevent sliding
      setSwipeOffset(0);
    } else {
      // For other swipes (right or when answer is already revealed), use slide animation
      // Limit the swipe distance and add resistance as it gets further
      const maxSwipe = 150;
      const resistance = 0.5; // Higher values = more resistance
      
      let newOffset;
      if (Math.abs(diff) > maxSwipe) {
        // Apply resistance beyond maxSwipe
        const extra = Math.abs(diff) - maxSwipe;
        newOffset = Math.sign(diff) * (maxSwipe + extra * resistance);
      } else {
        newOffset = diff;
      }
      
      setSwipeOffset(newOffset);
      setIsFlipping(false);
      setFlipProgress(0);
    }
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if (touchStartX === null) return;
    
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchEndX - touchStartX;
    
    // Minimum swipe distance (in pixels) to trigger action
    const minSwipeDistance = 50;
    
    // If we're in the middle of a flip animation
    if (isFlipping && !showAnswer) {
      if (Math.abs(flipProgress) > 90) {
        // Complete the flip animation
        setFlipProgress(-180); // Use negative value for the reversed direction
        setIsAnimating(true);
        // Wait for animation to complete before revealing answer
        setTimeout(() => {
          if (onRevealAnswer) {
            onRevealAnswer();
          }
          // Reset flip state after animation completes
          setTimeout(() => {
            setIsFlipping(false);
          }, 300);
        }, 300);
      } else {
        // Cancel the flip animation
        setFlipProgress(0);
        setIsAnimating(true);
        // Reset animation state after spring back
        setTimeout(() => {
          setIsFlipping(false);
          setIsAnimating(false);
        }, 300);
      }
    } else if (diff > minSwipeDistance) {
      // Swipe right -> go to previous card
      setIsAnimating(true);
      // Animate the card off screen to the right
      setSwipeOffset(window.innerWidth);
      // Wait for animation to complete before changing card
      setTimeout(() => {
        onPrevious();
      }, 300);
    } else if (diff < -minSwipeDistance && showAnswer) {
      // Swipe left when answer is already revealed -> go to next card
      setIsAnimating(true);
      // Animate the card off screen to the left
      setSwipeOffset(-window.innerWidth);
      // Wait for animation to complete before action
      setTimeout(() => {
        onNext();
      }, 300);
    } else {
      // If it's not a significant swipe, reset position with animation
      setIsAnimating(true);
      setSwipeOffset(0);
      
      // If it's a tap (not a swipe), play audio
      if (Math.abs(diff) < 10 && !isSelecting && onPlayAudio && !isPlayingAudio) {
        onPlayAudio();
      }
      
      // Reset animation state after spring back
      setTimeout(() => {
        setIsAnimating(false);
      }, 300);
    }
    
    setTouchStartX(null);
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
      <div className="japanese-text">
        {sentence.japanese}
      </div>
      
      {/* Audio icon */}
      {sentence.japaneseAudioPath && (
        <div className="audio-icon">
          {isPlayingAudio ? '🔊' : '🔈'}
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