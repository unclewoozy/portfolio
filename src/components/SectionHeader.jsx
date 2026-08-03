import Reveal from './Reveal'

export default function SectionHeader({ index, label, title, right }) {
  return (
    <Reveal>
      <div className="mb-12 md:mb-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-mono text-[11px] tracking-[0.35em] uppercase text-accent">
              <span className="text-fog">({index})</span> — {label}
            </p>
            <h2 className="mt-4 font-display text-4xl font-bold uppercase leading-[0.95] tracking-tight text-paper md:text-6xl">
              {title}
            </h2>
          </div>
          {right}
        </div>
      </div>
    </Reveal>
  )
}
