const NODES = [
  { id: 'hub', x: 440, y: 70, label: 'portfolio.dev', accent: true, r: 30 },

  { id: 'frontend', x: 160, y: 180, label: 'Frontend', group: true, r: 14 },
  { id: 'backend', x: 400, y: 180, label: 'Backend', group: true, r: 14 },
  { id: 'database', x: 640, y: 180, label: 'Database', group: true, r: 14 },
  { id: 'tools', x: 880, y: 180, label: 'Tools', group: true, r: 14 },

  { id: 'html', x: 85, y: 255, label: 'HTML', r: 11 },
  { id: 'css', x: 235, y: 255, label: 'CSS', r: 11 },
  { id: 'javascript', x: 85, y: 335, label: 'JavaScript', r: 11 },
  { id: 'typescript', x: 235, y: 335, label: 'TypeScript', r: 11 },
  { id: 'react', x: 85, y: 415, label: 'ReactJS', r: 11 },
  { id: 'nextjs', x: 235, y: 415, label: 'Next.js', r: 11 },
  { id: 'tailwind', x: 85, y: 495, label: 'Tailwind CSS', r: 11 },

  { id: 'python', x: 325, y: 255, label: 'Python', r: 11 },
  { id: 'php', x: 475, y: 255, label: 'PHP', r: 11 },
  { id: 'java', x: 325, y: 335, label: 'Java', r: 11 },
  { id: 'cplusplus', x: 475, y: 335, label: 'C++', r: 11 },
  { id: 'flask', x: 325, y: 415, label: 'Flask', r: 11 },
  { id: 'nodejs', x: 475, y: 415, label: 'Node.js', r: 11 },
  { id: 'pandas', x: 325, y: 495, label: 'Pandas', r: 11 },
  { id: 'django', x: 475, y: 495, label: 'Django', r: 11 },
  { id: 'flasksqlalchemy', x: 400, y: 575, label: 'Flask-SQLAlchemy', r: 11 },

  { id: 'sql', x: 565, y: 255, label: 'SQL', r: 11 },
  { id: 'mysql', x: 715, y: 255, label: 'MySQL', r: 11 },
  { id: 'sqlite', x: 565, y: 335, label: 'SQLite', r: 11 },
  { id: 'mssql', x: 715, y: 335, label: 'MSSQL', r: 11 },

  { id: 'git', x: 805, y: 255, label: 'Git', r: 11 },
  { id: 'github', x: 955, y: 255, label: 'GitHub', r: 11 },
  { id: 'vercel', x: 805, y: 335, label: 'Vercel', r: 11 },
  { id: 'figma', x: 955, y: 335, label: 'Figma', r: 11 },
  { id: 'android', x: 805, y: 415, label: 'Android Studio', r: 11 },
]

const EDGES = [
  ['hub', 'frontend'],
  ['hub', 'backend'],
  ['hub', 'database'],
  ['hub', 'tools'],

  ['frontend', 'html'],
  ['frontend', 'css'],
  ['frontend', 'javascript'],
  ['frontend', 'typescript'],
  ['frontend', 'react'],
  ['frontend', 'nextjs'],
  ['frontend', 'tailwind'],

  ['backend', 'python'],
  ['backend', 'php'],
  ['backend', 'java'],
  ['backend', 'cplusplus'],
  ['backend', 'flask'],
  ['backend', 'nodejs'],
  ['backend', 'pandas'],
  ['backend', 'django'],
  ['backend', 'flasksqlalchemy'],

  ['database', 'sql'],
  ['database', 'mysql'],
  ['database', 'sqlite'],
  ['database', 'mssql'],

  ['tools', 'git'],
  ['tools', 'github'],
  ['tools', 'vercel'],
  ['tools', 'figma'],
  ['tools', 'android'],

  ['javascript', 'typescript'],
  ['javascript', 'react'],
  ['javascript', 'nextjs'],
  ['react', 'nextjs'],
  ['python', 'django'],
  ['python', 'flask'],
  ['python', 'pandas'],
  ['flask', 'flasksqlalchemy'],
  ['django', 'flasksqlalchemy'],
  ['django', 'mysql'],
  ['django', 'sqlite'],
  ['django', 'mssql'],
  ['flask', 'sqlite'],
  ['php', 'mysql'],
  ['sql', 'mysql'],
  ['sql', 'sqlite'],
  ['sql', 'mssql'],
  ['nextjs', 'vercel'],
  ['git', 'github'],
  ['github', 'vercel'],
  ['java', 'android'],
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
      <svg viewBox="0 0 960 640" className="h-auto w-full" role="img" aria-label="Skill network graph">
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
              fill={
                n.accent
                  ? 'rgba(10,132,255,0.35)'
                  : n.group
                    ? 'rgba(10,132,255,0.14)'
                    : 'rgba(255,255,255,0.07)'
              }
              stroke={n.accent || n.group ? '#0a84ff' : 'rgba(255,255,255,0.4)'}
              strokeWidth={n.group ? 1.5 : 1.2}
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
