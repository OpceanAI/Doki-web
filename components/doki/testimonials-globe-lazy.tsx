"use client"

import dynamic from "next/dynamic"

const TestimonialsGlobe = dynamic(
  () => import("@/components/doki/testimonials-globe").then((m) => m.TestimonialsGlobe),
  {
    ssr: false,
    loading: () => (
      <div className="h-[500px] flex items-center justify-center bg-[var(--bg-000)]">
        <div className="w-6 h-6 border-2 border-[var(--accent-cyan)] border-t-transparent rounded-full animate-spin" />
      </div>
    ),
  }
)

export function TestimonialsGlobeLazy() {
  return <TestimonialsGlobe />
}
