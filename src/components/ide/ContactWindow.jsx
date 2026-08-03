import { useEffect, useState } from 'react'
import { CONTACT, PROFILE } from '../../data/site'
import IdeWindow from './IdeWindow'

const CONNECTION = ['establishing secure channel...', 'handshake verified ✓', 'connection established — say hi']

export default function ContactWindow() {
  const [line, setLine] = useState(0)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  useEffect(() => {
    if (line >= CONNECTION.length) return
    const t = setTimeout(() => setLine((l) => l + 1), 650)
    return () => clearTimeout(t)
  }, [line])

  const onSubmit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Portfolio inquiry from ${form.name || 'visitor'}`)
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`)
    window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`
    setSent(true)
  }

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  return (
    <IdeWindow id="contact" title="communication terminal" path="~/portfolio/contact/">
      <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-10">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-fog">
            <span className="text-accent">❯</span> initialize connection?
          </p>

          <div className="mt-4 h-24 space-y-1.5 font-mono text-xs text-fog" aria-live="polite">
            {CONNECTION.slice(0, line).map((l, i) => (
              <p key={i} className={l.includes('✓') || l.includes('established') ? 'text-lime' : ''}>
                {l}
              </p>
            ))}
          </div>

          <div className="mt-2 space-y-3 text-[15px] leading-relaxed text-paper/75">
            {CONTACT.intro.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          <div className="mt-7 grid gap-2.5 sm:grid-cols-2">
            {CONTACT.details.map((detail) => {
              const Wrapper = detail.href ? 'a' : 'div'
              return (
                <Wrapper
                  key={detail.label}
                  {...(detail.href ? { href: detail.href, target: detail.href.startsWith('http') ? '_blank' : undefined, rel: 'noreferrer' } : {})}
                  className="glass group flex items-center gap-3 rounded-xl px-4 py-3 transition-colors hover:border-accent/50"
                >
                  <i className={`${detail.icon} w-5 text-center text-accent`} aria-hidden="true" />
                  <span className="min-w-0">
                    <span className="block font-mono text-[9px] uppercase tracking-[0.25em] text-fog">
                      {detail.label}
                    </span>
                    <span className="block truncate text-sm text-paper/85">{detail.value}</span>
                  </span>
                </Wrapper>
              )
            })}
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-white/10 bg-ink/70">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-fog">
              <span className="text-accent">~/dev</span> transmit-message
            </p>
            <p className="font-mono text-[10px] text-fog/70">{sent ? 'message queued' : 'secure channel'}</p>
          </div>

          <form onSubmit={onSubmit} className="space-y-4 p-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-fog">
                  <span className="text-accent">❯</span> your_name
                </span>
                <input
                  type="text"
                  value={form.name}
                  onChange={set('name')}
                  required
                  placeholder="Jane Doe"
                  className="mt-1.5 w-full rounded-xl border border-white/10 bg-ink/60 px-4 py-3 text-sm text-paper placeholder:text-fog/50 outline-none transition-colors focus:border-accent"
                />
              </label>
              <label className="block">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-fog">
                  <span className="text-accent">❯</span> return_address
                </span>
                <input
                  type="email"
                  value={form.email}
                  onChange={set('email')}
                  required
                  placeholder="jane@example.com"
                  className="mt-1.5 w-full rounded-xl border border-white/10 bg-ink/60 px-4 py-3 text-sm text-paper placeholder:text-fog/50 outline-none transition-colors focus:border-accent"
                />
              </label>
            </div>

            <label className="block">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-fog">
                <span className="text-accent">❯</span> message
              </span>
              <textarea
                value={form.message}
                onChange={set('message')}
                required
                rows={5}
                placeholder=">_ drop me a line..."
                className="mt-1.5 w-full resize-none rounded-xl border border-white/10 bg-ink/60 px-4 py-3 font-mono text-sm text-paper placeholder:text-fog/50 outline-none transition-colors focus:border-accent"
              />
            </label>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="submit"
                className="group inline-flex items-center gap-3 rounded-xl border-2 border-accent bg-accent px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-ink transition-all hover:bg-transparent hover:text-accent"
              >
                {sent ? 'Message queued ✓' : 'Send Message'}
                <span className="transition-transform group-hover:translate-x-0.5" aria-hidden="true">→</span>
              </button>
              <p className="font-mono text-[10px] text-fog/60">
                opens your mail client — responses within 24h
              </p>
            </div>
          </form>
        </div>
      </div>
    </IdeWindow>
  )
}
