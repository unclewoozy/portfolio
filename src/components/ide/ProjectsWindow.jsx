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

      <div className="mt-6 flex flex-col gap-5">
        <ProjectHero project={PROJECTS[0]} onOpen={setOpen} />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.slice(1).map((project) => (
            <ProjectCard key={project.id} project={project} onOpen={setOpen} />
          ))}
        </div>
      </div>

      {open && createPortal(<ProjectsModal project={open} onClose={() => setOpen(null)} />, document.body)}
    </IdeWindow>
  )
}

function ProjectHero({ project, onOpen }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(project)}
      className="group glass sheen relative block w-full overflow-hidden rounded-2xl text-left transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/60"
      aria-haspopup="dialog"
    >
      <div className="relative overflow-hidden">
        <img
          src={project.cover}
          alt={`${project.shortTitle} preview`}
          className="aspect-[16/9] w-full object-cover transition-transform duration-700 group-hover:scale-[1.05] md:aspect-[21/9]"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/40 to-transparent" aria-hidden="true" />
        <span className="glass-chip absolute left-4 top-4 rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.25em] text-accent">
          ★ featured
        </span>
        <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-paper/70">
            {project.date} · {project.category}
          </p>
          <h3 className="mt-2 font-display text-2xl font-bold leading-tight tracking-tight transition-colors group-hover:text-accent md:text-4xl">
            {project.shortTitle}
          </h3>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {project.tags.slice(0, 4).map((tag) => (
              <span key={tag} className="glass-chip rounded-full px-2.5 py-1 font-mono text-[10px] text-paper/75">
                {tag}
              </span>
            ))}
          </div>
          <p className="mt-4 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-accent">
            inspect
            <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">→</span>
          </p>
        </div>
      </div>
    </button>
  )
}

function ProjectCard({ project, onOpen }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(project)}
      className="group glass sheen relative flex flex-col overflow-hidden rounded-2xl text-left transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/60"
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
        <span className="absolute right-3 top-3 font-mono text-[10px] uppercase tracking-[0.2em] text-paper/80">
          {project.date}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-display text-lg font-bold leading-tight tracking-tight transition-colors group-hover:text-accent">
          {project.shortTitle}
        </h3>
        <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.25em] text-fog">
          {project.category}
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="glass-chip rounded-full px-2 py-0.5 font-mono text-[10px] text-paper/60">
              {tag}
            </span>
          ))}
        </div>

        <p className="mt-auto flex items-center gap-2 pt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
          inspect
          <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">→</span>
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
        className="glass-deep window-in relative max-h-[90vh] max-h-[90dvh] w-full max-w-4xl overflow-y-auto rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-paper/15 bg-ink/70 px-5 py-3 backdrop-blur-md">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex shrink-0 gap-1.5" aria-hidden="true">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-500/90" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400/90" />
              <span className="h-2.5 w-2.5 rounded-full bg-lime/90" />
            </div>
            <p className="truncate font-mono text-[10px] uppercase tracking-[0.25em] text-paper/85">
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
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-ink/60">
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
            <h3 className="mt-2 font-display text-2xl font-bold leading-tight tracking-tight md:text-3xl">
              {project.title}
            </h3>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span key={tag} className="glass-chip rounded-full px-2.5 py-1 font-mono text-[10px] text-paper/70">
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
                    className="inline-flex items-center gap-2 rounded-xl border-2 border-accent px-5 py-2.5 font-mono text-xs uppercase tracking-[0.2em] text-accent transition-all hover:bg-accent hover:text-ink"
                  >
                    <i className="fab fa-github" aria-hidden="true" /> GitHub
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="glass-chip inline-flex items-center gap-2 rounded-xl px-5 py-2.5 font-mono text-xs uppercase tracking-[0.2em] text-paper transition-all hover:bg-paper hover:text-ink"
                  >
                    <i className="fas fa-arrow-up-right-from-square" aria-hidden="true" /> Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>
  )
}
