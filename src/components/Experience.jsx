import { EXPERIENCE } from '../data/site'
import SectionHeader from './SectionHeader'
import Reveal from './Reveal'

export default function Experience() {
  return (
    <section id="experience" className="relative">
      <div className="mx-auto max-w-6xl px-5 md:px-6 py-20 md:py-28">
        <SectionHeader
          index="02"
          label="Journey"
          title={<>Experience <span className="text-outline text-fog">2024 — 2026</span></>}
          right={
            <p className="hidden md:block font-mono text-xs uppercase tracking-[0.25em] text-fog max-w-[240px] text-right leading-relaxed">
              government & industry — real systems, real users
            </p>
          }
        />

        <Reveal>
          <div className="glass sheen rounded-[28px] px-5 py-2 md:px-9">
            <div className="border-t border-paper/15">
              {EXPERIENCE.map((exp, i) => (
                <article
                  key={exp.company}
                  className="group grid gap-5 border-b border-paper/15 py-10 transition-colors hover:bg-accent/5 md:grid-cols-[150px_1fr_200px] md:gap-8"
                >
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-fog pt-1.5">
                    {exp.date}
                  </p>

                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="flex items-center -space-x-1">
                        {exp.logos.map((logo) => (
                          <img
                            key={logo}
                            src={logo}
                            alt=""
                            className="glass-chip h-10 w-10 rounded-full object-contain p-1"
                            loading="lazy"
                          />
                        ))}
                      </div>
                      <h3 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-tight transition-transform duration-300 group-hover:translate-x-1">
                        {exp.company}
                      </h3>
                    </div>
                    <p className="mt-2 font-mono text-xs uppercase tracking-[0.25em] text-accent">
                      ▸ {exp.role}
                    </p>
                    <p className="mt-4 max-w-2xl text-sm leading-relaxed text-paper/70">
                      {exp.summary}
                    </p>
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-paper/50">
                      {exp.detail}
                    </p>
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {exp.highlights.map((h) => (
                        <li
                          key={h}
                          className="glass-chip rounded-full px-3 py-1.5 font-mono text-[11px] text-paper/70"
                        >
                          <span className="text-accent">[</span>
                          {h}
                          <span className="text-accent">]</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="md:text-right">
                    <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-fog">
                      {exp.location}
                    </p>
                    <p className="mt-6 font-mono text-xs text-fog/70">
                      role&nbsp;{String(i + 1).padStart(2, '0')}
                      <span className="text-accent"> ↗</span>
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
