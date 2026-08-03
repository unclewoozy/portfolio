import { useMemo, useState } from 'react'
import { ChevronDown, ChevronRight, FolderGit2, PanelLeft } from 'lucide-react'
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
        <div className="flex items-center gap-2">
          <PanelLeft className="h-3.5 w-3.5 text-accent" strokeWidth={2} />
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-paper">explorer</p>
        </div>
        <span className="rounded-md border border-paper/10 bg-white/5 px-1.5 py-0.5 font-mono text-[9px] text-fog">
          {ids.length} files
        </span>
      </div>

      <nav className="flex-1 overflow-y-auto p-2.5">
        <div className="mb-1.5 flex items-center gap-1.5 px-2 py-1.5">
          <ChevronDown className="h-3 w-3 text-fog/70" strokeWidth={2.5} />
          <FolderGit2 className="h-3.5 w-3.5 text-accent" strokeWidth={1.75} />
          <span className="font-mono text-[11px] font-semibold tracking-wide text-paper">portfolio.dev</span>
        </div>

        <ul className="space-y-0.5">
          {FILES.map((file) => (
            <li key={file.id}>
              {file.type === 'dir' ? (
                <>
                  <button
                    type="button"
                    onClick={() => setOpenDirs((d) => ({ ...d, [file.id]: !d[file.id] }))}
                    className={`flex w-full items-center gap-1.5 rounded-lg py-1.5 pl-2 pr-2 font-mono text-[12px] transition-colors ${
                      active === file.id
                        ? 'bg-accent/15 text-accent'
                        : 'text-fog hover:bg-white/5 hover:text-paper'
                    }`}
                  >
                    <span className="text-fog/60">
                      {openDirs[file.id] ? (
                        <ChevronDown className="h-3 w-3" strokeWidth={2.5} />
                      ) : (
                        <ChevronRight className="h-3 w-3" strokeWidth={2.5} />
                      )}
                    </span>
                    <span className="text-accent">
                      {file.icon && <file.icon className="h-3.5 w-3.5" strokeWidth={1.75} />}
                    </span>
                    <span className="truncate">{file.name}</span>
                  </button>
                  {openDirs[file.id] && (
                    <ul className="ml-4 space-y-0.5 border-l border-white/10 pl-2">
                      {['index', 'view', 'data'].map((child) => (
                        <li key={child}>
                          <a
                            href={`#${file.id}`}
                            onClick={open(file.id)}
                            className={`group flex items-center gap-1.5 rounded-md py-1 pl-2 pr-2 font-mono text-[11px] transition-colors ${
                              active === file.id
                                ? 'text-accent'
                                : 'text-fog/80 hover:bg-white/5 hover:text-paper'
                            }`}
                          >
                            <span
                              className={`h-1 w-1 rounded-full transition-colors ${
                                active === file.id ? 'bg-accent' : 'bg-fog/40 group-hover:bg-fog'
                              }`}
                              aria-hidden="true"
                            />
                            <span className="truncate">{child}</span>
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
                  className={`relative flex items-center gap-2 rounded-lg py-1.5 pl-2 pr-2 font-mono text-[12px] transition-colors ${
                    active === file.id
                      ? 'bg-accent/15 text-accent'
                      : 'text-fog hover:bg-white/5 hover:text-paper'
                  }`}
                >
                  <span className="text-accent">
                    {file.icon && <file.icon className="h-3.5 w-3.5" strokeWidth={1.75} />}
                  </span>
                  <span className="truncate">{file.name}</span>
                  {active === file.id && (
                    <span className="ml-auto flex shrink-0 items-center gap-1.5">
                      <span className="font-mono text-[9px] uppercase tracking-wider text-accent/70">
                        open
                      </span>
                      <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-dot" aria-hidden="true" />
                    </span>
                  )}
                </a>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex items-center justify-between border-t border-paper/15 px-4 py-2">
        <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-fog/70">
          <span className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-lime animate-pulse-dot" aria-hidden="true" />
          synced
        </p>
        <p className="font-mono text-[9px] text-fog/50">main</p>
      </div>
    </div>
  )
}
