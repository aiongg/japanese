import React from 'react';

interface AudioSettingsProps {
  pauseDuration: number;
  onIncrement: () => void;
  onDecrement: () => void;
  isListenMode: boolean;
}

export default function AudioSettings({
  pauseDuration,
  onIncrement,
  onDecrement,
  isListenMode
}: AudioSettingsProps) {
  // Only show audio settings in listen mode
  if (!isListenMode) return null;
  
  // Convert milliseconds to seconds for display
  const pauseDurationInSeconds = pauseDuration / 1000;
  
  return (
    <div className="audio-settings">
      <div className="delay-control">
        <span className="delay-label">Delay between audio:</span>
        <div className="delay-stepper">
          <button 
            className="delay-btn decrement-btn"
            onClick={onDecrement}
            disabled={pauseDurationInSeconds <= 1} // Disable if at minimum
          >
            -1
          </button>
          <span className="delay-value">{pauseDurationInSeconds.toFixed(0)} sec</span>
          <button 
            className="delay-btn increment-btn"
            onClick={onIncrement}
            disabled={pauseDurationInSeconds >= 10} // Disable if at maximum
          >
            +1
          </button>
        </div>
      </div>
    </div>
  );
} 