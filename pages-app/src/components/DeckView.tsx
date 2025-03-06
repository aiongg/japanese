import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDeck } from '../hooks/useDeck';
import { useSRS } from '../hooks/useSRS';
import Flashcard from './Flashcard';
import { DeckProgress } from './DeckProgress';
import { DeckSettings } from './DeckSettings';
import { DeckNavigation } from './DeckNavigation';
import { SRSControls } from './SRSControls';
import { SRSDebugTable } from './SRSDebugTable';
import { Button } from './ui/button';
import { Icon } from './ui/icon';
import { ArrowLeft, Settings, Bug } from 'lucide-react';
import KeyboardShortcutsInfo from './KeyboardShortcutsInfo';
import { ViewMode, AudioSettings as AudioSettingsType, SRSResponse } from '../types';
import { useAudio } from '../hooks/useAudio';
import { useFlashcardState } from '../hooks/useFlashcardState';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';
import { useListenMode } from '../hooks/useListenMode';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

// Debug flag - set to true to enable debug logs
const DEBUG = true;

// Function to log debug messages
function debugLog(...args: unknown[]) {
  if (DEBUG) {
    console.log('[DECKVIEW DEBUG]', ...args);
  }
}

// Default audio settings
const DEFAULT_AUDIO_SETTINGS: AudioSettingsType = {
  autoPlayJapanese: true,
  autoPlayEnglish: true,
  pauseDuration: 2000 // 2 seconds pause between audio files
};

