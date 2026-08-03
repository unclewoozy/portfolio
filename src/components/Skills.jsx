import { SKILLS } from '../data/site'
import SectionHeader from './SectionHeader'
import Reveal from './Reveal'

export default function Skills() {
  return (
    <section id="skills" className="relative">
      <div className="mx-auto max-w-6xl px-5 md:px-6 py-20 md:py-28">
        <SectionHeader
          index="04"
          label="Capabilities"
          title={<>Skills & <span className="text-outline text-fog">Stack</span></>}
          right={
            <p className="hidden md:block font-mono text-xs uppercase tracking-[0.25em] text-fog max-w-[240px] text-right leading-relaxed">
              languages, frameworks & tools i ship with
            </p>
          }
        />

        <Reveal>
          <div className="glass sheen overflow-hidden rounded-[28px]">
            <div className="flex items-center justify-between border-b border-paper/15 bg-ink/40 px-4 py-2.5">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-fog">
                <span className="text-accent">~/dev</span> core-stack.sh
              </p>
              <p className="font-mono text-[10px] text-fog">— /bin/sh</p>
            </div>
            <div className="flex flex-wrap gap-2.5 p-5 md:p-6">
              {SKILLS.featured.map((skill) => (
                <span
                  key={skill.name}
                  className="glass-chip group flex items-center gap-2.5 rounded-full px-4 py-2.5 transition-colors hover:bg-accent/20"
                >
                  <i
                    className={`${skill.icon} text-lg ${skill.icon.startsWith('devicon') ? '' : 'text-accent'}`}
                    aria-hidden="true"
                  />
                  <span className="font-mono text-[13px] text-paper/85">{skill.name}</span>
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {SKILLS.categories.map((cat, i) => (
            <Reveal key={cat.title} delay={(i % 3) * 70} className="h-full">
              <div className="glass sheen group flex h-full flex-col rounded-[28px] p-6 transition-colors hover:bg-white/10">
                <div className="flex items-baseline justify-between">
                  <p className="font-mono text-xs text-accent">{String(i + 1).padStart(2, '0')}</p>
                  <i className={`fas ${cat.icon} text-sm text-fog transition-colors group-hover:text-accent`} aria-hidden="true" />
                </div>
                <h3 className="mt-3 font-display text-lg font-bold uppercase tracking-tight">
                  {cat.title}
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {cat.tags.map((tag) => (
                    <span
                      key={tag}
                      className="glass-chip rounded-full px-2.5 py-1 font-mono text-[11px] text-paper/70 transition-colors hover:bg-accent/25"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
