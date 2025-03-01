import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDeck } from '../hooks/useDeck';
import Flashcard from './Flashcard';
import { DeckProgress } from './DeckProgress';
import { DeckSettings } from './DeckSettings';
import { DeckNavigation } from './DeckNavigation';
import { Button } from './ui/button';
import { Icon } from './ui/icon';
import { ArrowLeft } from 'lucide-react';
import KeyboardShortcutsInfo from './KeyboardShortcutsInfo';
import { ViewMode, AudioSettings as AudioSettingsType } from '../types';
import { useAudio } from '../hooks/useAudio';
import { useDeckNavigation } from '../hooks/useDeckNavigation';
import { useFlashcardState } from '../hooks/useFlashcardState';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';
import { useListenMode } from '../hooks/useListenMode';

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
  const { currentDeck, loading, error, loadDeck } = useDeck();
  
  // State for audio and view mode
  const [viewMode, setViewMode] = useState<ViewMode>('normal');
  const [audioSettings, setAudioSettings] = useState<AudioSettingsType>(DEFAULT_AUDIO_SETTINGS);
  
  // State for flashcard display
  const [showAnswerByDefault, setShowAnswerByDefault] = useState(false);
  
  // Refs to track view mode changes
  const prevViewModeRef = useRef<ViewMode>('normal');
  
  // Use our custom hooks
  const { 
    isPlaying, 
    play,
    stop
  } = useAudio();
  
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
  
  // Use deck navigation hook
  const {
    currentIndex,
    randomMode,
    getCurrentSentence,
    goToNext,
    goToPrevious,
    toggleRandomMode,
    isFirstCard,
    isLastCard,
    actualIndex
  } = useDeckNavigation({
    deck: currentDeck,
    showAnswerByDefault,
    onAnswerReveal: setIsAnswerRevealed
  });
  
  // Use listen mode hook
  const {
    resetListenMode
  } = useListenMode({
    currentDeck,
    viewMode,
    getCurrentSentence,
    audioSettings,
    setIsAnswerRevealed,
    goToNext,
    isLastCard: currentIndex === (currentDeck?.sentences.length || 0) - 1,
  });
  
  // Load the deck when the component mounts or when the deckId changes
  useEffect(() => {
    if (deckId) {
      debugLog('Loading deck with ID:', deckId);
      loadDeck(deckId);
    }
  }, [deckId, loadDeck]);
  
  // Play Japanese audio
  const playJapaneseAudio = useCallback(() => {
    const currentSentence = getCurrentSentence();
    if (currentSentence?.japaneseAudioPath) {
      debugLog('Playing Japanese audio');
      play(currentSentence.japaneseAudioPath);
    }
  }, [getCurrentSentence, play]);
  
  // Auto-play audio when sentence changes if autoPlayJapanese is enabled and not in listen mode
  useEffect(() => {
    if (
      viewMode === 'normal' && 
      currentDeck && 
      audioSettings.autoPlayJapanese && 
      getCurrentSentence()?.japaneseAudioPath
    ) {
      playJapaneseAudio();
    }
  }, [currentDeck, currentIndex, viewMode, audioSettings.autoPlayJapanese, playJapaneseAudio, getCurrentSentence]);
  
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
    onNext: goToNext,
    onPrevious: goToPrevious,
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
  if (loading) {
    return <div className="loading">Loading deck...</div>;
  }
  
  if (error) {
    return <div className="error">Error loading deck: {error}</div>;
  }
  
  if (!currentDeck) {
    return <div className="error">Deck not found</div>;
  }
  
  const totalCards = currentDeck.sentences.length;
  
  // Safety check to ensure currentIndex is within bounds
  if (currentIndex >= totalCards) {
    return null; // Prevent rendering with invalid index
  }
  
  // Get the current sentence
  const currentSentence = getCurrentSentence();
  
  // Safety check to ensure currentSentence exists
  if (!currentSentence) {
    console.error('Sentence not found');
    return <div className="error">Error displaying flashcard</div>;
  }
  
  return (
    <div className="container flashcard-container space-y-6">
      <div className="flex items-start">
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
      </div>
      
      <div className="flex-1">
        <DeckProgress
          current={currentIndex + 1}
          total={totalCards}
        />
      </div>
      
      <div className="flashcard-wrapper">
        <Flashcard 
          key={`${currentDeck.id}-${actualIndex}`}
          sentence={currentSentence} 
          showAnswerByDefault={showAnswerByDefault || isAnswerRevealed}
          onNext={goToNext}
          onPrevious={goToPrevious}
          onPlayAudio={playJapaneseAudio}
          isPlayingAudio={isPlaying}
          onRevealAnswer={revealAnswer}
          useFlipAnimation={useFlipAnimation}
        />
      </div>

      <DeckNavigation
        onPrevious={goToPrevious}
        onNext={goToNext}
        onReveal={revealAnswer}
        isAnswerRevealed={isAnswerRevealed}
        isFirstCard={isFirstCard}
        isLastCard={isLastCard}
        isListenMode={viewMode === 'listen'}
        onListenModeToggle={toggleListenMode}
      />
      
      <DeckSettings
        autoPlayEnabled={audioSettings.autoPlayJapanese}
        onAutoPlayChange={toggleAutoPlay}
        randomModeEnabled={randomMode}
        onRandomModeChange={toggleRandomMode}
        pauseDuration={audioSettings.pauseDuration}
        onPauseDurationChange={handlePauseDurationChange}
      />
      
      <KeyboardShortcutsInfo />
    </div>
  );
}