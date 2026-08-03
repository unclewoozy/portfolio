export default function IdeWindow({ id, title, path, children, className = '' }) {
  return (
    <section
      id={id}
      data-parallax
      className={`ide-window glass sheen glass-hover window-in relative overflow-hidden rounded-3xl ${className}`}
    >
      <div className="relative z-10 flex items-center justify-between border-b border-paper/15 bg-ink/40 px-4 py-2.5">
        <span
          className="glow-line pointer-events-none absolute inset-x-8 top-0 opacity-70"
          aria-hidden="true"
        />
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex shrink-0 gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-500/90" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/90" />
            <span className="h-2.5 w-2.5 rounded-full bg-lime/90" />
          </div>
          <p className="truncate font-mono text-[10px] uppercase tracking-[0.25em] text-paper/85">
            {title}
          </p>
        </div>
        {path && (
          <p className="ml-3 hidden shrink-0 font-mono text-[10px] text-fog/70 sm:block">
            {path}
          </p>
        )}
      </div>
      <div className="relative z-10 p-4 md:p-7">{children}</div>
    </section>
  )
}
