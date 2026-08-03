import { useEffect, useRef } from 'react'

export default function Particles() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!canvas.getContext) return

    const ctx = canvas.getContext('2d')
    let raf = 0
    let w = 0
    let h = 0
    const COLORS = ['rgba(10,132,255,', 'rgba(100,210,255,', 'rgba(191,90,242,']

    const resize = () => {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
    }

    const count = () => Math.min(80, Math.floor((w * h) / 22000))

    let dots = []
    const spawn = () => {
      dots = Array.from({ length: count() }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 0.6 + Math.random() * 1.6,
        vy: 0.08 + Math.random() * 0.25,
        vx: (Math.random() - 0.5) * 0.12,
        a: 0.12 + Math.random() * 0.3,
        c: COLORS[Math.floor(Math.random() * COLORS.length)],
        tw: Math.random() * Math.PI * 2,
      }))
    }

    const tick = () => {
      ctx.clearRect(0, 0, w, h)
      for (const d of dots) {
        d.y -= d.vy
        d.x += d.vx
        d.tw += 0.02
        if (d.y < -6) {
          d.y = h + 6
          d.x = Math.random() * w
        }
        const a = d.a * (0.6 + 0.4 * Math.sin(d.tw))
        ctx.beginPath()
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2)
        ctx.fillStyle = d.c + a + ')'
        ctx.fill()
      }
      raf = requestAnimationFrame(tick)
    }

    const onResize = () => {
      resize()
      spawn()
    }

    resize()
    spawn()
    raf = requestAnimationFrame(tick)
    window.addEventListener('resize', onResize, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return <canvas id="particles-canvas" ref={ref} aria-hidden="true" />
}
