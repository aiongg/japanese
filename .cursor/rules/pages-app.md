# GitHub Pages Shiba Study App

## Description
Rules and guidelines for developing and maintaining the Shiba Study React application deployed on GitHub Pages.

## Rules

### 1. Project Structure
- **Description**: The application follows a modular structure with clear separation of concerns.
- **Patterns**:
  - `src/components/`: React components directory
    - Core components like DeckView, Flashcard, Header
    - UI components like ProgressBar, NavigationButtons, StudyModeControls
  - `src/context/`: React context providers
  - `src/hooks/`: Custom React hooks
  - `src/types/`: TypeScript type definitions
  - `src/utils/`: Utility functions
  - `public/sentences/`: Sentence and audio files
  - `scripts/`: Build and utility scripts

### 2. Component Guidelines
- **Description**: Guidelines for React component development.
- **Patterns**:
  - Use functional components with hooks
  - Extract reusable UI elements into separate components
  - Follow established component naming conventions
- **Notes**:
  - Components should have a single responsibility
  - Use TypeScript for type safety
  - Implement proper prop typing and validation
  - Use custom hooks for complex logic
  - Ensure proper memoization of callbacks

### 3. Custom Hooks
- **Description**: Guidelines for custom hook development.
- **Patterns**:
  - `useDeckNavigation`: For deck navigation and card progression
  - `useFlashcardState`: For flashcard state and animations
  - `useKeyboardShortcuts`: For keyboard interactions
  - `useAudio`: For audio playback control
- **Notes**:
  - Hooks should have clear, focused responsibilities
  - Implement proper state synchronization with parent components
  - Use TypeScript for type safety
  - Include error handling and recovery mechanisms

### 4. State Management
- **Description**: Guidelines for state management.
- **Patterns**:
  - Use React Context for global state
  - Use local state for component-specific data
  - Implement proper callback props for state updates
- **Notes**:
  - Avoid using sessionStorage for performance-critical state
  - Ensure proper state synchronization between components
  - Use reducers for complex state logic
  - Implement proper memoization to prevent unnecessary re-renders

### 5. Animation and Interaction
- **Description**: Guidelines for animations and user interactions.
- **Notes**:
  - Implement smooth transitions for card movements
  - Use CSS `will-change: transform` for performance
  - Configure `touch-action: pan-y` for proper mobile interaction
  - Ensure consistent behavior across devices
  - Add subtle rotation effects for physical feel

### 6. Audio System
- **Description**: Guidelines for audio implementation.
- **Patterns**:
  - Use the audioService singleton for centralized management
  - Implement proper queuing for sequential playback
  - Include safety timeouts to prevent hanging
- **Notes**:
  - Handle audio loading and playback errors gracefully
  - Implement proper state synchronization with UI
  - Include debug logging for troubleshooting

### 7. Performance Guidelines
- **Description**: Guidelines for maintaining performance.
- **Notes**:
  - Optimize component re-renders
  - Use proper memoization strategies
  - Implement efficient animation techniques
  - Consider mobile device limitations
  - Profile and optimize critical paths

## Recommendations
- Follow the refactoring plan in plan.md for ongoing improvements
- Test changes on both desktop and mobile devices
- Ensure proper error handling and recovery
- Maintain TypeScript type safety
- Keep components focused and maintainable
- Document complex logic and state management
- Consider accessibility in all implementations
- Profile performance impacts of changes
- Follow the established component hierarchy
- Use the provided custom hooks for common functionality 
- Do not use the LLM Code Generator Agent to run `npm run dev` or `npm run preview` or `npm run deploy`. The developer will keep the application running on their local machine and deploy manually.
- Run `npm run build` to ensure that the app builds correctly.
