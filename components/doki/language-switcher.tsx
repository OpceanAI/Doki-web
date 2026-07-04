"use client"

import { useTransition } from "react"
import { useLocale } from "next-intl"
import { setCookie } from "@/lib/cookies"

const locales = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
  { code: "ja", label: "日本語" },
  { code: "de", label: "Deutsch" },
  { code: "fr", label: "Français" },
  { code: "ko", label: "한국어" },
  { code: "it", label: "Italiano" },
]

const flagLabels: Record<string, string> = {
  en: "EN", es: "ES", ja: "JA", de: "DE", fr: "FR", ko: "KO", it: "IT",
}

export function LanguageSwitcher() {
  const locale = useLocale()
  const [isPending, startTransition] = useTransition()

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value
    startTransition(() => {
      setCookie("NEXT_LOCALE", newLocale, { path: "/", maxAge: 31536000 })
      window.location.reload()
    })
  }

  return (
    <div className="relative">
      <select
        value={locale}
        onChange={handleChange}
        disabled={isPending}
        className="appearance-none bg-transparent border border-[rgba(255,255,255,0.12)] rounded-md px-3 py-1.5 text-[12px] text-[var(--mist)] hover:text-[var(--paper)] transition-colors cursor-pointer font-mono outline-none"
        aria-label="Language"
      >
        {locales.map((l) => (
          <option key={l.code} value={l.code} className="bg-[var(--ink)] text-[var(--paper)]">
            {flagLabels[l.code]} — {l.label}
          </option>
        ))}
      </select>
      <svg
        className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-[var(--mist)] pointer-events-none"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  )
}
