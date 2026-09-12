import { useEffect, useState } from 'react'

export default function useScrollSpy(ids, offset = 300) {
  const [active, setActive] = useState(ids[0] ?? '')

  useEffect(() => {
    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!els.length) return

    // The section crossing a band near the top of the viewport wins.
    // View-based (not scroll-math), so lazy images, dynamic heights,
    // and content-visibility skipping can't throw it off.
    const inView = new Set()
    const pick = () => {
      let best = null
      let bestTop = Infinity
      for (const id of inView) {
        const el = document.getElementById(id)
        if (!el) continue
        const top = el.getBoundingClientRect().top
        if (top < bestTop) {
          bestTop = top
          best = id
        }
      }
      if (best) setActive((prev) => (prev === best ? prev : best))
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) inView.add(entry.target.id)
          else inView.delete(entry.target.id)
        }
        pick()
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    )

    for (const el of els) observer.observe(el)
    return () => observer.disconnect()
  }, [ids, offset])

  return active
}
