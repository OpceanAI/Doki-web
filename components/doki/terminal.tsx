"use client"

import { useEffect, useRef, useState } from "react"

interface TerminalLine {
  type: "prompt" | "output" | "success" | "error" | "info"
  text: string
}

interface TerminalCommand {
  prompt: string
  lines: TerminalLine[]
}

const commands: TerminalCommand[] = [
  {
    prompt: "$ curl -sL doki.opceanai.com | sh",
    lines: [
      { type: "info", text: "==> Installing Doki CLI" },
      { type: "info", text: "==> Detected platform: Android/Termux (ARM64)" },
      { type: "info", text: "==> Version: v0.9.1" },
      { type: "info", text: "==> Downloading binaries..." },
      { type: "success", text: "✓ Doki v0.9.1 installed successfully." },
    ],
  },
  {
    prompt: "$ doki pull alpine",
    lines: [
      { type: "info", text: "Pulling alpine:latest..." },
      { type: "info", text: "Resolving ARM64 manifest..." },
      { type: "info", text: "Downloading 3 layers (4.0 MB)" },
      { type: "success", text: "✓ Pulled in 2.1s" },
    ],
  },
  {
    prompt: "$ doki run alpine echo \"Hello from Doki\"",
    lines: [
      { type: "output", text: "Hello from Doki" },
      { type: "success", text: "✓ Started in 10ms" },
    ],
  },
  {
    prompt: "$ doki-compose up",
    lines: [
      { type: "info", text: "Creating network doki_default" },
      { type: "info", text: "Creating db ... done" },
      { type: "info", text: "Creating redis ... done" },
      { type: "info", text: "Creating web ... done" },
      { type: "success", text: "✓ 3 services running" },
    ],
  },
]

function BlinkingCursor() {
  return (
    <span className="inline-block w-2 h-4 bg-[var(--accent-cyan)] animate-pulse-dot ml-0.5" />
  )
}

export function Terminal() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [currentCommand, setCurrentCommand] = useState(0)
  const [currentLine, setCurrentLine] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const [typedPrompt, setTypedPrompt] = useState("")
  const [typedLines, setTypedLines] = useState<TerminalLine[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!visible) return

    const cmd = commands[currentCommand]

    // Type prompt
    setIsTyping(true)
    setTypedPrompt("")
    setTypedLines([])
    setCurrentLine(0)

    let promptIndex = 0
    const promptInterval = setInterval(() => {
      if (promptIndex < cmd.prompt.length) {
        setTypedPrompt(cmd.prompt.slice(0, promptIndex + 1))
        promptIndex++
      } else {
        clearInterval(promptInterval)
        setIsTyping(false)
      }
    }, 30)

    // Show output lines after prompt
    const lineTimeouts = cmd.lines.map((_, i) =>
      setTimeout(() => {
        setCurrentLine(i + 1)
        setTypedLines(cmd.lines.slice(0, i + 1))
      }, 800 + i * 400)
    )

    // Move to next command
    const nextTimeout = setTimeout(() => {
      setCurrentCommand((prev) => (prev + 1) % commands.length)
    }, 3500 + cmd.lines.length * 400)

    return () => {
      clearInterval(promptInterval)
      lineTimeouts.forEach(clearTimeout)
      clearTimeout(nextTimeout)
    }
  }, [visible, currentCommand])

  const lineColor = (type: TerminalLine["type"]) => {
    switch (type) {
      case "success": return "text-[var(--accent-cyan)]"
      case "error": return "text-[#ff5f57]"
      case "info": return "text-[var(--text-400)]"
      case "output": return "text-[var(--text-200)]"
      default: return "text-[var(--text-300)]"
    }
  }

  return (
    <section ref={ref} className="relative py-[var(--section-padding)] bg-[var(--bg-100)]">
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="max-w-[var(--max-width)] mx-auto px-6">
        {/* Header */}
        <div className={`text-center mb-12 transition-all duration-500 ${visible ? "opacity-100" : "opacity-0 translate-y-4"}`}>
          <p className="text-[var(--accent-cyan)] text-sm font-mono mb-3">Try it</p>
          <h2 className="font-display text-[clamp(32px,5vw,48px)] font-bold tracking-[-0.03em] text-[var(--text-100)] mb-4">
            See it in action.
          </h2>
          <p className="max-w-lg mx-auto text-[var(--text-400)] leading-relaxed">
            One command is all it takes. Doki handles the rest.
          </p>
        </div>

        {/* Terminal Window */}
        <div className={`max-w-2xl mx-auto transition-all duration-500 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="rounded-xl border border-[var(--border-100)] overflow-hidden bg-[var(--bg-000)] shadow-2xl shadow-black/50">
            {/* Title bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--border-100)] bg-[var(--bg-100)]">
              {/* Traffic lights */}
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <div className="w-3 h-3 rounded-full bg-[#28c840]" />
              </div>
              {/* Title */}
              <div className="flex-1 text-center">
                <span className="text-xs text-[var(--text-500)] font-mono">doki — zsh</span>
              </div>
              {/* Spacer for centering */}
              <div className="w-14" />
            </div>

            {/* Terminal body */}
            <div className="p-5 font-mono text-[13px] leading-relaxed min-h-[280px]">
              {/* Previous commands (faded) */}
              {commands.slice(0, currentCommand).map((cmd, i) => (
                <div key={i} className="mb-3 opacity-40">
                  <div className="text-[#28c840]">{cmd.prompt}</div>
                  {cmd.lines.map((line, j) => (
                    <div key={j} className={`pl-4 ${lineColor(line.type)}`}>
                      {line.text}
                    </div>
                  ))}
                </div>
              ))}

              {/* Current command */}
              <div className="mb-3">
                <div className="text-[#28c840]">
                  {typedPrompt}
                  {isTyping && <BlinkingCursor />}
                </div>
                {!isTyping && typedLines.map((line, i) => (
                  <div key={i} className={`pl-4 ${lineColor(line.type)} animate-fade-in`}>
                    {line.text}
                  </div>
                ))}
                {!isTyping && currentLine < commands[currentCommand].lines.length && <BlinkingCursor />}
              </div>

              {/* Next command indicator */}
              {!isTyping && currentLine >= commands[currentCommand].lines.length && (
                <div className="text-[var(--text-600)] text-xs mt-4 animate-pulse">
                  next command in 3s...
                </div>
              )}
            </div>
          </div>

          {/* Command indicators */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {commands.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentCommand(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === currentCommand
                    ? "w-6 bg-[var(--accent-cyan)]"
                    : i < currentCommand
                      ? "w-1.5 bg-[var(--accent-cyan)] opacity-40"
                      : "w-1.5 bg-[var(--text-600)]"
                }`}
                aria-label={`Show command ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
