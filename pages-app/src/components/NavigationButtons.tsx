interface NavigationButtonsProps {
  onPrevious: () => void;
  onNext: () => void;
  onReveal: () => void;
  isAnswerRevealed: boolean;
  isFirstCard: boolean;
  isLastCard: boolean;
}

export default function NavigationButtons({
  onPrevious,
  onNext,
  onReveal,
  isAnswerRevealed,
  isFirstCard,
  isLastCard
}: NavigationButtonsProps) {
  return (
    <div className="navigation-buttons">
      <button 
        className="nav-button prev-button" 
        onClick={onPrevious}
        disabled={isFirstCard}
      >
        &larr; Previous
      </button>
      
      {!isAnswerRevealed ? (
        <button 
          className="nav-button flip-button" 
          onClick={onReveal}
        >
          Flip
        </button>
      ) : (
        <button 
          className="nav-button next-button" 
          onClick={onNext}
          disabled={isLastCard}
        >
          Next &rarr;
        </button>
      )}
    </div>
  );
} 