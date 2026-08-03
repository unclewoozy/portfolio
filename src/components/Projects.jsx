import { useCallback, useEffect, useRef, useState } from 'react'
import { PROJECTS } from '../data/site'
import SectionHeader from './SectionHeader'
import Reveal from './Reveal'

function ProjectModal({ project, onClose }) {
  const [slide, setSlide] = useState(0)
  const panelRef = useRef(null)
  const total = project?.gallery.length ?? 0
  const safeSlide = total > 0 ? Math.min(Math.max(slide, 0), total - 1) : 0
  const src = project?.gallery?.[safeSlide]

  const next = useCallback(() => {
    if (total < 2) return
    setSlide((s) => (s + 1) % total)
  }, [total])

  const prev = useCallback(() => {
    if (total < 2) return
    setSlide((s) => (s - 1 + total) % total)
  }, [total])

  useEffect(() => {
    if (!project) return
    setSlide(0)
    panelRef.current?.scrollTo({ top: 0 })
  }, [project])

  useEffect(() => {
    if (!project) return
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [project, onClose, next, prev])

  if (!project) return null

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/80 p-4 md:p-10"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} details`}
      onClick={onClose}
    >
      <div
        className="glass-deep sheen relative flex h-[92vh] max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-[32px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-paper/15 px-4 py-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-fog">
            <span className="text-accent">~/projects</span> / {project.shortTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
          </p>
          <button
            type="button"
            onClick={onClose}
            className="glass-chip flex h-9 w-9 items-center justify-center rounded-full font-mono text-sm text-paper transition-colors hover:bg-paper hover:text-ink"
            aria-label="Close project details"
          >
            ✕
          </button>
        </div>

          <div className="grid min-h-0 min-w-0 flex-1 overflow-y-auto md:grid-cols-[1.35fr_1fr] md:overflow-hidden">
            <div className="flex min-h-0 min-w-0 flex-col overflow-hidden border-b border-paper/15 md:border-b-0 md:border-r">
              <div className="relative aspect-video w-full shrink-0 bg-ink/50 md:aspect-auto md:min-h-0 md:flex-1">
              {src && (
                <img
                  key={src}
                  src={src}
                  alt={`${project.title} — screenshot ${safeSlide + 1}`}
                  className="absolute inset-0 h-full w-full object-contain"
                  loading="eager"
                  decoding="async"
                />
              )}
              <button
                type="button"
                onClick={prev}
                disabled={total < 2}
                className="glass-chip absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full font-mono text-lg text-paper transition-colors hover:bg-paper hover:text-ink disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white/10 disabled:hover:text-paper"
                aria-label="Previous screenshot"
              >
                ←
              </button>
              <button
                type="button"
                onClick={next}
                disabled={total < 2}
                className="glass-chip absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full font-mono text-lg text-paper transition-colors hover:bg-paper hover:text-ink disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white/10 disabled:hover:text-paper"
                aria-label="Next screenshot"
              >
                →
              </button>
              <span className="glass-chip absolute bottom-3 right-4 rounded-full px-3 py-1 font-mono text-[11px] text-accent">
                {String(safeSlide + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
              </span>
            </div>

            <div className="flex gap-2.5 overflow-x-auto border-t border-paper/15 px-4 py-3.5">
              {project.gallery.map((galSrc, i) => (
                <button
                  key={galSrc}
                  type="button"
                  onClick={() => setSlide(i)}
                  className={`relative h-20 w-28 shrink-0 overflow-hidden rounded-xl border-2 transition-all ${
                    i === safeSlide ? 'border-accent' : 'border-paper/20 opacity-60 hover:opacity-100'
                  }`}
                  aria-label={`View screenshot ${i + 1}`}
                  aria-current={i === safeSlide}
                >
                  <img src={galSrc} alt="" className="h-full w-full object-cover" loading="lazy" />
                </button>
              ))}
            </div>
          </div>

          <div ref={panelRef} className="min-h-0 min-w-0 overflow-y-auto p-6 md:p-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-fog">
              (<span className="text-accent">{project.category}</span>)
            </p>
            <h3 className="mt-3 font-display text-2xl font-bold uppercase leading-tight tracking-tight">
              {project.title}
            </h3>
            <p className="mt-3 font-mono text-xs text-fog">
              <span className="text-accent">date:</span> {project.date}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="glass-chip rounded-full px-2.5 py-1 font-mono text-[11px] text-paper/70">
                  <span className="text-accent">[</span>
                  {tag}
                  <span className="text-accent">]</span>
                </span>
              ))}
            </div>

            <div className="mt-6 space-y-4">
              {project.description.map((p, i) => (
                <p key={i} className="text-sm leading-relaxed text-paper/70">
                  <span className="font-mono text-[10px] text-accent">{String(i + 1).padStart(2, '0')}.</span>{' '}
                  {p}
                </p>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault()
                  onClose()
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="inline-flex items-center gap-2 rounded-xl border-2 border-accent bg-accent px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-ink transition-all hover:bg-transparent hover:text-accent"
              >
                Build something similar ↗
              </a>
              <button
                type="button"
                onClick={onClose}
                className="glass-chip inline-flex items-center gap-2 rounded-xl px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-paper transition-colors hover:bg-paper hover:text-ink"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ProjectCard({ project, index, onOpen, large }) {
  return (
    <article
      className={`glass glass-hover sheen group flex cursor-pointer flex-col rounded-[28px] p-2.5 transition-all duration-300 hover:-translate-y-1 ${
        large ? 'lg:grid lg:grid-cols-[1.2fr_1fr]' : ''
      }`}
      onClick={onOpen}
    >
      <div className={`relative overflow-hidden rounded-[22px] bg-ink/50 lg:h-full ${large ? 'lg:rounded-r-none' : ''}`}>
        <img
          src={project.cover}
          alt={project.title}
          className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04] ${large ? 'aspect-[16/9] lg:aspect-auto lg:h-full' : 'aspect-[16/10]'}`}
          loading="lazy"
        />
        <span className="absolute left-3 top-3 rounded-full bg-accent px-2.5 py-1 font-mono text-[11px] font-bold text-ink">
          P.{String(index + 1).padStart(2, '0')}
        </span>
        <span className="glass-chip absolute bottom-3 right-3 rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
          {project.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4 md:p-6">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-display text-xl md:text-2xl font-bold uppercase leading-tight tracking-tight">
            {project.shortTitle}
          </h3>
          <p className="shrink-0 font-mono text-[11px] uppercase tracking-[0.2em] text-fog">
            {project.date}
          </p>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {project.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="glass-chip rounded-full px-2 py-0.5 font-mono text-[10px] text-paper/70">
              {tag}
            </span>
          ))}
        </div>

        <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-paper/70">
          {project.description[0]}
        </p>

        <p className="mt-auto flex items-center gap-2 pt-6 font-mono text-xs uppercase tracking-[0.2em] text-paper">
          <span className="text-fog">Open case study</span>
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5 group-hover:text-accent">
            →
          </span>
        </p>
      </div>
    </article>
  )
}

export default function Projects() {
  const [active, setActive] = useState(null)

  return (
    <section id="projects" className="relative">
      <div className="mx-auto max-w-6xl px-5 md:px-6 py-20 md:py-28">
        <SectionHeader
          index="03"
          label="Builds"
          title="Featured Projects"
          right={
            <p className="hidden md:block font-mono text-xs uppercase tracking-[0.25em] text-fog max-w-[240px] text-right leading-relaxed">
              2023 — 2026 · web, desktop & mobile systems
            </p>
          }
        />

        <div className="grid gap-8 md:grid-cols-2">
          {PROJECTS.map((project, i) => (
            <Reveal
              key={project.id}
              delay={(i % 2) * 100}
              className={i === 0 ? 'md:col-span-2' : ''}
            >
              <ProjectCard
                project={project}
                index={i}
                large={i === 0}
                onOpen={() => setActive(project)}
              />
            </Reveal>
          ))}
        </div>
      </div>

      <ProjectModal key={active?.id ?? 'closed'} project={active} onClose={() => setActive(null)} />
    </section>
  )
}
