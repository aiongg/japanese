import { Link } from 'react-router-dom'
import { DeckMetadata } from '../types'
import { Grid } from './ui/layout/grid'
import { Japanese, P } from './ui/typography'
import { Icon } from './ui/icon'
import { Book } from 'lucide-react'

interface DeckGridProps {
  decks: DeckMetadata[]
}

export function DeckGrid({ decks }: DeckGridProps) {
  return (
    <Grid cols={3} gap="lg">
      {decks.map((deck) => (
        <Link
          to={`/deck/${deck.id.replace('.json', '')}`}
          key={deck.id}
          className="group relative overflow-hidden rounded-lg border bg-card p-8 text-card-foreground shadow-sm transition-all hover:shadow-md hover:ring-2 hover:ring-primary/50"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-3">
              <Japanese className="text-xl font-bold">
                {deck.title}
              </Japanese>
              <P className="text-sm text-muted-foreground">
                {deck.count > 0 ? `${deck.count} sentences` : 'Loading...'}
              </P>
            </div>
            <Icon
              icon={Book}
              size="lg"
              className="text-primary transition-transform group-hover:scale-110"
            />
          </div>
        </Link>
      ))}
    </Grid>
  )
} 