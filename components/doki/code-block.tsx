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
  prompt: "text-[var(--clay)]",
  flag: "text-[var(--blue)]",
  string: "text-[var(--clay)]",
  comment: "text-[var(--mist)]",
  command: "text-[var(--paper)]",
  pipe: "text-[var(--mist)]",
  variable: "text-[var(--blue)]",
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
        <span key={i} className="text-[var(--green)]">
          {line}
        </span>
      )
    }
    if (line.startsWith("✗") || line.startsWith("✘")) {
      return (
        <span key={i} className="text-red-400">
          {line}
        </span>
      )
    }
    return (
      <span key={i} className="text-[var(--paper)] opacity-70">
        {line}
      </span>
    )
  })
}

function highlightYaml(code: string) {
  return code.split("\n").map((line, i) => {
    if (line.startsWith("#")) {
      return (
        <span key={i} className="text-[var(--mist)]">
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
          <span className="text-[var(--blue)]">{key}</span>
          <span className="text-[var(--mist)]">:</span>
          <span className="text-[var(--paper)] opacity-80">{value}</span>
        </span>
      )
    }
    return (
      <span key={i} className="text-[var(--paper)] opacity-70">
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
        <span key={i} className="text-[var(--mist)]">
          {line}
        </span>
      )
    }
    const firstWord = line.split(" ")[0]
    if (keywords.includes(firstWord)) {
      const rest = line.slice(firstWord.length)
      return (
        <span key={i}>
          <span className="text-[var(--clay)]">{firstWord}</span>
          <span className="text-[var(--paper)] opacity-80">{rest}</span>
        </span>
      )
    }
    return (
      <span key={i} className="text-[var(--paper)] opacity-70">
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
    <div className={cn("rounded-lg border border-[var(--ink)] overflow-hidden bg-[var(--ink)]", className)}>
      {title && (
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-[rgba(255,255,255,0.08)]">
          <div className="flex items-center gap-2">
            <svg className="w-3.5 h-3.5 text-[var(--mist)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
            </svg>
            <span className="text-xs font-mono text-[var(--mist)]">{title}</span>
          </div>
          <button
            onClick={copyToClipboard}
            className="p-1.5 rounded-md hover:bg-[rgba(255,255,255,0.08)] text-[var(--mist)] hover:text-[var(--paper)] transition-colors"
            aria-label="Copy code"
          >
            {copied ? (
              <svg className="w-3.5 h-3.5 text-[var(--green)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
              className={cn(showLineNumbers && "[counter-increment:line] before:content-[counter(line)] before:mr-4 before:text-[var(--mist)] before:w-6 before:inline-block before:text-right before:select-none")}
            >
              {line}
            </div>
          ))}
        </code>
      </pre>
    </div>
  )
}
