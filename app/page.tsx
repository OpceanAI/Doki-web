import { Navigation } from "@/components/doki/navigation"
import { Hero } from "@/components/doki/hero"
import { HowItWorks } from "@/components/doki/how-it-works"
import { Features } from "@/components/doki/features"
import { Terminal } from "@/components/doki/terminal"
import { BuiltWith } from "@/components/doki/built-with"
import { DokiVsDocker } from "@/components/doki/doki-vs-docker"
import { MeshSection } from "@/components/doki/mesh-section"
import { TestimonialsGlobe } from "@/components/doki/testimonials-globe"
import { CTA } from "@/components/doki/cta"
import { Footer } from "@/components/doki/footer"

export default function DokiLandingPage() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navigation />
      <Hero />
      <Features />
      <HowItWorks />
      <Terminal />
      <BuiltWith />
      <DokiVsDocker />
      <MeshSection />
      <TestimonialsGlobe />
      <CTA />
      <Footer />
    </main>
  )
}
