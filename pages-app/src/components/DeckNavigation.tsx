import { Button } from './ui/button'
import { ChevronLeft, ChevronRight, RotateCw, Headphones } from 'lucide-react'
import { Icon } from './ui/icon'

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
  onListenModeToggle,
}: DeckNavigationProps) {
  return (
    <div className="flex items-center justify-center gap-3">
      <Button
        variant="outline"
        size="lg"
        onClick={onPrevious}
        disabled={isFirstCard || isListenMode}
        className="w-[140px]"
      >
        <Icon icon={ChevronLeft} className="mr-2" />
        Previous
      </Button>

      <Button
        variant={isListenMode ? "default" : "outline"}
        size="lg"
        onClick={onListenModeToggle}
        className="w-[140px]"
      >
        <Icon icon={Headphones} className="mr-2" />
        {isListenMode ? 'Stop' : 'Listen'}
      </Button>

      <Button
        variant="default"
        size="lg"
        onClick={isAnswerRevealed ? onNext : onReveal}
        disabled={isListenMode}
        className="w-[140px]"
      >
        {isAnswerRevealed ? (
          <>
            Next
            <Icon icon={ChevronRight} className="ml-2" />
          </>
        ) : (
          <>
            Flip
            <Icon icon={RotateCw} className="ml-2" />
          </>
        )}
      </Button>
    </div>
  )
} 