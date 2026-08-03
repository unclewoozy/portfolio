import { useEffect, useState } from 'react'
import { NAV_LINKS, PROFILE } from '../data/site'
import useScrollSpy from '../hooks/useScrollSpy'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const active = useScrollSpy(NAV_LINKS.map((l) => l.id))

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const go = (e, id) => {
    e.preventDefault()
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 px-3 pt-3 sm:px-5">
        <nav className="glass mx-auto flex h-14 max-w-6xl items-center justify-between rounded-full px-5 md:h-16 md:px-6">
          <a
            href="#home"
            onClick={(e) => go(e, 'home')}
            className="font-mono text-sm font-semibold text-paper"
            aria-label="Back to top"
          >
            <span className="text-accent">~/</span>
            portfolio<span className="text-accent">.</span>dev
          </a>

          <ul className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link, i) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={(e) => go(e, link.id)}
                  className={`group relative flex items-center gap-2 px-3 py-2 font-mono text-[11px] uppercase tracking-[0.2em] transition-colors ${
                    active === link.id ? 'text-accent' : 'text-fog hover:text-paper'
                  }`}
                >
                  <span className={active === link.id ? 'text-accent' : 'text-fog-dark/70'}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {link.label}
                  {active === link.id && (
                    <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-dot" aria-hidden="true" />
                  )}
                  <span
                    className={`absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-accent transition-transform duration-300 origin-left ${
                      active === link.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-50'
                    }`}
                    aria-hidden="true"
                  />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <span className="hidden xl:flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-fog">
              <span className="h-2 w-2 rounded-full bg-accent animate-pulse-dot" aria-hidden="true" />
              Open to work
            </span>
            <a
              href={PROFILE.resumeDownload}
              className="glass-chip hidden md:inline-flex items-center gap-2 rounded-full px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-paper transition-all hover:bg-accent hover:text-ink"
            >
              Resume <span className="text-accent">↓</span>
            </a>
            <button
              type="button"
              onClick={() => setOpen(!open)}
              className="glass-chip lg:hidden flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              <span
                className={`h-0.5 w-5 rounded-full bg-paper transition-all duration-300 ${
                  open ? 'translate-y-1 rotate-45' : ''
                }`}
              />
              <span
                className={`h-0.5 w-5 rounded-full bg-paper transition-all duration-300 ${
                  open ? '-translate-y-1 -rotate-45' : ''
                }`}
              />
            </button>
          </div>
        </nav>
      </header>

      <div
        className={`fixed inset-0 z-40 bg-ink lg:hidden transition-opacity duration-300 ${
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!open}
        inert={!open}
      >
        <div className="flex h-full flex-col justify-between px-6 pb-8 pt-28">
          <nav>
            <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.35em] text-fog">
              index — main
            </p>
            <ul className="space-y-1">
              {NAV_LINKS.map((link, i) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={(e) => go(e, link.id)}
                    className="group flex items-baseline gap-4 border-b border-paper/10 py-4"
                  >
                    <span className="font-mono text-xs text-fog">{String(i + 1).padStart(2, '0')}</span>
                    <span className="font-display text-4xl font-bold uppercase tracking-tight text-paper transition-colors group-hover:text-accent">
                      {link.label}
                    </span>
                    <span className="ml-auto text-fog">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center justify-between">
            <a
              href={PROFILE.resumeDownload}
              className="rounded-full border-2 border-accent bg-accent px-5 py-3 font-mono text-xs uppercase tracking-[0.2em] text-ink"
            >
              Resume ↓
            </a>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs uppercase tracking-[0.2em] text-fog hover:text-accent"
            >
              LinkedIn ↗
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
