import Link from "next/link"

const footerLinks = {
  Product: [
    { label: "Features",    href: "#features" },
    { label: "Performance", href: "#performance" },
    { label: "Install",     href: "#install" },
    { label: "Releases",    href: "https://github.com/OpceanAI/Doki/releases" },
  ],
  Resources: [
    { label: "Documentation", href: "/docs/home" },
    { label: "Doki-proot",    href: "https://github.com/OpceanAI/Doki-proot" },
    { label: "r/termux",      href: "https://reddit.com/r/termux" },
    { label: "Changelog",     href: "https://github.com/OpceanAI/Doki/releases" },
  ],
  Company: [
    { label: "About",        href: "https://github.com/OpceanAI" },
    { label: "GitHub",       href: "https://github.com/OpceanAI/Doki" },
    { label: "Hugging Face", href: "https://huggingface.co/OpceanAI" },
    { label: "Contact",      href: "mailto:contact@opceanai.com" },
  ],
}

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/OpceanAI/Doki",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    name: "Reddit",
    href: "https://reddit.com/r/termux",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 01-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 01.042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 014.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.143a.593.593 0 01.111-.222l.968-1.25c.14-.182.35-.292.576-.292l2.616.547z" />
      </svg>
    ),
  },
  {
    name: "Hugging Face",
    href: "https://huggingface.co/OpceanAI",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="3" width="20" height="18" rx="3" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="9" cy="10" r="1.5" fill="currentColor"/>
        <circle cx="15" cy="10" r="1.5" fill="currentColor"/>
        <path d="M8 15c.5.5 1.5 1.5 4 1.5s3.5-1 4-1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
]

export function Footer() {
  return (
    <footer className="bg-[var(--ink)] text-[var(--paper)]">
      <div className="max-w-[var(--max-width)] mx-auto px-[var(--gutter)] py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-md bg-[var(--clay)] flex items-center justify-center">
                <span className="font-sans font-bold text-foreground text-[14px]">D</span>
              </div>
              <span className="font-sans font-semibold text-[15px] tracking-[-0.01em]">
                Doki
              </span>
            </div>
            <p className="text-[13px] text-[rgba(250,249,245,0.6)] leading-relaxed font-serif">
              The universal container engine. Runs on Android, Linux, and macOS.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--mist)] mb-4">
                {title}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="text-[13px] text-[rgba(250,249,245,0.6)] hover:text-[var(--paper)] transition-colors font-serif"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-[rgba(255,255,255,0.08)]">
          <p className="text-[12px] text-[var(--mist)] font-mono">
            &copy; 2026 OpceanAI. Apache 2.0 License.
          </p>

          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-md flex items-center justify-center text-[var(--mist)] hover:text-[var(--paper)] hover:bg-[rgba(255,255,255,0.06)] transition-colors"
                aria-label={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
