"use client"

import { useEffect, useRef, useState, Suspense, Component, type ReactNode } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Line } from "@react-three/drei"
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

export interface GlobeNode {
  id: string | number
  lat: number
  lng: number
  label?: string
}

export interface GlobeArc {
  from: string | number
  to: string | number
}

export interface GlobeProps {
  size?: number
  nodes?: GlobeNode[]
  arcs?: GlobeArc[]
  autoRotate?: boolean
  interactive?: boolean
  accent?: string
  onSelect?: (node: GlobeNode | null) => void
  selectedId?: string | number | null
}

const defaultNodes: GlobeNode[] = [
  { id: "ny", lat: 40.7, lng: -74.0, label: "New York" },
  { id: "london", lat: 51.5, lng: -0.1, label: "London" },
  { id: "tokyo", lat: 35.7, lng: 139.7, label: "Tokyo" },
  { id: "saopaulo", lat: -23.5, lng: -46.6, label: "São Paulo" },
  { id: "berlin", lat: 52.5, lng: 13.4, label: "Berlin" },
  { id: "sydney", lat: -33.9, lng: 151.2, label: "Sydney" },
  { id: "mumbai", lat: 19.1, lng: 72.9, label: "Mumbai" },
  { id: "lagos", lat: 6.5, lng: 3.4, label: "Lagos" },
]

const defaultArcs: GlobeArc[] = [
  { from: "ny", to: "london" },
  { from: "london", to: "berlin" },
  { from: "tokyo", to: "sydney" },
  { from: "saopaulo", to: "lagos" },
  { from: "mumbai", to: "tokyo" },
  { from: "ny", to: "saopaulo" },
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

function createArcPoints(
  from: [number, number, number],
  to: [number, number, number],
  segments: number = 32
): [number, number, number][] {
  const points: [number, number, number][] = []
  const fromVec = new THREE.Vector3(...from)
  const toVec = new THREE.Vector3(...to)

  for (let i = 0; i <= segments; i++) {
    const t = i / segments
    const point = new THREE.Vector3().lerpVectors(fromVec, toVec, t)
    const elevation = 1 + 0.15 * Math.sin(t * Math.PI)
    point.normalize().multiplyScalar(elevation)
    points.push([point.x, point.y, point.z])
  }
  return points
}

function GlobeScene({
  nodes,
  arcs,
  autoRotate,
  interactive,
  accent,
  onSelect,
  selectedId,
}: Required<Pick<GlobeProps, "nodes" | "arcs" | "autoRotate" | "interactive" | "accent">> & {
  onSelect?: GlobeProps["onSelect"]
  selectedId?: string | number | null
}) {
  const groupRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)
  const targetRotation = useRef<number | null>(null)

  useFrame((_, delta) => {
    if (!groupRef.current) return

    if (targetRotation.current !== null) {
      const diff = targetRotation.current - groupRef.current.rotation.y
      groupRef.current.rotation.y += diff * 0.05
      if (Math.abs(diff) < 0.01) targetRotation.current = null
    } else if (!hovered && selectedId === null && autoRotate) {
      groupRef.current.rotation.y += delta * 0.04
    }
  })

  const handleNodeClick = (node: GlobeNode) => {
    if (!interactive) return
    if (selectedId === node.id) {
      onSelect?.(null)
    } else {
      const theta = (node.lng + 180) * (Math.PI / 180)
      targetRotation.current = -theta + Math.PI / 2
      onSelect?.(node)
    }
  }

  const nodeMap = new Map(nodes.map((n) => [n.id, n]))

  return (
    <group ref={groupRef}>
      {}
      <mesh>
        <sphereGeometry args={[1, 96, 96]} />
        <meshBasicMaterial color="#b0aea5" wireframe transparent opacity={0.06} />
      </mesh>

      {}
      <mesh>
        <sphereGeometry args={[1.04, 64, 64]} />
        <meshBasicMaterial color={accent} transparent opacity={0.03} side={THREE.BackSide} />
      </mesh>

      {}
      {[-60, -30, 0, 30, 60].map((lat) => {
        const r = Math.cos((lat * Math.PI) / 180)
        const y = Math.sin((lat * Math.PI) / 180)
        return (
          <mesh key={lat} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[r - 0.002, r + 0.002, 64]} />
            <meshBasicMaterial color="#b0aea5" transparent opacity={0.04} />
          </mesh>
        )
      })}

      {}
      {[0, 45, 90, 135].map((lng) => (
        <mesh key={lng} rotation={[0, (lng * Math.PI) / 180, 0]}>
          <torusGeometry args={[1, 0.0015, 8, 64]} />
          <meshBasicMaterial color="#b0aea5" transparent opacity={0.03} />
        </mesh>
      ))}

      {}
      {arcs.map((arc, i) => {
        const fromNode = nodeMap.get(arc.from)
        const toNode = nodeMap.get(arc.to)
        if (!fromNode || !toNode) return null
        const fromPos = latLngToPos(fromNode.lat, fromNode.lng, 1.01)
        const toPos = latLngToPos(toNode.lat, toNode.lng, 1.01)
        const points = createArcPoints(fromPos, toPos)
        return (
          <Line
            key={`arc-${i}`}
            points={points}
            color={accent}
            lineWidth={1}
            transparent
            opacity={0.35}
            dashed
            dashSize={0.04}
            gapSize={0.02}
          />
        )
      })}

      {}
      {nodes.map((node) => {
        const pos = latLngToPos(node.lat, node.lng, 1.02)
        const isSelected = selectedId === node.id
        return (
          <group key={node.id} position={pos}>
            {}
            <mesh>
              <sphereGeometry args={[0.06, 16, 16]} />
              <meshBasicMaterial
                color={accent}
                transparent
                opacity={isSelected ? 0.4 : 0.15}
              />
            </mesh>
            {}
            <mesh
              onPointerOver={interactive ? () => setHovered(true) : undefined}
              onPointerOut={interactive ? () => setHovered(false) : undefined}
              onClick={interactive ? () => handleNodeClick(node) : undefined}
            >
              <sphereGeometry args={[0.025, 16, 16]} />
              <meshBasicMaterial color={isSelected ? accent : "#faf9f5"} />
            </mesh>
            {}
            {isSelected && (
              <mesh rotation={[Math.PI / 2, 0, 0]}>
                <ringGeometry args={[0.05, 0.07, 32]} />
                <meshBasicMaterial color={accent} transparent opacity={0.6} />
              </mesh>
            )}
          </group>
        )
      })}
    </group>
  )
}

