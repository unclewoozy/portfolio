import { useEffect, useMemo, useState } from 'react'
import useScrollSpy from '../../hooks/useScrollSpy'
import { FILE_ICONS } from './explorer-data'

const DOCK_ITEMS = [
  { id: 'home', label: 'home' },
  { id: 'about', label: 'about' },
  { id: 'skills', label: 'skills' },
  { id: 'projects', label: 'projects' },
  { id: 'experience', label: 'experience' },
  { id: 'contact', label: 'contact' },
]

export default function Dock() {
  const ids = useMemo(() => DOCK_ITEMS.map((item) => item.id), [])
  const active = useScrollSpy(ids)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    let lastY = window.scrollY
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const y = window.scrollY
        const delta = y - lastY
        if (delta > 4 && y > 120) setHidden(true)
        else if (delta < -4 || y <= 120) setHidden(false)
        lastY = y
        ticking = false
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (id) => (e) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div
      className={`fixed bottom-3 left-0 right-0 z-50 flex justify-center px-4 pb-2 pb-[env(safe-area-inset-bottom)] lg:bottom-11 transition-transform duration-500 ${
        hidden ? 'pointer-events-none translate-y-[calc(100%+3rem)]' : 'translate-y-0'
      }`}
    >
      <nav
        className="glass flex items-end gap-1 rounded-2xl px-2.5 py-2 sm:gap-1.5"
        aria-label="Desktop dock"
      >
        {DOCK_ITEMS.map((item) => {
          const Icon = FILE_ICONS[item.id]
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={go(item.id)}
              className={`dock-item group flex w-11 flex-col items-center gap-1 rounded-xl px-1 py-1.5 sm:w-14 ${
                active === item.id
                  ? 'bg-accent/15 text-accent'
                  : 'text-fog hover:bg-white/5 hover:text-paper'
              }`}
              aria-label={`Open ${item.label} window`}
              aria-current={active === item.id}
            >
              <span className="flex h-[18px] items-center justify-center">
                {Icon && <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />}
              </span>
              <span className="w-full truncate text-center font-mono text-[8px] uppercase tracking-wider">
                {item.label}
              </span>
              {active === item.id && (
                <span className="h-1 w-1 rounded-full bg-accent animate-pulse-dot" aria-hidden="true" />
              )}
            </a>
          )
        })}
      </nav>
    </div>
  )
}
