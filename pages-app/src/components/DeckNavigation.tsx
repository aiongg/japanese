import { Button } from './ui/button'
import { Icon } from './ui/icon'
import { ArrowLeft, ArrowRight, Eye, Headphones } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DeckNavigationProps {
  onPrevious: () => void
  onNext: () => void
  onReveal: () => void
  isAnswerRevealed: boolean
  isFirstCard: boolean
  isLastCard: boolean
  isListenMode: boolean
  onListenModeToggle: () => void
}

export function DeckNavigation({
  onPrevious,
  onNext,
  onReveal,
  isAnswerRevealed,
  isFirstCard,
  isLastCard,
  isListenMode,
  onListenModeToggle
}: DeckNavigationProps) {
  return (
    <div className="flex items-center justify-center gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={onPrevious}
        disabled={isFirstCard}
        title="Previous card"
      >
        <Icon icon={ArrowLeft} />
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={onReveal}
        disabled={isAnswerRevealed}
        title="Reveal answer"
      >
        <Icon icon={Eye} />
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={onNext}
        disabled={isLastCard}
        title="Next card"
      >
        <Icon icon={ArrowRight} />
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={onListenModeToggle}
        className={cn(isListenMode && "bg-primary text-primary-foreground")}
        title={isListenMode ? "Stop listen mode" : "Start listen mode"}
      >
        <Icon icon={Headphones} />
      </Button>
    </div>
  )
} 