import { useState, useEffect, useCallback } from 'react';
import { 
  audioService, 
  AudioState, 
  AudioQueueItem,
  AudioEventType
} from '../utils/audioService';

// Custom hook for using the audio service in React components
export function useAudio() {
  // Track audio state in React state
  const [audioState, setAudioState] = useState<AudioState>(audioService.getState());

  // Subscribe to audio state changes
  useEffect(() => {
    const unsubscribe = audioService.subscribe('stateChange', (state) => {
      setAudioState(state);
    });
    
    // Cleanup subscription on unmount
    return unsubscribe;
  }, []);

  // Play audio
  const play = useCallback((src: string): Promise<void> => {
    return audioService.play(src);
  }, []);

  // Stop audio
  const stop = useCallback(() => {
    audioService.stop();
  }, []);

  // Pause audio
  const pause = useCallback(() => {
    audioService.pause();
  }, []);

  // Resume audio
  const resume = useCallback(() => {
    audioService.resume();
  }, []);

  // Queue audio
  const queueAudio = useCallback((item: AudioQueueItem) => {
    audioService.queueAudio(item);
  }, []);

  // Queue a sequence of audio items
  const queueSequence = useCallback((items: AudioQueueItem[]) => {
    audioService.queueAudioSequence(items);
  }, []);

  // Clear the audio queue
  const clearQueue = useCallback(() => {
    audioService.clearQueue();
  }, []);

  // Set listen mode
  const setListenMode = useCallback((isListenMode: boolean) => {
    audioService.setListenMode(isListenMode);
  }, []);

  // Wait for a specified duration
  const wait = useCallback((ms: number): Promise<void> => {
    return audioService.wait(ms);
  }, []);

  // Subscribe to a specific audio event
  const subscribe = useCallback((eventType: AudioEventType, listener: (state: AudioState) => void) => {
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
    const sequence: AudioQueueItem[] = [];
    
    // Add Japanese audio if available
    if (japaneseAudioSrc) {
      sequence.push({
        src: japaneseAudioSrc,
        pauseAfter: pauseDuration,
        onComplete: () => {
          setTimeout(() => {
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
        onComplete: onEnglishComplete
      });
    }
    
    return sequence;
  }, []);

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