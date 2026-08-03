import { useMemo, useState } from 'react'
import { FILES } from './explorer-data'
import useScrollSpy from '../../hooks/useScrollSpy'

export default function FileExplorer({ onNavigate }) {
  const ids = useMemo(() => FILES.map((f) => f.id), [])
  const active = useScrollSpy(ids)
  const [openDirs, setOpenDirs] = useState(() =>
    Object.fromEntries(FILES.filter((f) => f.type === 'dir').map((f) => [f.id, true])),
  )

  const open = (id) => (e) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    onNavigate?.(id)
  }

  return (
    <div className="flex h-full flex-col overflow-hidden" aria-label="File explorer">
      <div className="flex items-center justify-between border-b border-paper/15 px-4 py-2.5">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-fog">explorer</p>
        <p className="font-mono text-[10px] text-fog/60">~/portfolio</p>
      </div>

      <nav className="flex-1 overflow-y-auto p-2.5">
        <p className="px-2 py-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-accent">
          portfolio.dev
        </p>
        <ul className="space-y-0.5">
          {FILES.map((file) => (
            <li key={file.id}>
              {file.type === 'dir' ? (
                <>
                  <button
                    type="button"
                    onClick={() => setOpenDirs((d) => ({ ...d, [file.id]: !d[file.id] }))}
                    className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 font-mono text-[12px] text-fog transition-colors hover:bg-white/5 hover:text-paper"
                  >
                    <span className="text-[9px]">{openDirs[file.id] ? '▾' : '▸'}</span>
                    <span className="text-accent">{file.icon}</span>
                    {file.name}
                  </button>
                  {openDirs[file.id] && (
                    <ul className="ml-4 space-y-0.5 border-l border-white/10 pl-2">
                      {['index', 'view', 'data'].map((child) => (
                        <li key={child}>
                          <a
                            href={`#${file.id}`}
                            onClick={open(file.id)}
                            className={`block rounded-lg px-2 py-1 font-mono text-[11px] transition-colors ${
                              active === file.id
                                ? 'bg-accent/15 text-accent'
                                : 'text-fog/80 hover:bg-white/5 hover:text-paper'
                            }`}
                          >
                            {child}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <a
                  href={`#${file.id}`}
                  onClick={open(file.id)}
                  className={`flex items-center gap-2 rounded-lg px-2 py-1.5 font-mono text-[12px] transition-colors ${
                    active === file.id
                      ? 'bg-accent/15 text-accent'
                      : 'text-fog hover:bg-white/5 hover:text-paper'
                  }`}
                >
                  <span className="text-accent">{file.icon}</span>
                  {file.name}
                  {active === file.id && (
                    <span className="ml-auto h-1.5 w-1.5 rounded-full bg-accent animate-pulse-dot" aria-hidden="true" />
                  )}
                </a>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
