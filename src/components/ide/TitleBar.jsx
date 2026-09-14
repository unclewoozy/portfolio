import { useEffect, useRef, useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Copy,
  FileText,
  Globe,
  Mail,
  PanelLeft,
  Search,
  Terminal,
} from 'lucide-react'
import { useSiteData } from '../../SiteData'
import { ROUTES } from './explorer-data'
import { gmailLink, toggleTerminal } from './navigate'

const DISABLED_MENUS = ['Edit', 'Selection', 'View', 'Run']

function MenuItem({ icon: Icon, label, hint, done, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex w-full items-center gap-2.5 rounded-md px-2.5 py-1.5 text-left transition-colors hover:bg-accent/15"
    >
      {Icon && <Icon className="h-3.5 w-3.5 shrink-0 text-fog/70 group-hover:text-accent" strokeWidth={2} aria-hidden="true" />}
      <span className="truncate font-mono text-[12px] text-paper/85 group-hover:text-paper">{label}</span>
      {done ? (
        <span className="ml-auto flex shrink-0 items-center gap-1 font-mono text-[10px] text-lime">
          <Check className="h-3 w-3" strokeWidth={2.5} aria-hidden="true" /> copied
        </span>
      ) : (
        hint && (
          <span className="ml-auto shrink-0 font-mono text-[10px] text-fog/50">{hint}</span>
        )
      )}
    </button>
  )
}

