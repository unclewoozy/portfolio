import { useEffect } from 'react'

export default function CursorLight() {
  useEffect(() => {
    let raf = 0
    let tx = window.innerWidth / 2
    let ty = window.innerHeight / 2
    let x = tx
    let y = ty

    const onMove = (e) => {
      tx = e.clientX
      ty = e.clientY
      if (!raf) raf = requestAnimationFrame(tick)
    }

    const tick = () => {
      x += (tx - x) * 0.12
      y += (ty - y) * 0.12
      document.documentElement.style.setProperty('--cx', `${x}px`)
      document.documentElement.style.setProperty('--cy', `${y}px`)
      raf = 0
      if (Math.abs(tx - x) > 1 || Math.abs(ty - y) > 1) raf = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return <div className="cursor-light" aria-hidden="true" />
}
