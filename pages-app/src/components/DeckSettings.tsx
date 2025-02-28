import { Switch } from './ui/switch'
import { Toggle } from './ui/toggle'
import { Slider } from './ui/slider'
import { P } from './ui/typography'
import { Volume2, Shuffle, Timer } from 'lucide-react'
import { Icon } from './ui/icon'

interface DeckSettingsProps {
  autoPlayEnabled: boolean
  onAutoPlayChange: (enabled: boolean) => void
  randomModeEnabled: boolean
  onRandomModeChange: (enabled: boolean) => void
  listenModeEnabled: boolean
  onListenModeChange: (enabled: boolean) => void
  listenModeDelay: number
  onListenModeDelayChange: (value: number) => void
}

export function DeckSettings({
  autoPlayEnabled,
  onAutoPlayChange,
  randomModeEnabled,
  onRandomModeChange,
  listenModeEnabled,
  onListenModeChange,
  listenModeDelay,
  onListenModeDelayChange,
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

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <Icon icon={Timer} className="text-muted-foreground" />
              <P>Listen mode</P>
            </div>
            <P className="text-sm text-muted-foreground">
              Auto-advance cards with audio playback
            </P>
          </div>
          <Toggle
            pressed={listenModeEnabled}
            onPressedChange={onListenModeChange}
            variant="outline"
          >
            {listenModeEnabled ? 'On' : 'Off'}
          </Toggle>
        </div>

        {listenModeEnabled && (
          <div className="space-y-2">
            <P className="text-sm text-muted-foreground">
              Delay between cards: {listenModeDelay}s
            </P>
            <Slider
              value={[listenModeDelay]}
              onValueChange={([value]) => onListenModeDelayChange(value)}
              min={1}
              max={10}
              step={0.5}
              className="py-2"
            />
          </div>
        )}
      </div>
    </div>
  )
} 