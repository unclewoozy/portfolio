import { SKILLS } from '../../data/site'
import IdeWindow from './IdeWindow'
import SkillNetwork from './SkillNetwork'

export default function SkillsWindow() {
  return (
    <IdeWindow id="skills" title="skills.json" path="~/portfolio/skills.json">
      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-fog">
            <span className="text-accent">//</span> core-stack.sh
          </p>
          <div className="mt-3 flex flex-wrap gap-2.5">
            {SKILLS.featured.map((skill) => (
              <span
                key={skill.name}
                className="glass-chip group flex items-center gap-2.5 rounded-full px-4 py-2 transition-colors hover:bg-accent/20"
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

        <SkillNetwork />
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {SKILLS.categories.map((cat, i) => (
          <div
            key={cat.title}
            className="glass rounded-2xl p-5 transition-colors hover:bg-white/10"
          >
            <div className="flex items-baseline justify-between">
              <p className="font-mono text-xs text-accent">{String(i + 1).padStart(2, '0')}</p>
              <i className={`fas ${cat.icon} text-sm text-fog`} aria-hidden="true" />
            </div>
            <h3 className="mt-2 font-display text-base font-bold uppercase tracking-tight">
              {cat.title}
            </h3>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {cat.tags.map((tag) => (
                <span
                  key={tag}
                  className="glass-chip rounded-full px-2.5 py-1 font-mono text-[11px] text-paper/70"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </IdeWindow>
  )
}
