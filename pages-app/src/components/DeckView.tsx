import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useDeck } from '../context/DeckContext';
import Flashcard from './Flashcard';
import ProgressBar from './ProgressBar';
import NavigationButtons from './NavigationButtons';
import StudyModeControls from './StudyModeControls';
import AudioSettings from './AudioSettings';
import KeyboardShortcutsInfo from './KeyboardShortcutsInfo';
import { ViewMode, AudioSettings as AudioSettingsType } from '../types';
import { useAudio } from '../hooks/useAudio';
import { useDeckNavigation } from '../hooks/useDeckNavigation';
import { useFlashcardState } from '../hooks/useFlashcardState';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';

// Debug flag - set to true to enable debug logs
const DEBUG = true;

// Function to log debug messages
function debugLog(...args: any[]) {
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
  const [listenModePaused, setListenModePaused] = useState(false);
  
  // State for flashcard display
  const [showAnswerByDefault, setShowAnswerByDefault] = useState(false);
  
  // Refs to track view mode changes
  const prevViewModeRef = useRef<ViewMode>('normal');
  
  // Use our custom hooks
  const { 
    isPlaying, 
    play,
    setListenMode,
    queueSequence,
    clearQueue,
    stop,
    createListenModeSequence,
    subscribe
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
    toggleShowAnswerByDefault
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
  
  // Refs to track card changes and prevent infinite loops
  const lastSentenceIdRef = useRef<number | null>(null);
  const isAutoPlayingRef = useRef<boolean>(false);
  
  // Load the deck when deckId changes
  useEffect(() => {
    if (deckId) {
      loadDeck(deckId);
      lastSentenceIdRef.current = null;
      isAutoPlayingRef.current = false; // Reset auto-playing flag when loading a new deck
    }
  }, [deckId, loadDeck]);
  
  // Play Japanese audio for the current sentence
  const playJapaneseAudio = useCallback(async () => {
    debugLog('playJapaneseAudio called', {
      hasDeck: !!currentDeck,
      isPlaying
    });
    
    if (!currentDeck) {
      debugLog('playJapaneseAudio - no current deck, returning false');
      return false;
    }
    
    const currentSentence = getCurrentSentence();
    debugLog('playJapaneseAudio - got current sentence', {
      hasSentence: !!currentSentence,
      hasAudioPath: currentSentence?.japaneseAudioPath ? true : false,
      audioPath: currentSentence?.japaneseAudioPath
    });
    
    if (currentSentence?.japaneseAudioPath && !isPlaying) {
      try {
        debugLog('Playing Japanese audio', currentSentence.japaneseAudioPath);
        await play(currentSentence.japaneseAudioPath);
        debugLog('Japanese audio playback completed successfully');
        return true; // Indicate successful playback
      } catch (error) {
        console.error('Error playing audio:', error);
        debugLog('Error playing audio:', error);
        return false; // Indicate failed playback
      }
    } else if (isPlaying) {
      debugLog('Ignoring audio play request - already playing audio');
      return false; // Indicate no playback attempted
    } else {
      debugLog('No audio path available for current sentence');
      return false; // Indicate no playback attempted
    }
  }, [currentDeck, isPlaying, play, getCurrentSentence]);
  
  // Listen mode sequence
  const startListenModeSequence = useCallback(() => {
    if (!currentDeck || viewMode !== 'listen' || listenModePaused) {
      return;
    }
    
    const currentSentence = getCurrentSentence();
    if (!currentSentence) {
      debugLog('No current sentence found');
      return;
    }
    
    // Only start a new sequence if the sentence has changed
    if (lastSentenceIdRef.current === currentSentence.id) {
      debugLog('Skipping listen mode sequence - same sentence', { 
        currentSentenceId: currentSentence.id 
      });
      return;
    }
    
    debugLog('Starting listen mode sequence', { 
      currentIndex,
      sentenceId: currentSentence.id,
      lastSentenceId: lastSentenceIdRef.current
    });
    
    // Update the last sentence ID
    lastSentenceIdRef.current = currentSentence.id;
    
    // Clear any existing queue and stop any playing audio
    clearQueue();
    stop();
    
    // Hide the answer initially
    setIsAnswerRevealed(false);
    
    // Create a sequence of audio files to play
    const sequence = createListenModeSequence(
      currentSentence.japaneseAudioPath,
      currentSentence.englishAudioPath,
      audioSettings.pauseDuration,
      // Callback when Japanese audio completes
      () => {
        debugLog('Japanese audio completed, revealing answer');
        setIsAnswerRevealed(true);
      },
      // Callback when English audio completes
      () => {
        debugLog('English audio completed');
        // The advance to next card is handled by the 'complete' event subscription
      }
    );
    
    // Queue the sequence
    if (sequence.length > 0) {
      debugLog('Queueing audio sequence', sequence);
      queueSequence(sequence);
    } else {
      debugLog('No audio to play in sequence');
    }
  }, [
    currentDeck, 
    viewMode, 
    currentIndex, 
    clearQueue, 
    stop, 
    createListenModeSequence, 
    audioSettings.pauseDuration, 
    queueSequence,
    getCurrentSentence,
    listenModePaused,
    setIsAnswerRevealed
  ]);
  
  // Toggle listen mode on/off
  const toggleListenMode = useCallback(() => {
    if (viewMode === 'listen') {
      // Switch to normal mode
      debugLog('Toggling from listen mode to normal mode');
      setViewMode('normal');
      setListenModePaused(false);
    } else {
      // Switch to listen mode
      debugLog('Toggling from normal mode to listen mode');
      setViewMode('listen');
      setListenModePaused(false);
    }
  }, [viewMode]);
  
  // Auto-play audio when sentence changes if autoPlayJapanese is enabled and not in listen mode
  useEffect(() => {
    if (!currentDeck || viewMode !== 'normal' || !audioSettings.autoPlayJapanese) {
      debugLog('Auto-play skipped - conditions not met', {
        hasDeck: !!currentDeck,
        viewMode,
        autoPlayEnabled: audioSettings.autoPlayJapanese
      });
      return;
    }
    
    const currentSentence = getCurrentSentence();
    if (!currentSentence || !currentSentence.japaneseAudioPath) {
      debugLog('Auto-play skipped - no sentence or audio path', {
        hasSentence: !!currentSentence,
        hasAudioPath: currentSentence?.japaneseAudioPath ? true : false
      });
      return;
    }
    
    // When currentIndex changes, play the audio once
    debugLog('Auto-play check', {
      currentIndex,
      sentenceId: currentSentence.id,
      lastSentenceId: lastSentenceIdRef.current,
      isAutoPlaying: isAutoPlayingRef.current
    });
    
    // Add a special case for initial load (when lastSentenceIdRef.current is null)
    // or when the sentence changes
    const isInitialLoad = lastSentenceIdRef.current === null;
    const isSentenceChanged = lastSentenceIdRef.current !== currentSentence.id;
    
    if (isInitialLoad || isSentenceChanged) {
      debugLog('Auto-playing Japanese audio', {
        reason: isInitialLoad ? 'initial load' : 'sentence changed',
        sentenceId: currentSentence.id,
        audioPath: currentSentence.japaneseAudioPath,
        lastSentenceId: lastSentenceIdRef.current
      });
      
      // Update the last sentence ID
      lastSentenceIdRef.current = currentSentence.id;
      
      // Prevent multiple auto-plays
      if (!isAutoPlayingRef.current) {
        debugLog('Setting isAutoPlayingRef.current = true');
        isAutoPlayingRef.current = true;
        
        // Directly call playJapaneseAudio
        debugLog('Directly calling playJapaneseAudio');
        playJapaneseAudio()
          .then((success) => {
            debugLog('Auto-play completed', { success });
            isAutoPlayingRef.current = false;
          })
          .catch(error => {
            debugLog('Auto-play failed with error', error);
            isAutoPlayingRef.current = false;
          });
      } else {
        debugLog('Auto-play skipped - already auto-playing');
      }
    } else {
      debugLog('Auto-play skipped - same sentence', {
        currentSentenceId: currentSentence.id,
        lastSentenceId: lastSentenceIdRef.current
      });
    }
  }, [currentDeck, currentIndex, viewMode, audioSettings.autoPlayJapanese, playJapaneseAudio, getCurrentSentence]);
  
  // Handle view mode changes
  useEffect(() => {
    // Update listen mode in audio service
    setListenMode(viewMode === 'listen');
    
    // If switching to listen mode, start the sequence
    if (viewMode === 'listen' && currentDeck) {
      debugLog('Switching to listen mode, starting sequence');
      // Reset the last sentence ID to force a new sequence
      lastSentenceIdRef.current = null;
      setListenModePaused(false);
      startListenModeSequence();
    }
    
    // If switching FROM listen mode TO normal mode, stop any playing audio
    // This prevents stopping audio during initial component mount
    if (viewMode === 'normal' && prevViewModeRef.current === 'listen') {
      debugLog('Switching from listen mode to normal mode, stopping audio');
      clearQueue();
      stop();
    }
    
    // Update the previous view mode ref
    prevViewModeRef.current = viewMode;
  }, [viewMode, currentDeck, setListenMode, clearQueue, stop, startListenModeSequence]);
  
  // Subscribe to audio completion events to handle listen mode sequence
  useEffect(() => {
    // Subscribe to audio complete events
    const unsubscribe = subscribe('complete', (state) => {
      // If we're in listen mode and the queue is empty, we need to advance to the next card
      if (state.isListenMode && state.queue.length === 0 && viewMode === 'listen' && !listenModePaused) {
        debugLog('Audio sequence completed, advancing to next card');
        
        // Wait for the pause duration before advancing
        setTimeout(() => {
          if (viewMode === 'listen' && !listenModePaused && !isLastCard) {
            goToNext();
          }
        }, audioSettings.pauseDuration);
      }
    });
    
    return unsubscribe;
  }, [subscribe, viewMode, audioSettings.pauseDuration, listenModePaused, goToNext, isLastCard]);
  
  // Effect to start listen mode sequence when currentIndex changes
  useEffect(() => {
    if (viewMode === 'listen' && currentDeck && !listenModePaused) {
      debugLog('Listen mode sequence triggered by currentIndex change', {
        currentIndex,
        currentSentenceId: getCurrentSentence()?.id
      });
      
      // We need a small delay to ensure state updates before starting the sequence
      const timeoutId = setTimeout(() => {
        startListenModeSequence();
      }, 50);
      
      return () => clearTimeout(timeoutId);
    }
  }, [viewMode, currentDeck, currentIndex, startListenModeSequence, listenModePaused, getCurrentSentence]);
  
  // Use keyboard shortcuts
  useKeyboardShortcuts({
    onNext: goToNext,
    onPrevious: goToPrevious,
    onPlayAudio: playJapaneseAudio,
    onRevealAnswer: revealAnswer,
    isAnswerRevealed
  });
  
  // Toggle auto-play setting
  const toggleAutoPlay = useCallback(() => {
    setAudioSettings(prev => ({ 
      ...prev, 
      autoPlayJapanese: !prev.autoPlayJapanese 
    }));
    
    // Reset the last sentence ID to allow auto-play to trigger again
    if (!audioSettings.autoPlayJapanese) {
      lastSentenceIdRef.current = null;
    }
  }, [audioSettings.autoPlayJapanese]);
  
  // Adjust pause duration
  const handlePauseDurationChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setAudioSettings(prev => ({ ...prev, pauseDuration: value }));
  }, []);
  
  // Cleanup audio when component unmounts
  useEffect(() => {
    return () => {
      debugLog('Component unmounting, cleaning up audio');
      clearQueue();
      stop();
    };
  }, [clearQueue, stop]);
  
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
    <div className="container flashcard-container">
      <StudyModeControls
        randomMode={randomMode}
        showAnswerByDefault={showAnswerByDefault}
        autoPlayJapanese={audioSettings.autoPlayJapanese}
        viewMode={viewMode}
        onToggleRandomMode={toggleRandomMode}
        onToggleShowAnswerByDefault={toggleShowAnswerByDefault}
        onToggleAutoPlay={toggleAutoPlay}
        onToggleListenMode={toggleListenMode}
      />
      
      <AudioSettings
        pauseDuration={audioSettings.pauseDuration}
        onPauseDurationChange={handlePauseDurationChange}
        isListenMode={viewMode === 'listen'}
      />
      
      <ProgressBar
        currentIndex={currentIndex}
        totalCards={totalCards}
      />
      
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
      
      <NavigationButtons
        onPrevious={goToPrevious}
        onNext={goToNext}
        onReveal={revealAnswer}
        isAnswerRevealed={isAnswerRevealed}
        isFirstCard={isFirstCard}
        isLastCard={isLastCard}
      />
      
      <KeyboardShortcutsInfo
        isAnswerRevealed={isAnswerRevealed}
      />
    </div>
  );
}