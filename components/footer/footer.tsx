import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Github, Linkedin, Send } from "lucide-react"
import { DEVELOPER, FOOTER_EXPLORE, RESOURCES, SITE } from "@/lib/constants/site"
import { BrandMark } from "@/components/navigation/brand"
import { ThemeToggle } from "@/components/navigation/theme-toggle"
import { BackToTopLink } from "@/components/layout/scroll-ui"

const SOCIAL = [
  { label: "GitHub", href: DEVELOPER.github, icon: Github },
  { label: "LinkedIn", href: DEVELOPER.linkedin, icon: Linkedin },
  { label: "Telegram", href: DEVELOPER.telegram, icon: Send },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-12 lg:px-8">
        <div className="flex flex-col gap-5 lg:col-span-4">
          <div className="flex items-center gap-3">
            <BrandMark className="size-10" />
            <div className="leading-tight">
              <p className="text-lg font-semibold text-foreground">AcadHub</p>
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">Campus Connect</p>
            </div>
          </div>
          <p className="text-balance text-xl font-semibold tracking-tight text-foreground">{SITE.tagline}</p>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            A student Frugal Innovation project. Not an official IIIT Dharwad service.
          </p>
        </div>

        <nav aria-label="Explore" className="lg:col-span-2">
          <p className="mb-4 text-sm font-semibold text-foreground">Explore</p>
          <ul className="flex flex-col gap-2.5">
            {FOOTER_EXPLORE.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-muted-foreground hover:text-foreground">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="References" className="lg:col-span-3">
          <p className="mb-4 text-sm font-semibold text-foreground">Resources</p>
          <ul className="flex flex-col gap-2.5">
            {RESOURCES.map((r) => (
              <li key={r.href}>
                <a href={r.href} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
                  {r.label}
                  <ArrowUpRight className="size-3 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col gap-4 lg:col-span-3">
          <p className="text-sm font-semibold text-foreground">Connect</p>
          <Link href="/contact" className="flex items-center gap-3 rounded-xl border border-border bg-card p-3 transition-colors hover:border-accent/40">
            <Image src={DEVELOPER.portrait} alt="" width={44} height={44} className="size-11 rounded-full object-cover grayscale" />
            <span className="flex flex-col leading-tight">
              <span className="text-sm font-medium text-foreground">{DEVELOPER.name}</span>
              <span className="text-xs text-muted-foreground">Developer · IIIT Dharwad</span>
            </span>
          </Link>
          <ul className="flex gap-2">
            {SOCIAL.map(({ label, href, icon: Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="inline-flex size-9 items-center justify-center rounded-lg border border-border bg-card text-foreground transition-colors hover:border-accent/40 hover:text-accent"
                >
                  <Icon className="size-4" aria-hidden />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-4 py-6 text-sm text-muted-foreground sm:px-6 md:flex-row md:items-center lg:px-8">
          <p>
            © 2026 AcadHub — Campus Connect. Built as a Frugal Innovation project.
          </p>
          <div className="flex items-center gap-4">
            <ThemeToggle withLabel />
            <BackToTopLink />
          </div>
        </div>
      </div>
    </footer>
  )
}
