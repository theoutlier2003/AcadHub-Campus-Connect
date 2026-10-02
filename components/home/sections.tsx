import Link from "next/link"
import {
  ArrowRight,
  BookOpen,
  Boxes,
  Code2,
  Compass,
  FlaskConical,
  Layers,
  Lightbulb,
  Network,
  PiggyBank,
  Recycle,
  Server,
  Target,
  Trophy,
  Users,
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Container, Section, SectionHeading } from "@/components/layout/primitives"

const PROBLEMS = [
  { icon: Compass, title: "Skills are invisible", text: "A student who knows ESP32 and one who needs it rarely meet — talent sits in separate hostels and branches." },
  { icon: Network, title: "Groups never close", text: "WhatsApp groups outlive their purpose. Context drowns, and finding past work becomes impossible." },
  { icon: Boxes, title: "Resources are scattered", text: "Lab kits, notes and past projects exist, but nobody knows where — so students rebuild from zero." },
]

const STEPS = [
  { icon: Target, title: "Post a goal", text: "Describe what you want to build or learn and the skills it needs." },
  { icon: Users, title: "Match & join", text: "Students with matching skills request to join until slots fill." },
  { icon: Layers, title: "Collaborate", text: "A temporary group with a focused discussion and shared resources." },
  { icon: Trophy, title: "Complete & archive", text: "The group closes; its knowledge stays searchable for the next batch." },
]

const FRUGAL = [
  { icon: Recycle, title: "Reuse what exists", text: "Campus labs, seniors, notes and open-source tools — no new hardware." },
  { icon: PiggyBank, title: "Near-zero cost", text: "Runs on free-tier hosting with an open-source Postgres stack." },
  { icon: Server, title: "Simple infrastructure", text: "One Express API, one database, one web client. Easy to maintain." },
]

const DOCS = [
  { href: "/implementation", icon: Code2, title: "Implementation", text: "Walk through the repository, folders and code paths." },
  { href: "/architecture", icon: Layers, title: "Architecture", text: "Current system compared with the redesign." },
  { href: "/manual", icon: BookOpen, title: "Manual", text: "Install, configure and operate the platform." },
  { href: "/simulations", icon: FlaskConical, title: "Simulations", text: "Six interactive demos of the core flows." },
]

export function ProblemSection() {
  return (
    <Section aria-labelledby="problem-title" id="problem">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          id="problem-title"
          eyebrow="The problem"
          title="Campus talent exists. It just never finds each other."
          description="Students want to build things together, but the tools they use were never designed around goals."
        />
        <div className="grid gap-4 md:grid-cols-3">
          {PROBLEMS.map(({ icon: Icon, title, text }) => (
            <Card key={title} className="flex flex-col gap-4 p-6">
              <span className="inline-flex size-10 items-center justify-center rounded-lg bg-destructive/10 text-destructive">
                <Icon className="size-5" aria-hidden />
              </span>
              <h3 className="text-lg font-semibold text-foreground">{title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{text}</p>
            </Card>
          ))}
        </div>
        <Link href="/problem" className="inline-flex w-fit items-center gap-1.5 text-sm font-medium text-accent hover:underline">
          Read the full problem statement <ArrowRight className="size-4" aria-hidden />
        </Link>
      </Container>
    </Section>
  )
}

export function HowItWorks() {
  return (
    <Section id="how-it-works" aria-labelledby="how-title" className="scroll-mt-20 border-y border-border bg-muted">
      <Container className="flex flex-col gap-12">
        <SectionHeading id="how-title" eyebrow="How it works" title="One goal. One temporary group. One outcome." align="center" />
        <ol className="grid gap-6 md:grid-cols-4">
          {STEPS.map(({ icon: Icon, title, text }, i) => (
            <li key={title} className="relative flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className="inline-flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <Icon className="size-5" aria-hidden />
                </span>
                <span className="font-mono text-sm text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                {i < STEPS.length - 1 && <span aria-hidden className="hidden h-px flex-1 bg-border md:block" />}
              </div>
              <h3 className="text-lg font-semibold text-foreground">{title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  )
}

export function WhyFrugal() {
  return (
    <Section id="why-frugal" aria-labelledby="frugal-title" className="scroll-mt-20">
      <Container className="grid gap-12 lg:grid-cols-5">
        <div className="flex flex-col gap-6 lg:col-span-2">
          <SectionHeading
            id="frugal-title"
            eyebrow="Why frugal"
            title="Innovation through constraint, not expense."
            description="AcadHub does not add hardware or expensive SaaS. It organises what a campus already has."
          />
          <Button asChild variant="outline" className="w-fit">
            <Link href="/innovation">
              <Lightbulb aria-hidden />
              Explore the innovation
            </Link>
          </Button>
        </div>
        <ul className="flex flex-col gap-3 lg:col-span-3">
          {FRUGAL.map(({ icon: Icon, title, text }) => (
            <li key={title} className="flex gap-4 rounded-xl border border-border p-5">
              <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-success/10 text-success">
                <Icon className="size-5" aria-hidden />
              </span>
              <div className="flex flex-col gap-1">
                <h3 className="font-semibold text-foreground">{title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}

export function DocsGrid() {
  return (
    <Section aria-labelledby="docs-title" className="border-t border-border bg-muted">
      <Container className="flex flex-col gap-12">
        <SectionHeading id="docs-title" eyebrow="Documentation" title="From basics to advanced." description="Start with the idea, then go as deep as you need — down to the request lifecycle." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {DOCS.map(({ href, icon: Icon, title, text }) => (
            <Link key={href} href={href} className="group rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <Card interactive className="flex h-full flex-col gap-4 p-6">
                <Icon className="size-6 text-accent" aria-hidden />
                <h3 className="text-lg font-semibold text-foreground">{title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{text}</p>
                <span className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-foreground">
                  Open <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </span>
              </Card>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  )
}
