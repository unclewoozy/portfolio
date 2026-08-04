import { GitBranch, Network } from 'lucide-react'
import { useSiteData } from '../../SiteData'

export default function StatusBar() {
  const { PROFILE } = useSiteData()
  const year = new Date().getFullYear()

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-ink/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-x-4 gap-y-1 px-5 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-fog">
        <div className="flex items-center gap-4">
          <p>
            <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-lime animate-pulse-dot" aria-hidden="true" />
            © {year} {PROFILE.name}
          </p>
          <p className="hidden items-center gap-1 text-fog/70 lg:flex">
            <GitBranch className="h-3 w-3 text-accent" strokeWidth={2} aria-hidden="true" />
            main
          </p>
        </div>

        <div className="flex items-center gap-4">
          <p className="hidden md:block">
            <span className="text-accent">Ln 1, Col 1</span> · UTF-8 · Sp:2
          </p>
          <p className="hidden items-center gap-1 text-fog/70 xl:flex">
            <Network className="h-3 w-3 text-accent" strokeWidth={2} aria-hidden="true" />
            port 3000
          </p>
          <p className="hidden sm:block">
            built with <span className="text-gradient font-semibold">react</span> +{' '}
            <span className="text-gradient font-semibold">tailwind</span> ·{' '}
            <span className="text-gradient font-semibold">vercel</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
