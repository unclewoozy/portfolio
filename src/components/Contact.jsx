import { useState } from 'react'
import { CONTACT, PROFILE } from '../data/site'
import SectionHeader from './SectionHeader'
import Reveal from './Reveal'

const EMPTY = { name: '', email: '', subject: '', message: '', website: '' }

export default function Contact({ onViewResume }) {
  const [form, setForm] = useState(EMPTY)
  const [status, setStatus] = useState({ type: null, text: '' })
  const [sending, setSending] = useState(false)

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const onSubmit = async (e) => {
    e.preventDefault()
    setStatus({ type: null, text: '' })
    setSending(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (res.ok && data.ok) {
        setStatus({ type: 'success', text: '✓ message sent — i\'ll reply soon.' })
        setForm(EMPTY)
      } else {
        setStatus({ type: 'error', text: `✕ ${data.error || 'send failed — try again.'}` })
      }
    } catch {
      setStatus({ type: 'error', text: '✕ cannot reach server — try again in a moment.' })
    } finally {
      setSending(false)
    }
  }

  const inputCls =
    'w-full border-b-2 border-paper/20 bg-transparent py-3 font-mono text-sm text-paper placeholder:text-fog/50 focus:border-accent focus:outline-none transition-colors'

  return (
    <section id="contact" className="relative">
      <div className="mx-auto max-w-6xl px-5 md:px-6 py-20 md:py-28">
        <SectionHeader
          index="06"
          label="Contact"
          title={<>Let's Work <span className="text-outline text-fog">Together</span></>}
          right={
            <p className="hidden md:block font-mono text-xs uppercase tracking-[0.25em] text-fog max-w-[240px] text-right leading-relaxed">
              full-time roles & freelance projects welcome
            </p>
          }
        />

        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          <Reveal>
            <div className="space-y-5 text-sm md:text-[15px] leading-relaxed text-paper/70">
              {CONTACT.intro.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>

            <div className="mt-10 border-t border-paper/15">
              {CONTACT.details.map((d) => (
                <div
                  key={d.label}
                  className="group grid grid-cols-[110px_1fr_auto] items-center gap-3 border-b border-paper/15 py-4"
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-fog">
                    {d.label}
                  </p>
                  {d.href ? (
                    <a
                      href={d.href}
                      target={d.href.startsWith('http') ? '_blank' : undefined}
                      rel={d.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="link-line font-mono text-sm text-paper transition-colors hover:text-accent"
                    >
                      {d.value}
                    </a>
                  ) : (
                    <p className="font-mono text-sm text-paper">{d.value}</p>
                  )}
                  <span className="text-fog transition-colors group-hover:text-accent">↗</span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onViewResume}
                className="inline-flex items-center gap-3 rounded-xl border-2 border-accent bg-accent px-6 py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-ink transition-all hover:bg-transparent hover:text-accent"
              >
                View resume <span className="text-accent">↗</span>
              </button>
              <a
                href={PROFILE.resumeDownload}
                className="glass-chip inline-flex items-center gap-3 rounded-xl px-6 py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-paper transition-all hover:bg-accent hover:text-ink"
              >
                Download resume <span className="text-accent">↓</span>
              </a>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <form onSubmit={onSubmit} className="glass sheen rounded-[28px] p-6 md:p-8" noValidate>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-fog">
                <span className="text-accent">❯</span> ./send_message — {sending ? 'transmitting...' : 'form'}
              </p>

              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.3em] text-fog">
                    Name *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    maxLength={90}
                    placeholder="your full name"
                    value={form.name}
                    onChange={set('name')}
                    className={inputCls}
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.3em] text-fog">
                    Email *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    maxLength={120}
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={set('email')}
                    className={inputCls}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="contact-subject" className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.3em] text-fog">
                    Subject *
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    required
                    maxLength={140}
                    placeholder="how can i help?"
                    value={form.subject}
                    onChange={set('subject')}
                    className={inputCls}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="contact-message" className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.3em] text-fog">
                    Message *
                  </label>
                  <textarea
                    id="contact-message"
                    rows={6}
                    required
                    maxLength={3000}
                    placeholder="write your message here..."
                    value={form.message}
                    onChange={set('message')}
                    className={`${inputCls} resize-none`}
                  />
                </div>

                <input
                  type="text"
                  name="website"
                  value={form.website}
                  onChange={set('website')}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />

                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    disabled={sending}
                    className="group inline-flex w-full items-center justify-center gap-3 rounded-xl border-2 border-accent bg-accent px-8 py-4 font-mono text-xs uppercase tracking-[0.25em] text-ink transition-all hover:bg-transparent hover:text-accent disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                  >
                    {sending ? 'Sending...' : (
                      <>
                        Send message
                        <span className="inline-block transition-transform group-hover:translate-x-1.5">→</span>
                      </>
                    )}
                  </button>
                </div>

                {status.text && (
                  <p
                    role="status"
                    aria-live="polite"
                    className={`sm:col-span-2 rounded-xl border-2 px-4 py-3 font-mono text-xs ${
                      status.type === 'success'
                        ? 'border-accent/60 bg-accent/10 text-accent'
                        : 'border-rose-500/60 text-rose-400'
                    }`}
                  >
                    {status.text}
                  </p>
                )}
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
