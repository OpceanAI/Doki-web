import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Doki — Container Engine for Android'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#000',
          fontFamily: 'Inter, system-ui, sans-serif',
        }}
      >
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: 12,
            background: 'linear-gradient(135deg, #00d4ff, #00a8cc)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 24,
          }}
        >
          <span style={{ fontSize: 36, fontWeight: 800, color: '#000' }}>D</span>
        </div>
        <h1 style={{ fontSize: 56, fontWeight: 800, color: '#fafafa', letterSpacing: '-0.04em', marginBottom: 12 }}>
          Doki
        </h1>
        <p style={{ fontSize: 24, color: '#888', maxWidth: 600, textAlign: 'center', lineHeight: 1.4 }}>
          Container engine for Android. Docker on your phone. No root.
        </p>
        <div
          style={{
            marginTop: 32,
            padding: '10px 20px',
            borderRadius: 9999,
            background: '#0a0a0a',
            border: '1px solid rgba(255,255,255,0.08)',
            fontSize: 14,
            color: '#a1a1a1',
            fontFamily: 'JetBrains Mono, monospace',
          }}
        >
          v0.10.0 · dok1.xyz
        </div>
      </div>
    ),
    { ...size }
  )
}
