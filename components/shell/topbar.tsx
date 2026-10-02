"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { LogOut, Menu, Plus, Search, Settings, User } from "lucide-react"
import { ThemeToggle } from "@/components/navigation/theme-toggle"
import { UserAvatar } from "@/components/app/user-avatar"
import { signOut } from "@/lib/auth-client"

export type ShellUser = { id: string; name: string; username: string | null; image: string | null; email: string }

export function Topbar({ user, onOpenMenu }: { user: ShellUser | null; onOpenMenu: () => void }) {
  const router = useRouter()

  const onSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const q = String(new FormData(e.currentTarget).get("q") ?? "").trim()
    router.push(q ? `/search?q=${encodeURIComponent(q)}` : "/search")
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur-xl sm:px-6">
      <button
        type="button"
        onClick={onOpenMenu}
        className="inline-flex size-9 items-center justify-center rounded-lg border border-border lg:hidden"
        aria-label="Open navigation"
      >
        <Menu className="size-4" aria-hidden />
      </button>

      <form onSubmit={onSearch} role="search" className="relative max-w-xl flex-1">
        <label htmlFor="global-search" className="sr-only">
          Search communities and students
        </label>
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
        <input
          id="global-search"
          name="q"
          type="search"
          placeholder="Search communities, students..."
          className="h-10 w-full rounded-full border border-border bg-secondary/60 pr-4 pl-9 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:bg-background"
        />
      </form>

      <div className="ml-auto flex items-center gap-2">
        <ThemeToggle className="rounded-full" />
        {user ? (
          <>
            <Link
              href="/submit"
              className="hidden h-9 items-center gap-1.5 rounded-full bg-primary px-4 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 sm:inline-flex"
            >
              <Plus className="size-4" aria-hidden />
              Create
            </Link>
            <DropdownMenu.Root>
              <DropdownMenu.Trigger
                className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="Account menu"
              >
                <UserAvatar name={user.name} image={user.image} seed={user.id} online />
              </DropdownMenu.Trigger>
              <DropdownMenu.Portal>
                <DropdownMenu.Content
                  align="end"
                  sideOffset={8}
                  className="z-50 w-60 rounded-xl border border-border bg-popover p-1.5 text-popover-foreground shadow-xl"
                >
                  <div className="px-3 py-2">
                    <p className="truncate text-sm font-semibold">{user.name}</p>
                    <p className="truncate text-xs text-muted-foreground">u/{user.username}</p>
                  </div>
                  <DropdownMenu.Separator className="my-1 h-px bg-border" />
                  <DropdownMenu.Item asChild>
                    <Link
                      href={`/u/${user.username}`}
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm outline-none data-[highlighted]:bg-secondary"
                    >
                      <User className="size-4" aria-hidden /> Profile
                    </Link>
                  </DropdownMenu.Item>
                  <DropdownMenu.Item asChild>
                    <Link
                      href="/settings"
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm outline-none data-[highlighted]:bg-secondary"
                    >
                      <Settings className="size-4" aria-hidden /> Settings
                    </Link>
                  </DropdownMenu.Item>
                  <DropdownMenu.Separator className="my-1 h-px bg-border" />
                  <DropdownMenu.Item
                    onSelect={async () => {
                      await signOut()
                      router.push("/sign-in")
                      router.refresh()
                    }}
                    className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm text-destructive outline-none data-[highlighted]:bg-secondary"
                  >
                    <LogOut className="size-4" aria-hidden /> Sign out
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          </>
        ) : (
          <>
            <Link href="/sign-in" className="hidden h-9 items-center rounded-full px-4 text-sm font-semibold hover:bg-secondary sm:inline-flex">
              Log in
            </Link>
            <Link
              href="/sign-up"
              className="inline-flex h-9 items-center rounded-full bg-primary px-4 text-sm font-semibold text-primary-foreground hover:opacity-90"
            >
              Sign up
            </Link>
          </>
        )}
      </div>
    </header>
  )
}
