"use client"

export function MeshGradient() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-[-10%] left-[10%] w-[500px] h-[500px] rounded-full bg-[var(--accent-cyan)] opacity-[0.06] blur-[120px] blob-1" />
      <div className="absolute top-[20%] right-[5%] w-[400px] h-[400px] rounded-full bg-[#8b5cf6] opacity-[0.05] blur-[100px] blob-2" />
      <div className="absolute bottom-[10%] left-[30%] w-[350px] h-[350px] rounded-full bg-[#ec4899] opacity-[0.04] blur-[100px] blob-3" />
      <div className="absolute top-[50%] left-[60%] w-[300px] h-[300px] rounded-full bg-[#38bdf8] opacity-[0.04] blur-[80px] blob-4" />
    </div>
  )
}
