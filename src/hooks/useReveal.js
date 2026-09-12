import { useEffect } from 'react'

// Observes every `.reveal` node — including ones mounted later via
// lazy-loaded sections — and fades each in once on first intersection.
export default function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -4% 0px' },
    )

    const watch = (root = document) => {
      root.querySelectorAll('.reveal:not(.revealed)').forEach((el) => io.observe(el))
    }
    watch()

    const mo = new MutationObserver((mutations) => {
      mutations.forEach((m) => {
        m.addedNodes.forEach((node) => {
          if (node.nodeType !== 1) return
          if (node.classList?.contains('reveal')) io.observe(node)
          node.querySelectorAll?.('.reveal:not(.revealed)').forEach((el) => io.observe(el))
        })
      })
    })
    mo.observe(document.body, { childList: true, subtree: true })

    // Safety net: if the observer ever misses a node (late mount, layout
    // shift, background tab), force everything visible after 2.5s so no
    // section can sit invisible and leave a gap.
    const fallback = setTimeout(() => {
      document.querySelectorAll('.reveal:not(.revealed)').forEach((el) => {
        el.classList.add('revealed')
      })
    }, 2500)

    return () => {
      io.disconnect()
      mo.disconnect()
      clearTimeout(fallback)
    }
  }, [])
}
