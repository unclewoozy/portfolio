import { useEffect, useState } from 'react'

const LINES = [
  'mounting /portfolio ...',
  'loading glass surfaces ...',
  'indexing projects ...',
  'connecting assistant ...',
  'workspace ready.',
]

export default function BootScreen({ done }) {
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      done()
      return
    }
    const t = setTimeout(() => setExiting(true), 1500)
    const t2 = setTimeout(done, 2050)
    return () => {
      clearTimeout(t)
      clearTimeout(t2)
    }
  }, [done])

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink ${
        exiting ? 'boot-exit' : ''
      }`}
      role="status"
      aria-label="Loading workspace"
    >
      <p className="font-mono text-sm text-paper">
        <span className="text-accent">~/</span>
        <span className="text-gradient font-semibold">portfolio</span>
        <span className="text-accent">.dev</span>
      </p>
      <div className="mt-6 h-1 w-56 overflow-hidden rounded-full bg-white/10">
        <div className="boot-bar h-full rounded-full bg-gradient-to-r from-accent to-[#a855f7] shadow-[0_0_18px_rgba(10,132,255,0.8)]" />
      </div>
      <div className="mt-5 h-24 w-56 space-y-1">
        {LINES.map((l) => (
          <p key={l} className="font-mono text-[10px] text-fog/80">
            <span className="text-accent">❯</span> {l}
          </p>
        ))}
      </div>
    </div>
  )
}
