import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDeck } from '../context/DeckContext';
import Flashcard from './Flashcard';

export default function DeckView() {
  const { deckId } = useParams<{ deckId: string }>();
  const { currentDeck, loading, error, loadDeck } = useDeck();
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [randomMode, setRandomMode] = useState(false);
  const [randomIndices, setRandomIndices] = useState<number[]>([]);
  const [showAnswerByDefault, setShowAnswerByDefault] = useState(false);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);
  
  // Keep track of the previous deck ID to detect changes
  const prevDeckIdRef = useRef<string | null>(null);
  
  useEffect(() => {
    if (deckId && deckId !== prevDeckIdRef.current) {
      loadDeck(deckId);
      setCurrentIndex(0);
      prevDeckIdRef.current = deckId;
    }
  }, [deckId, loadDeck]);
  
  useEffect(() => {
    if (currentDeck && randomMode) {
      // Generate random order of indices
      const indices = [...Array(currentDeck.sentences.length).keys()];
      for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
      }
      setRandomIndices(indices);
      setCurrentIndex(0);
    }
  }, [randomMode, currentDeck]);
  
  // Reset the current index when the deck changes
  useEffect(() => {
    if (currentDeck) {
      setCurrentIndex(0);
      setIsAnswerRevealed(showAnswerByDefault);
    }
  }, [currentDeck?.id, showAnswerByDefault]);
  
  // Add keyboard navigation
  const goToNext = useCallback(() => {
    if (currentDeck && currentIndex < currentDeck.sentences.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setIsAnswerRevealed(showAnswerByDefault);
    }
  }, [currentDeck, currentIndex, showAnswerByDefault]);
  
  const goToPrevious = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setIsAnswerRevealed(showAnswerByDefault);
    }
  }, [currentIndex, showAnswerByDefault]);
  
  // Handle card interaction (tap or keyboard)
  const handleCardInteraction = useCallback(() => {
    if (showAnswerByDefault || isAnswerRevealed) {
      // If answers are shown by default or answer is already revealed, go to next card
      goToNext();
    } else {
      // If answer is hidden, reveal it
      setIsAnswerRevealed(true);
    }
  }, [showAnswerByDefault, isAnswerRevealed, goToNext]);
  
  // Set up keyboard event listeners
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Space' || event.code === 'ArrowRight') {
        event.preventDefault();
        handleCardInteraction();
      } else if (event.code === 'ArrowLeft') {
        event.preventDefault();
        goToPrevious();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleCardInteraction, goToPrevious]);
  
  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }
  
  if (error) {
    return <div className="error">{error}</div>;
  }
  
  if (!currentDeck) {
    return <div className="error">Deck not found</div>;
  }
  
  const totalCards = currentDeck.sentences.length;
  
  // Safety check to ensure currentIndex is within bounds
  const safeCurrentIndex = Math.min(currentIndex, totalCards - 1);
  if (safeCurrentIndex !== currentIndex) {
    setCurrentIndex(safeCurrentIndex);
    return null; // Prevent rendering with invalid index
  }
  
  const actualIndex = randomMode ? randomIndices[safeCurrentIndex] : safeCurrentIndex;
  
  // Safety check to ensure actualIndex is valid
  if (actualIndex === undefined || actualIndex < 0 || actualIndex >= totalCards) {
    console.error('Invalid actualIndex:', actualIndex, 'totalCards:', totalCards);
    return <div className="error">Error displaying flashcard</div>;
  }
  
  const currentSentence = currentDeck.sentences[actualIndex];
  
  // Safety check to ensure currentSentence exists
  if (!currentSentence) {
    console.error('Sentence not found at index:', actualIndex);
    return <div className="error">Error displaying flashcard</div>;
  }
  
  const progress = ((safeCurrentIndex + 1) / totalCards) * 100;
  
  const toggleRandomMode = () => {
    setRandomMode(!randomMode);
  };
  
  const toggleShowAnswerByDefault = () => {
    setShowAnswerByDefault(!showAnswerByDefault);
    setIsAnswerRevealed(!showAnswerByDefault);
  };
  
  return (
    <div className="container flashcard-container">
      <div className="controls">
        <Link to="/" className="btn btn-secondary">
          &larr; Back to Decks
        </Link>
        
        <div className="controls-group">
          <button 
            className={`btn ${randomMode ? '' : 'btn-secondary'}`}
            onClick={toggleRandomMode}
          >
            {randomMode ? 'Random Order' : 'Sequential Order'}
          </button>
          
          <button 
            className={`btn ${showAnswerByDefault ? '' : 'btn-secondary'}`}
            onClick={toggleShowAnswerByDefault}
          >
            {showAnswerByDefault ? 'Show All' : 'Tap to Reveal'}
          </button>
        </div>
      </div>
      
      <div className="progress">
        <span>{safeCurrentIndex + 1}</span>
        <div className="progress-bar">
          <div 
            className="progress-bar-fill" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <span>{totalCards}</span>
      </div>
      
      <Flashcard 
        key={`${currentDeck.id}-${actualIndex}`}
        sentence={currentSentence} 
        showAnswerByDefault={showAnswerByDefault || isAnswerRevealed}
        onNext={handleCardInteraction}
      />
      
      <div className="controls">
        <button 
          className="btn btn-secondary" 
          onClick={goToPrevious}
          disabled={safeCurrentIndex === 0}
        >
          &larr; Previous
        </button>
        
        <button 
          className="btn" 
          onClick={goToNext}
          disabled={safeCurrentIndex === totalCards - 1}
        >
          Next &rarr;
        </button>
      </div>
      
      <div className="keyboard-shortcuts">
        <p>Keyboard shortcuts: Space/Right Arrow = Next, Left Arrow = Previous</p>
      </div>
    </div>
  );
} 