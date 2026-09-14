import { useEffect, useState } from 'react'
import { Maximize2, Minimize2, Plus, Trash2, X } from 'lucide-react'
import { useSiteData } from '../../SiteData'
import { ROUTES } from './explorer-data'
import Terminal from './Terminal'

const TABS = ['Problems', 'Output', 'Debug Console', 'Terminal', 'Ports']

function stamp() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
}

export default function TerminalPanel({ open, onClose }) {
  const { PROJECTS, CERTIFICATIONS, EXPERIENCE, loaded, fromApi } = useSiteData()
  const [session, setSession] = useState(0)
  const [tab, setTab] = useState('Terminal')
  const [maxed, setMaxed] = useState(false)
  const [history, setHistory] = useState([])

  const log = [
    `[${stamp()}] portfolio.dev — session started`,
    `[${stamp()}] site data: ${loaded ? (fromApi ? 'live api' : 'local fallback') : 'loading…'}`,
    `[${stamp()}] indexed ${ROUTES.length} sections · ${PROJECTS.length} projects · ${CERTIFICATIONS.length} certs · ${EXPERIENCE.length} roles`,
  ]

  useEffect(() => {
    if (!open) return
    const t = setTimeout(() => document.getElementById('term-panel-input')?.focus(), 320)
    return () => clearTimeout(t)
  }, [open])

  const record = (raw) => setHistory((h) => [...h.slice(-19), { cmd: raw, at: stamp() }])

  return (
    <div
      aria-hidden={!open}
      className={`fixed inset-x-0 bottom-24 z-40 transition-all duration-300 lg:bottom-8 lg:left-[var(--sidebar-w,20rem)] ${
        open ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-[calc(100%+3rem)] opacity-0'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="overflow-hidden rounded-t-xl border border-b-0 border-paper/15 bg-[#101116]/95 shadow-[0_-16px_64px_rgba(0,0,0,0.6)] backdrop-blur-xl">
          <div className="flex items-center gap-1 border-b border-paper/10 px-2">
            <div role="tablist" aria-label="Panel tabs" className="flex min-w-0 flex-1 items-center overflow-x-auto">
              {TABS.map((t) => {
                const selected = tab === t
                return (
                  <button
                    key={t}
                    role="tab"
                    aria-selected={selected}
                    onClick={() => setTab(t)}
                    tabIndex={open ? 0 : -1}
                    className={`relative shrink-0 px-3 py-2.5 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors ${
                      selected ? 'text-paper' : 'text-fog/60 hover:text-paper'
                    }`}
                  >
                    <span
                      className={`absolute inset-x-2 top-0 h-0.5 bg-accent transition-opacity ${selected ? 'opacity-100' : 'opacity-0'}`}
                      aria-hidden="true"
                    />
                    {t}
                    {t === 'Problems' && (
                      <span className="ml-1.5 rounded-full bg-white/10 px-1.5 py-px font-mono text-[9px] tabular-nums text-fog/70">
                        0
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
            <div className="flex shrink-0 items-center gap-0.5 py-1">
              <button
                type="button"
                onClick={() => { setSession((s) => s + 1); setTab('Terminal') }}
                tabIndex={open ? 0 : -1}
                aria-label="New terminal session"
                title="New session"
                className="rounded-md p-1.5 text-fog/60 transition-colors hover:bg-white/5 hover:text-paper"
              >
                <Plus className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => setSession((s) => s + 1)}
                tabIndex={open ? 0 : -1}
                aria-label="Clear terminal"
                title="Clear"
                className="rounded-md p-1.5 text-fog/60 transition-colors hover:bg-white/5 hover:text-paper"
              >
                <Trash2 className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => setMaxed((m) => !m)}
                tabIndex={open ? 0 : -1}
                aria-label={maxed ? 'Restore panel size' : 'Maximize panel'}
                title={maxed ? 'Restore' : 'Maximize'}
                className="rounded-md p-1.5 text-fog/60 transition-colors hover:bg-white/5 hover:text-paper"
              >
                {maxed ? (
                  <Minimize2 className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
                ) : (
                  <Maximize2 className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
                )}
              </button>
              <button
                type="button"
                onClick={onClose}
                tabIndex={open ? 0 : -1}
                aria-label="Close panel (Ctrl `)"
                title="Close panel"
                className="rounded-md p-1.5 text-fog/60 transition-colors hover:bg-white/5 hover:text-paper"
              >
                <X className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className={`${maxed ? 'max-h-[68vh]' : 'max-h-[38vh]'} overflow-y-auto`}>
            {tab === 'Terminal' && (
              <div className="p-3">
                <Terminal key={session} inputId="term-panel-input" onCommand={record} />
              </div>
            )}
            {tab === 'Output' && (
              <div className="space-y-1 p-4 font-mono text-[12px] leading-relaxed">
                {log.map((line, i) => (
                  <p key={i} className="text-paper/75">{line}</p>
                ))}
              </div>
            )}
            {tab === 'Debug Console' && (
              <div className="space-y-1 p-4 font-mono text-[12px] leading-relaxed">
                {history.length === 0 ? (
                  <p className="text-fog/50">no debug output yet — run a command in the terminal.</p>
                ) : (
                  history.map((h, i) => (
                    <p key={i} className="text-paper/75">
                      <span className="text-fog/40">[{h.at}]</span> <span className="text-accent">❯</span> {h.cmd}
                    </p>
                  ))
                )}
              </div>
            )}
            {tab === 'Problems' && (
              <div className="p-4 font-mono text-[12px] text-fog/60">
                No problems have been detected in the workspace.
              </div>
            )}
            {tab === 'Ports' && (
              <div className="p-4 font-mono text-[12px] text-fog/60">
                No forwarded ports in this workspace — static deployment.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
