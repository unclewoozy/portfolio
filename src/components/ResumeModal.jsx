import { useEffect } from 'react'
import { PROFILE } from '../data/site'

export default function ResumeModal({ open, onClose }) {
  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/80 p-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-[max(0.5rem,env(safe-area-inset-top))] backdrop-blur-xl sm:p-4 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-label="Resume PDF viewer"
      onClick={onClose}
    >
      <div
        className="glass-deep sheen relative flex h-[96vh] h-[96dvh] w-full max-w-4xl flex-col overflow-hidden rounded-[32px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-paper/15 px-4 py-3">
          <p className="min-w-0 truncate font-mono text-[10px] uppercase tracking-[0.3em] text-fog">
            <span className="text-accent">~/resume</span> / sigmund_godfrey_resume.pdf
          </p>
          <div className="flex shrink-0 items-center gap-2">
            <a
              href={PROFILE.resumeView}
              target="_blank"
              rel="noreferrer"
              className="glass-chip hidden items-center gap-2 rounded-full px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-paper transition-colors hover:bg-accent hover:text-ink sm:inline-flex"
              aria-label="Open resume in new tab"
            >
              <span className="text-accent">↗</span> view
            </a>
            <a
              href={PROFILE.resumeDownload}
              className="glass-chip inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-paper transition-colors hover:bg-accent hover:text-ink"
            >
              Download <span className="text-accent">↓</span>
            </a>
            <button
              type="button"
              onClick={onClose}
              className="glass-chip flex h-9 w-9 items-center justify-center rounded-full font-mono text-sm text-paper transition-colors hover:bg-paper hover:text-ink"
              aria-label="Close resume viewer"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="min-h-0 flex-1 bg-paper">
          <iframe
            src={PROFILE.resumeView}
            title="Sigmund Godfrey M. Dela Cruz — Resume"
            className="h-full w-full"
          />
        </div>

        <div className="flex shrink-0 items-center justify-between border-t border-paper/15 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.25em] text-fog">
          <p>
            <span className="text-accent">█</span> viewer — pdf ready
          </p>
          <p className="hidden sm:block">
            esc to close · <span className="text-accent">↓</span> to download
          </p>
        </div>
      </div>
    </div>
  )
}
