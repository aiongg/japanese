import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDeck } from '../context/DeckContext';
import Flashcard from './Flashcard';
import { ViewMode, AudioSettings } from '../types';
import { useAudio } from '../hooks/useAudio';

// Debug flag - set to true to enable debug logs
const DEBUG = true;

// Function to log debug messages
function debugLog(...args: any[]) {
  if (DEBUG) {
    console.log('[DECKVIEW DEBUG]', ...args);
  }
}

// Default audio settings
const DEFAULT_AUDIO_SETTINGS: AudioSettings = {
  autoPlayJapanese: true,
  autoPlayEnglish: true,
  pauseDuration: 2000 // 2 seconds pause between audio files
};

export default function DeckView() {
  const { deckId } = useParams<{ deckId: string }>();
  const { currentDeck, loading, error, loadDeck } = useDeck();
  
  // State for deck navigation
  const [currentIndex, setCurrentIndex] = useState(0);
  const [randomMode, setRandomMode] = useState(false);
  const [randomIndices, setRandomIndices] = useState<number[]>([]);
  
  // State for flashcard display
  const [showAnswerByDefault, setShowAnswerByDefault] = useState(false);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);
  
  // State for audio and view mode
  const [viewMode, setViewMode] = useState<ViewMode>('normal');
  const [audioSettings, setAudioSettings] = useState<AudioSettings>(DEFAULT_AUDIO_SETTINGS);
  const [listenModePaused, setListenModePaused] = useState(false);
  
  // Refs to track card changes and prevent infinite loops
  const lastSentenceIdRef = useRef<number | null>(null);
  const isAutoPlayingRef = useRef<boolean>(false);
  
  // Use our custom audio hook
  const { 
    isPlaying, 
    play,
    setListenMode,
    queueSequence,
    clearQueue,
    stop,
    createListenModeSequence,
    subscribe,
    pause,
    resume
  } = useAudio();
  
  // Get the current sentence
  const getCurrentSentence = useCallback(() => {
    if (!currentDeck) return null;
    const actualIndex = randomMode ? randomIndices[currentIndex] : currentIndex;
    return currentDeck.sentences[actualIndex];
  }, [currentDeck, currentIndex, randomMode, randomIndices]);
  
  // Load the deck when deckId changes
  useEffect(() => {
    if (deckId) {
      loadDeck(deckId);
      setCurrentIndex(0);
      lastSentenceIdRef.current = null;
    }
  }, [deckId, loadDeck]);
  
  // Generate random indices when randomMode changes
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
      lastSentenceIdRef.current = null;
    }
  }, [randomMode, currentDeck]);
  
  // Reset the current index when the deck changes
  useEffect(() => {
    if (currentDeck) {
      setCurrentIndex(0);
      setIsAnswerRevealed(showAnswerByDefault);
      lastSentenceIdRef.current = null;
    }
  }, [currentDeck?.id, showAnswerByDefault]);
  
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
    listenModePaused
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
  
  // Toggle pause in listen mode
  const toggleListenModePause = useCallback(() => {
    debugLog('Toggling listen mode pause:', !listenModePaused);
    
    if (listenModePaused) {
      // If we're resuming from pause
      setListenModePaused(false);
      debugLog('Resuming listen mode sequence');
      
      // If nothing is playing, start a new sequence
      if (!isPlaying) {
        // We don't want to restart the current card if it was already played
        // So we'll only start a new sequence if we need to
        const currentSentence = getCurrentSentence();
        if (currentSentence && currentSentence.japaneseAudioPath) {
          // Only start a new sequence if we're not already playing
          debugLog('Starting new sequence on resume');
          startListenModeSequence();
        }
      } else {
        // If audio is paused, resume it
        resume();
      }
    } else {
      // If we're pausing
      setListenModePaused(true);
      debugLog('Pausing listen mode sequence');
      
      // Pause any playing audio but don't clear the queue
      pause();
    }
  }, [listenModePaused, isPlaying, getCurrentSentence, pause, resume, startListenModeSequence]);
  
  // Play Japanese audio for the current sentence
  const playJapaneseAudio = useCallback(async () => {
    if (!currentDeck) return;
    
    const currentSentence = getCurrentSentence();
    
    if (currentSentence?.japaneseAudioPath && !isPlaying) {
      try {
        debugLog('Playing Japanese audio', currentSentence.japaneseAudioPath);
        await play(currentSentence.japaneseAudioPath);
        debugLog('Japanese audio playback completed');
      } catch (error) {
        console.error('Error playing audio:', error);
        debugLog('Error playing audio:', error);
      }
    } else if (isPlaying) {
      debugLog('Ignoring audio play request - already playing audio');
    }
  }, [currentDeck, isPlaying, play, getCurrentSentence]);
  
  // Auto-play audio when sentence changes if autoPlayJapanese is enabled and not in listen mode
  useEffect(() => {
    if (!currentDeck || viewMode !== 'normal' || !audioSettings.autoPlayJapanese) {
      return;
    }
    
    const currentSentence = getCurrentSentence();
    if (!currentSentence || !currentSentence.japaneseAudioPath) return;
    
    // When currentIndex changes, play the audio once
    debugLog('Auto-play check', {
      currentIndex,
      sentenceId: currentSentence.id,
      lastSentenceId: lastSentenceIdRef.current
    });
    
    // Only play audio when the sentence changes (not on every render)
    if (lastSentenceIdRef.current !== currentSentence.id) {
      debugLog('Auto-playing Japanese audio for new card', {
        sentenceId: currentSentence.id,
        audioPath: currentSentence.japaneseAudioPath,
        lastSentenceId: lastSentenceIdRef.current
      });
      
      // Update the last sentence ID
      lastSentenceIdRef.current = currentSentence.id;
      
      // Prevent multiple auto-plays
      if (!isAutoPlayingRef.current) {
        isAutoPlayingRef.current = true;
        
        // Use a small timeout to ensure we don't conflict with other audio operations
        const timeoutId = setTimeout(() => {
          playJapaneseAudio().finally(() => {
            isAutoPlayingRef.current = false;
          });
        }, 50);
        
        // Clean up timeout if component unmounts or dependencies change
        return () => clearTimeout(timeoutId);
      }
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
    
    // If switching to normal mode, stop any playing audio
    if (viewMode === 'normal') {
      debugLog('Switching to normal mode');
      clearQueue();
      stop();
    }
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
          if (viewMode === 'listen' && !listenModePaused && currentIndex < (currentDeck?.sentences.length || 0) - 1) {
            goToNext();
          }
        }, audioSettings.pauseDuration);
      }
    });
    
    return unsubscribe;
  }, [subscribe, viewMode, audioSettings.pauseDuration, currentIndex, currentDeck?.sentences.length, listenModePaused]);
  
  // Navigation functions
  const goToNext = useCallback(() => {
    if (currentDeck && currentIndex < currentDeck.sentences.length - 1) {
      debugLog('Going to next card');
      setCurrentIndex(prev => prev + 1);
      setIsAnswerRevealed(showAnswerByDefault);
      
      // If in listen mode, the sequence will be started by the effect that watches currentIndex
    }
  }, [currentDeck, currentIndex, showAnswerByDefault]);
  
  // Effect to start listen mode sequence when currentIndex changes
  useEffect(() => {
    if (viewMode === 'listen' && currentDeck && !listenModePaused) {
      // We need a small delay to ensure state updates before starting the sequence
      const timeoutId = setTimeout(() => {
        startListenModeSequence();
      }, 50);
      
      return () => clearTimeout(timeoutId);
    }
  }, [viewMode, currentDeck, currentIndex, startListenModeSequence, listenModePaused]);
  
  const goToPrevious = useCallback(() => {
    if (currentIndex > 0) {
      debugLog('Going to previous card');
      setCurrentIndex(prev => prev - 1);
      setIsAnswerRevealed(showAnswerByDefault);
      
      // If in listen mode, the sequence will be started by the effect that watches currentIndex
    }
  }, [currentIndex, showAnswerByDefault]);
  
  // Handle card interaction (tap or keyboard)
  const handleCardInteraction = useCallback(() => {
    // In listen mode, tapping should pause/resume the sequence
    if (viewMode === 'listen') {
      toggleListenModePause();
      return;
    }
    
    if (showAnswerByDefault || isAnswerRevealed) {
      // If answers are shown by default or answer is already revealed, go to next card
      goToNext();
    } else {
      // If answer is hidden, reveal it
      setIsAnswerRevealed(true);
    }
  }, [showAnswerByDefault, isAnswerRevealed, goToNext, viewMode, toggleListenModePause]);
  
  // Update audio settings
  const updateAudioSettings = useCallback((updates: Partial<AudioSettings>) => {
    setAudioSettings(prev => ({ ...prev, ...updates }));
  }, []);
  
  // Toggle auto-play setting
  const toggleAutoPlay = useCallback(() => {
    updateAudioSettings({ 
      autoPlayJapanese: !audioSettings.autoPlayJapanese 
    });
    
    // Reset the last sentence ID to allow auto-play to trigger again
    if (!audioSettings.autoPlayJapanese) {
      lastSentenceIdRef.current = null;
    }
  }, [audioSettings.autoPlayJapanese, updateAudioSettings]);
  
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
  
  // Adjust pause duration
  const handlePauseDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    updateAudioSettings({ pauseDuration: value });
  };
  
  // Convert milliseconds to seconds for display
  const pauseDurationInSeconds = audioSettings.pauseDuration / 1000;
  
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
          
          <button 
            className={`btn ${audioSettings.autoPlayJapanese ? '' : 'btn-secondary'}`}
            onClick={toggleAutoPlay}
          >
            {audioSettings.autoPlayJapanese ? 'Auto-Play On' : 'Auto-Play Off'}
          </button>
          
          <button 
            className={`btn ${viewMode === 'listen' ? '' : 'btn-secondary'}`}
            onClick={toggleListenMode}
          >
            {viewMode === 'listen' ? '🎧 Exit Listen Mode' : '🎧 Listen Mode'}
          </button>
          
          {viewMode === 'listen' && (
            <button 
              className={`btn ${!listenModePaused ? '' : 'btn-secondary'}`}
              onClick={toggleListenModePause}
            >
              {listenModePaused ? '▶️ Resume' : '⏸️ Pause'}
            </button>
          )}
        </div>
      </div>
      
      {viewMode === 'listen' && (
        <div className="audio-settings">
          <label>
            Delay: {pauseDurationInSeconds.toFixed(1)} seconds
            <input 
              type="range" 
              min="1000" 
              max="5000" 
              step="500" 
              value={audioSettings.pauseDuration} 
              onChange={handlePauseDurationChange}
            />
          </label>
        </div>
      )}
      
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
      
      <div className="flashcard-wrapper">
        <Flashcard 
          key={`${currentDeck.id}-${actualIndex}`}
          sentence={currentSentence} 
          showAnswerByDefault={showAnswerByDefault || isAnswerRevealed}
          onNext={handleCardInteraction}
          onPlayAudio={playJapaneseAudio}
          isPlayingAudio={isPlaying}
        />
      </div>
      
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