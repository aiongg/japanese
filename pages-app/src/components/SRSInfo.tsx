import { Sentence } from '../types';
import { P } from './ui/typography';
import { cn } from '@/lib/utils';

interface SRSInfoProps {
  card: Sentence;
  className?: string;
}

export function SRSInfo({ card, className }: SRSInfoProps) {
  const { interval, easeFactor, repetitions, timesSeen } = card.srs;
  
  // Format the next review date
  const formatDueDate = () => {
    if (!card.srs.dueDate) return 'New';
    
    const due = new Date(card.srs.dueDate);
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    
    const diffDays = Math.round((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Due';
    if (diffDays === 0) return 'Due today';
    if (diffDays === 1) return 'Due tomorrow';
    return `Due in ${diffDays} days`;
  };

  return (
    <div className={cn("text-sm text-muted-foreground space-y-1", className)}>
      <P>Next review: {formatDueDate()}</P>
      <div className="flex gap-4">
        <P>Interval: {interval} days</P>
        <P>Ease: {easeFactor.toFixed(2)}</P>
      </div>
      <div className="flex gap-4">
        <P>Reviews: {timesSeen}</P>
        <P>Streak: {repetitions}</P>
      </div>
    </div>
  );
} 