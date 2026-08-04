import { useSiteData } from '../../SiteData'
import IdeWindow from './IdeWindow'

export default function ExperienceWindow() {
  const { EXPERIENCE } = useSiteData()
  return (
    <IdeWindow id="experience" title="experience.log" path="~/portfolio/experience/">
      <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-fog">
        <span className="text-accent">//</span> professional records
      </p>

      <div className="mt-7 space-y-6">
        {EXPERIENCE.map((item, i) => (
          <div key={item.company} className="group relative pl-5 md:pl-8">
            <div className="absolute left-0 top-2 bottom-[-1.5rem] w-px bg-gradient-to-b from-accent via-paper/20 to-transparent" aria-hidden="true" />
            <span
              className="absolute -left-[5px] top-2.5 h-[11px] w-[11px] rounded-full border-2 border-ink bg-accent shadow-[0_0_12px_rgba(10,132,255,0.8)]"
              aria-hidden="true"
            />

            <div className="glass transition-colors rounded-2xl p-5 md:p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-fog">
                  record_{String(i + 1).padStart(2, '0')} · {item.date}
                </p>
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent">
                  {item.location}
                </p>
              </div>

              <h3 className="mt-2 font-display text-xl font-bold tracking-tight">
                {item.company}
              </h3>
              <p className="mt-0.5 text-sm text-paper/70">{item.role}</p>

              <div className="mt-3 flex flex-wrap gap-2">
                {item.logos.map((logo) => (
                  <span key={logo} className="glass-chip flex h-9 w-9 items-center justify-center rounded-lg">
                    <img
                      src={logo}
                      alt=""
                      className="h-full w-full object-contain p-1"
                      loading="lazy"
                    />
                  </span>
                ))}
              </div>

              <p className="mt-4 text-sm leading-relaxed text-paper/75">{item.summary}</p>

              <ul className="mt-4 grid gap-2 border-t border-paper/15 pt-4">
                {item.highlights.map((point) => (
                  <li key={point} className="flex gap-3 text-sm leading-relaxed text-paper/75">
                    <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </IdeWindow>
  )
}
