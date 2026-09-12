import { useSiteData } from '../../SiteData'
import IdeWindow from './IdeWindow'
import SectionHeader from './SectionHeader'

export default function AboutWindow() {
  const { ABOUT, PROFILE } = useSiteData()
  const ROWS = ABOUT.whatIDo
  const degree = ABOUT.education[0]
  return (
    <IdeWindow id="about">
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
        <div>
          <SectionHeader index="01" kicker="~/portfolio/about.me" title="About" />
          <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-paper/80">
            {ABOUT.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <dl className="mt-7 border-t border-paper/15">
            <div className="flex items-center justify-between gap-4 border-b border-paper/10 py-2.5">
              <dt className="font-mono text-[10px] uppercase tracking-[0.25em] text-fog/70">location</dt>
              <dd className="truncate font-mono text-[11px] text-paper/90">{PROFILE.location}</dd>
            </div>
            <div className="flex items-center justify-between gap-4 border-b border-paper/10 py-2.5">
              <dt className="font-mono text-[10px] uppercase tracking-[0.25em] text-fog/70">degree</dt>
              <dd className="truncate font-mono text-[11px] text-paper/90">{degree.program}</dd>
            </div>
            <div className="flex items-center justify-between gap-4 border-b border-paper/10 py-2.5">
              <dt className="font-mono text-[10px] uppercase tracking-[0.25em] text-fog/70">status</dt>
              <dd className="flex items-center gap-1.5 font-mono text-[11px] text-lime">
                <span className="h-1.5 w-1.5 rounded-full bg-lime animate-pulse-dot" aria-hidden="true" />
                open to work
              </dd>
            </div>
          </dl>
          <p className="mt-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-fog">
            <span className="h-px w-8 bg-accent" aria-hidden="true" />
            sigmund godfrey m. dela cruz
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-fog">
              <span className="text-accent">//</span> what i do
            </p>
            <div className="mt-4 grid gap-3">
              {ROWS.map((row, i) => (
                <div
                  key={row.title}
                  className="group tile flex gap-4 p-4"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-accent/25 bg-accent/10 text-sm text-accent" aria-hidden="true">
                    <i className={`fas ${row.icon}`} />
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="font-display text-base font-bold uppercase tracking-tight">
                        {row.title}
                      </h3>
                      <span className="shrink-0 font-mono text-[10px] text-fog/50">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-paper/70">{row.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-fog">
              <span className="text-accent">//</span> education
            </p>
            <ol className="mt-4 space-y-6 border-l border-paper/25 pl-6">
              {ABOUT.education.map((edu) => (
                <li key={edu.school} className="relative">
                  <span className="absolute -left-[31px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-accent bg-ink" aria-hidden="true" />
                  <div className="flex items-start gap-4">
                    <div className="glass-chip flex h-14 w-14 shrink-0 items-center justify-center rounded-lg p-1.5">
                      <img
                        src={edu.logo}
                        alt={`${edu.school} logo`}
                        className="h-full w-full object-contain"
                        loading="lazy"
                      />
                    </div>
                    <div className="min-w-0 pt-0.5">
                      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent/80">
                        {edu.years}
                      </p>
                      <h3 className="mt-1 font-display text-base font-bold leading-snug">{edu.school}</h3>
                      <p className="mt-0.5 text-sm text-paper/70">{edu.program}</p>
                      <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-fog/60">{edu.location}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </IdeWindow>
  )
}
