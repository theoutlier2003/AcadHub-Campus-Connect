import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Github, PlayCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/layout/primitives"
import { IMAGES, SITE } from "@/lib/constants/site"

const STATS = [
  { value: "1", label: "Goal per group" },
  { value: "0", label: "New infrastructure" },
  { value: "13", label: "Focused features" },
  { value: "6", label: "Live simulations" },
]

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-primary text-primary-foreground">
      <Image src={IMAGES.campus} alt="" fill priority sizes="100vw" className="-z-10 object-cover opacity-30" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-primary via-primary/90 to-primary/40" />
      <Container className="flex flex-col gap-10 py-20 md:py-28 lg:py-32">
        <div className="flex max-w-3xl flex-col gap-6">
          <p className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 font-mono text-xs uppercase tracking-[0.18em] backdrop-blur">
            <span className="size-1.5 rounded-full bg-accent" aria-hidden />
            Frugal innovation · IIIT Dharwad
          </p>
          <h1 id="hero-title" className="text-balance text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            {SITE.name}
            <span className="block text-primary-foreground/60">{SITE.subtitle}</span>
          </h1>
          <p className="text-pretty text-xl font-medium md:text-2xl">{SITE.tagline}</p>
          <p className="max-w-2xl text-pretty text-base leading-relaxed text-primary-foreground/75 md:text-lg">
            A goal-based collaboration platform that helps college students find the right people for a project, a
            study goal or a competition — using the skills and resources already on campus.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Button asChild size="lg" variant="accent">
              <Link href="/simulations">
                <PlayCircle aria-hidden />
                Try live simulations
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/25 bg-white/5 text-primary-foreground hover:bg-white/10 hover:text-primary-foreground">
              <Link href="/innovation">
                How it works
                <ArrowRight aria-hidden />
              </Link>
            </Button>
            <Button asChild size="lg" variant="ghost" className="text-primary-foreground hover:bg-white/10 hover:text-primary-foreground">
              <a href={SITE.repo} target="_blank" rel="noreferrer">
                <Github aria-hidden />
                Repository
              </a>
            </Button>
          </div>
        </div>
        <dl className="grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/15 bg-white/10 sm:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="flex flex-col gap-1 bg-primary/80 p-5 backdrop-blur">
              <dt className="order-2 text-xs text-primary-foreground/60">{s.label}</dt>
              <dd className="order-1 font-mono text-3xl font-medium">{s.value}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  )
}
