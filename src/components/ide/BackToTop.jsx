import { useEffect, useState } from 'react'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let ticking = false
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      const p = max > 0 ? Math.min(100, Math.max(0, (window.scrollY / max) * 100)) : 0
      setProgress(p)
      setVisible(window.scrollY > 600)
      ticking = false
    }
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label={`Back to top — ${Math.round(progress)}% read`}
      tabIndex={visible ? 0 : -1}
      className={`fixed bottom-12 right-4 z-40 hidden flex-col items-center gap-1 rounded-full border border-paper/15 bg-ink/80 px-2.5 py-3 backdrop-blur-xl transition-all duration-300 hover:border-accent/50 lg:flex ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <span className="font-mono text-sm text-paper" aria-hidden="true">↑</span>
      <span className="font-mono text-[9px] tabular-nums text-fog/70" aria-hidden="true">
        {Math.round(progress)}
      </span>
    </button>
  )
}
