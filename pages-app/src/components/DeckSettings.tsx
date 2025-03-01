import { Switch } from './ui/switch'
import { Volume2, Shuffle } from 'lucide-react'
import { Icon } from './ui/icon'
import { P } from './ui/typography'

interface DeckSettingsProps {
  autoPlayEnabled: boolean
  onAutoPlayChange: (enabled: boolean) => void
  randomModeEnabled: boolean
  onRandomModeChange: (enabled: boolean) => void
}

export function DeckSettings({
  autoPlayEnabled,
  onAutoPlayChange,
  randomModeEnabled,
  onRandomModeChange,
}: DeckSettingsProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <Icon icon={Volume2} className="text-muted-foreground" />
            <P>Auto-play audio</P>
          </div>
          <P className="text-sm text-muted-foreground">
            Automatically play audio when showing a new card
          </P>
        </div>
        <Switch
          checked={autoPlayEnabled}
          onCheckedChange={onAutoPlayChange}
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <Icon icon={Shuffle} className="text-muted-foreground" />
            <P>Random mode</P>
          </div>
          <P className="text-sm text-muted-foreground">
            Show cards in random order
          </P>
        </div>
        <Switch
          checked={randomModeEnabled}
          onCheckedChange={onRandomModeChange}
        />
      </div>
    </div>
  )
} 