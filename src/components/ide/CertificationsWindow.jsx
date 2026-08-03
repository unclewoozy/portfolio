import { CERTIFICATIONS } from '../../data/site'
import IdeWindow from './IdeWindow'

export default function CertificationsWindow() {
  return (
    <IdeWindow id="certifications" title="certifications" path="~/portfolio/certifications/">
      <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-fog">
        <span className="text-accent">//</span> verified credentials — {CERTIFICATIONS.length} records
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {CERTIFICATIONS.map((cert, i) => (
          <div
            key={cert.title}
            className="glass sheen group flex flex-col rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent/50"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent">
                cert_{String(i + 1).padStart(2, '0')}
              </span>
              <i className="fas fa-certificate text-fog/50" aria-hidden="true" />
            </div>

            <div className="mt-3 flex flex-1 items-center justify-center">
              <img
                src={cert.image}
                alt={cert.title}
                className="max-h-24 object-contain opacity-90 transition-opacity group-hover:opacity-100"
                loading="lazy"
              />
            </div>

            <h3 className="mt-4 font-display text-base font-bold leading-snug tracking-tight">
              {cert.title}
            </h3>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.25em] text-fog">
              {cert.issuer} · {cert.date}
            </p>

            {cert.verify && (
              <a
                href={cert.verify}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-accent transition-colors hover:text-paper"
              >
                verify credential
                <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>
        ))}
      </div>
    </IdeWindow>
  )
}
