import { ABOUT } from '../data/site'
import SectionHeader from './SectionHeader'
import Reveal from './Reveal'

const rows = [
  {
    title: 'Full-Stack Development',
    desc: 'End-to-end web applications — clean front-ends, robust back-ends, shipped as complete systems.',
  },
  {
    title: 'Database Design',
    desc: 'Efficient relational schemas, normalized models, and secure, well-optimized query patterns.',
  },
  {
    title: 'AI-Assisted Workflows',
    desc: 'AI used as a collaborator to accelerate builds, sharpen code quality, and solve hard problems.',
  },
]

export default function About() {
  return (
    <section id="about" className="relative">
      <div className="mx-auto max-w-6xl px-5 md:px-6 py-20 md:py-28">
        <SectionHeader
          index="01"
          label="Profile"
          title="About Me & Education"
          right={
            <p className="hidden md:block font-mono text-xs uppercase tracking-[0.25em] text-fog max-w-[240px] text-right leading-relaxed">
              IT graduate — letran calamba · building since 2023
            </p>
          }
        />

        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <Reveal className="h-full">
            <div className="glass sheen relative h-full overflow-hidden rounded-[28px] p-6 md:p-9">
              <p
                className="pointer-events-none absolute -right-2 -top-6 font-display text-9xl font-bold leading-none text-paper/10 select-none"
                aria-hidden="true"
              >
                01
              </p>
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">
                // about.txt
              </p>
              <div className="mt-6 space-y-5 text-[15px] leading-relaxed text-paper/80">
                {ABOUT.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <p className="mt-8 font-mono text-xs uppercase tracking-[0.25em] text-fog">
                — sigmund godfrey m. dela cruz
              </p>
            </div>
          </Reveal>

          <div className="space-y-8">
            <Reveal>
              <div className="glass sheen rounded-[28px] p-6 md:p-8">
                <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.3em] text-fog">
                  <span className="text-accent">//</span> what i do
                </p>
                <div className="border-t border-paper/15">
                  {rows.map((row, i) => (
                    <div
                      key={row.title}
                      className="group grid gap-2 border-b border-paper/15 py-5 transition-colors hover:bg-accent/10 sm:grid-cols-[64px_1fr_auto] sm:items-center"
                    >
                      <p className="font-mono text-xs text-fog">
                        {String(i + 1).padStart(2, '0')}
                      </p>
                      <div>
                        <h3 className="font-display text-lg md:text-xl font-bold uppercase tracking-tight">
                          {row.title}
                        </h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-paper/70">{row.desc}</p>
                      </div>
                      <span
                        className="hidden font-mono text-accent opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100 sm:block"
                        aria-hidden="true"
                      >
                        →
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="glass sheen rounded-[28px] p-6 md:p-8">
                <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.3em] text-fog">
                  <span className="text-accent">//</span> education
                </p>
                <div className="border-t border-paper/15">
                  {ABOUT.education.map((edu) => (
                    <div
                      key={edu.school}
                      className="group flex items-start gap-5 border-b border-paper/15 py-5"
                    >
                      <div className="glass-chip flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl transition-colors group-hover:bg-accent/20">
                        <img
                          src={edu.logo}
                          alt={`${edu.school} logo`}
                          className="h-full w-full object-contain p-1.5"
                          loading="lazy"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-fog">
                          {edu.years} · {edu.location}
                        </p>
                        <h3 className="mt-1 font-display text-base md:text-lg font-bold leading-snug">
                          {edu.school}
                        </h3>
                        <p className="mt-0.5 text-sm text-paper/70">{edu.program}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
