"use client"

import { ThemeProvider } from "next-themes"
import { TooltipProvider } from "@/components/ui/tooltip"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange storageKey="acadhub-theme">
      <TooltipProvider delayDuration={200}>{children}</TooltipProvider>
    </ThemeProvider>
  )
}
