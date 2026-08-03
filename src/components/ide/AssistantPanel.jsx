import { ArrowUpRight, Compass } from 'lucide-react'
import { PROFILE, SKILLS } from '../../data/site'

const QUICK = [
  { id: 'about', label: 'about.me', icon: '◈' },
  { id: 'skills', label: 'skills.json', icon: '{}' },
  { id: 'projects', label: 'projects/', icon: '▣' },
  { id: 'experience', label: 'experience/', icon: '▤' },
  { id: 'contact', label: 'contact/', icon: '✉' },
]

export default function AssistantPanel({ onViewResume }) {
  const go = (id) => (e) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="flex h-full flex-col overflow-hidden" aria-label="Navigator panel">
      <div className="flex items-center justify-between border-b border-paper/15 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <Compass className="h-3.5 w-3.5 text-accent" strokeWidth={2} />
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-paper">navigator</p>
        </div>
        <span className="flex items-center gap-1.5 font-mono text-[10px] text-accent">
          <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-dot" aria-hidden="true" />
          online
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="relative">
          <div className="pointer-events-none absolute -inset-3 rounded-2xl bg-accent/5 blur-xl" aria-hidden="true" />
          <div className="relative flex items-center gap-3">
            <div className="relative shrink-0">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-accent/40 to-transparent blur-sm" aria-hidden="true" />
              <img
                src={PROFILE.photo}
                alt=""
                className="relative h-12 w-12 rounded-xl object-cover object-top grayscale"
                loading="lazy"
              />
              <span className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-ink bg-lime" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <p className="truncate font-display text-sm font-bold uppercase tracking-tight">
                {PROFILE.name}
              </p>
              <p className="truncate font-mono text-[10px] uppercase tracking-[0.2em] text-fog">
                full stack / it specialist
              </p>
            </div>
          </div>
        </div>

        <div className="mt-5 rounded-xl border border-white/10 bg-white/5 p-3">
          <div className="flex items-center justify-between">
            <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-accent">// status</p>
            <span className="rounded border border-lime/30 bg-lime/10 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-lime">
              available
            </span>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-paper/70">
            Full Stack Web Developer & IT Specialist from Calamba, PH. Building since 2023 — currently
            open to work.
          </p>
          <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-full origin-left rounded-full bg-gradient-to-r from-accent via-accent to-lime animate-progress" aria-hidden="true" />
          </div>
        </div>

        <div className="mt-5">
          <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-accent">// current stack</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {SKILLS.featured.map((s) => (
              <span key={s.name} className="glass-chip rounded-full px-2.5 py-1 font-mono text-[10px] text-paper/75">
                {s.name}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-5">
          <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-accent">// quick open</p>
          <nav className="mt-2 space-y-1">
            {QUICK.map((q) => (
              <a
                key={q.id}
                href={`#${q.id}`}
                onClick={go(q.id)}
                className="group flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 font-mono text-[11px] text-fog transition-colors hover:bg-white/5 hover:text-paper"
              >
                <span className="w-5 text-center text-xs text-accent/60 group-hover:text-accent" aria-hidden="true">
                  {q.icon}
                </span>
                <span className="truncate">~/portfolio/{q.label}</span>
                <ArrowUpRight
                  className="ml-auto h-3.5 w-3.5 shrink-0 text-fog/40 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </a>
            ))}
          </nav>
        </div>

        <button
          type="button"
          onClick={onViewResume}
          className="mt-5 w-full rounded-xl border border-accent/40 bg-accent/10 px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.25em] text-accent transition-colors hover:bg-accent hover:text-ink"
        >
          Open resume.pdf
        </button>
      </div>
    </div>
  )
}
