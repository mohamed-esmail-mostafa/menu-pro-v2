import React from 'react'
import { Moon, Sun, Laptop } from 'lucide-react'
import { useAppearance } from '@/hooks/use-appearance'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

export default function ThemeToggle() {
  const { appearance, resolvedAppearance, updateAppearance } = useAppearance()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative h-9 w-9 rounded-full border-border/60 bg-background/80 hover:bg-accent hover:text-accent-foreground backdrop-blur-sm transition-all shadow-xs"
          aria-label="Toggle Theme"
        >
          {resolvedAppearance === 'dark' ? (
            <Moon className="h-4 w-4 text-emerald-400 transition-transform duration-300 rotate-0 scale-100" />
          ) : (
            <Sun className="h-4 w-4 text-amber-500 transition-transform duration-300 rotate-0 scale-100" />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[130px] rounded-xl">
        <DropdownMenuItem
          onClick={() => updateAppearance('light')}
          className={`flex items-center gap-2 cursor-pointer rounded-lg ${appearance === 'light' ? 'bg-accent font-semibold text-primary' : ''}`}
        >
          <Sun className="h-4 w-4 text-amber-500" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => updateAppearance('dark')}
          className={`flex items-center gap-2 cursor-pointer rounded-lg ${appearance === 'dark' ? 'bg-accent font-semibold text-primary' : ''}`}
        >
          <Moon className="h-4 w-4 text-emerald-400" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => updateAppearance('system')}
          className={`flex items-center gap-2 cursor-pointer rounded-lg ${appearance === 'system' ? 'bg-accent font-semibold text-primary' : ''}`}
        >
          <Laptop className="h-4 w-4 text-muted-foreground" />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

