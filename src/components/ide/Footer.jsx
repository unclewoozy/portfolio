import { useSiteData } from '../../SiteData'
import { ROUTES } from './explorer-data'

export default function Footer() {
  const { CONTACT, PROFILE } = useSiteData()
  const year = new Date().getFullYear()

  const go = (id) => (e) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const email = CONTACT.details.find((d) => d.label?.toLowerCase() === 'email')
  const linkedin = CONTACT.details.find((d) => d.label?.toLowerCase() === 'linkedin')

  return (
    <footer className="reveal relative">
      <div className="border-t border-paper/10 pt-10 md:pt-14">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-fog">
          <span className="text-accent">//</span> end of file
        </p>
        <h2 className="mt-3 max-w-2xl font-display text-4xl font-bold uppercase leading-[0.95] tracking-tight text-paper md:text-6xl">
          Have an idea?
          <br />
          Let's build it.
        </h2>
        <div className="mt-7 flex flex-wrap items-center gap-3">
          <a
            href="#contact"
            onClick={go('contact')}
            className="btn-primary inline-flex items-center gap-3 rounded-lg px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-paper"
          >
            Start a conversation
            <span aria-hidden="true">→</span>
          </a>
          {email && (
            <a
              href={email.href}
              className="inline-flex items-center gap-3 rounded-lg border border-paper/20 px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-paper/80 transition-colors hover:border-accent/60 hover:text-accent"
            >
              {email.value}
            </a>
          )}
        </div>

        <div className="mt-10 grid gap-8 border-t border-paper/10 pt-8 sm:grid-cols-2">
          <nav aria-label="Sitemap">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-fog/60">sitemap</p>
            <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2">
              {ROUTES.filter((r) => r.id !== 'terminal').map((r) => (
                <li key={r.id}>
                  <a
                    href={`#${r.id}`}
                    onClick={go(r.id)}
                    className="group font-mono text-[12px] text-fog transition-colors hover:text-accent"
                  >
                    <span className="text-accent/50 group-hover:text-accent" aria-hidden="true">❯ </span>
                    {r.file}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-fog/60">elsewhere</p>
            <ul className="mt-3 space-y-2">
              {linkedin && (
                <li>
                  <a
                    href={linkedin.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group font-mono text-[12px] text-fog transition-colors hover:text-accent"
                  >
                    <span className="text-accent/50 group-hover:text-accent" aria-hidden="true">❯ </span>
                    LinkedIn — {PROFILE.name}
                  </a>
                </li>
              )}
              <li className="font-mono text-[12px] text-fog/60">{PROFILE.location}</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-2 border-t border-paper/10 py-5 font-mono text-[10px] uppercase tracking-[0.2em] text-fog/60">
          <p>© {year} {PROFILE.name}</p>
          <p>
            built with <span className="text-paper/80">react</span> +{' '}
            <span className="text-paper/80">tailwind</span>
          </p>
        </div>
      </div>

    </footer>
  )
}
