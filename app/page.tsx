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
      <div className="section-band-surface">
        <Features />
      </div>
      <div className="section-band-cream">
        <HowItWorks />
      </div>
      <div className="section-band-dark">
        <Terminal />
      </div>
      <div className="section-band-surface">
        <BuiltWith />
      </div>
      <div className="section-band-cream">
        <DokiVsDocker />
      </div>
      <div className="section-band-surface">
        <MeshSection />
      </div>
      <div className="section-band-cream">
        <TestimonialsGlobe />
      </div>
      <CTA />
      <div className="section-band-dark">
        <Footer />
      </div>
    </main>
  )
}