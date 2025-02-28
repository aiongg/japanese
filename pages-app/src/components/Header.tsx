import { Link } from 'react-router-dom'
import { Container } from './ui/layout/container'
import { H2 } from './ui/typography'
import { cn } from '@/lib/utils'
import { Moon, Sun, Home } from 'lucide-react'
import { Button } from './ui/button'
import { Icon } from './ui/icon'
import { useTheme } from '../hooks/useTheme'

export default function Header() {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container>
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="/japanese/icons/android-chrome-192x192.png" 
              alt="Shiba Study Logo" 
              className="h-12 w-12"
            />
            <H2 className="text-2xl font-bold tracking-tight">
              <Link to="/" className="transition-colors hover:text-primary">
                Shiba Study
              </Link>
            </H2>
          </div>

          <nav className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              asChild
            >
              <Link to="/" title="Go to home">
                <Icon icon={Home} />
                <span className="sr-only">Go to home</span>
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              <Icon
                icon={theme === 'dark' ? Sun : Moon}
                className={cn(
                  "transition-all",
                  theme === 'dark' ? "rotate-0 scale-100" : "rotate-90 scale-0",
                )}
              />
              <Icon
                icon={theme === 'dark' ? Moon : Sun}
                className={cn(
                  "absolute transition-all",
                  theme === 'dark' ? "rotate-90 scale-0" : "rotate-0 scale-100",
                )}
              />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </nav>
        </div>
      </Container>
    </header>
  )
} 