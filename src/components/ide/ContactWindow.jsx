import { useState } from 'react'
import { useSiteData } from '../../SiteData'
import IdeWindow from './IdeWindow'
import SectionHeader from './SectionHeader'
import { gmailLink } from './navigate'

export default function ContactWindow() {
  const { CONTACT } = useSiteData()
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [opened, setOpened] = useState(false)

  const recipient =
    CONTACT.details
      .find((d) => d.label?.toLowerCase() === 'email')
      ?.href?.replace('mailto:', '') ?? ''

  const onSubmit = (e) => {
    e.preventDefault()
    const name = form.name.trim() || 'visitor'
    const subject = `Portfolio inquiry from ${name}`
    const body = `${form.message.trim()}\n\n— ${name} (${form.email.trim()})`
    const gmail =
      `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(recipient)}` +
      `&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    const win = window.open(gmail, '_blank', 'noopener,noreferrer')
    if (!win) {
      // Popup blocked — fall back to the device mail client.
      window.location.href =
        `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    }
    setOpened(true)
  }

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  return (
    <IdeWindow id="contact">
      <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-10">
        <div>
          <SectionHeader index="06" kicker="~/portfolio/contact/" title="Contact" />

          <div className="mt-5 space-y-3 text-[15px] leading-relaxed text-paper/75">
            {CONTACT.intro.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          <div className="mt-7 grid gap-2.5 sm:grid-cols-2">
            {CONTACT.details.map((detail) => {
              const isEmail = detail.label?.toLowerCase() === 'email'
              const href = isEmail
                ? gmailLink(detail.href.replace('mailto:', ''))
                : detail.href
              const Wrapper = href ? 'a' : 'div'
              return (
                <Wrapper
                  key={detail.label}
                  {...(href
                    ? {
                        href,
                        target: isEmail || href.startsWith('http') ? '_blank' : undefined,
                        rel: 'noreferrer',
                      }
                    : {})}
                  className="tile group flex items-center gap-3 px-4 py-3"
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

        <div className="overflow-hidden rounded-lg border border-white/10 bg-ink/70">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-fog">
              <span className="text-accent">~/dev</span> transmit-message
            </p>
            <p className="font-mono text-[10px] text-fog/70">
              {opened ? 'gmail opened ↗' : 'via gmail'}
            </p>
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
                  placeholder="Name"
                  className="mt-1.5 w-full rounded-lg border border-white/10 bg-ink/60 px-4 py-3 text-sm text-paper placeholder:text-fog/50 outline-none transition-colors focus:border-accent"
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
                  placeholder="Email address"
                  className="mt-1.5 w-full rounded-lg border border-white/10 bg-ink/60 px-4 py-3 text-sm text-paper placeholder:text-fog/50 outline-none transition-colors focus:border-accent"
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
                placeholder="Message"
                className="mt-1.5 w-full resize-none rounded-lg border border-white/10 bg-ink/60 px-4 py-3 font-mono text-sm text-paper placeholder:text-fog/50 outline-none transition-colors focus:border-accent"
              />
            </label>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="submit"
                className="group inline-flex items-center gap-3 rounded-lg border-2 border-accent bg-accent px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-ink transition-all hover:bg-transparent hover:text-accent"
              >
                {opened ? 'Compose again' : 'Send via Gmail'}
                <span className="transition-transform group-hover:translate-x-0.5" aria-hidden="true">→</span>
              </button>
              <p className="font-mono text-[10px] text-fog/60">
                {opened
                  ? 'gmail should be open with your message ready — just hit send'
                  : 'opens gmail with your message addressed to me — responses within 24h'}
              </p>
            </div>
          </form>
        </div>
      </div>
    </IdeWindow>
  )
}
