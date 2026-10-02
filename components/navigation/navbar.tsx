"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import * as Dialog from "@radix-ui/react-dialog"
import * as NavigationMenu from "@radix-ui/react-navigation-menu"
import { ChevronDown, Github, Menu, X } from "lucide-react"
import { MORE_NAV, NAV_GROUPS, PRIMARY_NAV, SITE } from "@/lib/constants/site"
import { cn } from "@/lib/utils"
import { Brand } from "./brand"
import { SearchCommand } from "./search-command"
import { ThemeToggle } from "./theme-toggle"
import { ScrollProgress } from "@/components/layout/scroll-ui"

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href)
}

export function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => setMobileOpen(false), [pathname])

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md supports-[backdrop-filter]:bg-background/70">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-16 max-w-[90rem] items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Brand className="shrink-0" />

        <NavigationMenu.Root className="relative hidden flex-1 justify-center xl:flex" aria-label="Primary">
          <NavigationMenu.List className="flex items-center gap-0.5">
            {PRIMARY_NAV.map((item) => (
              <NavigationMenu.Item key={item.href}>
                <NavigationMenu.Link asChild active={isActive(pathname, item.href)}>
                  <Link
                    href={item.href}
                    className={cn(
                      "relative rounded-md px-2.5 py-2 text-sm font-medium transition-colors hover:text-foreground",
                      isActive(pathname, item.href)
                        ? "text-foreground after:absolute after:inset-x-2.5 after:-bottom-[13px] after:h-0.5 after:bg-accent"
                        : "text-muted-foreground",
                    )}
                  >
                    {item.label}
                  </Link>
                </NavigationMenu.Link>
              </NavigationMenu.Item>
            ))}
            <NavigationMenu.Item>
              <NavigationMenu.Trigger className="group inline-flex items-center gap-1 rounded-md px-2.5 py-2 text-sm font-medium text-muted-foreground hover:text-foreground data-[state=open]:text-foreground">
                More
                <ChevronDown className="size-3.5 transition-transform group-data-[state=open]:rotate-180" aria-hidden />
              </NavigationMenu.Trigger>
              <NavigationMenu.Content className="absolute right-0 top-full mt-3 w-[640px] rounded-xl border border-border bg-popover p-2 shadow-xl data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-top-1">
                <div className="grid grid-cols-2 gap-2">
                  {NAV_GROUPS.map((group) => (
                    <div key={group.title} className="flex flex-col">
                      <p className="border-b border-border px-3 pb-2 pt-2 text-center text-sm font-semibold text-foreground">{group.title}</p>
                      <ul className="flex flex-col gap-0.5 pt-1">
                        {group.items.map((item) => (
                          <li key={item.href}>
                            <NavigationMenu.Link asChild>
                              <Link
                                href={item.href}
                                className={cn(
                                  "flex flex-col rounded-md border-l-2 border-transparent px-3 py-2 transition-colors hover:border-accent hover:bg-secondary",
                                  isActive(pathname, item.href) && "border-accent bg-secondary",
                                )}
                              >
                                <span className="text-sm font-medium text-foreground">{item.label}</span>
                                <span className="text-xs text-muted-foreground">{item.description}</span>
                              </Link>
                            </NavigationMenu.Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </NavigationMenu.Content>
            </NavigationMenu.Item>
          </NavigationMenu.List>
        </NavigationMenu.Root>

        <div className="ml-auto flex items-center gap-2">
          <div className="hidden lg:block">
            <SearchCommand />
          </div>
          <div className="lg:hidden">
            <SearchCommand compact />
          </div>
          <ThemeToggle />
          <a
            href={SITE.repo}
            target="_blank"
            rel="noreferrer"
            className="hidden h-9 items-center gap-2 rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 sm:inline-flex"
          >
            <Github className="size-4" aria-hidden />
            GitHub
          </a>
          <Dialog.Root open={mobileOpen} onOpenChange={setMobileOpen}>
            <Dialog.Trigger asChild>
              <button
                type="button"
                aria-label="Open menu"
                className="inline-flex size-9 items-center justify-center rounded-lg border border-border hover:bg-secondary xl:hidden"
              >
                <Menu className="size-4" aria-hidden />
              </button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 z-50 bg-foreground/30 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0" />
              <Dialog.Content className="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col border-l border-border bg-background shadow-2xl data-[state=open]:animate-in data-[state=open]:slide-in-from-right">
                <div className="flex h-16 items-center justify-between border-b border-border px-4">
                  <Dialog.Title className="sr-only">Site navigation</Dialog.Title>
                  <Dialog.Description className="sr-only">Browse AcadHub documentation pages</Dialog.Description>
                  <Brand />
                  <Dialog.Close
                    aria-label="Close menu"
                    className="inline-flex size-9 items-center justify-center rounded-lg border border-border hover:bg-secondary"
                  >
                    <X className="size-4" aria-hidden />
                  </Dialog.Close>
                </div>
                <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-4 py-6">
                  <ul className="flex flex-col">
                    {[...PRIMARY_NAV, ...MORE_NAV].map((item, i) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className={cn(
                            "flex items-baseline gap-4 border-b border-border py-3.5 text-lg font-medium",
                            isActive(pathname, item.href) ? "text-accent" : "text-foreground",
                          )}
                        >
                          <span className="w-6 font-mono text-xs text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
                <div className="flex items-center gap-2 border-t border-border p-4">
                  <ThemeToggle withLabel className="flex-1" />
                  <a
                    href={SITE.repo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-9 flex-1 items-center justify-center gap-2 rounded-lg bg-primary text-sm font-medium text-primary-foreground"
                  >
                    <Github className="size-4" aria-hidden />
                    GitHub
                  </a>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
      <ScrollProgress />
    </header>
  )
}
