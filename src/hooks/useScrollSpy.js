import { useEffect, useState } from 'react'

export default function useScrollSpy(ids, offset = 300) {
  const [active, setActive] = useState(ids[0] ?? '')

  useEffect(() => {
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

    // Sections lazy-mount after this effect runs — observe whatever exists
    // now, then pick up the rest as they mount.
    const wanted = new Set(ids)
    const seen = new Set()
    const observeEl = (el) => {
      if (el && el.id && wanted.has(el.id) && !seen.has(el.id)) {
        seen.add(el.id)
        observer.observe(el)
      }
    }
    ids.forEach((id) => observeEl(document.getElementById(id)))

    const mo = new MutationObserver((mutations) => {
      mutations.forEach((m) => {
        m.addedNodes.forEach((node) => {
          if (node.nodeType !== 1) return
          observeEl(node)
          node.querySelectorAll?.('[id]').forEach(observeEl)
        })
      })
    })
    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
      mo.disconnect()
    }
  }, [ids, offset])

  return active
}
