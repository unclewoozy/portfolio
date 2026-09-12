import { useSiteData } from '../../SiteData'
import IdeWindow from './IdeWindow'
import SectionHeader from './SectionHeader'

export default function ExperienceWindow() {
  const { EXPERIENCE } = useSiteData()
  return (
    <IdeWindow id="experience">
      <SectionHeader index="04" kicker="~/portfolio/experience/" title="Experience" />

      <div className="mt-6 space-y-6">
        {EXPERIENCE.map((item, i) => (
          <div key={item.company}>

            <div className="tile p-5 md:p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-fog">
                  record_{String(i + 1).padStart(2, '0')} · {item.date}
                </p>
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-fog/60">
                  {item.location}
                </p>
              </div>

              <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">
                <div className="flex shrink-0 gap-3">
                  {item.logos.map((logo) => (
                      <span key={logo} className="flex h-16 w-16 items-center justify-center rounded-lg bg-white/[0.04] p-2 md:h-20 md:w-20">
                      <img
                        src={logo}
                        alt=""
                        className="h-full w-full object-contain"
                        loading="lazy"
                      />
                    </span>
                  ))}
                </div>
                <div className="min-w-0">
                  <h3 className="font-display text-xl font-bold tracking-tight text-paper md:text-2xl">
                    {item.company}
                  </h3>
                  <p className="mt-1 flex items-center gap-2 text-sm text-paper/70">
                    <span className="text-accent" aria-hidden="true">▸</span>
                    {item.role}
                  </p>
                </div>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-paper/75">{item.summary}</p>

              <ul className="mt-4 grid gap-2 border-t border-paper/15 pt-4">
                {item.highlights.map((point) => (
                  <li key={point} className="flex gap-2.5 text-sm leading-relaxed text-paper/75">
                    <span className="shrink-0 font-mono text-xs text-accent" aria-hidden="true">▸</span>
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
