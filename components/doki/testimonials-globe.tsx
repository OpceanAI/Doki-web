"use client"

import { useEffect, useRef, useState, Suspense, useCallback, Component, type ReactNode } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"

class ErrorBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError() {
    return { hasError: true }
  }
  render() {
    if (this.state.hasError) return this.props.fallback
    return this.props.children
  }
}

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
    quote: "Wow, seriously how does you gain so much knowledge to build this? Do you already have much knowledge about container before you build this? This is a serious amount of work, how did you managed to build all of this with less than 50 commits?",
    author: "u/xpgmi",
    subreddit: "r/termux",
    upvotes: 71,
    url: "https://reddit.com/r/termux/",
  },
  {
    id: 2,
    lat: 51.5, lng: -0.1,
    quote: "This is really impressive. I've tried running containers on Termux before and always hit the same root/systemd wall. How does Doki handle user namespaces without kernel support? Are you using something like proot under the hood, or did you find a different approach to isolate the container processes?",
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

function latLngToPos(lat: number, lng: number, r: number): [number, number, number] {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lng + 180) * (Math.PI / 180)
  return [
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta),
  ]
}

interface GlobeProps {
  onSelect: (t: Testimonial | null) => void
  selectedId: number | null
}

function Globe({ onSelect, selectedId }: GlobeProps) {
  const groupRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)
  const targetRotation = useRef<number | null>(null)

  useFrame((_, delta) => {
    if (!groupRef.current) return
    
    if (targetRotation.current !== null) {
      const diff = targetRotation.current - groupRef.current.rotation.y
      groupRef.current.rotation.y += diff * 0.05
      if (Math.abs(diff) < 0.01) targetRotation.current = null
    } else if (!hovered && selectedId === null) {
      groupRef.current.rotation.y += delta * 0.08
    }
  })

  const handleClick = (t: Testimonial) => {
    if (selectedId === t.id) {
      onSelect(null)
    } else {
      const theta = (t.lng + 180) * (Math.PI / 180)
      targetRotation.current = -theta + Math.PI / 2
      onSelect(t)
    }
  }

  return (
    <group ref={groupRef}>
      {/* Sphere wireframe */}
      <mesh>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.03} />
      </mesh>

      {/* Latitude lines */}
      {[-60, -30, 0, 30, 60].map((lat) => {
        const r = Math.cos(lat * Math.PI / 180)
        const y = Math.sin(lat * Math.PI / 180)
        return (
          <mesh key={lat} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[r - 0.003, r + 0.003, 64]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.05} />
          </mesh>
        )
      })}

      {/* Meridian lines */}
      {[0, 45, 90, 135].map((lng) => (
        <mesh key={lng} rotation={[0, (lng * Math.PI) / 180, 0]}>
          <torusGeometry args={[1, 0.002, 8, 64]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.03} />
        </mesh>
      ))}

      {/* Testimonial points */}
      {testimonials.map((t) => {
        const pos = latLngToPos(t.lat, t.lng, 1.02)
        const isSelected = selectedId === t.id
        return (
          <group key={t.id} position={pos}>
            {/* Outer glow */}
            <mesh>
              <sphereGeometry args={[0.08, 16, 16]} />
              <meshBasicMaterial color="#00d4ff" transparent opacity={isSelected ? 0.3 : 0.1} />
            </mesh>
            {/* Inner core */}
            <mesh
              onPointerOver={() => setHovered(true)}
              onPointerOut={() => setHovered(false)}
              onClick={() => handleClick(t)}
            >
              <sphereGeometry args={[0.03, 16, 16]} />
              <meshBasicMaterial color={isSelected ? "#00d4ff" : "#ffffff"} />
            </mesh>
            {/* Pulse ring when selected */}
            {isSelected && (
              <mesh rotation={[Math.PI / 2, 0, 0]}>
                <ringGeometry args={[0.06, 0.08, 32]} />
                <meshBasicMaterial color="#00d4ff" transparent opacity={0.6} />
              </mesh>
            )}
          </group>
        )
      })}
    </group>
  )
}

