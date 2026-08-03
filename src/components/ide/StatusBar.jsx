import { PROFILE } from '../../data/site'

export default function StatusBar() {
  const year = new Date().getFullYear()

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-ink/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-2 px-5 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-fog">
        <p>
          <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-lime animate-pulse-dot" aria-hidden="true" />
          © {year} {PROFILE.name} — all rights reserved
        </p>
        <p className="hidden md:block">
          <span className="text-accent">Ln 1, Col 1</span> · UTF-8
        </p>
        <p className="hidden xl:block">
          built with <span className="text-gradient font-semibold">react</span> +{' '}
          <span className="text-gradient font-semibold">tailwind</span> · deploy:{' '}
          <span className="text-gradient font-semibold">vercel</span>
        </p>
      </div>
    </footer>
  )
}
