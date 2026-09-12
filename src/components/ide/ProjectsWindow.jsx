import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useSiteData } from '../../SiteData'
import IdeWindow from './IdeWindow'

export default function ProjectsWindow() {
  const { PROJECTS } = useSiteData()
  const [open, setOpen] = useState(null)

  return (
    <IdeWindow id="projects" title="projects archive" path="~/portfolio/projects/">
      <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-fog">
        <span className="text-accent">//</span> select a module to inspect —{' '}
        <span className="text-paper/60">{PROJECTS.length} builds archived</span>
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} total={PROJECTS.length} onOpen={setOpen} />
        ))}
      </div>

      {open && createPortal(<ProjectsModal project={open} onClose={() => setOpen(null)} />, document.body)}
    </IdeWindow>
  )
}

function ProjectCard({ project, index, total, onOpen }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(project)}
      className="group glass sheen relative flex flex-col overflow-hidden rounded-lg text-left transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/60"
      aria-haspopup="dialog"
    >
      <div className="relative overflow-hidden">
        <img
          src={project.cover}
          alt={`${project.shortTitle} preview`}
          className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-transparent" aria-hidden="true" />
        {project.private && (
            <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-md bg-amber-400 px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-ink shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
            <i className="fas fa-lock text-[9px]" aria-hidden="true" /> private
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-fog/70">
          {project.date}
        </p>
        <h3 className="mt-1 font-display text-lg font-bold leading-tight tracking-tight transition-colors group-hover:text-accent">
          {project.shortTitle}
        </h3>
        <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.25em] text-fog">
          {project.category}
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="tag px-2 py-0.5 font-mono text-[10px] text-paper/60">
              {tag}
            </span>
          ))}
        </div>

        <p className="mt-auto flex items-center gap-2 pt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
          inspect
          <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">→</span>
          <span className="ml-auto text-fog/40 transition-colors group-hover:text-fog">
            {String(index + 1).padStart(2, '0')}/{String(total).padStart(2, '0')}
          </span>
        </p>
      </div>
    </button>
  )
}

function ProjectsModal({ project, onClose }) {
  const [active, setActive] = useState(0)

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
      aria-label={project.title}
      onClick={onClose}
    >
      <div className="overlay-blur absolute inset-0 bg-ink/70 backdrop-blur-sm" aria-hidden="true" />
      <div
        className="glass-deep window-in relative max-h-[90vh] max-h-[90dvh] w-full max-w-4xl overflow-y-auto rounded-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-paper/15 bg-ink/70 px-5 py-3 backdrop-blur-md">
          <div className="flex min-w-0 items-center gap-3">
            <p className="truncate font-mono text-[10px] uppercase tracking-[0.25em] text-paper/85">
              <span className="text-accent">./</span>
              {project.title}.exe
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-2 py-1 font-mono text-xs text-fog transition-colors hover:bg-paper/10 hover:text-paper"
            aria-label="Close project"
          >
            ✕
          </button>
        </div>

        <div className="p-5 md:p-7">
          <div className="overflow-hidden rounded-lg border border-white/10 bg-ink/60">
            <img
              src={project.gallery[active]}
              alt={`${project.title} screenshot ${active + 1}`}
              className="max-h-[60vh] w-full bg-ink object-contain"
              loading="lazy"
              decoding="async"
            />
          </div>

          {project.gallery.length > 1 && (
            <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
              {project.gallery.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`h-24 w-32 shrink-0 overflow-hidden rounded-lg border transition-colors ${
                    i === active ? 'border-accent' : 'border-white/10 hover:border-paper/40'
                  }`}
                  aria-label={`View screenshot ${i + 1}`}
                >
                  <img src={src} alt="" className="h-full w-full object-cover" loading="lazy" decoding="async" />
                </button>
              ))}
            </div>
          )}

          <div className="mt-7">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-fog">
              {project.date} · {project.category}
            </p>
            {project.private && (
              <p className="mt-2 inline-flex items-center gap-1.5 rounded-lg bg-amber-400 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-ink">
                <i className="fas fa-lock text-[9px]" aria-hidden="true" /> private project
              </p>
            )}
            <h3 className="mt-2 font-display text-2xl font-bold leading-tight tracking-tight md:text-3xl">
              {project.title}
            </h3>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                  <span key={tag} className="tag px-2.5 py-1 font-mono text-[10px] text-paper/70">
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-5 space-y-3 text-sm leading-relaxed text-paper/75 md:text-[15px]">
              {project.description.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </div>

              <div className="mt-6 flex flex-wrap gap-3">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-accent px-5 py-2.5 font-mono text-xs uppercase tracking-[0.2em] text-accent transition-all hover:bg-accent hover:text-ink"
                  >
                    <i className="fab fa-github" aria-hidden="true" /> GitHub
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="glass-chip inline-flex items-center gap-2 rounded-lg px-5 py-2.5 font-mono text-xs uppercase tracking-[0.2em] text-paper transition-all hover:bg-paper hover:text-ink"
                  >
                    <i className="fas fa-arrow-up-right-from-square" aria-hidden="true" /> Live Demo
                  </a>
                )}
                {project.private && !project.github && !project.demo && (
                  <p className="flex w-full items-center gap-2 border-t border-paper/15 pt-4 pb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-fog">
                    <i className="fas fa-lock text-[10px] text-amber-400" aria-hidden="true" /> private build — source &amp; demo unavailable
                  </p>
                )}
              </div>
            </div>
          </div>
  )
}
