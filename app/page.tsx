import { Navigation } from "@/components/doki/navigation"
import { Hero } from "@/components/doki/hero"
import { Features } from "@/components/doki/features"
import { Benchmarks } from "@/components/doki/benchmarks"
import { TestimonialsGlobe } from "@/components/doki/testimonials-globe"
import { TechStack } from "@/components/doki/tech-stack"
import { CTA } from "@/components/doki/cta"
import { Footer } from "@/components/doki/footer"

export default function DokiLandingPage() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navigation />
      <Hero />
      <Features />
      <Benchmarks />
      <TestimonialsGlobe />
      <TechStack />
      <CTA />
      <Footer />
    </main>
  )
}
