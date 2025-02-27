# Shiba Study

A responsive web application for studying Japanese sentences using flashcards with audio support. This application is designed to be deployed on GitHub Pages.

## Features

- Browse different decks of Japanese sentences
- Study flashcards in sequential or random order
- Toggle between "tap to reveal" and "show all" modes
- Audio playback for Japanese sentences with auto-play option
- Listen Mode for hands-free studying with automatic card advancement
- Interactive swipe gestures for navigation on mobile devices
- Animated card transitions with subtle rotation effects
- Keyboard shortcuts for easy navigation
- Responsive design that works on desktop, tablet, and mobile devices
- Automatic deployment to GitHub Pages

## How to Use

1. Visit the [Shiba Study](https://aiongg.github.io/japanese/) website
2. Select a deck of sentences to study
3. Use the controls to navigate through the flashcards
4. Tap on a flashcard to play the Japanese audio
5. Swipe left to reveal the answer or go to the next card
6. Swipe right to go to the previous card
7. Use the navigation buttons for advancing cards or revealing answers
8. Enable Listen Mode for hands-free studying with automatic audio playback and card advancement

### Keyboard Shortcuts

- **Space**: Play audio for the current sentence
- **Right Arrow**: Go to the next card (or reveal answer if hidden)
- **Left Arrow**: Go to the previous card

### Audio Features

- **Auto-Play**: Automatically plays audio when a new card is displayed
- **Listen Mode**: Automatically plays Japanese audio, reveals the answer, plays English audio, then advances to the next card
- **Pause/Resume**: Pause and resume the Listen Mode sequence without restarting the current card
- **Adjustable Delay**: Control the pause duration between cards in Listen Mode
- **Safety Timeout**: Prevents hanging if audio playback never completes

### Touch Interaction

- **Tap**: Play the Japanese audio for the current card
- **Swipe Left**: Reveal answer (if hidden) or advance to next card
- **Swipe Right**: Go to previous card
- **Resistance Effect**: Cards have a natural resistance when swiped beyond a certain distance
- **Animation**: Cards follow your finger with a subtle rotation effect for a physical feel

## Recent Improvements

### Code Refactoring
- Modularized the `DeckView` component into smaller, reusable components
- Created custom hooks for specific functionality:
  - `useDeckNavigation` - Manages deck navigation and card progression
  - `useFlashcardState` - Handles flashcard state and animations
  - `useKeyboardShortcuts` - Manages keyboard interactions
  - `useAudio` - Controls audio playback and listen mode
- Extracted UI components for better separation of concerns:
  - `ProgressBar` - Shows study progress
  - `NavigationButtons` - Controls for card navigation
  - `StudyModeControls` - Settings for study mode preferences
  - `AudioSettings` - Controls for audio playback options
  - `KeyboardShortcutsInfo` - Displays available keyboard shortcuts
- Improved state management with proper prop passing and callbacks
- Replaced sessionStorage with React state for better performance

### Animation Improvements
- Enhanced flip animation for more intuitive card interaction
- Improved animation consistency across different interaction methods
- Fixed animation direction for swipe gestures

### Audio System Enhancements
- Robust queue system for sequential audio playback
- Detailed debug logging for troubleshooting audio issues
- Enhanced error handling and recovery mechanisms
- Safety timeout system to prevent hanging if audio never completes

### Interaction Model Redesign
- Changed from "tap to advance" to "tap to play audio" for more intuitive use
- Implemented fluid swipe gestures with natural physics for navigation
- Improved visual feedback during interactions
- Enhanced navigation buttons for better usability

### Animation Refinements
- Cards now follow the user's finger during swipe gestures
- Added resistance effect when swiping beyond a certain distance
- Implemented smooth transitions for card movements
- Added subtle rotation during swipe for a more physical feel

### Performance Optimizations
- Updated CSS with `will-change: transform` for smoother animations
- Configured `touch-action: pan-y` to allow vertical scrolling while handling horizontal swipes
- Improved rendering efficiency for better mobile performance
- Reduced component re-renders through proper state management

## Development

### Prerequisites

- Node.js (version 18 or higher)
- npm (version 9 or higher)

### Installation

```bash
# Clone the repository
git clone https://github.com/aiongg/japanese.git
cd japanese/pages-app

# Install dependencies
npm install
```

### Running Locally

```bash
# Start the development server
npm run dev
```

The application will be available at http://localhost:5173/japanese/

### Building for Production

```bash
# Build the application
npm run build
```

The built application will be in the `dist` directory.

### Deployment

The application is automatically deployed to GitHub Pages when changes are pushed to the main branch using a GitHub Actions workflow defined in the repository root's `.github/workflows/deploy.yml` file. You can also manually deploy by running:

```bash
npm run deploy
```

## Project Structure

- `src/` - Source code
  - `components/` - React components
    - `DeckView.tsx` - Main component for displaying and interacting with flashcards
    - `Flashcard.tsx` - Component for rendering individual flashcards
    - `Header.tsx` - Application header with logo and navigation
    - `DeckList.tsx` - Component for displaying available decks
    - `ProgressBar.tsx` - Component for displaying study progress
    - `NavigationButtons.tsx` - Component for card navigation controls
    - `StudyModeControls.tsx` - Component for study mode settings
    - `AudioSettings.tsx` - Component for audio playback options
    - `KeyboardShortcutsInfo.tsx` - Component for displaying keyboard shortcuts
  - `context/` - React context for state management
    - `DeckContext.tsx` - Context for managing deck data and state
  - `hooks/` - Custom React hooks
    - `useAudio.ts` - Hook for managing audio playback and listen mode
    - `useDeckNavigation.ts` - Hook for managing deck navigation
    - `useFlashcardState.ts` - Hook for managing flashcard state
    - `useKeyboardShortcuts.ts` - Hook for managing keyboard interactions
  - `types/` - TypeScript type definitions
  - `utils/` - Utility functions
    - `audioService.ts` - Singleton service for audio playback management
    - `parseMarkdown.ts` - Utility for parsing sentence markdown files
- `public/` - Static assets
  - `sentences/` - Sentence files (copied from the root `sentences/` directory)
    - `audio/` - Audio files for Japanese and English sentences
  - `icons/` - Application icons and favicon
- `scripts/` - Utility scripts
  - `copy-sentences.js` - Script to copy sentence files and audio to the public directory

## Audio Implementation Details

The application uses a sophisticated audio system:

- Core `audioService.ts` singleton for centralized audio management
- Custom `useAudio` hook for React component integration
- Audio files are stored in the `public/sentences/audio` directory
- Queue system for sequential playback of multiple audio files
- Safety timeout mechanism to prevent hanging if audio never completes
- Debug logging system for troubleshooting playback issues
- Listen Mode uses a queue system to play sequences of audio files
- Audio playback is synchronized with UI state changes (e.g., revealing answers)

## Core Architecture

- React application with TypeScript for type safety
- State management through React Context and custom hooks
- Component-based architecture with clear separation of concerns
- Custom hooks for encapsulating complex functionality
- Responsive design with mobile-first approach
- Singleton services for global functionality like audio playback

## Build Process

The build process includes:

1. Running the `copy-sentences.js` script to copy sentence markdown files and audio files to the public directory
2. Compiling TypeScript files
3. Building the application with Vite
4. Deploying to GitHub Pages

## Future Improvements

Planned enhancements for future development:

1. Extract touch gesture handling into a custom hook
2. Implement a reducer for audio state management
3. Continue refining the swipe animation for more natural feel
4. Enhance error handling in the audio service
5. Improve accessibility features
6. Consider adding more study modes or customization options
7. Implement offline support with service workers

## LLM Notes

1. Do not run the program using `npm run dev` or `npm run preview`. The developer will keep the application running on their local machine.
