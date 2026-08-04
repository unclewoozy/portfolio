import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useSiteData } from '../../SiteData'
import IdeWindow from './IdeWindow'

export default function CertificationsWindow() {
  const { CERTIFICATIONS } = useSiteData()
  const [open, setOpen] = useState(null)

  return (
    <IdeWindow id="certifications" title="certifications" path="~/portfolio/certifications/">
      <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-fog">
        <span className="text-accent">//</span> verified credentials — {CERTIFICATIONS.length} records
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {CERTIFICATIONS.map((cert, i) =>
          cert.viewable ? (
            <button
              key={cert.title}
              type="button"
              onClick={() => setOpen(cert)}
              className="glass sheen group flex flex-col rounded-2xl p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-accent/50"
              aria-haspopup="dialog"
            >
              <CardBody cert={cert} i={i} viewable />
            </button>
          ) : (
            <div
              key={cert.title}
              className="glass sheen group flex flex-col rounded-2xl p-5 transition-all duration-300"
            >
              <CardBody cert={cert} i={i} />
            </div>
          ),
        )}
      </div>

      {open && createPortal(<CertificateModal cert={open} onClose={() => setOpen(null)} />, document.body)}
    </IdeWindow>
  )
}

function CardBody({ cert, i, viewable = false }) {
  return (
    <>
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
          className="max-h-24 object-contain opacity-90 transition-all duration-300 group-hover:scale-105 group-hover:opacity-100"
          loading="lazy"
        />
      </div>

      <h3 className="mt-4 font-display text-base font-bold leading-snug tracking-tight transition-colors group-hover:text-accent">
        {cert.title}
      </h3>
      <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.25em] text-fog">
        {cert.issuer} · {cert.date}
      </p>

      <div className="mt-4 flex items-center gap-4">
        {cert.verify && (
          <a
            href={cert.verify}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-accent transition-colors hover:text-paper"
          >
            verify credential
            <span aria-hidden="true">↗</span>
          </a>
        )}
        {viewable && (
          <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
            view certificate
            <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">→</span>
          </span>
        )}
      </div>
    </>
  )
}

function CertificateModal({ cert, onClose }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center p-4 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={cert.title}
      onClick={onClose}
    >
      <div className="overlay-blur absolute inset-0 bg-ink/70 backdrop-blur-sm" aria-hidden="true" />
      <div
        className="glass-deep window-in relative flex max-h-[92vh] max-h-[92dvh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-paper/15 bg-ink/70 px-5 py-3 backdrop-blur-md">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex shrink-0 gap-1.5" aria-hidden="true">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-500/90" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400/90" />
              <span className="h-2.5 w-2.5 rounded-full bg-lime/90" />
            </div>
            <p className="truncate font-mono text-[10px] uppercase tracking-[0.25em] text-paper/85">
              {cert.title}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-2 py-1 font-mono text-xs text-fog transition-colors hover:bg-paper/10 hover:text-paper"
            aria-label="Close certificate"
          >
            ✕
          </button>
        </div>

        <div className="flex flex-1 flex-col overflow-hidden p-4 md:p-6">
          <div className="flex flex-1 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-ink/60">
            <img
              src={cert.image}
              alt={cert.title}
              className="max-h-[62vh] max-h-[62dvh] w-auto max-w-full object-contain"
            />
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="font-display text-lg font-bold tracking-tight">{cert.title}</h3>
              <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.25em] text-fog">
                {cert.issuer} · {cert.date}
              </p>
            </div>
            <a
              href={cert.image}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-accent px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-accent transition-all hover:bg-accent hover:text-ink"
            >
              open full <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
