import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import Background from './components/Background'
import BootScreen from './components/ide/BootScreen'
import CursorLight from './components/ide/CursorLight'
import TitleBar from './components/ide/TitleBar'
import SectionDivider from './components/ide/SectionDivider'
import BackToTop from './components/ide/BackToTop'
import Dock from './components/ide/Dock'
import useReveal from './hooks/useReveal'
import WelcomeWindow from './components/ide/WelcomeWindow'
import useParallax from './hooks/useParallax'
import useDeviceTilt from './hooks/useDeviceTilt'

const Sidebar = lazy(() => import('./components/ide/Sidebar'))
const StatusBar = lazy(() => import('./components/ide/StatusBar'))
const ResumeModal = lazy(() => import('./components/ResumeModal'))
const Footer = lazy(() => import('./components/ide/Footer'))
const TerminalPanel = lazy(() => import('./components/ide/TerminalPanel'))
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
  useReveal()
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
  const [terminalOpen, setTerminalOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    try {
      return localStorage.getItem('portfolio-sidebar-open') !== '0'
    } catch {
      return true
    }
  })
  const [sidebarW, setSidebarW] = useState(() => {
    try {
      const v = parseInt(localStorage.getItem('portfolio-sidebar-w'), 10)
      return Number.isFinite(v) ? Math.min(520, Math.max(240, v)) : 320
    } catch {
      return 320
    }
  })
  const [resizing, setResizing] = useState(false)
  const dragRef = useRef(null)

  useEffect(() => {
    const onToggle = () => setTerminalOpen((o) => !o)
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === '`') {
        const tag = document.activeElement?.tagName
        if (tag === 'INPUT' || tag === 'TEXTAREA') return
        e.preventDefault()
        onToggle()
      }
    }
    window.addEventListener('ide:terminal', onToggle)
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('ide:terminal', onToggle)
      window.removeEventListener('keydown', onKey)
    }
  }, [])

  useEffect(() => {
    if (!resizing) return
    const onMove = (e) => {
      if (dragRef.current == null) return
      const x = e.touches?.[0]?.clientX ?? e.clientX
      if (x == null) return
      setSidebarW(Math.min(520, Math.max(240, Math.round(x - dragRef.current))))
    }
    const onUp = () => {
      dragRef.current = null
      setResizing(false)
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
      try {
        localStorage.setItem('portfolio-sidebar-w', String(sidebarW))
      } catch {}
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerup', onUp)
    window.addEventListener('pointercancel', onUp)
    document.body.style.cursor = 'col-resize'
    document.body.style.userSelect = 'none'
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('pointercancel', onUp)
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }
  }, [resizing, sidebarW])

  const toggleSidebar = () => {
    setSidebarOpen((open) => {
      try {
        localStorage.setItem('portfolio-sidebar-open', open ? '0' : '1')
      } catch {}
      return !open
    })
  }

  const startResize = (e) => {
    e.preventDefault()
    const right = e.currentTarget.parentElement?.getBoundingClientRect().right ?? sidebarW
    dragRef.current = e.clientX - right
    setResizing(true)
  }

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

      <div
        className={`flex flex-1 flex-col transition-opacity duration-500 ${booted ? 'opacity-100' : 'opacity-0'}`}
        style={{ '--sidebar-w': `${sidebarOpen ? sidebarW : 0}px` }}
      >
        <BackToTop />
        <TitleBar
          onViewResume={() => setResumeOpen(true)}
          sidebarOpen={sidebarOpen}
          onToggleSidebar={toggleSidebar}
        />

        <div className="relative flex flex-1 items-stretch lg:pl-[var(--sidebar-w,20rem)]">
          <aside className={`fixed bottom-8 left-0 top-12 z-30 hidden w-[var(--sidebar-w,20rem)] shrink-0 border-r border-paper/10 bg-ink backdrop-blur-xl ${sidebarOpen ? 'lg:block' : ''}`}>
            <div className="flex h-full flex-col overflow-hidden">
              <Suspense fallback={null}>
                <Sidebar onViewResume={() => setResumeOpen(true)} />
              </Suspense>
            </div>
            <div
              role="separator"
              aria-orientation="vertical"
              aria-label="Resize sidebar"
              title="Drag to resize · double-click to reset"
              tabIndex={0}
              onPointerDown={startResize}
              onDoubleClick={() => {
                setSidebarW(320)
                try {
                  localStorage.setItem('portfolio-sidebar-w', '320')
                } catch {}
              }}
              onKeyDown={(e) => {
                if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                  e.preventDefault()
                  setSidebarW((w) => {
                    const next = Math.min(520, Math.max(240, w + (e.key === 'ArrowRight' ? 16 : -16)))
                    try {
                      localStorage.setItem('portfolio-sidebar-w', String(next))
                    } catch {}
                    return next
                  })
                }
              }}
              className={`absolute bottom-0 right-0 top-0 flex w-3 -translate-x-1/2 cursor-col-resize items-stretch justify-center outline-none transition-opacity ${
                resizing ? 'opacity-100' : 'opacity-0 hover:opacity-100 focus-visible:opacity-100'
              }`}
            >
              <span
                className={`my-2 w-1 rounded-full transition-colors ${
                  resizing ? 'bg-accent' : 'bg-paper/20 hover:bg-accent'
                }`}
                aria-hidden="true"
              />
              <span className="absolute inset-y-0 -left-2 -right-2" aria-hidden="true" />
            </div>
          </aside>

          <main className="min-w-0 flex-1 overflow-x-hidden pt-12 pt-[calc(3rem+env(safe-area-inset-top))] pb-24 pb-[calc(6rem+env(safe-area-inset-bottom))] lg:pb-12">
            <div className="mx-auto flex max-w-7xl flex-col gap-16 px-4 py-10 sm:px-6 md:gap-24 md:py-14">
              <WelcomeWindow onViewResume={() => setResumeOpen(true)} />
              <Suspense fallback={null}>
                <SectionDivider />
                <AboutWindow />
                <TerminalWindow />
                <SectionDivider />
                <SkillsWindow />
                <SectionDivider />
                <ProjectsWindow />
                <SectionDivider />
                <ExperienceWindow />
                <SectionDivider />
                <CertificationsWindow />
                <SectionDivider />
                <ContactWindow />
                <Footer />
              </Suspense>
            </div>
          </main>

        </div>

        <Dock />

        <Suspense fallback={null}>
          <TerminalPanel open={terminalOpen} onClose={() => setTerminalOpen(false)} />
        </Suspense>

        <div className="hidden lg:block">
          <Suspense fallback={null}>
            <StatusBar terminalOpen={terminalOpen} onToggleTerminal={() => setTerminalOpen((o) => !o)} />
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
