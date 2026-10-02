import Link from "next/link"
import { cn } from "@/lib/utils"

export function BrandMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden className={cn("size-8", className)}>
      <rect width="32" height="32" rx="7" className="fill-primary" />
      <rect x="7" y="17" width="4" height="8" rx="1" className="fill-primary-foreground" />
      <rect x="14" y="12" width="4" height="13" rx="1" className="fill-primary-foreground" />
      <rect x="21" y="7" width="4" height="18" rx="1" className="fill-primary-foreground" />
      <rect x="7" y="11" width="4" height="4" rx="1" className="fill-primary-foreground opacity-60" />
    </svg>
  )
}

export function Brand({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2.5", className)} aria-label="AcadHub — Campus Connect, home">
      <BrandMark />
      <span className="flex flex-col leading-none">
        <span className="text-base font-semibold tracking-tight text-foreground">AcadHub</span>
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Campus Connect</span>
      </span>
    </Link>
  )
}
