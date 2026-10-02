import { getMyCommunities, getPendingRequestCount } from "@/lib/queries"
import type { SessionUser } from "@/lib/session"
import { ShellFrame } from "./shell-frame"

export async function AppShell({ user, children }: { user: SessionUser | null; children: React.ReactNode }) {
  const [communities, pending] = user
    ? await Promise.all([getMyCommunities(user.id), getPendingRequestCount(user.id)])
    : [[], 0]
  return (
    <ShellFrame
      user={user ? { id: user.id, name: user.name, username: user.username, image: user.image, email: user.email } : null}
      communities={communities}
      pendingRequests={pending}
    >
      {children}
    </ShellFrame>
  )
}
