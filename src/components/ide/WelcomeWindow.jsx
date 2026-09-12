import { useEffect, useState } from 'react'
import { useSiteData } from '../../SiteData'
import IdeWindow from './IdeWindow'

const TYPED_LINES = [
  '❯ whoami — sigmund godfrey m. dela cruz',
  '❯ role --current — full stack web developer / it specialist',
  '❯ status --check — ● open to work',
]

function useTypingLines(lines, active) {
  const [typed, setTyped] = useState([])

  useEffect(() => {
    if (!active) {
      setTyped([])
      return
    }
    let timer
    let ci = 0
    const str = lines.join('\n')
    const total = str.length
    const step = () => {
      setTyped(str.slice(0, ci).split('\n'))
      ci++
      if (ci <= total) timer = setTimeout(step, 30 + Math.random() * 40)
    }
    timer = setTimeout(step, 200)
    return () => clearTimeout(timer)
  }, [active, lines])

  return typed
}

function PhotoCard({ photo }) {
  const [hovered, setHovered] = useState(false)
  const typed = useTypingLines(TYPED_LINES, hovered)
  const last = typed.length - 1
  const typingDone =
    typed.length === TYPED_LINES.length && typed[last] === TYPED_LINES[last]

  useEffect(() => {
    if (!window.matchMedia('(hover: hover)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t1 = setTimeout(() => setHovered(true), 1200)
    const t2 = setTimeout(() => setHovered(false), 5600)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  return (
    <div className="tile relative overflow-hidden">
      <figure
        className="group relative select-none"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => setHovered((h) => !h)}
      >        <div className="relative overflow-hidden">
          <img
            src={photo}
            alt="Portrait of Sigmund Godfrey M. Dela Cruz"
            draggable={false}
            className="aspect-[4/5] w-full object-cover object-top transition-all duration-700 group-hover:scale-[1.03]"
            loading="eager"
          />
          <div
            className={`absolute inset-0 z-10 flex flex-col justify-end gap-1 bg-ink/75 p-4 font-mono text-[11px] leading-relaxed backdrop-blur-[2px] transition-opacity duration-300 md:text-xs ${
              hovered ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {typed.map((line, i) => (
              <p key={i} className={i === last ? 'text-paper' : 'text-paper/70'}>
                {line}
                {i === last && !typingDone && (
                  <span
                    className="ml-1 inline-block h-3.5 w-2 translate-y-0.5 bg-lime animate-blink"
                    aria-hidden="true"
                  />
                )}
              </p>
            ))}
          </div>
        </div>
      </figure>
      <figcaption className="relative z-10 flex items-center justify-between gap-3 border-t border-paper/10 bg-ink/40 px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-fog">
        <span className="truncate">profile.jpg</span>
      </figcaption>
    </div>
  )
}

export default function WelcomeWindow({ onViewResume }) {
  const { ABOUT, PROFILE, PROJECTS, CERTIFICATIONS, EXPERIENCE } = useSiteData()
  // Stats are derived from the source arrays (projects, certs, roles) so the
  // numbers can't drift out of sync with the sections below.
  const stats = [
    { value: PROJECTS.length, suffix: '+', label: 'Projects Built', icon: 'fa-layer-group' },
    { value: CERTIFICATIONS.length, suffix: '', label: 'Certifications', icon: 'fa-award' },
    { value: EXPERIENCE.length, suffix: '', label: 'Industry Roles', icon: 'fa-briefcase' },
    { value: 3, suffix: '+', label: 'Years Hands-On', icon: 'fa-clock' },
  ]
  const go = (id) => (e) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <IdeWindow id="home">
      <div className="mb-8 flex flex-wrap items-center gap-x-4 gap-y-1 border-y border-paper/10 py-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-fog md:mb-10">
        <span className="flex items-center gap-1.5 text-lime">
          <span className="h-1.5 w-1.5 rounded-full bg-lime animate-pulse-dot" aria-hidden="true" />
          open to work
        </span>
        <span className="text-accent/60" aria-hidden="true">/</span>
        <span className="truncate">{PROFILE.location}</span>
        <span className="hidden text-accent/60 sm:inline" aria-hidden="true">/</span>
        <span className="hidden truncate sm:inline">{ABOUT.education[0].program}</span>
      </div>
      <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
        <div className="relative">
            <p className="font-mono text-[11px] md:text-xs uppercase tracking-[0.35em] text-fog">
              <span className="text-accent">❯</span> Full Stack Web Developer <span className="text-accent">/</span> IT Specialist
            </p>

            <h1 className="mt-4 font-display font-bold uppercase leading-[0.95] tracking-tight text-paper">
              <span className="block text-[clamp(2.75rem,7vw,5.25rem)]">
                Sigmund
              </span>
              <span className="block text-[clamp(2.75rem,7vw,5.25rem)]">
                Godfrey M.
              </span>
              <span className="block text-[clamp(2.75rem,7vw,5.25rem)]">
                Dela Cruz
              </span>
            </h1>

            <div className="mx-auto mt-6 w-full max-w-[300px] sm:max-w-[340px] lg:hidden">
              <PhotoCard photo={PROFILE.photo} />
            </div>

            <p className="mt-6 max-w-xl text-sm md:text-base leading-relaxed text-paper/70">
              {PROFILE.tagline}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-2.5">
              <a
                href="#projects"
                onClick={go('projects')}
                className="btn-primary inline-flex items-center gap-3 rounded-lg px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-paper"
              >
                Open projects/
                <span className="transition-transform group-hover:translate-y-0.5">↓</span>
              </a>
              <a
                href="#contact"
                onClick={go('contact')}
                className="glass-chip inline-flex items-center gap-3 rounded-lg px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-paper transition-all hover:bg-paper hover:text-ink"
              >
                Initiate contact
              </a>
              <button
                type="button"
                onClick={onViewResume}
                className="group inline-flex items-center gap-2 rounded-lg border border-paper/20 px-5 py-3 font-mono text-xs uppercase tracking-[0.2em] text-paper/80 transition-colors hover:border-accent/60 hover:text-accent"
              >
                View Resume
                <span className="text-accent transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
              </button>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-y-2 border-y border-paper/15 sm:grid-cols-4 sm:divide-x sm:divide-paper/15">
              {stats.map((stat, i) => (
                <div key={stat.label} className="py-4 sm:px-5 sm:first:pl-0 sm:last:pr-0">
                  <i className={`fas ${stat.icon} text-sm text-accent/80`} aria-hidden="true" />
                  <p className="mt-2 font-display text-3xl md:text-4xl font-bold text-paper tabular-nums">
                    {stat.value}
                    <span className="text-accent">{stat.suffix}</span>
                  </p>
                  <p className="mt-1 min-h-[2.6em] font-mono text-[9px] md:text-[10px] uppercase tracking-[0.18em] leading-[1.7] text-fog">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

        <div className="relative hidden lg:block">
          <div
            className="hero-orb pointer-events-none absolute -inset-8 rounded-full opacity-40"
            aria-hidden="true"
          />
          <PhotoCard photo={PROFILE.photo} />
        </div>
      </div>
    </IdeWindow>
  )
}