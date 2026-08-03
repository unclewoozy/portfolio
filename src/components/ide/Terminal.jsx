import { useEffect, useRef, useState } from 'react'

const BANNER = `portfolio.dev terminal — type "help" to begin`

const HELP = [
  'available commands:',
  '  help            — list commands',
  '  whoami          — developer identity',
  '  about           — open profile',
  '  skills          — open skills.json',
  '  projects        — open projects archive',
  '  experience      — open work history',
  '  certifications  — open credentials',
  '  contact         — open communication terminal',
  '  ls              — list workspace files',
  '  open <file>     — jump to a window',
  '  clear           — clear terminal',
]

const CMD_MAP = {
  help: () => HELP,
  whoami: () => [
    'sigmund godfrey m. dela cruz',
    'full stack web developer / it specialist',
    'calamba, laguna — philippines',
    'status: ● open to work',
  ],
  about: () => ['opening ~/portfolio/about.me ...'],
  skills: () => ['opening ~/portfolio/skills.json ...'],
  projects: () => ['opening ~/portfolio/projects/ ...'],
  experience: () => ['opening ~/portfolio/experience/ ...'],
  certifications: () => ['opening ~/portfolio/certifications/ ...'],
  certs: () => ['opening ~/portfolio/certifications/ ...'],
  contact: () => ['opening ~/portfolio/contact/ ...'],
  ls: () => [
    'README.md    about.me     skills.json',
    'projects/    experience/  certifications/',
    'contact/',
  ],
  date: () => [new Date().toString()],
  echo: () => [],
}

const JUMP = {
  about: 'about',
  skills: 'skills',
  projects: 'projects',
  experience: 'experience',
  certifications: 'certifications',
  certs: 'certifications',
  contact: 'contact',
}

export default function Terminal() {
  const [lines, setLines] = useState([{ t: 'banner', text: BANNER }])
  const [input, setInput] = useState('')
  const scrollRef = useRef(null)
  const endRef = useRef(null)

  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [lines])

  const run = (raw) => {
    const args = raw.trim().split(/\s+/)
    const cmd = (args[0] || '').toLowerCase()
    const out = []

    if (cmd === '') return

    if (cmd === 'clear') {
      setLines([])
      return
    }

    if (cmd === 'open') {
      const target = args[1]?.toLowerCase()
      if (JUMP[target]) {
        document.getElementById(JUMP[target])?.scrollIntoView({ behavior: 'smooth' })
        out.push(`opening ~/portfolio/${JUMP[target]}/ ...`)
      } else {
        out.push(`error: no such file "${args[1] ?? ''}". try: ls`)
      }
    } else if (cmd === 'echo') {
      out.push(args.slice(1).join(' ') || '')
    } else if (CMD_MAP[cmd]) {
      const res = CMD_MAP[cmd]()
      if (cmd === 'about' || cmd === 'skills' || cmd === 'projects' || cmd === 'experience' || cmd === 'certifications' || cmd === 'certs' || cmd === 'contact') {
        const id = JUMP[cmd]
        setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 80)
      }
      out.push(...res)
    } else {
      out.push(`command not found: ${cmd} — type "help" for commands`)
    }

    setLines((l) => [
      ...l,
      { t: 'cmd', text: `❯ ${raw}` },
      ...out.map((text) => ({ t: 'out', text })),
    ])
  }

  const onSubmit = (e) => {
    e.preventDefault()
    run(input)
    setInput('')
  }

  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-ink/80">
      <div className="flex items-center justify-between border-b border-white/10 px-3 py-2">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-fog">
          <span className="text-accent">~/dev</span> terminal
        </p>
        <p className="font-mono text-[10px] text-fog/70">zsh — /bin/sh</p>
      </div>

      <div ref={scrollRef} className="h-64 overflow-y-auto p-4 font-mono text-[12px] leading-relaxed md:text-[13px]" aria-live="polite">
        {lines.map((l, i) => (
          <p
            key={i}
            className={
              l.t === 'banner'
                ? 'text-fog/70'
                : l.t === 'cmd'
                  ? 'mt-2 text-paper'
                  : 'text-paper/75'
            }
          >
            {l.t === 'cmd' ? (
              <>
                <span className="text-accent">❯</span> {l.text.slice(2)}
              </>
            ) : (
              l.text
            )}
          </p>
        ))}
        <form onSubmit={onSubmit} className="mt-2 flex items-center gap-2">
          <span className="text-accent" aria-hidden="true">❯</span>
          <label htmlFor="term-input" className="sr-only">
            Terminal command
          </label>
          <input
            id="term-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent font-mono text-[12px] text-paper caret-lime outline-none md:text-[13px]"
            autoComplete="off"
            spellCheck={false}
            placeholder="type a command..."
          />
        </form>
        <div ref={endRef} />
      </div>
    </div>
  )
}
