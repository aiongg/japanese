import { Button } from './ui/button';
import { H2, P } from './ui/typography';
import { SessionStats } from '../types';

interface SessionCompleteProps {
  stats: SessionStats;
  onContinue: () => void;
  onReturn: () => void;
  nextSessionSize: number;
}

export function SessionComplete({ stats, onContinue, onReturn, nextSessionSize }: SessionCompleteProps) {
  return (
    <div className="flex flex-col items-center justify-center space-y-6 p-8 text-center">
      <H2>Session Complete! 🎉</H2>
      
      <div className="space-y-2">
        <P>You've completed {stats.cardsReviewed} cards:</P>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>✅ {stats.correctCount} cards correct</li>
          <li>❌ {stats.failedCount} cards needed review</li>
        </ul>
      </div>

      <div className="flex flex-col gap-4 min-w-[200px]">
        <Button 
          onClick={onContinue}
          className="w-full"
        >
          Continue with {nextSessionSize} more cards
        </Button>
        <Button 
          variant="outline"
          onClick={onReturn}
          className="w-full"
        >
          Return to deck list
        </Button>
      </div>
    </div>
  );
} 