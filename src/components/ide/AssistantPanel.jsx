import { useEffect, useState } from 'react'
import { Compass, Command } from 'lucide-react'
import { useSiteData } from '../../SiteData'

const COMMANDS = [
  { id: 'about', label: 'open about.me', keys: ['g', 'a'] },
  { id: 'skills', label: 'open skills.json', keys: ['g', 's'] },
  { id: 'projects', label: 'open projects/', keys: ['g', 'p'] },
  { id: 'experience', label: 'open experience/', keys: ['g', 'e'] },
  { id: 'contact', label: 'open contact/', keys: ['g', 'c'] },
]

export default function AssistantPanel({ onViewResume }) {
  const { PROFILE, SKILLS } = useSiteData()
  const go = (id) => (e) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? Math.min(100, Math.max(0, (window.scrollY / max) * 100)) : 0)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update, { passive: true })
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <div className="flex h-full flex-col overflow-hidden" aria-label="Navigator panel">
      <div className="flex items-center justify-between border-b border-paper/15 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <Compass className="h-3.5 w-3.5 text-accent" strokeWidth={2} />
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-paper">navigator</p>
        </div>
        <span className="flex items-center gap-1 rounded-md border border-paper/15 bg-white/5 px-1.5 py-0.5 font-mono text-[9px] text-fog">
          <Command className="h-2.5 w-2.5" strokeWidth={2.5} />
          K
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
            <div
              className="h-full rounded-full bg-gradient-to-r from-accent via-accent to-lime transition-[width] duration-150 ease-out"
              style={{ width: `${progress}%` }}
              aria-hidden="true"
            />
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
          <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-accent">// goto</p>
          <nav className="mt-2 space-y-1">
            {COMMANDS.map((c) => (
              <a
                key={c.id}
                href={`#${c.id}`}
                onClick={go(c.id)}
                className="group flex items-center gap-2.5 rounded-lg border border-transparent px-2.5 py-1.5 font-mono text-[11px] text-fog transition-colors hover:border-white/10 hover:bg-white/5 hover:text-paper"
              >
                <span className="text-accent/60 transition-colors group-hover:text-accent" aria-hidden="true">
                  ❯
                </span>
                <span className="truncate">{c.label}</span>
                <span className="ml-auto flex shrink-0 items-center gap-1">
                  {c.keys.map((k) => (
                    <kbd
                      key={k}
                      className="rounded border border-paper/15 bg-white/5 px-1 py-px font-mono text-[9px] text-fog/70 group-hover:text-fog"
                    >
                      {k}
                    </kbd>
                  ))}
                </span>
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

      <div className="flex items-center justify-between border-t border-paper/15 px-4 py-2">
        <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-fog/70">cmd palette</p>
        <p className="font-mono text-[9px] text-fog/50">{COMMANDS.length} cmds</p>
      </div>
    </div>
  )
}
