import { useEffect } from 'react'

export default function useParallax() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.innerWidth < 768) return

    let raf = 0

    const tick = () => {
      raf = 0
      const vh = window.innerHeight
      document.querySelectorAll('[data-parallax]').forEach((el) => {
        const rect = el.getBoundingClientRect()
        if (rect.bottom < -80 || rect.top > vh + 80) return
        const offset = (rect.top + rect.height / 2 - vh / 2) * -0.035
        el.style.transform = `translate3d(0, ${Math.max(-16, Math.min(16, offset))}px, 0)`
      })
    }

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(tick)
    }

    tick()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])
}
