import { useEffect, useMemo, useRef, useState } from 'react'
import { ChevronRight, FolderGit2, Search } from 'lucide-react'
import { useSiteData } from '../../SiteData'
import { CORE_GROUPS } from './SkillsWindow'
import { FILES } from './explorer-data'
import useScrollSpy from '../../hooks/useScrollSpy'

function SectionLabel({ children, right }) {
  return (
    <div className="flex items-center justify-between">
      <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-fog/70">{children}</p>
      {right}
    </div>
  )
}

export default function Sidebar({ onViewResume, onNavigate }) {
  const { PROFILE, SKILLS } = useSiteData()
  const go = (id) => (e) => {
    e.preventDefault()
    setManual(id)
    if (id === 'resume') {
      onViewResume()
      onNavigate?.(id)
      return
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    onNavigate?.(id)
  }

  const ids = useMemo(() => FILES.map((f) => f.id), [])
  const spyActive = useScrollSpy(ids)
  const [manual, setManual] = useState(null)
  const manualTimer = useRef(null)

  // Hand control back to the scroll-spy once scrolling settles, so the
  // highlight always reflects where the user actually is. Files with no
  // section (resume.pdf) stay pinned until the next navigation.
  useEffect(() => {
    const onScroll = () => {
      clearTimeout(manualTimer.current)
      manualTimer.current = setTimeout(() => setManual(null), 900)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      clearTimeout(manualTimer.current)
    }
  }, [])
  const active = manual ?? spyActive
  const [query, setQuery] = useState('')
  const [hovered, setHovered] = useState(null)
  const [openStacks, setOpenStacks] = useState([])
  const allStacksOpen = openStacks.length === CORE_GROUPS.length
  const toggleStack = (gi) =>
    setOpenStacks((prev) => (prev.includes(gi) ? prev.filter((i) => i !== gi) : [...prev, gi]))
  const toggleAllStacks = () =>
    setOpenStacks((prev) => (prev.length === CORE_GROUPS.length ? [] : CORE_GROUPS.map((_, i) => i)))

  const visible = FILES.filter((f) =>
    f.name.toLowerCase().includes(query.trim().toLowerCase()),
  )
  const stackByName = Object.fromEntries(SKILLS.featured.map((s) => [s.name, s]))

  return (
    <div className="flex h-full flex-col overflow-hidden" aria-label="Sidebar">
      <a
        href="#about"
        onClick={go('about')}
        className="group flex items-center gap-3 border-b border-paper/10 bg-gradient-to-b from-white/[0.05] to-transparent px-4 py-3.5 transition-colors hover:from-white/[0.09]"
        aria-label="Open profile"
      >
        <div className="relative shrink-0">
          <img
            src={PROFILE.photo}
            alt=""
            className="h-11 w-11 rounded-xl object-cover object-top ring-1 ring-white/20"
            loading="lazy"
          />
          <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-[2.5px] border-[#121318] bg-lime" aria-hidden="true" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate font-display text-sm font-bold uppercase leading-tight tracking-tight text-paper" title={PROFILE.name}>
            {PROFILE.name}
          </p>
          <p className="mt-0.5 flex items-center gap-1.5 truncate font-mono text-[9px] uppercase tracking-[0.2em] text-fog" title="Full Stack / IT Specialist">
            <span className="text-accent" aria-hidden="true">▸</span>
            full stack / it specialist
          </p>
        </div>
        <ChevronRight className="h-4 w-4 shrink-0 text-fog/40 transition-all group-hover:translate-x-0.5 group-hover:text-accent" strokeWidth={2} aria-hidden="true" />
      </a>

      <div className="sidebar-scroll min-h-0 flex-1 space-y-6 overflow-y-auto p-4">
        <section aria-label="File explorer">
          <SectionLabel
            right={
              <span className="rounded border border-paper/10 bg-white/5 px-1.5 py-px font-mono text-[9px] text-fog">
                {visible.length}/{FILES.length}
              </span>
            }
          >
            <span className="inline-flex items-center gap-1.5">
              <FolderGit2 className="h-3 w-3 text-accent" strokeWidth={2} />
              explorer
            </span>
          </SectionLabel>
          <div className="mt-2 flex items-center gap-2 rounded-md border border-paper/10 bg-ink/60 px-2 py-1.5 transition-colors focus-within:border-accent/50">
            <Search className="h-3 w-3 shrink-0 text-fog/60" strokeWidth={2.5} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="filter files…"
              aria-label="Filter files"
              className="w-full bg-transparent font-mono text-[11px] text-paper outline-none placeholder:text-fog/40"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label="Clear filter"
                className="shrink-0 font-mono text-[11px] text-fog/60 transition-colors hover:text-paper"
              >
                ✕
              </button>
            )}
          </div>
          <ul className="mt-1.5 space-y-0.5">
            {visible.map((file) => {
              const isActive = active === file.id
              return (
                <li
                  key={file.id}
                  className="relative"
                  onMouseEnter={() => setHovered(file)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <span
                    className={`pointer-events-none absolute left-0 top-1.5 bottom-1.5 w-[2px] rounded-full bg-accent transition-opacity duration-300 ${
                      isActive ? 'opacity-100' : 'opacity-0'
                    }`}
                    aria-hidden="true"
                  />
                  <a
                    href={`#${file.id}`}
                    onClick={go(file.id)}
                    className={`flex items-center gap-2 rounded-md py-1.5 pl-3 pr-2 font-mono text-[12px] transition-colors ${
                      isActive
                        ? 'bg-accent/10 text-accent'
                        : 'text-fog hover:bg-white/5 hover:text-paper'
                    }`}
                  >
                    <span className={isActive ? 'text-accent' : 'text-fog/60'}>
                      {file.icon && <file.icon className="h-3.5 w-3.5" strokeWidth={1.75} />}
                    </span>
                    <span className="truncate">{file.name}</span>
                    {isActive && (
                      <span className="ml-auto h-1.5 w-1.5 shrink-0 rounded-full bg-accent animate-pulse-dot" aria-hidden="true" />
                    )}
                  </a>
                </li>
              )
            })}
            {visible.length === 0 && (
              <li className="px-3 py-4 text-center font-mono text-[11px] text-fog/60">
                no matches for “{query}”
              </li>
            )}
          </ul>
        </section>

        <section aria-label="Current stack">
          <SectionLabel
            right={
              <button
                type="button"
                onClick={toggleAllStacks}
                aria-expanded={allStacksOpen}
                className="rounded font-mono text-[9px] uppercase tracking-[0.15em] text-fog/60 transition-colors hover:text-accent"
              >
                {allStacksOpen ? 'collapse all' : 'expand all'}
              </button>
            }
          >
            current stack
          </SectionLabel>
          <div className="mt-1 border-t border-paper/15">
            {CORE_GROUPS.map((group, gi) => {
              const isOpen = openStacks.includes(gi)
              const count = group.skills.filter((n) => stackByName[n]).length
              return (
                <div key={group.label} className="border-b border-paper/15">
                  <button
                    type="button"
                    onClick={() => toggleStack(gi)}
                    aria-expanded={isOpen}
                    className="group flex w-full items-center gap-2 rounded-md px-1.5 py-2 text-left transition-colors hover:bg-white/5"
                  >
                    <span className="truncate font-mono text-[9px] uppercase tracking-[0.25em] text-fog/70 transition-colors group-hover:text-paper">
                      <span className="text-accent">▸</span> {group.label}
                    </span>
                    <span className="shrink-0 font-mono text-[9px] text-fog/50">{count}</span>
                    <span
                      className={`ml-auto shrink-0 pr-0.5 font-mono text-[10px] text-accent transition-transform duration-300 ${
                        isOpen ? 'rotate-90' : ''
                      }`}
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </button>
                  {isOpen && (
                    <div className="flex flex-wrap gap-1.5 pb-3">
                      {group.skills.map((name) =>
                        stackByName[name] ? (
                          <span key={name} className="tag px-2 py-0.5 font-mono text-[10px] text-paper/75">
                            {name}
                          </span>
                        ) : null,
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </section>
      </div>

      <div className="flex shrink-0 items-center justify-between gap-2 border-t border-paper/15 px-4 py-2">
        <p className="flex shrink-0 items-center font-mono text-[9px] uppercase tracking-[0.25em] text-fog/70">
          <span className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-lime animate-pulse-dot" aria-hidden="true" />
          synced
        </p>
        <p className="truncate font-mono text-[9px] text-fog/50">
          {hovered ? hovered.path : 'main'}
        </p>
      </div>
    </div>
  )
}
