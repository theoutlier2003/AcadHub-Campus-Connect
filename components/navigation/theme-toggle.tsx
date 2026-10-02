"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

export function ThemeToggle({ className, withLabel = false }: { className?: string; withLabel?: boolean }) {
  const { resolvedTheme, setTheme } = useTheme()
  const next = resolvedTheme === "dark" ? "light" : "dark"

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          onClick={() => setTheme(next)}
          aria-label={`Switch to ${next} theme`}
          className={cn(
            "inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-border px-2.5 text-sm text-foreground transition-colors hover:bg-secondary",
            !withLabel && "w-9 px-0",
            className,
          )}
        >
          <Sun className="size-4 dark:hidden" aria-hidden />
          <Moon className="hidden size-4 dark:block" aria-hidden />
          {withLabel && (
            <span>
              <span className="dark:hidden">Light</span>
              <span className="hidden dark:inline">Dark</span> theme
            </span>
          )}
        </button>
      </TooltipTrigger>
      <TooltipContent>Toggle theme</TooltipContent>
    </Tooltip>
  )
}
