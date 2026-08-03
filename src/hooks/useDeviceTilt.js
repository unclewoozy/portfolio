import { useEffect } from 'react'

const clamp = (n, min, max) => Math.min(max, Math.max(min, n))

export default function useDeviceTilt() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!('DeviceOrientationEvent' in window)) return

    let raf = 0
    let enabled = false

    const onOrientation = (e) => {
      if (raf) return
      const gamma = e.gamma ?? 0
      const beta = e.beta ?? 45
      raf = requestAnimationFrame(() => {
        raf = 0
        const tx = clamp(gamma / 30, -1, 1)
        const ty = clamp((beta - 45) / 30, -1, 1)
        const root = document.documentElement
        root.style.setProperty('--tilt-x', `${(tx * 10).toFixed(2)}px`)
        root.style.setProperty('--tilt-y', `${(ty * 12).toFixed(2)}px`)
      })
    }

    const start = () => {
      if (enabled) return
      enabled = true
      window.addEventListener('deviceorientation', onOrientation, true)
    }

    const stop = () => {
      window.removeEventListener('deviceorientation', onOrientation, true)
      cancelAnimationFrame(raf)
    }

    const needsPermission = typeof DeviceOrientationEvent.requestPermission === 'function'

    if (!needsPermission) {
      start()
      return stop
    }

    const onFirstGesture = () => {
      window.removeEventListener('pointerdown', onFirstGesture)
      DeviceOrientationEvent.requestPermission()
        .then((state) => {
          if (state === 'granted') start()
        })
        .catch(() => {})
    }

    window.addEventListener('pointerdown', onFirstGesture)

    return () => {
      window.removeEventListener('pointerdown', onFirstGesture)
      stop()
    }
  }, [])
}
