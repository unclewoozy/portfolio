import { lazy, Suspense, useEffect, useState } from 'react'
import Background from './components/Background'
import BootScreen from './components/ide/BootScreen'
import CursorLight from './components/ide/CursorLight'
import Particles from './components/ide/Particles'
import TitleBar from './components/ide/TitleBar'
import Dock from './components/ide/Dock'
import WelcomeWindow from './components/ide/WelcomeWindow'
import useParallax from './hooks/useParallax'
import useDeviceTilt from './hooks/useDeviceTilt'

const FileExplorer = lazy(() => import('./components/ide/FileExplorer'))
const AssistantPanel = lazy(() => import('./components/ide/AssistantPanel'))
const StatusBar = lazy(() => import('./components/ide/StatusBar'))
const ResumeModal = lazy(() => import('./components/ResumeModal'))
const AboutWindow = lazy(() => import('./components/ide/AboutWindow'))
const TerminalWindow = lazy(() => import('./components/ide/TerminalWindow'))
const SkillsWindow = lazy(() => import('./components/ide/SkillsWindow'))
const ProjectsWindow = lazy(() => import('./components/ide/ProjectsWindow'))
const ExperienceWindow = lazy(() => import('./components/ide/ExperienceWindow'))
const CertificationsWindow = lazy(() => import('./components/ide/CertificationsWindow'))
const ContactWindow = lazy(() => import('./components/ide/ContactWindow'))

export default function App() {
  useParallax()
  useDeviceTilt()
  const [isDesktop] = useState(() => window.matchMedia('(min-width: 768px)').matches)
  const [booted, setBooted] = useState(() => {
    if (!isDesktop) return true
    try {
      return sessionStorage.getItem('portfolio-booted') === '1'
    } catch {
      return false
    }
  })
  const [resumeOpen, setResumeOpen] = useState(false)
  const [glass, setGlass] = useState(() => {
    const saved = Number(localStorage.getItem('glassOpacity'))
    return Number.isFinite(saved) && saved >= 0 && saved <= 100 ? saved : 50
  })

  useEffect(() => {
    document.documentElement.style.setProperty('--glass-opacity', String(glass / 100))
    localStorage.setItem('glassOpacity', String(glass))
  }, [glass])

  return (
    <div className="relative flex min-h-screen min-h-dvh flex-col bg-ink font-sans text-paper">
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
        <TitleBar />

        <div className="relative flex flex-1 items-stretch pt-14 pt-[calc(3.5rem+env(safe-area-inset-top))] pb-24 pb-[calc(6rem+env(safe-area-inset-bottom))] lg:pb-28">
          <aside className="hidden w-64 shrink-0 border-r border-paper/10 bg-ink/50 backdrop-blur-xl lg:block">
            <div className="sticky top-14 flex h-[calc(100vh-12.5rem)] flex-col overflow-hidden">
              <Suspense fallback={null}>
                <FileExplorer />
              </Suspense>
            </div>
          </aside>

          <main className="min-w-0 flex-1 overflow-x-hidden">
            <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-10 sm:px-6 md:py-14">
              <WelcomeWindow onViewResume={() => setResumeOpen(true)} glass={glass} onGlass={setGlass} />
              <Suspense fallback={null}>
                <AboutWindow />
                <TerminalWindow />
                <SkillsWindow />
                <ProjectsWindow />
                <ExperienceWindow />
                <CertificationsWindow />
                <ContactWindow />
              </Suspense>
            </div>
          </main>

          <aside className="hidden w-80 shrink-0 border-l border-paper/10 bg-ink/50 backdrop-blur-xl xl:block">
            <div className="sticky top-14 flex h-[calc(100vh-12.5rem)] flex-col overflow-hidden">
              <Suspense fallback={null}>
                <AssistantPanel onViewResume={() => setResumeOpen(true)} />
              </Suspense>
            </div>
          </aside>
        </div>

        <Dock />

        <div className="hidden lg:block">
          <Suspense fallback={null}>
            <StatusBar />
          </Suspense>
        </div>
      </div>

      <Suspense fallback={null}>
        <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} />
      </Suspense>
      <div className="noise" aria-hidden="true" />
    </div>
  )
}
