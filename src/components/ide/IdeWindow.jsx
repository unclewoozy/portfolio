export default function IdeWindow({ id, title, path, children, className = '' }) {
  return (
    <section
      id={id}
      data-parallax
      className={`ide-window glass sheen glass-hover window-in relative overflow-hidden rounded-lg ${className}`}
    >
      <div className="relative z-10 flex items-center justify-between gap-3 border-b border-paper/15 bg-ink/40 px-4 py-2 md:px-5">
        <p className="truncate font-mono text-[10px] uppercase tracking-[0.25em] text-paper/85">
          <span className="text-accent">./</span>
          {title}
        </p>
        {path && (
          <p className="hidden shrink-0 font-mono text-[10px] text-fog/60 sm:block">
            {path}
          </p>
        )}
      </div>
      <div className="relative z-10 p-4 md:p-7">{children}</div>
    </section>
  )
}
