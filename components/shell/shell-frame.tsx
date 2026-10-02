"use client"

import { Suspense, useState } from "react"
import * as Dialog from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import { Sidebar, type ShellCommunity } from "./sidebar"
import { Topbar, type ShellUser } from "./topbar"

type Props = {
  user: ShellUser | null
  communities: ShellCommunity[]
  pendingRequests: number
  children: React.ReactNode
}

export function ShellFrame({ user, communities, pendingRequests, children }: Props) {
  const [open, setOpen] = useState(false)
  const sidebarProps = { signedIn: Boolean(user), communities, pendingRequests }

  return (
    <div className="flex min-h-dvh">
      <aside className="sticky top-0 hidden h-dvh w-64 shrink-0 border-r border-border bg-sidebar lg:block">
        <Suspense>
          <Sidebar {...sidebarProps} />
        </Suspense>
      </aside>

      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden" />
          <Dialog.Content className="fixed inset-y-0 left-0 z-50 w-72 border-r border-border bg-sidebar shadow-2xl outline-none lg:hidden">
            <Dialog.Title className="sr-only">Navigation</Dialog.Title>
            <Dialog.Close
              className="absolute top-4 right-4 inline-flex size-8 items-center justify-center rounded-lg hover:bg-secondary"
              aria-label="Close navigation"
            >
              <X className="size-4" aria-hidden />
            </Dialog.Close>
            <Suspense>
              <Sidebar {...sidebarProps} onNavigate={() => setOpen(false)} />
            </Suspense>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar user={user} onOpenMenu={() => setOpen(true)} />
        <main id="main" className="flex-1">
          {children}
        </main>
      </div>
    </div>
  )
}
