# Shiba Study

A responsive web application for studying Japanese sentences using flashcards with audio support. This application is designed to be deployed on GitHub Pages.

## Features

- Browse different decks of Japanese sentences
- Study flashcards in sequential or random order
- Toggle between "tap to reveal" and "show all" modes
- Audio playback for Japanese sentences with auto-play option
- Listen Mode for hands-free studying with automatic card advancement
- Keyboard shortcuts for easy navigation
- Responsive design that works on desktop, tablet, and mobile devices
- Automatic deployment to GitHub Pages

## How to Use

1. Visit the [Shiba Study](https://aiongg.github.io/japanese/) website
2. Select a deck of sentences to study
3. Use the controls to navigate through the flashcards
4. Tap on a flashcard to reveal the English translation and vocabulary breakdown (in "tap to reveal" mode)
5. Use the audio button to hear the Japanese pronunciation
6. Enable Listen Mode for hands-free studying with automatic audio playback and card advancement

### Keyboard Shortcuts

- **Space**: Play audio for the current sentence
- **Right Arrow**: Go to the next card (or reveal answer if hidden)
- **Left Arrow**: Go to the previous card

### Audio Features

- **Auto-Play**: Automatically plays audio when a new card is displayed
- **Listen Mode**: Automatically plays Japanese audio, reveals the answer, plays English audio, then advances to the next card
- **Pause/Resume**: Pause and resume the Listen Mode sequence without restarting the current card
- **Adjustable Delay**: Control the pause duration between cards in Listen Mode

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
  - `context/` - React context for state management
    - `DeckContext.tsx` - Context for managing deck data and state
  - `hooks/` - Custom React hooks
    - `useAudio.ts` - Hook for managing audio playback and listen mode
  - `types/` - TypeScript type definitions
  - `utils/` - Utility functions
- `public/` - Static assets
  - `sentences/` - Sentence files (copied from the root `sentences/` directory)
    - `audio/` - Audio files for Japanese and English sentences
  - `icons/` - Application icons and favicon
- `scripts/` - Utility scripts
  - `copy-sentences.js` - Script to copy sentence files and audio to the public directory

## Audio Implementation Details

The application uses a custom `useAudio` hook to manage audio playback:

- Audio files are stored in the `public/sentences/audio` directory
- The `useAudio` hook provides functions for playing, pausing, and resuming audio
- Listen Mode uses a queue system to play sequences of audio files
- Audio playback is synchronized with UI state changes (e.g., revealing answers)

## Build Process

The build process includes:

1. Running the `copy-sentences.js` script to copy sentence markdown files and audio files to the public directory
2. Compiling TypeScript files
3. Building the application with Vite
4. Deploying to GitHub Pages

## License

MIT
