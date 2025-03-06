import { useState, useEffect, MouseEvent } from 'react';
import { Sentence } from '../types';
import { useSwipeGestures } from '../hooks/useSwipeGestures';
import { Card, CardContent } from './ui/card';
import { cn } from '@/lib/utils';
import { Volume2, VolumeX } from 'lucide-react';
import { Icon } from './ui/icon';
import { Japanese, P } from './ui/typography';
import { GlossTable } from './GlossTable';

interface FlashcardProps {
  sentence: Sentence;
  showAnswerByDefault: boolean;
  onNext: () => void;
  onPrevious: () => void;
  onPlayAudio?: () => void;
  isPlayingAudio?: boolean;
  onRevealAnswer?: () => void;
  useFlipAnimation?: boolean;
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
    onFlipComplete: () => {
      setShowAnswer(true);
      setAnswerVisible(true);
    },
    shouldFlip: !showAnswer,
    flipSensitivity: 0.8,
    minSwipeDistance: 50,
    maxSwipeDistance: 150,
    resistance: 0.5,
    useFlipAnimation
  });
  
  // Update showAnswer when showAnswerByDefault changes
  useEffect(() => {
    setShowAnswer(showAnswerByDefault);
    setAnswerVisible(showAnswerByDefault);
    
    if (showAnswerByDefault && useFlipAnimation) {
      resetSwipeState();
    }
  }, [showAnswerByDefault, useFlipAnimation, resetSwipeState]);
  
  // Reset showAnswer when sentence changes
  useEffect(() => {
    setShowAnswer(showAnswerByDefault);
    setAnswerVisible(showAnswerByDefault);
    resetSwipeState();
  }, [sentence, showAnswerByDefault, resetSwipeState]);

  // Handle card back visibility during flip
  useEffect(() => {
    if (isFlipping) {
      if (Math.abs(flipProgress) >= 90) {
        setShowRealContent(false);
        setShowCardBack(true);
      } else if (Math.abs(flipProgress) < 90) {
        setShowRealContent(true);
        setShowCardBack(false);
      }
    } else {
      setShowRealContent(true);
      setShowCardBack(false);
      
      if (!isFlipping && !isAnimating) {
        setAnswerVisible(showAnswer);
      }
    }
  }, [flipProgress, isFlipping, showAnswer, isAnimating]);

  // Handle click to play audio
  const handleClick = () => {
    if (!isSelecting && onPlayAudio && swipeOffset === 0 && !isFlipping) {
      onPlayAudio();
    }
    setIsSelecting(false);
  };

  // Track mouse events for text selection
  const handleMouseDown = () => {
    setIsSelecting(false);
  };

  const handleMouseMove = (e: MouseEvent) => {
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
    transformStyle: 'preserve-3d' as const,
    perspective: '1000px'
  };

  return (
    <Card 
      className={cn(
        "w-full overflow-hidden bg-card min-h-[300px]",
        isFlipping && "flipping"
      )}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={cardStyle}
    >
      <CardContent className="relative p-6">
        {/* Front content - visible when not flipped */}
        <div className={cn(
          "card-content front",
          !showRealContent && "hidden"
        )}>
          <Japanese className="text-2xl leading-relaxed">
            {sentence.sentence.text}
          </Japanese>
          
          {/* Audio icon */}
          {sentence.sentence.audio && (
            <div className="absolute right-6 top-6">
              <Icon 
                icon={isPlayingAudio ? Volume2 : VolumeX} 
                className="text-primary transition-colors"
              />
            </div>
          )}
        </div>
        
        {/* Card back - visible during flip transition */}
        <div
          className={cn(
            "card-back absolute inset-0 flex items-center justify-center bg-card p-6",
            showCardBack && "visible"
          )}
          style={{
            backfaceVisibility: 'visible',
            transform: 'rotateY(180deg)',
            zIndex: showCardBack ? 1 : -1
          }}
        >
          <P className="text-muted-foreground">Loading...</P>
        </div>
        
        {/* Answer content - visible after flip is complete */}
        <div className={cn(
          "answer space-y-6",
          !showAnswer && "hidden",
          answerVisible && "visible"
        )}>
          <P className="text-lg">{sentence.translation.text}</P>
          
          {sentence.notes && sentence.notes.length > 0 && (
            <div className="space-y-2">
              {sentence.notes.map((note, index) => (
                <P key={index} className="text-sm text-muted-foreground">{note}</P>
              ))}
            </div>
          )}
          
          {sentence.gloss && sentence.gloss.length > 0 && (
            <div className="gloss-table-container">
              <GlossTable gloss={sentence.gloss} />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 