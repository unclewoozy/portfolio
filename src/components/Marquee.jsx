export default function Marquee({ items, separator = '✦', dark = false, className = '' }) {
  const row = [...items, ...items]
  return (
    <div
      className={`relative overflow-hidden border-y-2 ${
        dark
          ? 'border-paper/15 bg-ink py-4 text-accent'
          : 'border-ink bg-accent py-3 text-white'
      } ${className}`}
      aria-hidden="true"
    >
      <div className="flex w-max animate-marquee items-center">
        {row.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className={`flex items-center whitespace-nowrap font-display font-bold uppercase tracking-tight ${
              dark ? 'text-3xl md:text-4xl' : 'text-2xl md:text-3xl'
            }`}
          >
            <span className="px-5">{item}</span>
            <span className={`text-lg ${dark ? 'text-fog' : 'text-white/70'}`}>{separator}</span>
          </span>
        ))}
      </div>
    </div>
  )
}
