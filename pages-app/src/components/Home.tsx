import { useDeck } from '../hooks/useDeck';
import { Container } from './ui/layout/container';
import { H1, P } from './ui/typography';
import { Icon } from './ui/icon';
import { Loader2 } from 'lucide-react';
import { DeckGrid } from './DeckGrid';

export default function Home() {
  const { decks, loading, error } = useDeck();

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
        <div className="space-y-4">
          <H1>Japanese Flashcard Decks</H1>
          <P className="text-muted-foreground">
            Select a deck to start practicing your Japanese sentences
          </P>
        </div>

        <DeckGrid decks={decks} />
      </Container>
    </main>
  );
} 