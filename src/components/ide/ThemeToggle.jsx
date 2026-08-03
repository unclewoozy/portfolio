import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

export default function ThemeToggle() {
  const [light, setLight] = useState(
    () => document.documentElement.classList.contains('light'),
  )

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('light', light)
    try {
      localStorage.setItem('theme', light ? 'light' : 'dark')
    } catch {}
    const meta = document.querySelector('meta[name="theme-color"]')
    meta?.setAttribute('content', light ? '#f4f3ee' : '#05060a')
  }, [light])

  return (
    <button
      type="button"
      onClick={() => setLight((v) => !v)}
      className="glass-chip flex h-8 w-8 items-center justify-center rounded-full text-paper transition-colors hover:bg-paper hover:text-ink"
      aria-label={light ? 'Switch to dark mode' : 'Switch to light mode'}
      title={light ? 'Switch to dark mode' : 'Switch to light mode'}
    >
      {light ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
    </button>
  )
}
