"use client"

import { useState } from "react"
import { Globe, type GlobeNode } from "./globe"

interface Testimonial {
  id: number
  lat: number
  lng: number
  quote: string
  author: string
  subreddit: string
  upvotes?: number
  url: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    lat: 40.7, lng: -74.0,
    quote: "Wow, seriously how does you gain so much knowledge to build this? This is a serious amount of work, how did you managed to build all of this with less than 50 commits?",
    author: "u/xpgmi",
    subreddit: "r/termux",
    upvotes: 71,
    url: "https://reddit.com/r/termux/",
  },
  {
    id: 2,
    lat: 51.5, lng: -0.1,
    quote: "This is really impressive. I've tried running containers on Termux before and always hit the same root/systemd wall. How does Doki handle user namespaces without kernel support?",
    author: "u/Mr_Jude_",
    subreddit: "r/termux",
    url: "https://reddit.com/r/termux/",
  },
  {
    id: 3,
    lat: 35.7, lng: 139.7,
    quote: "That's awesome.",
    author: "u/Electrical_Hat_680",
    subreddit: "r/termux",
    url: "https://reddit.com/r/termux/",
  },
  {
    id: 4,
    lat: -23.5, lng: -46.6,
    quote: "Seems very complete compared with my project. Great work!",
    author: "u/LeftAd1220",
    subreddit: "r/termux",
    url: "https://github.com/jjtseng93/js-udocker",
  },
  {
    id: 5,
    lat: 52.5, lng: 13.4,
    quote: "made on a phone??",
    author: "anonymous",
    subreddit: "r/programming",
    url: "https://reddit.com/r/programming/",
  },
]

const nodes: GlobeNode[] = testimonials.map((t) => ({
  id: t.id,
  lat: t.lat,
  lng: t.lng,
}))

export function TestimonialsGlobe() {
  const [selected, setSelected] = useState<Testimonial | null>(null)

  const handleSelect = (node: GlobeNode | null) => {
    if (node) {
      const t = testimonials.find((t) => t.id === node.id)
      setSelected(t ?? null)
    } else {
      setSelected(null)
    }
  }

  return (
    <section
      id="community"
      style={{ paddingTop: "var(--section-y)", paddingBottom: "var(--section-y)" }}
    >
      <div className="max-w-[var(--max-width)] mx-auto px-[var(--gutter)]">
        {/* Header */}
        <div className="mb-12 max-w-[var(--measure)]">
          <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-[var(--mist)] mb-4">
            Community
          </p>
          <h2 className="font-sans font-semibold text-[clamp(32px,4.5vw,48px)] tracking-[-0.02em] text-foreground mb-4 leading-tight">
            What developers are saying.
          </h2>
        </div>

        {/* Globe + Quote */}
        <div className="grid md:grid-cols-[1fr_1.2fr] gap-12 items-center">
          {/* Globe */}
          <div className="flex justify-center">
            <Globe
              size={360}
              nodes={nodes}
              arcs={[]}
              autoRotate
              interactive
              accent="#d97757"
              onSelect={handleSelect}
              selectedId={selected?.id ?? null}
            />
          </div>

          {/* Quote panel */}
          <div className="min-h-[240px] flex items-center">
            {selected ? (
              <div className="relative p-8 rounded-lg bg-[var(--vellum)] border border-[var(--border-subtle)]">
                <svg
                  className="absolute top-6 left-6 w-8 h-8 text-[var(--mist)] opacity-20"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-[17px] text-foreground leading-relaxed font-serif italic mb-6 relative z-10">
                  &ldquo;{selected.quote}&rdquo;
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-sans font-medium text-[14px] text-foreground">
                      {selected.author}
                    </p>
                    <p className="text-[12px] text-[var(--mist)] font-mono">
                      {selected.upvotes && <span className="text-[var(--clay)]">{selected.upvotes} upvotes</span>}
                      {selected.upvotes && " · "}
                      {selected.subreddit}
                    </p>
                  </div>
                  <a
                    href={selected.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[12px] text-[var(--blue)] hover:underline font-mono"
                  >
                    View →
                  </a>
                </div>
              </div>
            ) : (
              <p className="text-[15px] text-[var(--mist)] font-serif italic">
                Click on a node to read what developers are saying about Doki.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
