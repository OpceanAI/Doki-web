"use client"

interface BeamProps {
  fromX?: number
  fromY?: number
  toX?: number
  toY?: number
  className?: string
}

export function Beam({ fromX = 0, fromY = 50, toX = 100, toY = 50, className = "" }: BeamProps) {
  const midX = (fromX + toX) / 2
  const curveY = Math.min(fromY, toY) - 15

  return (
    <svg
      className={`absolute pointer-events-none ${className}`}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      fill="none"
    >
      <path
        d={`M ${fromX} ${fromY} Q ${midX} ${curveY} ${toX} ${toY}`}
        stroke="url(#beam-gradient)"
        strokeWidth="0.5"
        className="beam-line"
      />
      <path
        d={`M ${fromX} ${fromY} Q ${midX} ${curveY} ${toX} ${toY}`}
        stroke="url(#beam-gradient)"
        strokeWidth="0.3"
        className="beam-line-delay-1"
      />
      <path
        d={`M ${fromX} ${fromY} Q ${midX} ${curveY} ${toX} ${toY}`}
        stroke="url(#beam-gradient)"
        strokeWidth="0.2"
        className="beam-line-delay-2"
      />
      <defs>
        <linearGradient id="beam-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--accent-cyan)" stopOpacity="0" />
          <stop offset="50%" stopColor="var(--accent-cyan)" stopOpacity="1" />
          <stop offset="100%" stopColor="var(--accent-cyan)" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  )
}
