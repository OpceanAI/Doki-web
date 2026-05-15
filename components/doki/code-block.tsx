"use client"

import { useState, useCallback } from "react"
import { cn } from "@/lib/utils"

interface CodeBlockProps {
  code: string
  language?: string
  title?: string
  showLineNumbers?: boolean
  className?: string
}

const bashColors: Record<string, string> = {
  prompt: "text-[#28c840]",
  flag: "text-[var(--accent-cyan)]",
  string: "text-[#f0a500]",
  comment: "text-[#666666]",
  command: "text-[var(--text-100)]",
  pipe: "text-[#ff0080]",
  variable: "text-[#7928ca]",
}

function highlightBash(code: string) {
  return code.split("\n").map((line, i) => {
    if (line.startsWith("#")) {
      return (
        <span key={i} className={bashColors.comment}>
          {line}
        </span>
      )
    }
    if (line.startsWith("$")) {
      const parts = line.split(" ")
      return (
        <span key={i}>
          <span className={bashColors.prompt}>$</span>
          {parts.slice(1).map((part, j) => {
            if (part.startsWith("-") || part.startsWith("--")) {
              return (
                <span key={j} className={bashColors.flag}>
                  {" "}{part}
                </span>
              )
            }
            if (part.startsWith('"') || part.startsWith("'")) {
              return (
                <span key={j} className={bashColors.string}>
                  {" "}{part}
                </span>
              )
            }
            if (part === "|" || part === "&&" || part === "||") {
              return (
                <span key={j} className={bashColors.pipe}>
                  {" "}{part}
                </span>
              )
            }
            if (part.includes("=")) {
              const [key, ...rest] = part.split("=")
              return (
                <span key={j}>
                  <span className={bashColors.variable}>{" "}{key}</span>=
                  <span className={bashColors.string}>{rest.join("=")}</span>
                </span>
              )
            }
            return (
              <span key={j} className={bashColors.command}>
                {" "}{part}
              </span>
            )
          })}
        </span>
      )
    }
    if (line.startsWith("✓") || line.startsWith("✔")) {
      return (
        <span key={i} className="text-[var(--accent-cyan)]">
          {line}
        </span>
      )
    }
    if (line.startsWith("✗") || line.startsWith("✘")) {
      return (
        <span key={i} className="text-[#ff5f57]">
          {line}
        </span>
      )
      }
    return (
      <span key={i} className="text-[var(--text-400)]">
        {line}
      </span>
    )
  })
}

function highlightYaml(code: string) {
  return code.split("\n").map((line, i) => {
    if (line.startsWith("#")) {
      return (
        <span key={i} className="text-[#666666]">
          {line}
        </span>
      )
    }
    const colonIdx = line.indexOf(":")
    if (colonIdx > 0 && !line.includes("  ")) {
      const key = line.slice(0, colonIdx)
      const value = line.slice(colonIdx + 1)
      return (
        <span key={i}>
          <span className="text-[var(--accent-cyan)]">{key}</span>
          <span className="text-[var(--text-500)]">:</span>
          <span className="text-[var(--text-200)]">{value}</span>
        </span>
      )
    }
    return (
      <span key={i} className="text-[var(--text-400)]">
        {line}
      </span>
    )
  })
}

function highlightDockerfile(code: string) {
  const keywords = ["FROM", "RUN", "CMD", "LABEL", "EXPOSE", "ENV", "ADD", "COPY", "ENTRYPOINT", "VOLUME", "USER", "WORKDIR", "ARG", "ONBUILD", "STOPSIGNAL", "HEALTHCHECK", "SHELL", "MAINTAINER", "AS"]
  return code.split("\n").map((line, i) => {
    if (line.startsWith("#")) {
      return (
        <span key={i} className="text-[#666666]">
          {line}
        </span>
      )
    }
    const firstWord = line.split(" ")[0]
    if (keywords.includes(firstWord)) {
      const rest = line.slice(firstWord.length)
      return (
        <span key={i}>
          <span className="text-[#ff0080]">{firstWord}</span>
          <span className="text-[var(--text-200)]">{rest}</span>
        </span>
      )
    }
    return (
      <span key={i} className="text-[var(--text-400)]">
        {line}
      </span>
    )
  })
}

export function CodeBlock({ code, language = "bash", title, showLineNumbers, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = useCallback(async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [code])

  const highlight = () => {
    switch (language) {
      case "yaml":
        return highlightYaml(code)
      case "dockerfile":
        return highlightDockerfile(code)
      default:
        return highlightBash(code)
    }
  }

  return (
    <div className={cn("rounded-xl border border-[var(--border-100)] overflow-hidden bg-[var(--bg-000)]", className)}>
      {title && (
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-[var(--border-100)] bg-[var(--bg-100)]">
          <div className="flex items-center gap-2">
            <svg className="w-3.5 h-3.5 text-[var(--text-500)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
            </svg>
            <span className="text-xs font-mono text-[var(--text-400)]">{title}</span>
          </div>
          <button
            onClick={copyToClipboard}
            className="p-1.5 rounded-md hover:bg-[var(--bg-300)] text-[var(--text-500)] hover:text-[var(--text-200)] transition-colors"
            aria-label="Copy code"
          >
            {copied ? (
              <svg className="w-3.5 h-3.5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            )}
          </button>
        </div>
      )}
      <pre className={cn("p-4 text-[13px] leading-relaxed overflow-x-auto", showLineNumbers && "[counter-reset:line]")}>
        <code className="font-mono">
          {highlight().map((line, i) => (
            <div
              key={i}
              className={cn(showLineNumbers && "[counter-increment:line] before:content-[counter(line)] before:mr-4 before:text-[var(--text-600)] before:w-6 before:inline-block before:text-right before:select-none")}
            >
              {line}
            </div>
          ))}
        </code>
      </pre>
    </div>
  )
}
