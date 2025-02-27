// Audio player utility for handling audio playback

// Debug flag - set to true to enable debug logs
const DEBUG = true;

// Function to log debug messages
function debugLog(...args: any[]) {
  if (DEBUG) {
    console.log('[AUDIO PLAYER]', ...args);
  }
}

// Keep track of currently playing audio elements
let currentAudio: HTMLAudioElement | null = null;

// Flag to track if audio is currently playing
let isAudioPlaying = false;

// Queue for sequential audio playback
interface AudioQueueItem {
  src: string;
  onEnded?: () => void;
}

let audioQueue: AudioQueueItem[] = [];
let isProcessingQueue = false;

/**
 * Play an audio file
 * @param src The source URL of the audio file
 * @param onEnded Optional callback to execute when audio playback ends
 * @returns Promise that resolves when audio finishes playing or rejects if there's an error
 */
export function playAudio(src: string, onEnded?: () => void): Promise<void> {
  debugLog('playAudio called with src:', src);
  
  // If audio is already playing, stop it first to prevent overlapping
  if (isAudioPlaying) {
    debugLog('Audio already playing, stopping it first');
    stopAudio();
  }
  
  return new Promise((resolve, reject) => {
    try {
      // Create a new audio element
      debugLog('Creating new Audio element');
      const audio = new Audio(src);
      
      // Set up event listeners before assigning to currentAudio
      // to prevent race conditions
      
      // Handle canplaythrough event
      const canPlayHandler = () => {
        debugLog('Audio can play through, starting playback');
        isAudioPlaying = true;
        
        audio.play()
          .then(() => {
            debugLog('Audio playback started successfully');
            // We don't resolve here - we'll resolve when the audio ends
          })
          .catch(error => {
            debugLog('Error starting audio playback:', error);
            console.error('Error playing audio:', error);
            isAudioPlaying = false;
            
            // Only reset currentAudio if it's still this audio element
            if (currentAudio === audio) {
              currentAudio = null;
            }
            
            reject(error);
          });
      };
      
      // Handle error event
      const errorHandler = (event: Event) => {
        const error = (event as ErrorEvent).error || new Error('Unknown audio error');
        debugLog('Error loading audio:', error);
        console.error('Error loading audio:', error);
        isAudioPlaying = false;
        
        // Only reset currentAudio if it's still this audio element
        if (currentAudio === audio) {
          currentAudio = null;
        }
        
        reject(error);
      };
      
      // Handle ended event
      const endedHandler = () => {
        debugLog('Audio playback ended');
        isAudioPlaying = false;
        
        // Only reset currentAudio if it's still this audio element
        if (currentAudio === audio) {
          currentAudio = null;
        }
        
        if (onEnded) {
          debugLog('Calling onEnded callback');
          onEnded();
        }
        
        resolve();
      };
      
      // Add event listeners
      audio.addEventListener('canplaythrough', canPlayHandler, { once: true });
      audio.addEventListener('error', errorHandler, { once: true });
      audio.addEventListener('ended', endedHandler, { once: true });
      
      // Now that all listeners are set up, assign to currentAudio
      currentAudio = audio;
      
      // Start loading the audio
      debugLog('Starting to load audio');
      audio.load();
      
      // Add a safety timeout in case the audio never loads or plays
      const safetyTimeout = setTimeout(() => {
        // If we're still waiting for this audio to play after 10 seconds,
        // something is wrong - reject the promise
        if (currentAudio === audio && !audio.ended) {
          debugLog('Safety timeout triggered - audio never played or completed');
          stopAudio();
          reject(new Error('Audio playback timed out'));
        }
      }, 10000); // 10 second timeout
      
      // Clean up the safety timeout when audio ends or errors
      const cleanupTimeout = () => clearTimeout(safetyTimeout);
      audio.addEventListener('ended', cleanupTimeout, { once: true });
      audio.addEventListener('error', cleanupTimeout, { once: true });
      
    } catch (error) {
      debugLog('Unexpected error in playAudio:', error);
      console.error('Unexpected error in playAudio:', error);
      isAudioPlaying = false;
      currentAudio = null;
      reject(error);
    }
  });
}

/**
 * Stop any currently playing audio
 */
