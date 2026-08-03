import { PROFILE } from '../../data/site'

export default function StatusBar() {
  const year = new Date().getFullYear()

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-ink/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-2 px-5 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-fog">
        <p>
          © {year} {PROFILE.name} — all rights reserved
        </p>
        <p className="hidden md:block">
          <span className="text-accent">Ln 1, Col 1</span> · UTF-8
        </p>
        <p className="hidden xl:block">
          built with <span className="text-accent">react</span> +{' '}
          <span className="text-accent">tailwind</span> · deploy:{' '}
          <span className="text-accent">vercel</span>
        </p>
      </div>
    </footer>
  )
}
