import { useEffect, useRef, useState } from 'react'
import GlassControl from './GlassControl'

const CODE = `const developer = {
  name: "Sigmund Godfrey M. Dela Cruz",
  role: "Full Stack Developer / IT Specialist",
  location: "Calamba, Philippines",
  stack: ["React", "Next.js", "Node.js", "Python", "SQL"],
  ai: "assisted workflows",
  status: "open to work",
  since: 2023,
};`

const RULES = [
  { re: /(\/\/.*$)/gm, cls: 'text-fog/60' },
  { re: /("(?:[^"\\]|\\.)*")/gm, cls: 'text-lime' },
  { re: /(\b(?:const|let|var|new|return|function|if|else|async|await|import|export|from|true|false)\b)/gm, cls: 'text-violet-300' },
  { re: /(\b\d+(?:\.\d+)?\b)/gm, cls: 'text-cyan-300' },
  { re: /([A-Za-z_$][\w$]*)(?=\s*:)/gm, cls: 'text-accent' },
  { re: /([{}\[\];,=:])/gm, cls: 'text-fog' },
]

function tokenize(line) {
  const tokens = []
  let cursor = 0
  const matches = []

  for (const rule of RULES) {
    rule.re.lastIndex = 0
    let m
    while ((m = rule.re.exec(line)) !== null) {
      matches.push({ start: m.index, end: m.index + m[0].length, cls: rule.cls })
      if (m.index === rule.re.lastIndex) rule.re.lastIndex++
    }
  }

  matches.sort((a, b) => a.start - b.start || a.end - b.end)
  for (const m of matches) {
    if (m.start < cursor) continue
    if (m.start > cursor) tokens.push({ text: line.slice(cursor, m.start), cls: 'text-paper/85' })
    tokens.push({ text: line.slice(m.start, m.end), cls: m.cls })
    cursor = m.end
  }
  if (cursor < line.length) tokens.push({ text: line.slice(cursor), cls: 'text-paper/85' })
  return tokens
}

export default function CodeEditor({ glass, onGlass }) {
  const [count, setCount] = useState(0)
  const [running, setRunning] = useState(false)
  const shown = useRef(false)
  const ref = useRef(null)
  const done = count >= CODE.length

  useEffect(() => {
    if (shown.current) return
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          shown.current = true
          setRunning(true)
          obs.disconnect()
        }
      },
      { threshold: 0.3 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!running || done) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCount(CODE.length)
      return
    }
    const t = setTimeout(() => setCount((c) => c + 1), 26 + Math.random() * 22)
    return () => clearTimeout(t)
  }, [running, done])

  const typed = CODE.slice(0, count)
  const lines = typed.split('\n')

  return (
    <div ref={ref} className="overflow-hidden rounded-xl border border-white/10 bg-ink/70">
      <div className="flex items-center justify-between border-b border-white/10 px-3 py-2">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-fog">
          <span className="text-accent">~/dev</span> preferences
        </p>
        <GlassControl glass={glass} onGlass={onGlass} />
      </div>
      <div className="flex gap-0 py-3 pr-4 font-mono text-[12px] leading-[1.7] md:text-[13px]">
        <div className="w-8 shrink-0 select-none pr-3 text-right text-fog/40" aria-hidden="true">
          {lines.map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>
        <pre className="whitespace-pre-wrap break-all">
          {lines.map((line, i) => (
            <div key={i}>
              {tokenize(line).map((t, j) => (
                <span key={j} className={t.cls}>
                  {t.text}
                </span>
              ))}
              {i === lines.length - 1 && (
                <span className="term-caret" aria-hidden="true" />
              )}
            </div>
          ))}
          {count === 0 && <span className="term-caret" aria-hidden="true" />}
        </pre>
      </div>
    </div>
  )
}
