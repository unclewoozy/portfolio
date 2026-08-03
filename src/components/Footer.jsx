import { NAV_LINKS, PROFILE } from '../data/site'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden border-t border-paper/15">
      <div className="mx-auto max-w-6xl px-5 md:px-6 py-14 md:py-20">
        <div className="grid gap-10 md:grid-cols-[1fr_1fr_auto]">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-fog">(07) — footer</p>
            <p className="mt-4 font-mono text-sm text-paper">
              <span className="text-accent">~/</span>
              portfolio<span className="text-accent">.</span>dev
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-fog">
              Full Stack Web Developer & IT Specialist — building scalable, AI-assisted solutions from
              Calamba, Philippines.
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-fog">index</p>
            <ul className="mt-4 grid grid-cols-2 gap-x-8 gap-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={(e) => {
                      e.preventDefault()
                      document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth' })
                    }}
                    className="link-line font-mono text-xs uppercase tracking-[0.2em] text-fog transition-colors hover:text-accent"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex gap-3 md:flex-col">
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="glass-chip flex h-11 w-11 items-center justify-center rounded-full font-mono text-sm text-paper transition-all hover:bg-accent hover:text-ink"
            >
              in
            </a>
            <a
              href={`mailto:${PROFILE.email}`}
              aria-label="Send email"
              className="glass-chip flex h-11 w-11 items-center justify-center rounded-full font-mono text-sm text-paper transition-all hover:bg-accent hover:text-ink"
            >
              @
            </a>
            <a
              href={`tel:${PROFILE.phone.replace(/\s/g, '')}`}
              aria-label="Call"
              className="glass-chip flex h-11 w-11 items-center justify-center rounded-full font-mono text-sm text-paper transition-all hover:bg-accent hover:text-ink"
            >
              ☎
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-paper/15 pt-6 md:flex-row">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-fog">
            © {year} {PROFILE.name} — all rights reserved
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-fog">
            built with <span className="text-accent">react</span> +{' '}
            <span className="text-accent">tailwind</span> — deploy: <span className="text-accent">vercel</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
