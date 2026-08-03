import { useEffect, useState } from 'react'
import Background from './components/Background'
import ResumeModal from './components/ResumeModal'
import BootScreen from './components/ide/BootScreen'
import CursorLight from './components/ide/CursorLight'
import Particles from './components/ide/Particles'
import TitleBar from './components/ide/TitleBar'
import FileExplorer from './components/ide/FileExplorer'
import AssistantPanel from './components/ide/AssistantPanel'
import Dock from './components/ide/Dock'
import StatusBar from './components/ide/StatusBar'
import GlassControl from './components/ide/GlassControl'
import WelcomeWindow from './components/ide/WelcomeWindow'
import AboutWindow from './components/ide/AboutWindow'
import TerminalWindow from './components/ide/TerminalWindow'
import SkillsWindow from './components/ide/SkillsWindow'
import ProjectsWindow from './components/ide/ProjectsWindow'
import ExperienceWindow from './components/ide/ExperienceWindow'
import CertificationsWindow from './components/ide/CertificationsWindow'
import ContactWindow from './components/ide/ContactWindow'
import useParallax from './hooks/useParallax'

export default function App() {
  useParallax()
  const [booted, setBooted] = useState(() => {
    try {
      return sessionStorage.getItem('portfolio-booted') === '1'
    } catch {
      return false
    }
  })
  const [resumeOpen, setResumeOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [glass, setGlass] = useState(() => {
    const saved = Number(localStorage.getItem('glassOpacity'))
    return Number.isFinite(saved) && saved >= 0 && saved <= 100 ? saved : 50
  })

  useEffect(() => {
    document.documentElement.style.setProperty('--glass-opacity', String(glass / 100))
    localStorage.setItem('glassOpacity', String(glass))
  }, [glass])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <div className="relative flex min-h-dvh flex-col bg-ink font-sans text-paper">
      {!booted && (
        <BootScreen
          done={() => {
            try {
              sessionStorage.setItem('portfolio-booted', '1')
            } catch {}
            setBooted(true)
          }}
        />
      )}
      <Background />
      <CursorLight />
      <Particles />

      <div className={`flex flex-1 flex-col transition-opacity duration-500 ${booted ? 'opacity-100' : 'opacity-0'}`}>
        <TitleBar onMenu={() => setMenuOpen((o) => !o)} />

        <div className="relative flex flex-1 items-stretch pt-[calc(3.5rem+env(safe-area-inset-top))] pb-24 lg:pb-28">
          <aside className="hidden w-64 shrink-0 border-r border-paper/10 bg-ink/50 backdrop-blur-xl lg:block">
            <div className="sticky top-14 flex h-[calc(100vh-12.5rem)] flex-col overflow-hidden">
              <FileExplorer />
            </div>
          </aside>

          <main className="min-w-0 flex-1 overflow-x-hidden">
            <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-8 sm:px-6 md:py-10">
              <WelcomeWindow onViewResume={() => setResumeOpen(true)} glass={glass} onGlass={setGlass} />
              <AboutWindow />
              <TerminalWindow />
              <SkillsWindow />
              <ProjectsWindow />
              <ExperienceWindow />
              <CertificationsWindow />
              <ContactWindow />
            </div>
          </main>

          <aside className="hidden w-80 shrink-0 border-l border-paper/10 bg-ink/50 backdrop-blur-xl xl:block">
            <div className="sticky top-14 flex h-[calc(100vh-12.5rem)] flex-col overflow-hidden">
              <AssistantPanel onViewResume={() => setResumeOpen(true)} />
            </div>
          </aside>
        </div>

        <Dock />

        <div className="hidden lg:block">
          <StatusBar />
        </div>
      </div>

      {menuOpen && (
        <div
          className="fixed inset-0 z-[80] lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="File explorer"
        >
          <button
            type="button"
            className="absolute inset-0 bg-ink/70 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
            aria-label="Close explorer"
          />
          <div className="window-in relative h-full w-72 border-r border-paper/10 bg-ink/95 p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] pt-[calc(1rem+env(safe-area-inset-top))]">
            <FileExplorer onNavigate={() => setMenuOpen(false)} />
          </div>
        </div>
      )}

      <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} />
      <div className="noise" aria-hidden="true" />
    </div>
  )
}
