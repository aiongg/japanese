// Audio Service - A robust audio playback system with state management

// Types for audio service
export type AudioState = {
  isPlaying: boolean;
  currentSrc: string | null;
  isListenMode: boolean;
  isPaused: boolean;
  queue: AudioQueueItem[];
};

export type AudioQueueItem = {
  src: string;
  onStart?: () => void;
  onComplete?: () => void;
  pauseAfter?: number;
};

export type AudioEventType = 
  | 'play' 
  | 'pause' 
  | 'stop' 
  | 'complete' 
  | 'error' 
  | 'stateChange';

export type AudioEventListener = (state: AudioState) => void;

// Debug configuration
const DEBUG = true;
function debugLog(...args: any[]) {
  if (DEBUG) {
    console.log('[AUDIO SERVICE]', ...args);
  }
}

// Singleton audio service instance
class AudioService {
  private audio: HTMLAudioElement | null = null;
  private state: AudioState = {
    isPlaying: false,
    currentSrc: null,
    isListenMode: false,
    isPaused: false,
    queue: []
  };
  private listeners: Map<AudioEventType, Set<AudioEventListener>> = new Map();
  private timeoutId: number | null = null;
  private safetyTimeoutId: number | null = null;

  constructor() {
    debugLog('Audio service initialized');
  }

  // Get current state (immutable copy)
  getState(): AudioState {
    return { ...this.state };
  }

  // Subscribe to audio events
  subscribe(eventType: AudioEventType, listener: AudioEventListener): () => void {
    if (!this.listeners.has(eventType)) {
      this.listeners.set(eventType, new Set());
    }
    
    this.listeners.get(eventType)!.add(listener);
    
    // Return unsubscribe function
    return () => {
      const listeners = this.listeners.get(eventType);
      if (listeners) {
        listeners.delete(listener);
      }
    };
  }

  // Notify all listeners of a specific event type
  private notify(eventType: AudioEventType): void {
    const listeners = this.listeners.get(eventType);
    if (listeners) {
      const state = this.getState();
      listeners.forEach(listener => listener(state));
    }
    
    // Also notify state change listeners for all events
    if (eventType !== 'stateChange') {
      this.notify('stateChange');
    }
  }

  // Update state and notify listeners
  private setState(updates: Partial<AudioState>): void {
    this.state = { ...this.state, ...updates };
    this.notify('stateChange');
  }

  // Set listen mode
  setListenMode(isListenMode: boolean): void {
    if (this.state.isListenMode !== isListenMode) {
      debugLog(`Setting listen mode to ${isListenMode}`);
      this.setState({ isListenMode });
      
      // If turning off listen mode, clear the queue and stop any playing audio
      if (!isListenMode) {
        this.clearQueue();
        this.stop();
      }
    }
  }

  // Play audio
  play(src: string, options?: { onStart?: () => void, onComplete?: () => void }): Promise<void> {
    debugLog('Play requested:', src);
    
    // If already playing something, stop it first
    if (this.state.isPlaying) {
      this.stop();
    }
    
    return new Promise((resolve, reject) => {
      try {
        // Create new audio element
        this.audio = new Audio(src);
        
        // Set up event handlers
        this.audio.addEventListener('canplaythrough', () => {
          debugLog('Audio can play through, starting playback');
          
          if (this.audio) {
            this.setState({ 
              isPlaying: true, 
              currentSrc: src,
              isPaused: false
            });
            
            if (options?.onStart) {
              options.onStart();
            }
            
            this.notify('play');
            
            this.audio.play()
              .catch(error => {
                debugLog('Error starting playback:', error);
                this.setState({ 
                  isPlaying: false, 
                  currentSrc: null,
                  isPaused: false
                });
                this.notify('error');
                reject(error);
              });
            
            // Set safety timeout
            this.setSafetyTimeout();
          }
        }, { once: true });
        
        this.audio.addEventListener('ended', () => {
          debugLog('Audio playback ended');
          this.clearSafetyTimeout();
          
          this.setState({ 
            isPlaying: false, 
            currentSrc: null,
            isPaused: false
          });
          
          if (options?.onComplete) {
            options.onComplete();
          }
          
          this.notify('complete');
          resolve();
          
          // Process next item in queue if any
          this.processQueue();
        }, { once: true });
        
        this.audio.addEventListener('error', () => {
          const error = new Error('Audio playback error');
          debugLog('Audio error:', error);
          this.clearSafetyTimeout();
          
          this.setState({ 
            isPlaying: false, 
            currentSrc: null,
            isPaused: false
          });
          
          this.notify('error');
          reject(error);
          
          // Process next item in queue even if there was an error
          this.processQueue();
        }, { once: true });
        
        // Start loading the audio
        this.audio.load();
        
      } catch (error) {
        debugLog('Unexpected error in play:', error);
        this.setState({ 
          isPlaying: false, 
          currentSrc: null,
          isPaused: false
        });
        this.notify('error');
        reject(error);
      }
    });
  }

