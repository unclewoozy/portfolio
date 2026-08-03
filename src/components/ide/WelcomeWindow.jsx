import { useEffect, useState } from 'react'
import { ABOUT, PROFILE } from '../../data/site'
import IdeWindow from './IdeWindow'
import GlassControl from './GlassControl'

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

function PhotoCard() {
  const [hovered, setHovered] = useState(false)
  const typed = useTypingLines(TYPED_LINES, hovered)
  const last = typed.length - 1
  const typingDone =
    typed.length === TYPED_LINES.length && typed[last] === TYPED_LINES[last]

  return (
    <div className="glass sheen relative overflow-hidden rounded-xl">
      <div className="flex items-center justify-between border-b border-paper/15 bg-ink/40 px-3 py-2">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-fog">
          <span className="text-accent">~/assets</span> sigmund.jpg
        </p>
        <p className="font-mono text-[10px] text-fog/70">preview</p>
      </div>

      <figure
        className="group relative select-none"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => setHovered((h) => !h)}
      >
        <div className="relative overflow-hidden">
          <img
            src={PROFILE.photo}
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
          <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between border-t border-paper/15 bg-ink/60 px-4 py-2 font-mono text-[9px] uppercase tracking-[0.2em] text-fog backdrop-blur-md">
            <p>
              sigmund.jpg <span className="text-paper/60">· portrait</span>
            </p>
            <p className="text-accent">
              <span className="mr-1.5 inline-block h-2 w-2 rounded-full bg-accent animate-pulse-dot" aria-hidden="true" />
              ready
            </p>
          </figcaption>
        </div>
      </figure>
    </div>
  )
}

export default function WelcomeWindow({ onViewResume, glass, onGlass }) {
  const go = (id) => (e) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <IdeWindow id="home" title="welcome — developer workspace" path="~/portfolio/README.md">
      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
        <div className="relative">
          <div
            className="hero-orb pointer-events-none absolute -left-28 -top-20 h-80 w-80 rounded-full opacity-70"
            aria-hidden="true"
          />

          <div className="relative">
            <div className="flex flex-wrap items-center gap-2">
              <span className="glass-chip inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-accent">
                <span className="h-2 w-2 rounded-full bg-accent animate-pulse-dot" aria-hidden="true" />
                Available for work
              </span>
              <span className="glass-chip rounded-full px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-fog">
                Full-time
              </span>
              <span className="glass-chip rounded-full px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-fog">
                Freelance
              </span>
            </div>

            <p className="mt-7 font-mono text-[11px] md:text-xs uppercase tracking-[0.35em] text-fog">
              Full Stack Web Developer <span className="text-accent">/</span> IT Specialist
            </p>

            <h1 className="mt-4 font-display font-bold uppercase leading-[0.92] tracking-tight">
              <span className="block text-outline text-[clamp(2.4rem,7vw,5.6rem)] text-paper">
                Sigmund
              </span>
              <span className="block text-[clamp(2.4rem,7vw,5.6rem)] text-paper">
                Godfrey M.
              </span>
              <span className="block text-[clamp(2.4rem,7vw,5.6rem)] text-paper">
                Dela <span className="text-gradient">Cruz</span>
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-sm md:text-base leading-relaxed text-paper/70">
              {PROFILE.tagline}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                onClick={go('projects')}
                className="btn-primary inline-flex items-center gap-3 rounded-xl px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-paper"
              >
                Open projects/
                <span className="transition-transform group-hover:translate-y-0.5">↓</span>
              </a>
              <a
                href="#contact"
                onClick={go('contact')}
                className="glass-chip inline-flex items-center gap-3 rounded-xl px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-paper transition-all hover:bg-paper hover:text-ink"
              >
                Initiate contact
              </a>
              <button
                type="button"
                onClick={onViewResume}
                className="group inline-flex items-center gap-2 px-3 py-3 font-mono text-xs uppercase tracking-[0.2em] text-fog transition-colors hover:text-accent"
              >
                View Resume
                <span className="text-accent">↗</span>
              </button>
            </div>

            <div className="mt-10 grid grid-cols-3 border-t border-paper/15">
              {ABOUT.stats.map((stat, i) => (
                <div key={stat.label} className={`py-4 ${i > 0 ? 'border-l border-paper/15 pl-5' : ''}`}>
                  <p className="font-display text-3xl md:text-4xl font-bold text-paper">
                    {stat.value}
                    <span className="text-accent">{stat.suffix}</span>
                  </p>
                  <p className="mt-1 font-mono text-[9px] md:text-[10px] uppercase tracking-[0.25em] text-fog">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="relative">
            <div
              className="hero-orb pointer-events-none absolute -inset-8 rounded-full opacity-50"
              aria-hidden="true"
            />
            <PhotoCard />
          </div>
          <GlassControl glass={glass} onGlass={onGlass} />
        </div>
      </div>
    </IdeWindow>
  )
}