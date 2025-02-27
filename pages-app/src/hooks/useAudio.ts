import { useState, useEffect, useCallback } from 'react';
import { 
  audioService, 
  AudioState, 
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

  debugLog('useAudio hook returning functions and state');
  
  return {
    audioState,
    play,
    stop,
    pause,
    resume,
    wait,
    subscribe,
    isPlaying: audioState.isPlaying,
    isPaused: audioState.isPaused,
    isListenMode: audioState.isListenMode,
    currentSrc: audioState.currentSrc
  };
} 