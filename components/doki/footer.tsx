import Link from "next/link"

export function Footer() {
  return (
    <footer className="py-6 border-t border-[var(--border-100)] bg-[var(--bg-000)]">
      <div className="max-w-[var(--max-width)] mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-md bg-[var(--text-100)] flex items-center justify-center">
              <span className="font-display font-bold text-xs text-black">D</span>
            </div>
            <span className="text-sm text-[var(--text-500)]">Doki v0.9.1</span>
          </div>

          {/* Links */}
          <nav className="flex items-center gap-6">
            <Link href="https://github.com/OpceanAI/Doki" target="_blank" className="text-sm text-[var(--text-500)] hover:text-[var(--text-300)] transition-colors">
              GitHub
            </Link>
            <Link href="https://github.com/OpceanAI/Doki/wiki" target="_blank" className="text-sm text-[var(--text-500)] hover:text-[var(--text-300)] transition-colors">
              Docs
            </Link>
            <Link href="https://github.com/OpceanAI/Doki/releases" target="_blank" className="text-sm text-[var(--text-500)] hover:text-[var(--text-300)] transition-colors">
              Releases
            </Link>
          </nav>

          {/* Credits */}
          <p className="text-xs text-[var(--text-600)]">
            Built by{" "}
            <Link href="https://github.com/OpceanAI" target="_blank" className="text-[var(--text-500)] hover:text-[var(--text-300)] transition-colors">
              OpceanAI
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
