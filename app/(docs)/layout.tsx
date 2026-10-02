import { AppShell } from "@/components/shell/app-shell"
import { Footer } from "@/components/footer/footer"
import { getCurrentUser } from "@/lib/session"

export default async function DocsLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser()
  return (
    <AppShell user={user}>
      {children}
      <Footer />
    </AppShell>
  )
}
