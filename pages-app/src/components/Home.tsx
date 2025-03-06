import { useState, useEffect } from 'react';
import { Container } from './ui/layout/container';
import { H1, P } from './ui/typography';
import { Icon } from './ui/icon';
import { Loader2, Trash2 } from 'lucide-react';
import { DeckGrid } from './DeckGrid';
import { fetchDeckList, fetchDeck } from '../utils/loadDeck';
import { DeckMetadata } from '../types';
import { Button } from './ui/button';
import { storageService } from '../services/storageService';

// Debug configuration
const DEBUG = true;
function debugLog(...args: unknown[]) {
  if (DEBUG) {
    console.log('[HOME]', ...args);
  }
}

export default function Home() {
  const [decks, setDecks] = useState<DeckMetadata[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadDecks() {
      try {
        setLoading(true);
        setError(null);

        // Get list of deck IDs
        const deckIds = await fetchDeckList();
        debugLog('Fetched deck IDs:', deckIds);

        // Create initial metadata with placeholder counts
        const initialDeckMetadata: DeckMetadata[] = deckIds.map(id => ({
          id,
          title: id.replace('sentences_', 'Sentences ').replace('-', ' to '),
          count: 0,
          dueCount: 0,
          newCount: 0,
          completedCount: 0
        }));

        // Set initial metadata to show something immediately
        setDecks(initialDeckMetadata);

        // Load each deck in parallel to get the actual data
        const loadedDecks = await Promise.all(
          deckIds.map(async (id) => {
            const deck = await fetchDeck(id);
            if (!deck) return null;

            return {
              id,
              title: deck.title,
              count: deck.sentences.length,
              dueCount: 0, // We'll implement this with SRS later
              newCount: deck.sentences.length, // Initially all cards are new
              completedCount: 0
            };
          })
        );

        // Update decks with actual data, filtering out any that failed to load
        const validDecks = loadedDecks.filter((deck): deck is DeckMetadata => deck !== null);
        debugLog('Loaded decks:', validDecks);
        setDecks(validDecks);
      } catch (err) {
        console.error('Error loading decks:', err);
        setError('Failed to load decks');
      } finally {
        setLoading(false);
      }
    }

    loadDecks();
  }, []);

  const handleResetStorage = () => {
    if (window.confirm('Are you sure you want to reset all SRS data? This cannot be undone.')) {
      debugLog('Clearing all storage');
      storageService.clear();
      window.location.reload();
    }
  };

  if (loading) {
    return (
      <Container className="flex h-[50vh] items-center justify-center">
        <Icon icon={Loader2} className="h-8 w-8 animate-spin text-primary" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="flex h-[50vh] items-center justify-center">
        <P className="text-destructive">{error}</P>
      </Container>
    );
  }

  return (
    <main className="flex-1 py-8">
      <Container className="space-y-8">
        <div className="flex items-center justify-between">
          <div className="space-y-4">
            <H1>Japanese Flashcard Decks</H1>
            <P className="text-muted-foreground">
              Select a deck to start practicing your Japanese sentences
            </P>
          </div>
          <Button
            variant="destructive"
            size="sm"
            onClick={handleResetStorage}
            className="gap-2"
          >
            <Icon icon={Trash2} className="h-4 w-4" />
            Reset SRS Data
          </Button>
        </div>

        <DeckGrid decks={decks} />
      </Container>
    </main>
  );
} 