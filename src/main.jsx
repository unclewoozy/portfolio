import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { SiteDataProvider } from './SiteData'
import ErrorBoundary from './components/ide/ErrorBoundary'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <SiteDataProvider>
        <App />
      </SiteDataProvider>
    </ErrorBoundary>
  </StrictMode>,
)
