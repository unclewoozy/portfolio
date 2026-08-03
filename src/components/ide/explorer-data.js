export const FILES = [
  { id: 'home', type: 'file', name: 'README.md', icon: 'ℹ', path: '~/portfolio/README.md' },
  { id: 'about', type: 'file', name: 'about.me', icon: '@', path: '~/portfolio/about.me' },
  { id: 'skills', type: 'file', name: 'skills.json', icon: '{}', path: '~/portfolio/skills.json' },
  { id: 'projects', type: 'dir', name: 'projects/', icon: '▾', path: '~/portfolio/projects/' },
  { id: 'experience', type: 'dir', name: 'experience/', icon: '▾', path: '~/portfolio/experience/' },
  { id: 'certifications', type: 'dir', name: 'certifications/', icon: '▾', path: '~/portfolio/certifications/' },
  { id: 'contact', type: 'dir', name: 'contact/', icon: '▾', path: '~/portfolio/contact/' },
]

export const FILE_IDS = Object.fromEntries(FILES.map((f) => [f.id, f.id]))

export const FILE_ICONS = {
  home: 'ℹ',
  about: '@',
  skills: '{}',
  projects: '▣',
  experience: '▤',
  certifications: '◈',
  contact: '✉',
}
