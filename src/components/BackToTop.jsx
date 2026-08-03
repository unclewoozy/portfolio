import { useEffect, useState } from 'react'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`glass-chip fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full font-mono text-sm text-paper transition-all duration-300 hover:bg-accent hover:text-ink active:scale-90 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6 pointer-events-none'
      }`}
      aria-label="Back to top"
    >
      ↑
    </button>
  )
}
