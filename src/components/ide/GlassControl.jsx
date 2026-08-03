export default function GlassControl({ glass, onGlass }) {
  return (
    <div className="glass-chip group flex w-full items-center gap-2.5 rounded-xl px-3 py-2">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="h-4 w-4 shrink-0 text-accent"
        aria-hidden="true"
      >
        <path
          d="M12 2.6c3.6 4.7 6.2 8.3 6.2 11.8a6.2 6.2 0 1 1-12.4 0c0-3.5 2.6-7.1 6.2-11.8Z"
          fill="currentColor"
          opacity="0.9"
        />
        <path
          d="M8.6 13.6a3.5 3.5 0 0 0 3 3.4"
          stroke="rgba(11,11,12,0.55)"
          strokeWidth="1.6"
          strokeLinecap="round"
          fill="none"
        />
      </svg>

      <span className="font-sans text-[10px] uppercase tracking-wide text-fog">
        glass
      </span>

      <div className="relative h-7 min-w-20 flex-1">
        <input
          type="range"
          min="0"
          max="100"
          value={glass}
          onChange={(e) => onGlass(Number(e.target.value))}
          className="absolute inset-0 h-full w-full cursor-pointer appearance-none opacity-0"
          aria-label="Liquid glass intensity"
        />
        <span className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 font-mono text-[8px] uppercase tracking-wider text-fog/60">
          clear
        </span>
        <div
          className="pointer-events-none absolute inset-x-0 top-1/2 h-[7px] -translate-y-1/2 overflow-hidden rounded-full border border-white/15 bg-black/40 shadow-[inset_0_1px_2px_rgba(0,0,0,0.55),inset_0_-1px_0_rgba(255,255,255,0.1)]"
          aria-hidden="true"
        >
          <div
            className="h-full rounded-full bg-gradient-to-r from-accent to-[#a8ccff] shadow-[0_0_10px_rgba(10,132,255,0.55)] transition-[width] duration-75"
            style={{ width: `${glass}%` }}
          />
        </div>
        <span
          className="glass-thumb pointer-events-none absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${glass}%` }}
          aria-hidden="true"
        />
      </div>

      <span className="w-7 shrink-0 text-right font-sans text-xs font-medium text-accent tabular-nums">
        {glass}%
      </span>
    </div>
  )
}