  // Pause audio
  pause(): void {
    if (this.audio && this.state.isPlaying && !this.state.isPaused) {
      debugLog('Pausing audio');
      this.audio.pause();
      this.setState({ isPaused: true });
      this.notify('pause');
    }
  }

  // Resume audio
  resume(): void {
    if (this.audio && this.state.isPaused) {
      debugLog('Resuming audio');
      this.audio.play()
        .then(() => {
          this.setState({ isPaused: false });
          this.notify('play');
        })
        .catch(error => {
          debugLog('Error resuming playback:', error);
          this.notify('error');
        });
    }
  }

  // Stop audio
  stop(): void {
    this.clearSafetyTimeout();
    
    if (this.audio) {
      debugLog('Stopping audio');
      
      try {
        this.audio.pause();
        this.audio.currentTime = 0;
        
        // Remove event listeners
        this.audio.oncanplaythrough = null;
        this.audio.onerror = null;
        this.audio.onended = null;
        
        this.setState({ 
          isPlaying: false, 
          currentSrc: null,
          isPaused: false
        });
        
        this.notify('stop');
      } catch (error) {
        debugLog('Error stopping audio:', error);
      }
      
      this.audio = null;
    }
  }

  // Add item to queue
  queueAudio(item: AudioQueueItem): void {
    debugLog('Queueing audio:', item.src);
    this.setState({ queue: [...this.state.queue, item] });
    
    // If not currently playing, start processing the queue
    if (!this.state.isPlaying) {
      this.processQueue();
    }
  }

  // Add multiple items to queue
  queueAudioSequence(items: AudioQueueItem[]): void {
    if (items.length === 0) return;
    
    debugLog('Queueing audio sequence:', items.length, 'items');
    this.setState({ queue: [...this.state.queue, ...items] });
    
    // If not currently playing, start processing the queue
    if (!this.state.isPlaying) {
      this.processQueue();
    }
  }

  // Clear the queue
  clearQueue(): void {
    debugLog('Clearing audio queue');
    this.setState({ queue: [] });
    
    // Clear any pending timeouts
    if (this.timeoutId !== null) {
      window.clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }

  // Process the next item in the queue
  private processQueue(): void {
    // If already playing or queue is empty, do nothing
    if (this.state.isPlaying || this.state.queue.length === 0) {
      return;
    }
    
    // Get the next item from the queue
    const [nextItem, ...remainingQueue] = this.state.queue;
    this.setState({ queue: remainingQueue });
    
    debugLog('Processing queue item:', nextItem.src);
    
    // Play the audio
    this.play(nextItem.src, {
      onStart: nextItem.onStart,
      onComplete: () => {
        if (nextItem.onComplete) {
          nextItem.onComplete();
        }
        
        // If there's a pause after this item, wait before processing the next item
        if (nextItem.pauseAfter && nextItem.pauseAfter > 0) {
          debugLog(`Pausing for ${nextItem.pauseAfter}ms before next item`);
          
          this.timeoutId = window.setTimeout(() => {
            this.timeoutId = null;
            this.processQueue();
          }, nextItem.pauseAfter);
        } else {
          // Otherwise process the next item immediately
          this.processQueue();
        }
      }
    }).catch(() => {
      // If there's an error, continue with the next item
      this.processQueue();
    });
  }

  // Set a safety timeout to prevent hanging if audio never completes
  private setSafetyTimeout(): void {
    this.clearSafetyTimeout();
    
    this.safetyTimeoutId = window.setTimeout(() => {
      debugLog('Safety timeout triggered - audio never completed');
      this.stop();
      this.processQueue(); // Continue with the next item
    }, 30000); // 30 second timeout
  }

  // Clear the safety timeout
  private clearSafetyTimeout(): void {
    if (this.safetyTimeoutId !== null) {
      window.clearTimeout(this.safetyTimeoutId);
      this.safetyTimeoutId = null;
    }
  }

  // Wait for a specified duration
  wait(ms: number): Promise<void> {
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    });
  }
}

// Create and export a singleton instance
export const audioService = new AudioService();

// Helper functions for common operations
export function playAudio(src: string): Promise<void> {
  return audioService.play(src);
}

export function stopAudio(): void {
  audioService.stop();
}

export function pauseAudio(): void {
  audioService.pause();
}

export function resumeAudio(): void {
  audioService.resume();
}

export function clearAudioQueue(): void {
  audioService.clearQueue();
}

export function queueAudio(src: string, pauseAfter?: number, onComplete?: () => void): void {
  audioService.queueAudio({ src, pauseAfter, onComplete });
}

export function setListenMode(isListenMode: boolean): void {
  audioService.setListenMode(isListenMode);
}

export function getAudioState(): AudioState {
  return audioService.getState();
}

export function waitFor(ms: number): Promise<void> {
  return audioService.wait(ms);
} 