function GlobeFallback({ size }: { size: number }) {
  return (
    <div
      className="flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg
        width={size * 0.8}
        height={size * 0.8}
        viewBox="-1.2 -1.2 2.4 2.4"
        fill="none"
      >
        <circle cx="0" cy="0" r="1" stroke="#b0aea5" strokeWidth="0.01" opacity="0.15" />
        {[-60, -30, 0, 30, 60].map((lat) => {
          const r = Math.cos((lat * Math.PI) / 180)
          const y = Math.sin((lat * Math.PI) / 180)
          return (
            <ellipse
              key={lat}
              cx="0"
              cy={-y}
              rx={r}
              ry={r * 0.3}
              stroke="#b0aea5"
              strokeWidth="0.005"
              opacity="0.1"
            />
          )
        })}
        {[0, 45, 90, 135].map((lng) => (
          <ellipse
            key={lng}
            cx="0"
            cy="0"
            rx={Math.cos((lng * Math.PI) / 180)}
            ry="1"
            stroke="#b0aea5"
            strokeWidth="0.005"
            opacity="0.08"
            transform={`rotate(${lng})`}
          />
        ))}
      </svg>
    </div>
  )
}

function GlobeSkeleton({ size }: { size: number }) {
  return (
    <div
      className="flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <div
        className="rounded-full border-2 border-[var(--mist)] border-t-[var(--clay)] animate-spin"
        style={{ width: 32, height: 32 }}
      />
    </div>
  )
}

export function Globe({
  size = 580,
  nodes = defaultNodes,
  arcs = defaultArcs,
  autoRotate = true,
  interactive = true,
  accent = "#d97757",
  onSelect,
  selectedId,
}: GlobeProps) {
  const [hasWebGL, setHasWebGL] = useState(true)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas")
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
      if (!gl) setHasWebGL(false)
    } catch {
      setHasWebGL(false)
    }

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReducedMotion(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  const effectiveAutoRotate = autoRotate && !reducedMotion

  if (!hasWebGL) {
    return <GlobeFallback size={size} />
  }

  return (
    <div style={{ width: size, height: size }} className="relative">
      <ErrorBoundary fallback={<GlobeFallback size={size} />}>
        <Suspense fallback={<GlobeSkeleton size={size} />}>
          <Canvas
            camera={{ position: [0, 0, 2.5], fov: 50 }}
            dpr={[1, Math.min(2, typeof window !== "undefined" ? window.devicePixelRatio : 1)]}
            gl={{ antialias: true, powerPreference: "low-power" }}
            style={{ width: "100%", height: "100%" }}
          >
            <GlobeScene
              nodes={nodes}
              arcs={arcs}
              autoRotate={effectiveAutoRotate}
              interactive={interactive}
              accent={accent}
              onSelect={onSelect}
              selectedId={selectedId}
            />
          </Canvas>
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}
