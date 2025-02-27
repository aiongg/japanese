import React from 'react';

interface AudioSettingsProps {
  pauseDuration: number;
  onPauseDurationChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isListenMode: boolean;
}

export default function AudioSettings({
  pauseDuration,
  onPauseDurationChange,
  isListenMode
}: AudioSettingsProps) {
  // Only show audio settings in listen mode
  if (!isListenMode) return null;
  
  // Convert milliseconds to seconds for display
  const pauseDurationInSeconds = pauseDuration / 1000;
  
  return (
    <div className="audio-settings">
      <label>
        Delay: {pauseDurationInSeconds.toFixed(1)} seconds
        <input 
          type="range" 
          min="1000" 
          max="5000" 
          step="500" 
          value={pauseDuration} 
          onChange={onPauseDurationChange}
        />
      </label>
    </div>
  );
} 