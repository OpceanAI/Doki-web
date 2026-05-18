"use client"

import { useState } from "react"
import Link from "next/link"

const footerLinks = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "Performance", href: "#performance" },
    { label: "Install", href: "#install" },
    { label: "Releases", href: "https://github.com/OpceanAI/Doki/releases" },
  ],
  Resources: [
    { label: "Documentation", href: "https://github.com/OpceanAI/Doki/wiki" },
    { label: "Doki-proot", href: "https://github.com/OpceanAI/Doki-proot" },
    { label: "r/termux", href: "https://reddit.com/r/termux" },
    { label: "Changelog", href: "https://github.com/OpceanAI/Doki/releases" },
  ],
  Company: [
    { label: "About", href: "https://github.com/OpceanAI" },
    { label: "GitHub", href: "https://github.com/OpceanAI/Doki" },
    { label: "Hugging Face", href: "https://huggingface.co/OpceanAI" },
    { label: "Contact", href: "mailto:contact@opceanai.com" },
  ],
}

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/OpceanAI/Doki",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    name: "Reddit",
    href: "https://reddit.com/r/termux",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 01-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 01.042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 014.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 01.14-.197.35.35 0 01.238-.042l2.906.617a1.214 1.214 0 011.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 00-.231.094.33.33 0 000 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 00.029-.463.33.33 0 00-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 00-.232-.095z"/>
      </svg>
    ),
  },
  {
    name: "Hugging Face",
    href: "https://huggingface.co/OpceanAI",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z"/>
        <circle cx="9" cy="11" r="1.5"/>
        <circle cx="15" cy="11" r="1.5"/>
        <path d="M8 15c0 0 1.5 2 4 2s4-2 4-2"/>
      </svg>
    ),
  },
]

export function Footer() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail("")
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

  return (
    <footer className="py-16 border-t border-[var(--border-100)] bg-[var(--bg-000)]" role="contentinfo">
      <div className="max-w-[var(--max-width)] mx-auto px-4 sm:px-6">
        {/* Main footer grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-7 h-7 rounded-md bg-[var(--text-100)] flex items-center justify-center">
                <span className="font-display font-bold text-sm text-black">D</span>
              </div>
              <span className="font-medium text-[var(--text-100)]">Doki</span>
            </div>
            <p className="text-sm text-[var(--text-400)] leading-relaxed mb-4">
              Run Docker containers natively on your phone. No root. No bloat.
            </p>
            {/* Social links */}
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon tap-feedback"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-medium text-[var(--text-100)] mb-4">{title}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="footer-link text-sm tap-feedback"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="py-8 border-t border-[var(--border-100)]">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-medium text-[var(--text-100)] mb-1">Stay updated</h3>
              <p className="text-xs text-[var(--text-400)]">Get notified about new releases and features.</p>
            </div>
            <form onSubmit={handleSubscribe} className="flex items-center gap-2 w-full sm:w-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="newsletter-input flex-1 sm:w-64"
                aria-label="Email address"
                required
              />
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-black bg-[var(--text-100)] rounded-lg hover:bg-[var(--text-200)] transition-colors tap-feedback whitespace-nowrap"
              >
                {subscribed ? "Subscribed!" : "Subscribe"}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-[var(--border-100)]">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-md bg-[var(--text-100)] flex items-center justify-center">
              <span className="font-display font-bold text-xs text-black">D</span>
            </div>
            <span className="text-sm text-[var(--text-500)]">Doki v0.9.1</span>
          </div>

          <p className="text-xs text-[var(--text-600)]">
            Built by{" "}
            <Link href="https://github.com/OpceanAI" target="_blank" className="text-[var(--text-500)] hover:text-[var(--text-300)] transition-colors">
              OpceanAI
            </Link>
            {" "}· {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  )
}