export function stopAudio(): void {
  if (currentAudio) {
    debugLog('Stopping audio playback');
    try {
      // Save a reference to the current audio before nullifying it
      const audio = currentAudio;
      
      // Reset state first to prevent race conditions
      currentAudio = null;
      isAudioPlaying = false;
      
      // Now stop the audio
      audio.pause();
      audio.currentTime = 0;
      
      // Remove all event listeners to prevent memory leaks
      audio.oncanplaythrough = null;
      audio.onerror = null;
      audio.onended = null;
      
      debugLog('Audio stopped successfully');
    } catch (error) {
      debugLog('Error stopping audio:', error);
      console.error('Error stopping audio:', error);
      // Reset state even if there's an error
      currentAudio = null;
      isAudioPlaying = false;
    }
  } else {
    debugLog('No audio to stop');
  }
}

/**
 * Add an audio file to the playback queue
 * @param src The source URL of the audio file
 * @param onEnded Optional callback to execute when this specific audio playback ends
 */
export function queueAudio(src: string, onEnded?: () => void): void {
  debugLog('Queueing audio:', src);
  audioQueue.push({ src, onEnded });
  
  // Start processing the queue if not already processing
  if (!isProcessingQueue && !isAudioPlaying) {
    debugLog('Starting queue processing');
    processAudioQueue();
  } else {
    debugLog('Queue already being processed or audio is playing');
  }
}

/**
 * Clear the audio queue and stop any currently playing audio
 */
export function clearAudioQueue(): void {
  debugLog('Clearing audio queue');
  audioQueue = [];
  stopAudio();
  isProcessingQueue = false;
}

/**
 * Process the audio queue sequentially
 */
function processAudioQueue(): void {
  if (audioQueue.length === 0) {
    debugLog('Audio queue empty, stopping processing');
    isProcessingQueue = false;
    return;
  }
  
  if (isAudioPlaying) {
    debugLog('Audio is currently playing, waiting to process queue');
    isProcessingQueue = true;
    return;
  }
  
  isProcessingQueue = true;
  const nextItem = audioQueue.shift();
  
  if (nextItem) {
    debugLog('Processing next item in queue:', nextItem.src);
    playAudio(nextItem.src, nextItem.onEnded)
      .then(() => {
        debugLog('Audio completed, processing next item');
        // Process the next item in the queue only after current audio finishes
        processAudioQueue();
      })
      .catch(() => {
        debugLog('Error playing audio, skipping to next item');
        // If there's an error, continue with the next item
        processAudioQueue();
      });
  }
}

/**
 * Pause for a specified duration
 * @param ms Duration to pause in milliseconds
 * @returns Promise that resolves after the specified duration
 */
export function pause(ms: number): Promise<void> {
  debugLog('Pausing for', ms, 'ms');
  return new Promise(resolve => {
    setTimeout(() => {
      debugLog('Pause completed');
      resolve();
    }, ms);
  });
}

/**
 * Play a sequence of audio files with pauses in between
 * @param sequence Array of objects with src and pauseAfter properties
 * @param onComplete Callback to execute when the entire sequence completes
 * @returns Promise that resolves when the entire sequence completes
 */
export function playSequence(
  sequence: Array<{ src: string; pauseAfter: number }>,
  onComplete?: () => void
): Promise<void> {
  debugLog('Playing sequence of', sequence.length, 'audio files');
  
  // Clear any existing queue
  clearAudioQueue();
  
  // Return a promise that resolves when the entire sequence is complete
  return new Promise<void>(async (resolve) => {
    try {
      // Play each audio file in sequence, waiting for each to complete
      for (const { src, pauseAfter } of sequence) {
        // Skip if we're not in a valid state to play audio
        if (!src) {
          debugLog('Skipping invalid audio source in sequence');
          continue;
        }
        
        debugLog('Playing sequence item:', src);
        
        // Make sure any previous audio is stopped
        stopAudio();
        
        // Play the audio and wait for it to complete
        await playAudio(src);
        
        debugLog('Pausing for', pauseAfter, 'ms');
        // Wait for the specified pause duration
        await pause(pauseAfter);
      }
      
      debugLog('Sequence completed');
      // Execute the onComplete callback when the sequence finishes
      if (onComplete) {
        debugLog('Calling onComplete callback');
        onComplete();
      }
      
      resolve();
    } catch (error) {
      debugLog('Error in audio sequence:', error);
      console.error('Error in audio sequence:', error);
      // Resolve anyway to prevent hanging
      resolve();
    }
  });
} 