function TestimonialCard({ testimonial, onClose }: { testimonial: Testimonial; onClose: () => void }) {
  return (
    <div className="absolute bottom-8 left-4 right-4 md:left-auto md:right-8 md:w-[400px] p-6 bg-[var(--bg-200)] border border-[var(--border-200)] rounded-xl animate-scale-in">
      {/* Reddit icon */}
      <div className="absolute top-6 right-6">
        <svg className="w-5 h-5 text-[#ff4500]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
        </svg>
      </div>

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 left-6 p-1 text-[var(--text-500)] hover:text-[var(--text-200)] transition-colors"
        aria-label="Close"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <p className="text-[var(--text-200)] leading-relaxed mb-6 mt-4 text-[15px]">
        &ldquo;{testimonial.quote}&rdquo;
      </p>

      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium text-[var(--text-100)]">{testimonial.author}</p>
          <p className="text-sm text-[var(--text-500)]">
            {testimonial.upvotes && <span className="text-[var(--accent-cyan)]">{testimonial.upvotes} upvotes</span>}
            {testimonial.upvotes && " in "}
            {testimonial.subreddit}
          </p>
        </div>
        <a
          href={testimonial.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-[var(--accent-cyan)] hover:underline"
        >
          View on Reddit
        </a>
      </div>
    </div>
  )
}

function MobileCarousel() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setCurrent((p) => (p + 1) % testimonials.length), 5000)
    return () => clearInterval(timer)
  }, [])

  const t = testimonials[current]

  return (
    <div className="relative">
      <div className="p-6 bg-[var(--bg-200)] border border-[var(--border-100)] rounded-xl min-h-[200px]">
        {/* Reddit icon */}
        <div className="absolute top-6 right-6">
          <svg className="w-5 h-5 text-[#ff4500]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
          </svg>
        </div>

        <p className="text-[var(--text-200)] leading-relaxed mb-6 pr-8 line-clamp-4">
          &ldquo;{t.quote}&rdquo;
        </p>
        <div>
          <p className="font-medium text-[var(--text-100)]">{t.author}</p>
          <p className="text-sm text-[var(--text-500)]">
            {t.upvotes && <span className="text-[var(--accent-cyan)]">{t.upvotes} upvotes</span>}
            {t.upvotes && " in "}
            {t.subreddit}
          </p>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2 mt-4">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === current ? "w-6 bg-[var(--accent-cyan)]" : "w-1.5 bg-[var(--text-600)]"
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export function TestimonialsGlobe() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [selected, setSelected] = useState<Testimonial | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [hasWebGL, setHasWebGL] = useState(true)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas")
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
      if (!gl) setHasWebGL(false)
    } catch {
      setHasWebGL(false)
    }
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const handleSelect = useCallback((t: Testimonial | null) => {
    setSelected(t)
  }, [])

  const fallbackUI = (
    <div className="h-[500px] flex items-center justify-center">
      <div className="text-center">
        <p className="text-[var(--text-500)] text-sm">3D globe unavailable</p>
        <p className="text-[var(--text-600)] text-xs mt-1">Use a WebGL-capable browser</p>
      </div>
    </div>
  )

  return (
    <section id="community" ref={ref} className="relative py-[var(--section-padding)] bg-[var(--bg-000)]">
      <div className="section-divider absolute top-0 left-0 right-0" />
      
      <div className="max-w-[var(--max-width)] mx-auto px-6">
        {/* Header */}
        <div className={`text-center mb-12 transition-all duration-500 ${visible ? "opacity-100" : "opacity-0 translate-y-4"}`}>
          <p className="text-[var(--accent-cyan)] text-sm font-mono mb-3">Community</p>
          <h2 className="font-display text-[clamp(32px,5vw,48px)] font-bold tracking-[-0.03em] text-[var(--text-100)]">
            What developers are saying
          </h2>
        </div>

        {/* Globe or Carousel */}
        <div className={`transition-all duration-500 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          {isMobile ? (
            <MobileCarousel />
          ) : hasWebGL ? (
            <div className="relative h-[500px]">
              <ErrorBoundary fallback={fallbackUI}>
                <Suspense fallback={
                  <div className="h-full flex items-center justify-center">
                    <div className="w-6 h-6 border-2 border-[var(--accent-cyan)] border-t-transparent rounded-full animate-spin" />
                  </div>
                }>
                  <Canvas
                    camera={{ position: [0, 0, 2.5], fov: 50 }}
                    dpr={[1, 2]}
                    style={{ width: "100%", height: "100%" }}
                  >
                    <Globe onSelect={handleSelect} selectedId={selected?.id ?? null} />
                  </Canvas>
                </Suspense>
              </ErrorBoundary>

              {selected && (
                <TestimonialCard testimonial={selected} onClose={() => handleSelect(null)} />
              )}

              {!selected && (
                <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-[var(--text-600)]">
                  Click on a point to read testimonial
                </p>
              )}
            </div>
          ) : (
            fallbackUI
          )}
        </div>
      </div>
    </section>
  )
}
