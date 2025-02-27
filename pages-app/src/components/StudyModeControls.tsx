import { ViewMode } from '../types';
import { Link } from 'react-router-dom';

interface StudyModeControlsProps {
  randomMode: boolean;
  showAnswerByDefault: boolean;
  autoPlayJapanese: boolean;
  viewMode: ViewMode;
  onToggleRandomMode: () => void;
  onToggleShowAnswerByDefault: () => void;
  onToggleAutoPlay: () => void;
  onToggleListenMode: () => void;
}

export default function StudyModeControls({
  randomMode,
  showAnswerByDefault,
  autoPlayJapanese,
  viewMode,
  onToggleRandomMode,
  onToggleShowAnswerByDefault,
  onToggleAutoPlay,
  onToggleListenMode
}: StudyModeControlsProps) {
  return (
    <div className="controls">
      <Link to="/" className="btn btn-secondary">
        &larr; Back to Decks
      </Link>
      
      <div className="controls-group">
        <button 
          className={`btn ${randomMode ? '' : 'btn-secondary'}`}
          onClick={onToggleRandomMode}
        >
          {randomMode ? 'Random Order' : 'Sequential Order'}
        </button>
        
        <button 
          className={`btn ${showAnswerByDefault ? '' : 'btn-secondary'}`}
          onClick={onToggleShowAnswerByDefault}
        >
          {showAnswerByDefault ? 'Show All' : 'Tap to Reveal'}
        </button>
        
        <button 
          className={`btn ${autoPlayJapanese ? '' : 'btn-secondary'}`}
          onClick={onToggleAutoPlay}
        >
          {autoPlayJapanese ? 'Auto-Play On' : 'Auto-Play Off'}
        </button>
        
        <button 
          className={`btn ${viewMode === 'listen' ? '' : 'btn-secondary'}`}
          onClick={onToggleListenMode}
        >
          {viewMode === 'listen' ? '🎧 Exit Listen Mode' : '🎧 Listen Mode'}
        </button>
      </div>
    </div>
  );
} 