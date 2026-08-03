import { Award, Braces, Briefcase, FileText, Folder, FolderGit2, Home, Mail, User, Wrench } from 'lucide-react'

export const FILES = [
  { id: 'home', type: 'file', name: 'README.md', icon: FileText, path: '~/portfolio/README.md' },
  { id: 'about', type: 'file', name: 'about.me', icon: User, path: '~/portfolio/about.me' },
  { id: 'skills', type: 'file', name: 'skills.json', icon: Braces, path: '~/portfolio/skills.json' },
  { id: 'projects', type: 'dir', name: 'projects/', icon: Folder, path: '~/portfolio/projects/' },
  { id: 'experience', type: 'dir', name: 'experience/', icon: Folder, path: '~/portfolio/experience/' },
  { id: 'certifications', type: 'dir', name: 'certifications/', icon: Folder, path: '~/portfolio/certifications/' },
  { id: 'contact', type: 'dir', name: 'contact/', icon: Folder, path: '~/portfolio/contact/' },
]

export const FILE_IDS = Object.fromEntries(FILES.map((f) => [f.id, f.id]))

export const FILE_ICONS = {
  home: Home,
  about: User,
  skills: Wrench,
  projects: FolderGit2,
  experience: Briefcase,
  certifications: Award,
  contact: Mail,
}
