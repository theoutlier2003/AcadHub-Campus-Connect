import { Hero } from "@/components/home/hero"
import { DocsGrid, HowItWorks, ProblemSection, WhyFrugal } from "@/components/home/sections"
import { FrugalPrinciple, Container, Section, SectionHeading } from "@/components/layout/primitives"
import { LifecycleSim } from "@/components/simulations/lifecycle-sim"

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProblemSection />
      <HowItWorks />
      <Section aria-labelledby="demo-title">
        <Container className="flex flex-col gap-10">
          <SectionHeading id="demo-title" eyebrow="See it move" title="A group that exists for exactly one goal." />
          <LifecycleSim />
        </Container>
      </Section>
      <FrugalPrinciple />
      <WhyFrugal />
      <DocsGrid />
    </>
  )
}
