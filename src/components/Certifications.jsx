import { CERTIFICATIONS } from '../data/site'
import SectionHeader from './SectionHeader'
import Reveal from './Reveal'

export default function Certifications() {
  return (
    <section id="certifications" className="relative">
      <div className="mx-auto max-w-6xl px-5 md:px-6 py-20 md:py-28">
        <SectionHeader
          index="05"
          label="Credentials"
          title="Certifications"
          right={
            <p className="hidden md:block font-mono text-xs uppercase tracking-[0.25em] text-fog max-w-[240px] text-right leading-relaxed">
              10 verified badges — certiport & cisco
            </p>
          }
        />

        <Reveal>
          <div className="glass sheen overflow-hidden rounded-[28px]">
            <div className="hidden md:grid grid-cols-[56px_1fr_200px_140px_90px] items-center border-b border-paper/15 bg-ink/40 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.3em] text-fog">
              <span>No.</span>
              <span>Credential</span>
              <span>Issuer</span>
              <span>Date</span>
              <span className="text-right">Verify</span>
            </div>

            {CERTIFICATIONS.map((cert, i) => (
              <div
                key={cert.title}
                className="group grid grid-cols-[56px_1fr] md:grid-cols-[56px_1fr_200px_140px_90px] items-center gap-x-4 border-b border-paper/15 px-5 py-4 transition-colors last:border-b-0 hover:bg-accent/10"
              >
                <span className="font-mono text-sm text-fog">
                  {String(i + 1).padStart(2, '0')}
                </span>

                <div className="flex items-center gap-4 min-w-0">
                  <div className="glass-chip flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-colors group-hover:bg-accent/20">
                    <img
                      src={cert.image}
                      alt=""
                      className="h-full w-full object-contain p-0.5"
                      loading="lazy"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-display text-sm md:text-base font-bold uppercase leading-tight tracking-tight">
                      {cert.title}
                    </h3>
                    <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-fog md:hidden">
                      {cert.issuer} · {cert.date}
                    </p>
                  </div>
                </div>

                <span className="hidden md:flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-paper/70">
                  <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
                  {cert.issuer}
                </span>

                <span className="hidden md:block font-mono text-xs uppercase tracking-[0.2em] text-paper/70">
                  {cert.date}
                </span>

                <a
                  href={cert.verify}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Verify ${cert.title} on Credly`}
                  className="glass-chip hidden md:flex h-9 w-9 justify-self-end items-center justify-center rounded-full font-mono text-sm transition-colors hover:bg-paper hover:text-ink"
                >
                  ↗
                </a>

                <a
                  href={cert.verify}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Verify ${cert.title} on Credly`}
                  className="glass-chip md:hidden col-span-2 mt-2 inline-flex w-fit items-center gap-2 rounded-full px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em]"
                >
                  Verify <span className="text-accent">↗</span>
                </a>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={150}>
          <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.25em] text-fog">
            <span className="text-accent">[</span> all credentials verifiable on credly
            <span className="text-accent">]</span>
          </p>
        </Reveal>
      </div>
    </section>
  )
}
