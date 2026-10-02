import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"

export type SessionUser = {
  id: string
  name: string
  email: string
  image: string | null
  username: string | null
  bio: string | null
}

export async function getCurrentUser(): Promise<SessionUser | null> {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) return null
  const u = session.user as typeof session.user & { username?: string | null; bio?: string | null }
  return {
    id: u.id,
    name: u.name,
    email: u.email,
    image: u.image ?? null,
    username: u.username ?? null,
    bio: u.bio ?? null,
  }
}

export async function requireUser(): Promise<SessionUser> {
  const user = await getCurrentUser()
  if (!user) redirect("/sign-in")
  if (!user.username) redirect("/onboarding")
  return user
}

export async function getUserIdOrThrow(): Promise<string> {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error("Unauthorized")
  return session.user.id
}
