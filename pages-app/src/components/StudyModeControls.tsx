import { ViewMode } from '../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faRandom, 
  faListOl, 
  faEye, 
  faEyeSlash, 
  faVolumeHigh, 
  faVolumeXmark,
  faCirclePlay,
  faCircleStop
} from '@fortawesome/free-solid-svg-icons';

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
      <div className="controls-group">
        <button 
          className={`btn ${randomMode ? '' : 'btn-secondary'}`}
          onClick={onToggleRandomMode}
          title={randomMode ? 'Random Order' : 'Sequential Order'}
        >
          <FontAwesomeIcon icon={randomMode ? faRandom : faListOl} />
          <span className="btn-text">{randomMode ? ' Random' : ' Sequential'}</span>
        </button>
        
        <button 
          className={`btn ${showAnswerByDefault ? '' : 'btn-secondary'}`}
          onClick={onToggleShowAnswerByDefault}
          title={showAnswerByDefault ? 'Show All' : 'Tap to Reveal'}
        >
          <FontAwesomeIcon icon={showAnswerByDefault ? faEye : faEyeSlash} />
          <span className="btn-text">{showAnswerByDefault ? ' Show All' : ' Tap to Reveal'}</span>
        </button>
        
        <button 
          className={`btn ${autoPlayJapanese ? '' : 'btn-secondary'}`}
          onClick={onToggleAutoPlay}
          title={autoPlayJapanese ? 'Auto-Play On' : 'Auto-Play Off'}
        >
          <FontAwesomeIcon icon={autoPlayJapanese ? faVolumeHigh : faVolumeXmark} />
          <span className="btn-text">{autoPlayJapanese ? ' Auto-Play On' : ' Auto-Play Off'}</span>
        </button>
        
        <button 
          className={`btn ${viewMode === 'listen' ? '' : 'btn-secondary'}`}
          onClick={onToggleListenMode}
          title={viewMode === 'listen' ? 'Exit Listen Mode' : 'Listen Mode'}
        >
          <FontAwesomeIcon icon={viewMode === 'listen' ? faCircleStop : faCirclePlay} />
          <span className="btn-text">{viewMode === 'listen' ? ' Exit Listen' : ' Listen Mode'}</span>
        </button>
      </div>
    </div>
  );
} 