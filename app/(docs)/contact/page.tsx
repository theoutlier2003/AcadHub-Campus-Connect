import type { Metadata } from "next"
import Image from "next/image"
import { Github, Linkedin, Send } from "lucide-react"
import { Container, PageHeader, Section } from "@/components/layout/primitives"
import { DEVELOPER } from "@/lib/constants/site"

export const metadata: Metadata = { title: "Contact", description: "Reach the developer of AcadHub." }

const LINKS = [
  { href: DEVELOPER.github, label: "GitHub", handle: "Semaphore007", icon: Github },
  { href: DEVELOPER.linkedin, label: "LinkedIn", handle: "Siddharth Gautam", icon: Linkedin },
  { href: DEVELOPER.telegram, label: "Telegram", handle: "@TheOutlier_2003", icon: Send },
]

export default function ContactPage() {
  return (
    <>
      <PageHeader crumb="Contact" eyebrow="Developer" title="Get in touch." description="Questions, feedback or want to bring AcadHub to your campus? Reach out directly." />
      <Section>
        <Container className="grid items-center gap-12 md:grid-cols-[280px_1fr]">
          <div className="relative mx-auto aspect-square w-full max-w-[280px] overflow-hidden rounded-2xl border border-border bg-black">
            <Image src={DEVELOPER.portrait} alt={`Portrait of ${DEVELOPER.name}`} fill sizes="280px" className="object-cover" />
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <h2 className="text-3xl font-semibold tracking-tight text-foreground">{DEVELOPER.name}</h2>
              <p className="text-muted-foreground">{DEVELOPER.institution}</p>
            </div>
            <ul className="grid gap-3 sm:grid-cols-3">
              {LINKS.map(({ href, label, handle, icon: Icon }) => (
                <li key={label}>
                  <a href={href} target="_blank" rel="noreferrer" className="flex flex-col gap-3 rounded-xl border border-border p-5 transition-colors hover:border-accent">
                    <Icon className="size-5 text-accent" aria-hidden />
                    <span className="font-semibold text-foreground">{label}</span>
                    <span className="text-sm text-muted-foreground">{handle}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>
    </>
  )
}
