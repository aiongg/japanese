import { SRSResponse } from '../types';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { XCircle, CheckCircle, Zap } from 'lucide-react';

interface SRSControlsProps {
  onResponse: (response: SRSResponse) => void;
  disabled?: boolean;
  showLabels?: boolean;
  className?: string;
}

export function SRSControls({
  onResponse,
  disabled = false,
  showLabels = true,
  className
}: SRSControlsProps) {
  const buttons = [
    {
      response: 'failed' as const,
      label: 'Again',
      icon: XCircle,
      variant: 'destructive' as const,
      description: 'No recall or incorrect'
    },
    {
      response: 'passed' as const,
      label: 'OK',
      icon: CheckCircle,
      variant: 'default' as const,
      description: 'Recalled with effort'
    },
    {
      response: 'easy' as const,
      label: 'Easy',
      icon: Zap,
      variant: 'secondary' as const,
      description: 'Perfect recall'
    }
  ];

  return (
    <div className={cn('flex gap-2 justify-center', className)}>
      {buttons.map(({ response, label, icon: Icon, variant, description }) => (
        <Button
          key={response}
          onClick={() => onResponse(response)}
          variant={variant}
          disabled={disabled}
          className="flex items-center gap-2 min-w-[100px]"
          title={description}
        >
          <Icon className="w-4 h-4" />
          {showLabels && <span>{label}</span>}
        </Button>
      ))}
    </div>
  );
} 