const NODES = [
  { id: 'hub', x: 280, y: 56, label: 'portfolio.dev', accent: true, r: 30 },
  { id: 'frontend', x: 120, y: 150, label: 'Frontend', r: 12 },
  { id: 'react', x: 280, y: 150, label: 'React', r: 12 },
  { id: 'backend', x: 440, y: 150, label: 'Backend', r: 12 },
  { id: 'javascript', x: 120, y: 250, label: 'JavaScript', r: 11 },
  { id: 'database', x: 280, y: 250, label: 'Database', r: 12 },
  { id: 'node', x: 440, y: 250, label: 'Node.js', r: 11 },
  { id: 'ai', x: 120, y: 350, label: 'AI Workflows', r: 11 },
  { id: 'mysql', x: 280, y: 350, label: 'MySQL', r: 11 },
  { id: 'python', x: 440, y: 350, label: 'Python', r: 11 },
]

const EDGES = [
  ['hub', 'frontend'],
  ['hub', 'react'],
  ['hub', 'backend'],
  ['frontend', 'react'],
  ['frontend', 'javascript'],
  ['react', 'database'],
  ['backend', 'react'],
  ['backend', 'node'],
  ['node', 'database'],
  ['database', 'mysql'],
  ['ai', 'frontend'],
  ['ai', 'backend'],
  ['python', 'backend'],
  ['node', 'python'],
  ['mysql', 'python'],
]

const pos = Object.fromEntries(NODES.map((n) => [n.id, n]))

export default function SkillNetwork() {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-ink/60">
      <div className="flex items-center justify-between border-b border-white/10 px-3 py-2">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-fog">
          <span className="text-accent">~/dev</span> skill-network.svg
        </p>
        <p className="font-mono text-[10px] text-fog/70">graph view</p>
      </div>
      <svg viewBox="0 0 560 420" className="h-auto w-full" role="img" aria-label="Skill network graph">
        <defs>
          <radialGradient id="net-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0a84ff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#0a84ff" stopOpacity="0" />
          </radialGradient>
        </defs>

        {EDGES.map(([a, b]) => {
          const pa = pos[a]
          const pb = pos[b]
          return (
            <line
              key={`${a}-${b}`}
              x1={pa.x}
              y1={pa.y}
              x2={pb.x}
              y2={pb.y}
              stroke="rgba(255,255,255,0.22)"
              strokeWidth="1.2"
            />
          )
        })}

        {NODES.map((n) => (
          <g key={n.id} className="skill-node" data-label={n.label}>
            {n.accent && (
              <circle cx={n.x} cy={n.y} r={n.r + 14} fill="url(#net-glow)" className="animate-pulse-dot" />
            )}
            <circle
              cx={n.x}
              cy={n.y}
              r={n.r}
              fill={n.accent ? 'rgba(10,132,255,0.35)' : 'rgba(255,255,255,0.07)'}
              stroke={n.accent ? '#0a84ff' : 'rgba(255,255,255,0.4)'}
              strokeWidth="1.5"
            />
            <text
              x={n.x}
              y={n.y + n.r + 18}
              textAnchor="middle"
              className="fill-paper/70 font-mono"
              fontSize="11"
              letterSpacing="1"
            >
              {n.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  )
}
