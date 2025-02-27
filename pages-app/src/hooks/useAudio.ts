import { useState, useEffect, useCallback } from 'react';
import { 
  audioService, 
  AudioState, 
  AudioQueueItem,
  AudioEventType
} from '../utils/audioService';

// Debug flag
const DEBUG = true;
function debugLog(...args: any[]) {
  if (DEBUG) {
    console.log('[USE_AUDIO HOOK]', ...args);
  }
}

// Custom hook for using the audio service in React components
export function useAudio() {
  debugLog('useAudio hook initializing');
  
  // Track audio state in React state
  const [audioState, setAudioState] = useState<AudioState>(() => {
    const initialState = audioService.getState();
    debugLog('Initial audio state:', initialState);
    return initialState;
  });

  // Subscribe to audio state changes
  useEffect(() => {
    debugLog('Setting up audio state change subscription');
    const unsubscribe = audioService.subscribe('stateChange', (state) => {
      debugLog('Audio state changed:', state);
      setAudioState(state);
    });
    
    // Cleanup subscription on unmount
    return () => {
      debugLog('Cleaning up audio state subscription');
      unsubscribe();
    };
  }, []);

  // Play audio
  const play = useCallback((src: string): Promise<void> => {
    debugLog('play() called with src:', src);
    return audioService.play(src).then(() => {
      debugLog('play() promise resolved successfully');
    }).catch(error => {
      debugLog('play() promise rejected with error:', error);
      throw error;
    });
  }, []);

  // Stop audio
  const stop = useCallback(() => {
    debugLog('stop() called');
    audioService.stop();
  }, []);

  // Pause audio
  const pause = useCallback(() => {
    debugLog('pause() called');
    audioService.pause();
  }, []);

  // Resume audio
  const resume = useCallback(() => {
    debugLog('resume() called');
    audioService.resume();
  }, []);

  // Queue audio
  const queueAudio = useCallback((item: AudioQueueItem) => {
    debugLog('queueAudio() called with item:', item);
    audioService.queueAudio(item);
  }, []);

  // Queue a sequence of audio items
  const queueSequence = useCallback((items: AudioQueueItem[]) => {
    debugLog('queueSequence() called with items:', items.length);
    audioService.queueAudioSequence(items);
  }, []);

  // Clear the audio queue
  const clearQueue = useCallback(() => {
    debugLog('clearQueue() called');
    audioService.clearQueue();
  }, []);

  // Set listen mode
  const setListenMode = useCallback((isListenMode: boolean) => {
    debugLog('setListenMode() called with:', isListenMode);
    audioService.setListenMode(isListenMode);
  }, []);

  // Wait for a specified duration
  const wait = useCallback((ms: number): Promise<void> => {
    debugLog('wait() called with ms:', ms);
    return audioService.wait(ms);
  }, []);

  // Subscribe to a specific audio event
  const subscribe = useCallback((eventType: AudioEventType, listener: (state: AudioState) => void) => {
    debugLog('subscribe() called for event type:', eventType);
    return audioService.subscribe(eventType, listener);
  }, []);

  // Create a sequence for listen mode
  const createListenModeSequence = useCallback((
    japaneseAudioSrc: string | undefined,
    englishAudioSrc: string | undefined,
    pauseDuration: number,
    onJapaneseComplete?: () => void,
    onEnglishComplete?: () => void
  ): AudioQueueItem[] => {
    debugLog('createListenModeSequence() called with:', { 
      japaneseAudioSrc, 
      englishAudioSrc, 
      pauseDuration 
    });
    
    const sequence: AudioQueueItem[] = [];
    
    // Add Japanese audio if available
    if (japaneseAudioSrc) {
      sequence.push({
        src: japaneseAudioSrc,
        pauseAfter: pauseDuration,
        onComplete: () => {
          setTimeout(() => {
            debugLog('Japanese audio onComplete callback executing');
            if (onJapaneseComplete) onJapaneseComplete();
          }, pauseDuration);
        }
      });
    }
    
    // Add English audio if available
    if (englishAudioSrc) {
      sequence.push({
        src: englishAudioSrc,
        pauseAfter: pauseDuration,
        onComplete: () => {
          debugLog('English audio onComplete callback executing');
          if (onEnglishComplete) onEnglishComplete();
        }
      });
    }
    
    debugLog('Created listen mode sequence with', sequence.length, 'items');
    return sequence;
  }, []);

  debugLog('useAudio hook returning functions and state');
  
  return {
    audioState,
    play,
    stop,
    pause,
    resume,
    queueAudio,
    queueSequence,
    clearQueue,
    setListenMode,
    wait,
    subscribe,
    createListenModeSequence,
    isPlaying: audioState.isPlaying,
    isPaused: audioState.isPaused,
    isListenMode: audioState.isListenMode,
    currentSrc: audioState.currentSrc
  };
} 