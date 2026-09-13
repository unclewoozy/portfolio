import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    console.error('Uncaught render error:', error, info?.componentStack)
  }

  render() {
    if (this.state.error) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-ink p-8 text-center">
          <p className="font-mono text-sm text-paper">
            <span className="text-accent">~/</span>portfolio.dev
          </p>
          <p className="max-w-md font-mono text-xs leading-relaxed text-fog">
            something broke while rendering — press reload, and if it persists
            open the console (F12) and send the red error text.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="rounded-lg border border-accent px-6 py-2.5 font-mono text-xs uppercase tracking-[0.2em] text-accent transition-colors hover:bg-accent hover:text-ink"
          >
            Reload
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
