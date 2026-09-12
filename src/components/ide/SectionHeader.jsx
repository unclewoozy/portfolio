export default function SectionHeader({ index, kicker, title }) {
  return (
    <div className="relative mb-8 md:mb-10">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 select-none font-mono text-[6.5rem] font-bold leading-none text-paper/[0.06] md:text-[10rem]"
      >
        {index}
      </span>
      <p className="relative font-mono text-[11px] uppercase tracking-[0.3em] text-fog">
        <span className="text-accent">❯</span> <span className="text-paper/70">[{index}]</span> {kicker}
      </p>
      <h2 className="relative mt-2 font-mono text-4xl font-bold uppercase tracking-tight text-paper md:text-5xl">
        {title}
      </h2>
    </div>
  )
}
