import { Progress } from './ui/progress'
import { P } from './ui/typography'

interface DeckProgressProps {
  current: number
  total: number
}

export function DeckProgress({ current, total }: DeckProgressProps) {
  const progress = Math.round((current / total) * 100)

  return (
    <div className="space-y-2">
      <div className="flex justify-center">
        <P className="text-sm font-medium">
          {current}/{total}
        </P>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  )
} 