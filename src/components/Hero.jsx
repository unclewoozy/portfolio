import { useEffect, useState } from 'react'
import { ABOUT, PROFILE } from '../data/site'
import Marquee from './Marquee'

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

function Terminal() {
  const [hovered, setHovered] = useState(false)
  const typed = useTypingLines(TYPED_LINES, hovered)
  const last = typed.length - 1
  const typingDone =
    typed.length === TYPED_LINES.length && typed[last] === TYPED_LINES[last]

  return (
    <div
      className="term-shadow glass relative overflow-hidden rounded-2xl"
      role="img"
      aria-label="Terminal window with profile photo"
    >
      <div className="flex items-center justify-between border-b border-paper/15 bg-ink/40 px-4 py-2.5">
        <div className="flex gap-2">
          <span className="h-3 w-3 rounded-full bg-rose-500" />
          <span className="h-3 w-3 rounded-full bg-amber-400" />
          <span className="h-3 w-3 rounded-full bg-lime" />
        </div>
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-fog">
          sigmund@dev: ~/profile --photo
        </p>
        <span className="w-8" />
      </div>

      <figure
        className="group relative"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="relative overflow-hidden">
          <img
            src={PROFILE.photo}
            alt="Portrait of Sigmund Godfrey M. Dela Cruz"
            className="w-full h-auto object-top grayscale transition-all duration-700 group-hover:scale-[1.03] group-hover:grayscale-0"
            loading="eager"
          />
          <div className="absolute inset-0 z-10 flex flex-col justify-end gap-1 bg-ink/75 p-4 font-mono text-[11px] leading-relaxed opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100 md:text-xs">
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
          <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between border-t border-paper/15 bg-ink/60 px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-fog backdrop-blur-md">
            <p>
              sigmund.jpg <span className="text-paper/60">· 4016×6016</span>
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

export default function Hero({ onViewResume }) {
  const go = (id) => (e) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="home" className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 md:px-8 pt-32 md:pt-40 pb-16 md:pb-24">
        <div className="reveal flex items-center justify-between border-b border-paper/15 pb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-fog">
          <p>Portfolio — © 2026</p>
          <p className="hidden sm:block">Calamba, Laguna — PH</p>
          <p className="text-accent">EST. 2023</p>
        </div>

        <div className="mt-10 grid gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          <div>
            <div className="reveal flex flex-wrap items-center gap-2">
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

            <p
              className="reveal mt-8 font-mono text-[11px] md:text-xs uppercase tracking-[0.35em] text-fog"
              style={{ '--reveal-delay': '80ms' }}
            >
              Full Stack Web Developer <span className="text-accent">/</span> IT Specialist
            </p>

            <h1
              className="reveal mt-4 font-display font-bold uppercase leading-[0.92] tracking-tight"
              style={{ '--reveal-delay': '160ms' }}
            >
              <span className="block text-outline text-[clamp(2.6rem,9.5vw,7.5rem)] text-paper">
                Sigmund
              </span>
              <span className="block text-[clamp(2.6rem,9.5vw,7.5rem)] text-paper">
                Godfrey M.
              </span>
              <span className="block text-[clamp(2.6rem,9.5vw,7.5rem)] text-paper">
                Dela <span className="text-accent">Cruz</span>
              </span>
            </h1>

            <p
              className="reveal mt-8 max-w-xl text-sm md:text-base leading-relaxed text-paper/70"
              style={{ '--reveal-delay': '240ms' }}
            >
              {PROFILE.tagline}
            </p>

            <div className="reveal mt-9 flex flex-wrap items-center gap-3" style={{ '--reveal-delay': '320ms' }}>
              <a
                href="#projects"
                onClick={go('projects')}
                className="group inline-flex items-center gap-3 rounded-xl border-2 border-accent bg-accent px-6 py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-ink transition-all hover:bg-transparent hover:text-accent"
              >
                View Projects
                <span className="transition-transform group-hover:translate-y-0.5">↓</span>
              </a>
              <a
                href="#contact"
                onClick={go('contact')}
                className="glass-chip inline-flex items-center gap-3 rounded-xl px-6 py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-paper transition-all hover:bg-paper hover:text-ink"
              >
                Get In Touch
              </a>
            <button
              type="button"
              onClick={onViewResume}
              className="group inline-flex items-center gap-2 px-3 py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-fog transition-colors hover:text-accent"
            >
              View Resume
              <span className="text-accent">↗</span>
            </button>
              <a
                href={PROFILE.resumeDownload}
                className="group inline-flex items-center gap-2 px-3 py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-fog transition-colors hover:text-accent"
              >
                Resume
                <span className="text-accent">↓</span>
              </a>
            </div>

            <div
              className="reveal mt-12 grid grid-cols-3 border-t border-paper/15"
              style={{ '--reveal-delay': '400ms' }}
            >
              {ABOUT.stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className={`py-4 ${i > 0 ? 'border-l border-paper/15 pl-5' : ''}`}
                >
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

          <div className="reveal" style={{ '--reveal-delay': '260ms' }}>
            <Terminal />
          </div>
        </div>
      </div>

      <Marquee
        items={[
          'Full Stack Development',
          'Database Design',
          'AI-Assisted Workflows',
          'Enterprise Web Apps',
          'REST APIs',
          'Clean UI Systems',
        ]}
      />
    </section>
  )
}
