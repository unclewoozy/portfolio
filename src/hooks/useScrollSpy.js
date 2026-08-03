import { useEffect, useRef, useState } from 'react'

export default function useScrollSpy(ids, offset = 300) {
  const [active, setActive] = useState(ids[0] ?? '')
  const rafRef = useRef(0)

  useEffect(() => {
    const compute = () => {
      rafRef.current = 0
      const pos = window.scrollY + offset
      let current = ids[0]
      let best = -Infinity
      for (const id of ids) {
        const el = document.getElementById(id)
        if (!el) continue
        const top = el.getBoundingClientRect().top + window.scrollY
        if (top <= pos && top > best) {
          best = top
          current = id
        }
      }
      setActive((prev) => (prev === current ? prev : current))
    }
    const onScroll = () => {
      if (!rafRef.current) rafRef.current = requestAnimationFrame(compute)
    }
    compute()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [ids, offset])

  return active
}
