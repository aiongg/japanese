import { useState, useCallback, useEffect, TouchEvent } from 'react';

interface SwipeGesturesOptions {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onTap?: () => void;
  onFlipProgress?: (progress: number) => void;
  onFlipComplete?: () => void;
  shouldFlip?: boolean; // Whether to use flip animation for left swipe
  flipSensitivity?: number; // Controls how responsive the flip is to finger movement
  minSwipeDistance?: number; // Minimum distance to trigger a swipe action
  maxSwipeDistance?: number; // Maximum swipe distance before resistance
  resistance?: number; // Resistance factor for swipes beyond maxSwipeDistance
  useFlipAnimation?: boolean; // Whether to use flip animation (from useFlashcardState)
}

interface SwipeGesturesState {
  swipeOffset: number;
  flipProgress: number;
  isAnimating: boolean;
  isFlipping: boolean;
}

interface SwipeGesturesHandlers {
  handleTouchStart: (e: TouchEvent) => void;
  handleTouchMove: (e: TouchEvent) => void;
  handleTouchEnd: (e: TouchEvent) => void;
  resetSwipeState: () => void;
}

/**
 * Custom hook for handling swipe gestures with improved flip animation
 * 
 * @param options Configuration options for swipe gestures
 * @returns [state, handlers] - Current swipe state and event handlers
 */
export function useSwipeGestures(options: SwipeGesturesOptions): [SwipeGesturesState, SwipeGesturesHandlers] {
  const {
    onSwipeLeft,
    onSwipeRight,
    onTap,
    onFlipProgress,
    onFlipComplete,
    shouldFlip = false,
    flipSensitivity = 0.8, // Lower default value for more gradual flip
    minSwipeDistance = 50,
    maxSwipeDistance = 150,
    resistance = 0.5,
    useFlipAnimation = false
  } = options;

  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [flipProgress, setFlipProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  // Handle programmatic flip animation
  useEffect(() => {
    if (useFlipAnimation) {
      // Simulate a complete flip animation
      setIsFlipping(true);
      setFlipProgress(-180);
      setIsAnimating(true);
      
      // Reset after animation completes
      const timeoutId = setTimeout(() => {
        setIsFlipping(false);
        setFlipProgress(0);
        setIsAnimating(false);
      }, 600);
      
      return () => clearTimeout(timeoutId);
    }
  }, [useFlipAnimation]);

  // Update screen width on resize
  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (useFlipAnimation) return; // Prevent interaction during programmatic flip
    
    setTouchStartX(e.touches[0].clientX);
    setIsAnimating(false);
  }, [useFlipAnimation]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (touchStartX === null || (isFlipping && isAnimating) || useFlipAnimation) return;
    
    const touchCurrentX = e.touches[0].clientX;
    const diff = touchCurrentX - touchStartX;
    
    // For flip animation, calculate progress as percentage of screen width
    // This makes the animation more consistent across different device sizes
    if (diff < 0 && shouldFlip) {
      // Calculate flip progress as percentage of screen width (0-100%)
      const percentageOfScreen = Math.min(Math.abs(diff) / (screenWidth * 0.5), 1);
      // Convert to degrees (0-180) with sensitivity adjustment
      const newFlipProgress = percentageOfScreen * 180 * flipSensitivity;
      
      setFlipProgress(-newFlipProgress); // Negative for correct flip direction
      setIsFlipping(true);
      setSwipeOffset(0);
      
      // Notify parent component of flip progress
      if (onFlipProgress) {
        onFlipProgress(newFlipProgress);
      }
    } else {
      // For regular swipes, apply resistance beyond maxSwipeDistance
      let newOffset;
      if (Math.abs(diff) > maxSwipeDistance) {
        const extra = Math.abs(diff) - maxSwipeDistance;
        newOffset = Math.sign(diff) * (maxSwipeDistance + extra * resistance);
      } else {
        newOffset = diff;
      }
      
      setSwipeOffset(newOffset);
      setIsFlipping(false);
      setFlipProgress(0);
    }
  }, [
    touchStartX, 
    isFlipping, 
    isAnimating, 
    shouldFlip, 
    onFlipProgress, 
    flipSensitivity, 
    maxSwipeDistance, 
    resistance, 
    screenWidth,
    useFlipAnimation
  ]);

  const handleTouchEnd = useCallback((e: TouchEvent) => {
    if (touchStartX === null || useFlipAnimation) return;
    
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchEndX - touchStartX;
    
    // Handle flip completion
    if (isFlipping && shouldFlip) {
      if (Math.abs(flipProgress) > 90) {
        // Complete the flip animation with a slightly longer duration
        setFlipProgress(-180);
        setIsAnimating(true);
       
        const handleTransitionEnd = () => {
          if (onFlipComplete) onFlipComplete();
          if (onSwipeLeft) onSwipeLeft();

          setIsFlipping(false);
          setFlipProgress(0);
          setIsAnimating(false);
        }

        document.addEventListener('transitionend', handleTransitionEnd);
      } else {
        // Cancel the flip animation
        setFlipProgress(0);
        setIsAnimating(true);
        
        // Reset animation state after spring back
        setTimeout(() => {
          setIsFlipping(false);
          setIsAnimating(false);
        }, 300);
      }
    } 
    // Handle swipe right
    else if (diff > minSwipeDistance) {
      setIsAnimating(true);
      setSwipeOffset(screenWidth);
      
      // Wait for animation to complete before action
      setTimeout(() => {
        if (onSwipeRight) onSwipeRight();
        setSwipeOffset(0);
        setIsAnimating(false);
      }, 300);
    } 
    // Handle swipe left (when not flipping)
    else if (diff < -minSwipeDistance && !shouldFlip) {
      setIsAnimating(true);
      setSwipeOffset(-screenWidth);
      
      // Wait for animation to complete before action
      setTimeout(() => {
        if (onSwipeLeft) onSwipeLeft();
        setSwipeOffset(0);
        setIsAnimating(false);
      }, 300);
    } 
    // Handle tap or small swipe (reset position)
    else {
      setIsAnimating(true);
      setSwipeOffset(0);
      
      // If it's a tap (not a swipe), trigger tap handler
      if (Math.abs(diff) < 10 && onTap) {
        onTap();
      }
      
      // Reset animation state after spring back
      setTimeout(() => {
        setIsAnimating(false);
      }, 300);
    }
    
    setTouchStartX(null);
  }, [
    touchStartX, 
    isFlipping, 
    shouldFlip, 
    flipProgress, 
    minSwipeDistance, 
    onSwipeLeft, 
    onSwipeRight, 
    onTap, 
    screenWidth,
    useFlipAnimation
  ]);

  const resetSwipeState = useCallback(() => {
    setSwipeOffset(0);
    setFlipProgress(0);
    setIsAnimating(false);
    setIsFlipping(false);
  }, []);

  return [
    { swipeOffset, flipProgress, isAnimating, isFlipping },
    { handleTouchStart, handleTouchMove, handleTouchEnd, resetSwipeState }
  ];
} 