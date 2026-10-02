"use client"

import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { useState } from "react"
import {
  BookOpen,
  Bot,
  ChevronDown,
  Compass,
  Flame,
  Home,
  MessageCircle,
  Plus,
  UserPlus,
  type LucideIcon,
} from "lucide-react"
import { Brand } from "@/components/navigation/brand"
import { CommunityIcon } from "@/components/app/community-icon"
import { NAV_GROUPS } from "@/lib/constants/site"
import { cn } from "@/lib/utils"

export type ShellCommunity = { id: number; slug: string; name: string; icon: string; color: string }

type Props = {
  signedIn: boolean
  communities: ShellCommunity[]
  pendingRequests: number
  onNavigate?: () => void
}

const MAIN: { href: string; label: string; icon: LucideIcon; match?: (p: string, sort: string | null) => boolean }[] = [
  { href: "/feed", label: "Home", icon: Home, match: (p, s) => p === "/feed" && s !== "top" },
  { href: "/feed?sort=top", label: "Popular", icon: Flame, match: (p, s) => p === "/feed" && s === "top" },
  { href: "/communities", label: "Explore", icon: Compass },
  { href: "/messages", label: "Messages", icon: MessageCircle },
  { href: "/friends", label: "Friends", icon: UserPlus },
  { href: "/ai", label: "AI Study Buddy", icon: Bot },
]

function NavLink({
  href,
  active,
  children,
  onNavigate,
}: {
  href: string
  active: boolean
  children: React.ReactNode
  onNavigate?: () => void
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
        active ? "bg-primary/12 text-primary" : "text-muted-foreground hover:bg-secondary hover:text-foreground",
      )}
    >
      {children}
    </Link>
  )
}

function Group({ title, children, defaultOpen = true }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="flex flex-col gap-1">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex items-center justify-between px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground"
      >
        {title}
        <ChevronDown className={cn("size-3.5 transition-transform", !open && "-rotate-90")} aria-hidden />
      </button>
      {open ? <div className="flex flex-col gap-0.5">{children}</div> : null}
    </div>
  )
}

export function Sidebar({ signedIn, communities, pendingRequests, onNavigate }: Props) {
  const pathname = usePathname()
  const sort = useSearchParams().get("sort")

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-16 shrink-0 items-center px-5">
        <Brand />
      </div>
      <nav aria-label="Primary" className="flex flex-1 flex-col gap-6 overflow-y-auto px-3 pb-6">
        <div className="flex flex-col gap-0.5">
          {MAIN.map((item) => {
            const active = item.match ? item.match(pathname, sort) : pathname.startsWith(item.href)
            return (
              <NavLink key={item.href} href={item.href} active={active} onNavigate={onNavigate}>
                <item.icon className="size-[18px]" aria-hidden />
                <span className="flex-1">{item.label}</span>
                {item.href === "/friends" && pendingRequests > 0 ? (
                  <span className="rounded-full bg-hot px-1.5 py-0.5 text-[10px] font-bold leading-none text-hot-foreground">
                    {pendingRequests}
                  </span>
                ) : null}
              </NavLink>
            )
          })}
        </div>

        {signedIn ? (
          <Group title="Your communities">
            {communities.map((c) => (
              <NavLink key={c.id} href={`/c/${c.slug}`} active={pathname === `/c/${c.slug}`} onNavigate={onNavigate}>
                <CommunityIcon icon={c.icon} color={c.color} className="size-6 rounded-md" />
                <span className="truncate">c/{c.slug}</span>
              </NavLink>
            ))}
            <NavLink href="/communities?create=1" active={false} onNavigate={onNavigate}>
              <span className="flex size-6 items-center justify-center rounded-md border border-dashed border-border">
                <Plus className="size-3.5" aria-hidden />
              </span>
              Create community
            </NavLink>
          </Group>
        ) : null}

        {NAV_GROUPS.map((group) => (
          <Group key={group.title} title={group.title} defaultOpen={false}>
            {group.items.map((item) => (
              <NavLink key={item.href} href={item.href} active={pathname === item.href} onNavigate={onNavigate}>
                <BookOpen className="size-4" aria-hidden />
                {item.label}
              </NavLink>
            ))}
          </Group>
        ))}
      </nav>
    </div>
  )
}
