import { useEffect, useState } from 'react';

export default function KeyboardShortcutsInfo() {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    // Simple mobile detection based on screen width and touch capability
    const checkIfMobile = () => {
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth <= 768;
      setIsMobile(isTouchDevice && isSmallScreen);
    };
    
    // Check on initial render
    checkIfMobile();
    
    // Add listener for window resize
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  return (
    <div className="keyboard-shortcuts">
      <h4>{isMobile ? 'Mobile Controls' : 'Keyboard Shortcuts'}</h4>
      <ul className="no-bullets">
        {isMobile ? (
          // Mobile instructions
          <>
            <li><strong>Tap card</strong>: Play audio</li>
            <li><strong>Swipe left</strong>: Next card</li>
            <li><strong>Swipe right</strong>: Previous card</li>
          </>
        ) : (
          // Keyboard shortcuts
          <>
            <li><strong>Space</strong>: Play audio</li>
            <li><strong>Right Arrow</strong>: Next card</li>
            <li><strong>Left Arrow</strong>: Previous card</li>
          </>
        )}
      </ul>
    </div>
  );
} 