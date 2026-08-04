import { useSiteData } from '../../SiteData'
import IdeWindow from './IdeWindow'

export default function AboutWindow() {
  const { ABOUT } = useSiteData()
  const ROWS = ABOUT.whatIDo
  return (
    <IdeWindow id="about" title="about.me" path="~/portfolio/about.me">
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">
            // about.txt
          </p>
          <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-paper/80">
            {ABOUT.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <p className="mt-6 font-mono text-xs uppercase tracking-[0.25em] text-fog">
            — sigmund godfrey m. dela cruz
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-fog">
              <span className="text-accent">//</span> what i do
            </p>
            <div className="mt-3 border-t border-paper/15">
              {ROWS.map((row, i) => (
                <div
                  key={row.title}
                  className="group grid gap-2 border-b border-paper/15 py-4 transition-colors hover:bg-accent/5 sm:grid-cols-[48px_1fr_auto] sm:items-center"
                >
                  <p className="font-mono text-xs text-fog">{String(i + 1).padStart(2, '0')}</p>
                  <div>
                    <h3 className="font-display text-lg font-bold uppercase tracking-tight">
                      {row.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-paper/70">{row.desc}</p>
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

          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-fog">
              <span className="text-accent">//</span> education
            </p>
            <div className="mt-3 border-t border-paper/15">
              {ABOUT.education.map((edu) => (
                <div key={edu.school} className="flex items-start gap-4 border-b border-paper/15 py-4">
                  <div className="glass-chip flex h-12 w-12 shrink-0 items-center justify-center rounded-xl">
                    <img
                      src={edu.logo}
                      alt={`${edu.school} logo`}
                      className="h-full w-full object-contain p-1"
                      loading="lazy"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-fog">
                      {edu.years} · {edu.location}
                    </p>
                    <h3 className="mt-0.5 font-display text-base font-bold leading-snug">{edu.school}</h3>
                    <p className="mt-0.5 text-sm text-paper/70">{edu.program}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </IdeWindow>
  )
}