export default function DeckView() {
  const { deckId } = useParams<{ deckId: string }>();
  const { currentDeck, loading, error, loadDeck, updateDeckSRS } = useDeck();
  
  // State for audio and view mode
  const [viewMode, setViewMode] = useState<ViewMode>('normal');
  const [audioSettings, setAudioSettings] = useState<AudioSettingsType>(DEFAULT_AUDIO_SETTINGS);
  
  // State for flashcard display
  const [showAnswerByDefault, setShowAnswerByDefault] = useState(false);
  const [showDebug, setShowDebug] = useState(false);
  
  // Refs to track view mode changes
  const prevViewModeRef = useRef<ViewMode>('normal');
  
  // Use our custom hooks
  const { 
    isPlaying, 
    play,
    stop
  } = useAudio();
  
  // Use SRS hook
  const {
    currentCard,
    isLoading: isSRSLoading,
    error: srsError,
    handleResponse,
    getProgress,
    resetSession,
    currentAttempt,
    getSessionCards
  } = useSRS({
    deckId: deckId!,
    deck: currentDeck?.sentences ?? [],
    maxNewCards: 20,
    enabled: currentDeck !== null // Only enable when deck is loaded
  });
  
  // Handle toggling showAnswerByDefault
  const handleToggleShowAnswerByDefault = useCallback((newValue: boolean) => {
    debugLog('Setting showAnswerByDefault to', newValue);
    setShowAnswerByDefault(newValue);
  }, []);
  
  // Use flashcard state hook
  const {
    isAnswerRevealed,
    useFlipAnimation,
    setIsAnswerRevealed,
    revealAnswer,
  } = useFlashcardState({
    showAnswerByDefault,
    onToggleShowAnswerByDefault: handleToggleShowAnswerByDefault
  });
  
  // Use listen mode hook
  const {
    resetListenMode
  } = useListenMode({
    currentDeck,
    viewMode,
    getCurrentSentence: () => currentCard,
    audioSettings,
    setIsAnswerRevealed,
    goToNext: () => handleResponse('passed'),
    isLastCard: false,
  });
  
  // Handle SRS response and update the debug table
  const handleSRSResponse = useCallback((response: SRSResponse) => {
    // Reset answer revealed state before handling response
    setIsAnswerRevealed(false);
    handleResponse(response);
    // Update the deck's SRS data after a short delay to ensure storage is updated
    setTimeout(() => {
      updateDeckSRS();
    }, 100);
  }, [handleResponse, updateDeckSRS, setIsAnswerRevealed]);
  
  // Load the deck when the component mounts or when the deckId changes
  useEffect(() => {
    if (deckId) {
      debugLog('Loading deck with ID:', deckId);
      loadDeck(deckId);
    }
  }, [deckId, loadDeck]);
  
  // Play Japanese audio
  const playJapaneseAudio = useCallback(() => {
    if (currentCard?.sentence.audio) {
      debugLog('Playing Japanese audio');
      play(currentCard.sentence.audio);
    }
  }, [currentCard, play]);
  
  // Auto-play audio when sentence changes if autoPlayJapanese is enabled and not in listen mode
  useEffect(() => {
    if (
      viewMode === 'normal' && 
      currentCard && 
      audioSettings.autoPlayJapanese && 
      currentCard.sentence.audio
    ) {
      playJapaneseAudio();
    }
  }, [currentCard, viewMode, audioSettings.autoPlayJapanese, playJapaneseAudio]);
  
  // Handle view mode changes
  useEffect(() => {
    // If switching FROM listen mode TO normal mode, stop any playing audio
    // This prevents stopping audio during initial component mount
    if (viewMode === 'normal' && prevViewModeRef.current === 'listen') {
      debugLog('Switching from listen mode to normal mode, stopping audio');
      stop();
    }
    
    // Update the previous view mode ref
    prevViewModeRef.current = viewMode;
  }, [viewMode, stop]);
  
  // Toggle auto-play setting
  const toggleAutoPlay = useCallback(() => {
    setAudioSettings(prev => ({ 
      ...prev, 
      autoPlayJapanese: !prev.autoPlayJapanese 
    }));
  }, []);
  
  // Use keyboard shortcuts
  useKeyboardShortcuts({
    onNext: () => handleResponse('passed'),
    onPrevious: resetSession,
    onPlayAudio: playJapaneseAudio,
    onRevealAnswer: revealAnswer,
    isAnswerRevealed
  });
  
  // Cleanup audio when component unmounts
  useEffect(() => {
    return () => {
      debugLog('Component unmounting, cleaning up audio');
      stop();
    };
  }, [stop]);
  
  // Toggle listen mode on/off
  const toggleListenMode = useCallback(() => {
    if (viewMode === 'listen') {
      // Switch to normal mode
      debugLog('Toggling from listen mode to normal mode');
      setViewMode('normal');
      resetListenMode();
    } else {
      // Switch to listen mode
      debugLog('Toggling from normal mode to listen mode');
      setViewMode('listen');
    }
  }, [viewMode, resetListenMode]);
  
  // Handle pause duration change
  const handlePauseDurationChange = useCallback((newDuration: number) => {
    debugLog('Setting pause duration to', newDuration);
    setAudioSettings(prev => ({
      ...prev,
      pauseDuration: newDuration
    }));
  }, []);
  
  // Loading and error states
  if (loading || isSRSLoading) {
    return <div className="loading">Loading deck...</div>;
  }
  
  if (error || srsError) {
    return <div className="error">Error loading deck: {error || srsError}</div>;
  }
  
  if (!currentDeck || !currentCard) {
    return <div className="error">Deck not found</div>;
  }
  
  const progress = getProgress();
  
  return (
    <div className="container flashcard-container space-y-6">
      <div className="flex items-start justify-between">
        <Button
          variant="ghost"
          size="sm"
          asChild
        >
          <Link to="/">
            <Icon icon={ArrowLeft} className="mr-2" />
            Back to Decks
          </Link>
        </Button>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowDebug(!showDebug)}
            className="w-9 p-0"
            title="Toggle debug info"
          >
            <Icon icon={Bug} className={showDebug ? "text-primary" : ""} />
          </Button>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="w-9 p-0"
              >
                <Icon icon={Settings} />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <DeckSettings
                autoPlayEnabled={audioSettings.autoPlayJapanese}
                onAutoPlayChange={toggleAutoPlay}
                pauseDuration={audioSettings.pauseDuration}
                onPauseDurationChange={handlePauseDurationChange}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      
      <div className="flex-1">
        <DeckProgress
          current={progress.current}
          total={progress.total}
        />
      </div>
      
      <div className="flashcard-wrapper">
        <Flashcard 
          key={`${currentCard.id}-${currentAttempt}`}
          sentence={currentCard} 
          showAnswerByDefault={showAnswerByDefault || isAnswerRevealed}
          onNext={() => handleResponse('passed')}
          onPrevious={resetSession}
          onPlayAudio={playJapaneseAudio}
          isPlayingAudio={isPlaying}
          onRevealAnswer={revealAnswer}
          useFlipAnimation={useFlipAnimation}
        />
      </div>

      <div className="space-y-4">
        <SRSControls
          onResponse={handleSRSResponse}
          disabled={!isAnswerRevealed}
          className="mb-4"
        />

        <DeckNavigation
          onPrevious={resetSession}
          onNext={() => handleSRSResponse('passed')}
          onReveal={revealAnswer}
          isAnswerRevealed={isAnswerRevealed}
          isFirstCard={false}
          isLastCard={false}
          isListenMode={viewMode === 'listen'}
          onListenModeToggle={toggleListenMode}
        />
      </div>
      
      {showDebug && (
        <SRSDebugTable sentences={getSessionCards()} />
      )}
      
      <KeyboardShortcutsInfo />
    </div>
  );
}