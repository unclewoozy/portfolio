import { Award, Braces, Briefcase, FileText, Folder, FolderGit2, Home, Mail, Terminal, User, Wrench } from 'lucide-react'

// Single manifest for every route on the page. Explorer rows, the dock,
// goto commands, and the scroll-spy all derive from this table, so the
// navigation can never drift out of sync with the actual sections.
export const ROUTES = [
  { id: 'home', file: 'README.md', label: 'home', icon: FileText, nav: Home, path: '~/portfolio/README.md', keys: ['g', 'h'], dock: true, goto: false, explore: true },
  { id: 'resume', file: 'resume.pdf', label: 'resume', icon: FileText, nav: FileText, path: '~/portfolio/resume.pdf', keys: [], dock: false, goto: false, explore: true, action: 'resume' },
  { id: 'about', file: 'about.me', label: 'about', icon: User, nav: User, path: '~/portfolio/about.me', keys: ['g', 'a'], dock: true, goto: true, explore: true },
  { id: 'terminal', file: 'terminal', label: 'terminal', icon: Terminal, nav: Terminal, path: '~/dev/terminal', keys: [], dock: false, goto: false, explore: false },
  { id: 'skills', file: 'skills.json', label: 'skills', icon: Braces, nav: Wrench, path: '~/portfolio/skills.json', keys: ['g', 's'], dock: true, goto: true, explore: true },
  { id: 'projects', file: 'projects/', label: 'projects', icon: Folder, nav: FolderGit2, path: '~/portfolio/projects/', keys: ['g', 'p'], dock: true, goto: true, explore: true },
  { id: 'experience', file: 'experience/', label: 'experience', icon: Folder, nav: Briefcase, path: '~/portfolio/experience/', keys: ['g', 'e'], dock: true, goto: true, explore: true },
  { id: 'certifications', file: 'certifications/', label: 'certifications', icon: Folder, nav: Award, path: '~/portfolio/certifications/', keys: [], dock: false, goto: false, explore: true },
  { id: 'contact', file: 'contact/', label: 'contact', icon: Folder, nav: Mail, path: '~/portfolio/contact/', keys: ['g', 'c'], dock: true, goto: true, explore: true },
]

export const FILES = ROUTES.filter((r) => r.explore).map((r) => ({
  id: r.id,
  type: r.file.endsWith('/') ? 'dir' : 'file',
  name: r.file,
  icon: r.icon,
  path: r.path,
}))

export const FILE_ICONS = Object.fromEntries(ROUTES.map((r) => [r.id, r.nav]))

export const DOCK_ITEMS = ROUTES.filter((r) => r.dock).map((r) => ({
  id: r.id,
  label: r.label,
}))
