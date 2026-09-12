import { useEffect, useState } from 'react'

export default function TitleBar() {
  const [time, setTime] = useState('')

  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      )
    tick()
    const t = setInterval(tick, 15000)
    return () => clearInterval(t)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-2 pt-2 pt-[max(0.5rem,env(safe-area-inset-top))] sm:px-3 lg:left-[var(--sidebar-w,20rem)]">
      <div className="chrome mx-auto flex h-11 max-w-[1440px] items-center justify-between rounded-md px-3 sm:px-4">
        <div className="flex items-center gap-4">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-500/90" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/90" />
            <span className="h-2.5 w-2.5 rounded-full bg-lime/90" />
          </div>
          <p className="hidden font-mono text-[11px] tracking-[0.15em] text-paper sm:block">
            portfolio<span className="text-accent">.dev</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <p className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-fog sm:block">
            sigmund@portfolio.dev
          </p>
          <p className="font-mono text-[11px] text-paper tabular-nums">{time}</p>
        </div>
      </div>
    </header>
  )
}
