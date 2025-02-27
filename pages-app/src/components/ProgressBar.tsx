interface ProgressBarProps {
  currentIndex: number;
  totalCards: number;
}

export default function ProgressBar({ currentIndex, totalCards }: ProgressBarProps) {
  const progress = ((currentIndex + 1) / totalCards) * 100;
  
  return (
    <div className="progress">
      <span>{currentIndex + 1}</span>
      <div className="progress-bar">
        <div 
          className="progress-bar-fill" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <span>{totalCards}</span>
    </div>
  );
} 