function CommandPalette({ open, onClose, onViewResume }) {
  const [query, setQuery] = useState('')
  const [cursor, setCursor] = useState(0)
  const inputRef = useRef(null)

  useEffect(() => {
    if (open) {
      setQuery('')
      setCursor(0)
      requestAnimationFrame(() => inputRef.current?.focus())
    }
  }, [open ])

  const results = ROUTES.filter(
    (r) =>
      r.file.toLowerCase().includes(query.trim().toLowerCase()) ||
      r.label.includes(query.trim().toLowerCase()),
  )

  useEffect(() => setCursor(0), [query])

  if (!open) return null

  const activate = (route) => {
    if (!route) return
    onClose()
    if (route.id === 'resume') {
      onViewResume()
      return
    }
    document.getElementById(route.id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div
      className="fixed inset-0 z-[70] bg-ink/60 backdrop-blur-sm"
      onClick={onClose}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Quick open"
        className="mx-auto mt-[12vh] w-[calc(100%-2rem)] max-w-lg overflow-hidden rounded-xl border border-paper/15 bg-[#14151b] shadow-[0_24px_80px_rgba(0,0,0,0.7)]"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => {
          if (e.key === 'Escape') onClose()
          else if (e.key === 'ArrowDown') {
            e.preventDefault()
            setCursor((c) => Math.min(results.length - 1, c + 1))
          } else if (e.key === 'ArrowUp') {
            e.preventDefault()
            setCursor((c) => Math.max(0, c - 1))
          } else if (e.key === 'Enter') activate(results[cursor])
        }}
      >
        <div className="flex items-center gap-2.5 border-b border-paper/10 px-4 py-3">
          <Search className="h-4 w-4 shrink-0 text-accent" strokeWidth={2} aria-hidden="true" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="portfolio — type a file name…"
            aria-label="Quick open files"
            className="w-full bg-transparent font-mono text-[13px] text-paper outline-none placeholder:text-fog/40"
          />
          <kbd className="shrink-0 rounded border border-paper/15 bg-white/5 px-1.5 py-px font-mono text-[10px] text-fog/70">
            esc
          </kbd>
        </div>
        <ul className="max-h-72 overflow-y-auto p-1.5">
          {results.map((r, i) => {
            const Icon = r.icon
            return (
              <li key={r.id}>
                <button
                  type="button"
                  onClick={() => activate(r)}
                  onMouseEnter={() => setCursor(i)}
                  className={`flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-left transition-colors ${
                    i === cursor ? 'bg-accent/15' : ''
                  }`}
                >
                  {Icon && (
                    <Icon
                      className={`h-3.5 w-3.5 shrink-0 ${i === cursor ? 'text-accent' : 'text-fog/60'}`}
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                  )}
                  <span className={`truncate font-mono text-[12px] ${i === cursor ? 'text-paper' : 'text-fog'}`}>
                    {r.file}
                  </span>
                  <span className="ml-auto shrink-0 font-mono text-[10px] text-fog/40">{r.path}</span>
                </button>
              </li>
            )
          })}
          {results.length === 0 && (
            <li className="px-3 py-5 text-center font-mono text-[12px] text-fog/60">
              no matches for “{query}”
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}

export default function TitleBar({ onViewResume, sidebarOpen, onToggleSidebar }) {
  const { PROFILE, CONTACT } = useSiteData()
  const [time, setTime] = useState('')
  const [openMenu, setOpenMenu] = useState(null)
  const [palette, setPalette] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
    tick()
    const t = setInterval(tick, 15000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setPalette((p) => !p)
      }
      if (e.key === 'Escape') setOpenMenu(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const email = CONTACT.details.find((d) => d.label?.toLowerCase() === 'email')
  const linkedin = CONTACT.details.find((d) => d.label?.toLowerCase() === 'linkedin')
  const to = email?.href?.replace('mailto:', '') ?? PROFILE.email

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(to)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {}
  }

  const scrollTo = (id) => {
    setOpenMenu(null)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const MENUS = {
    File: [
      { icon: FileText, label: 'Open resume.pdf', hint: 'pdf', onClick: () => { setOpenMenu(null); onViewResume() } },
      { icon: Copy, label: 'Copy email address', hint: to, done: copied, onClick: copyEmail },
      { icon: Mail, label: 'Send via Gmail', hint: '↗', onClick: () => { setOpenMenu(null); window.open(gmailLink(to), '_blank', 'noopener,noreferrer') } },
    ],
    Go: ROUTES.filter((r) => r.id !== 'terminal').map((r) => ({
      icon: r.icon,
      label: r.file,
      hint: (r.keys ?? []).join(' '),
      onClick: () => {
        setOpenMenu(null)
        if (r.id === 'resume') onViewResume()
        else scrollTo(r.id)
      },
    })),
    Terminal: [
      {
        icon: Terminal,
        label: 'Toggle terminal panel',
        hint: 'ctrl `',
        onClick: () => {
          setOpenMenu(null)
          toggleTerminal()
        },
      },
    ],
    Help: [
      { icon: Mail, label: 'Contact me', hint: 'g c', onClick: () => scrollTo('contact') },
      ...(linkedin
        ? [{ icon: Globe, label: 'LinkedIn profile', hint: '↗', onClick: () => { setOpenMenu(null); window.open(linkedin.href, '_blank', 'noopener,noreferrer') } }]
        : []),
      { icon: Copy, label: 'Copy email address', hint: to, done: copied, onClick: copyEmail },
    ],
  }

  const menuLabels = ['File', 'Edit', 'Selection', 'View', 'Go', 'Run', 'Terminal', 'Help']

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-paper/10 bg-ink/80 pt-[env(safe-area-inset-top)] backdrop-blur-xl">
        <div className="flex h-12 items-center gap-1 px-2 sm:px-3">
          <div className="flex shrink-0 items-center gap-1.5" aria-hidden="true">
            <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] text-accent" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
              <path d="m8 8-4 4 4 4" />
              <path d="m16 8 4 4-4 4" />
            </svg>
          </div>

          <nav aria-label="Application menu" className="hidden shrink-0 items-center md:flex">
            {menuLabels.map((label) =>
              DISABLED_MENUS.includes(label) ? (
                <span
                  key={label}
                  aria-disabled="true"
                  className="cursor-default rounded-md px-2 py-1 font-mono text-[12px] text-fog/35"
                >
                  {label}
                </span>
              ) : (
                <div key={label} className="relative">
                  <button
                    type="button"
                    aria-expanded={openMenu === label}
                    aria-haspopup="menu"
                    onClick={() => setOpenMenu((m) => (m === label ? null : label))}
                    onMouseEnter={() => openMenu && setOpenMenu(label)}
                    className={`rounded-md px-2 py-1 font-mono text-[12px] transition-colors ${
                      openMenu === label ? 'bg-white/10 text-paper' : 'text-fog hover:bg-white/5 hover:text-paper'
                    }`}
                  >
                    {label}
                  </button>
                  {openMenu === label && (
                    <div
                      role="menu"
                      aria-label={label}
                      className="absolute left-0 top-full z-[60] mt-1 w-72 rounded-lg border border-paper/15 bg-[#14151b] p-1.5 shadow-[0_16px_48px_rgba(0,0,0,0.65)]"
                    >
                      {(MENUS[label] ?? []).map((item) => (
                        <MenuItem key={item.label} {...item} />
                      ))}
                    </div>
                  )}
                </div>
              ),
            )}
          </nav>

          <div className="flex min-w-0 flex-1 items-center justify-center gap-1.5 px-2">
            <button
              type="button"
              onClick={() => window.history.back()}
              aria-label="Go back"
              className="hidden rounded-md p-1.5 text-fog/60 transition-colors hover:bg-white/5 hover:text-paper sm:block"
            >
              <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => window.history.forward()}
              aria-label="Go forward"
              className="hidden rounded-md p-1.5 text-fog/60 transition-colors hover:bg-white/5 hover:text-paper sm:block"
            >
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => setPalette(true)}
              aria-label="Quick open (Ctrl K)"
              className="flex w-full max-w-md items-center gap-2 rounded-md border border-paper/10 bg-white/[0.04] px-3 py-1.5 transition-colors hover:border-accent/40 hover:bg-white/[0.06]"
            >
              <Search className="h-3.5 w-3.5 shrink-0 text-fog/60" strokeWidth={2} aria-hidden="true" />
              <span className="truncate font-mono text-[12px] text-fog">portfolio</span>
              <kbd className="ml-auto hidden shrink-0 font-mono text-[10px] text-fog/40 lg:inline">
                ctrl K
              </kbd>
            </button>
          </div>

          <div className="flex shrink-0 items-center gap-0.5">
            <button
              type="button"
              onClick={onToggleSidebar}
              aria-label={sidebarOpen ? 'Hide sidebar' : 'Show sidebar'}
              aria-pressed={sidebarOpen}
              className={`hidden rounded-md p-1.5 transition-colors hover:bg-white/5 hover:text-paper lg:block ${
                sidebarOpen ? 'text-accent' : 'text-fog/60'
              }`}
            >
              <PanelLeft className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
            </button>
            <p className="ml-1 hidden font-mono text-[11px] tabular-nums text-fog sm:block">{time}</p>
          </div>
        </div>
      </header>

      {openMenu && (
        <div className="fixed inset-0 z-40" onClick={() => setOpenMenu(null)} aria-hidden="true" />
      )}

      <CommandPalette open={palette} onClose={() => setPalette(false)} onViewResume={onViewResume} />
    </>
  )
}
