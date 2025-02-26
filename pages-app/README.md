# Japanese Flashcards

A responsive web application for studying Japanese sentences using flashcards. This application is designed to be deployed on GitHub Pages.

## Features

- Browse different decks of Japanese sentences
- Study flashcards in sequential or random order
- Toggle between "tap to reveal" and "show all" modes
- Responsive design that works on desktop, tablet, and mobile devices
- Automatic deployment to GitHub Pages

## How to Use

1. Visit the [Japanese Flashcards](https://aiongg.github.io/japanese/) website
2. Select a deck of sentences to study
3. Use the controls to navigate through the flashcards
4. Tap on a flashcard to reveal the English translation and vocabulary breakdown (in "tap to reveal" mode)

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
  - `context/` - React context for state management
  - `types/` - TypeScript type definitions
  - `utils/` - Utility functions
- `public/` - Static assets
  - `sentences/` - Sentence files (copied from the root `sentences/` directory)
- `scripts/` - Utility scripts
  - `copy-sentences.js` - Script to copy sentence files to the public directory

## License

MIT
