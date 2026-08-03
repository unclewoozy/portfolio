import { useEffect } from 'react'

const BLOBS = [
  { depth: 34, className: 'absolute -left-40 -top-48 h-[680px] w-[680px] rounded-full bg-[#0a84ff]/55 blur-[110px] animate-blob', style: { animationDuration: '26s' } },
  { depth: 52, className: 'absolute -right-44 top-1/4 h-[760px] w-[760px] rounded-full bg-[#64d2ff]/45 blur-[120px] animate-blob', style: { animationDuration: '32s', animationDelay: '-10s' } },
  { depth: 72, className: 'absolute -bottom-48 right-1/3 h-[700px] w-[700px] rounded-full bg-[#bf5af2]/50 blur-[120px] animate-blob', style: { animationDuration: '38s', animationDelay: '-20s' } },
  { depth: 46, className: 'absolute -bottom-56 -left-32 h-[560px] w-[560px] rounded-full bg-[#ff375f]/35 blur-[110px] animate-blob', style: { animationDuration: '30s', animationDelay: '-6s' } },
  { depth: 86, className: 'absolute left-1/3 top-1/2 h-[520px] w-[520px] rounded-full bg-[#7a3cff]/30 blur-[120px] animate-blob', style: { animationDuration: '42s', animationDelay: '-15s' } },
]

export default function Background() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.matchMedia('(pointer: coarse)').matches) return
    const layers = Array.from(document.querySelectorAll('[data-depth]'))
    if (!layers.length) return

    let raf = 0
    let tx = 0
    let ty = 0
    let cx = 0
    let cy = 0

    const onMove = (e) => {
      tx = (e.clientX / window.innerWidth) * 2 - 1
      ty = (e.clientY / window.innerHeight) * 2 - 1
      if (!raf) raf = requestAnimationFrame(tick)
    }

    const tick = () => {
      raf = 0
      cx += (tx - cx) * 0.06
      cy += (ty - cy) * 0.06
      for (const layer of layers) {
        const d = Number(layer.dataset.depth)
        layer.style.transform = `translate3d(${(-cx * d).toFixed(2)}px, ${(-cy * d).toFixed(2)}px, 0)`
      }
      if (Math.abs(tx - cx) > 0.001 || Math.abs(ty - cy) > 0.001) {
        raf = requestAnimationFrame(tick)
      }
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-ink" />
      <div className="absolute inset-0 bg-[linear-gradient(160deg,#141a3d_0%,#0b0b16_45%,#170f2e_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(90%_70%_at_50%_-10%,rgba(30,58,138,0.55),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(70%_55%_at_50%_115%,rgba(88,28,135,0.3),transparent_60%)]" />

      {BLOBS.map((blob, i) => (
        <div key={i} data-depth={blob.depth} className="will-change-transform" style={{ position: 'absolute', inset: 0 }}>
          <div className={blob.className} style={blob.style} />
        </div>
      ))}

      <div className="bg-grid absolute inset-0 opacity-80" />
      <div className="absolute inset-0 bg-[conic-gradient(from_210deg_at_50%_45%,transparent_0deg,rgba(10,132,255,0.05)_60deg,transparent_140deg,rgba(191,90,242,0.05)_220deg,transparent_300deg)]" />
      <div className="bg-horizon absolute inset-x-0 top-0 h-[46vh]" />
      <div className="bg-vignette absolute inset-0" />
    </div>
  )
}
