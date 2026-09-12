import { useState } from 'react'
import { useSiteData } from '../../SiteData'
import IdeWindow from './IdeWindow'

export const CORE_GROUPS = [
  { label: 'frontend', skills: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'ReactJS', 'Next.js', 'Tailwind CSS'] },
  { label: 'backend', skills: ['Python', 'Java', 'C++', 'PHP', 'Flask', 'Django', 'Node.js'] },
  { label: 'database', skills: ['SQL', 'MySQL', 'PostgreSQL', 'SQLite', 'MSSQL'] },
  { label: 'tools', skills: ['Git', 'GitHub', 'Vercel', 'Supabase', 'VS Code', 'Cursor', 'Figma', 'Android Studio'] },
]

function CorePill({ skill }) {
  return (
    <span className="inline-flex w-auto shrink-0 items-center gap-2.5 rounded-lg border border-paper/10 bg-white/[0.02] px-3 py-2 transition-colors hover:border-accent/40 hover:bg-accent/5">
      {skill.icon === 'cursor-logo' ? (
        <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] shrink-0 fill-paper/85" aria-hidden="true">
          <path d="M11.503.131 1.891 5.678a.84.84 0 0 0-.42.726v11.188c0 .3.162.575.42.724l9.609 5.55a1 1 0 0 0 .998 0l9.61-5.55a.84.84 0 0 0-.42-.724V6.404a.84.84 0 0 0-.42-.726L12.497.131a1.01 1.01 0 0 0-.996 0M2.657 6.338h18.55c.263 0 .43.287.297.515L12.23 22.918c-.062.107-.229.064-.229-.06V12.335a.59.59 0 0 0-.295-.51l-9.11-5.257c-.109-.063-.064-.23.061-.23" />
        </svg>
      ) : (
        <i
          className={`${skill.icon} shrink-0 text-lg ${skill.icon.startsWith('devicon') ? '' : 'text-accent'}`}
          aria-hidden="true"
        />
      )}
      <span className="whitespace-nowrap font-mono text-[13px] text-paper/85">{skill.name}</span>
    </span>
  )
}

export default function SkillsWindow() {
  const { SKILLS } = useSiteData()
  const [openRows, setOpenRows] = useState([])
  const allOpen = openRows.length === SKILLS.categories.length && SKILLS.categories.length > 0
  const toggleRow = (i) =>
    setOpenRows((rows) => (rows.includes(i) ? rows.filter((r) => r !== i) : [...rows, i]))
  const byName = Object.fromEntries(SKILLS.featured.map((s) => [s.name, s]))
  const grouped = new Set(CORE_GROUPS.flatMap((g) => g.skills))
  const ungrouped = SKILLS.featured.filter((s) => !grouped.has(s.name))
  return (
    <IdeWindow id="skills" title="skills" path="~/portfolio/skills.json">
      <div>
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-fog">
            <span className="text-accent">//</span> core-stack.sh
          </p>
          {CORE_GROUPS.map((group) => (
            <div key={group.label} className="mt-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-fog/70">
                <span className="text-accent">▸</span> {group.label}
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {group.skills.map((name) =>
                  byName[name] ? <CorePill key={name} skill={byName[name]} /> : null,
                )}
              </div>
            </div>
          ))}
          {ungrouped.length > 0 && (
            <div className="mt-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-fog/70">
                <span className="text-accent">▸</span> other
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {ungrouped.map((skill) => (
                  <CorePill key={skill.name} skill={skill} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8">
        <div className="flex items-center justify-between gap-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-fog">
            <span className="text-accent">//</span> full-index
          </p>
          <button
            type="button"
            onClick={() =>
              setOpenRows(allOpen ? [] : SKILLS.categories.map((_, i) => i))
            }
            className="font-mono text-[10px] uppercase tracking-[0.2em] text-fog/70 transition-colors hover:text-accent"
          >
            {allOpen ? '− collapse all' : '+ expand all'}
          </button>
        </div>
        <div className="mt-3 grid gap-x-10 md:grid-cols-2">
          {[0, 1].map((half) => {
            const mid = Math.ceil(SKILLS.categories.length / 2)
            const items =
              half === 0 ? SKILLS.categories.slice(0, mid) : SKILLS.categories.slice(mid)
            const base = half === 0 ? 0 : mid
            return (
              <div key={half} className="border-t border-paper/15">
                {items.map((cat, j) => {
                  const i = base + j
                  const isOpen = openRows.includes(i)
                  return (
                    <div key={cat.title} className="group relative border-b border-paper/15">
                      <span
                        className={`pointer-events-none absolute left-0 top-3 bottom-3 w-[2px] rounded-full bg-accent transition-all duration-300 ${
                          isOpen ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                        }`}
                        aria-hidden="true"
                      />
                      <button
                        type="button"
                        onClick={() => toggleRow(i)}
                        aria-expanded={isOpen}
                        className="group grid w-full grid-cols-[32px_1fr_auto] items-center gap-3 py-4 pl-3 text-left transition-colors hover:bg-white/[0.03] sm:gap-4"
                      >
                        <p className="font-mono text-xs text-fog/70 transition-colors group-hover:text-fog">
                          {String(i + 1).padStart(2, '0')}
                        </p>
                        <span className="flex min-w-0 items-center gap-3">
                          <i
                            className={`fas ${cat.icon} shrink-0 text-sm transition-colors ${
                              isOpen ? 'text-accent' : 'text-fog/70 group-hover:text-fog'
                            }`}
                            aria-hidden="true"
                          />
                          <span className="truncate font-display text-base font-bold uppercase tracking-tight transition-colors group-hover:text-accent">
                            {cat.title}
                          </span>
                          <span className="shrink-0 rounded border border-paper/10 bg-white/5 px-1.5 py-px font-mono text-[10px] text-fog/60">
                            {cat.tags.length}
                          </span>
                        </span>
                        <span
                          className={`font-mono text-accent transition-all duration-300 ${
                            isOpen
                              ? 'rotate-90 opacity-100'
                              : 'opacity-0 group-hover:translate-x-1 group-hover:opacity-100'
                          }`}
                          aria-hidden="true"
                        >
                          →
                        </span>
                      </button>
                      {isOpen && (
                        <div className="flex flex-wrap gap-1.5 pb-5 pl-3 sm:pl-14">
                          {cat.tags.map((tag) => (
                            <span
                              key={tag}
                              className="tag px-2.5 py-1 font-mono text-[11px] text-paper/70 transition-colors hover:border-paper/30 hover:text-paper"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>
    </IdeWindow>
  )
}
