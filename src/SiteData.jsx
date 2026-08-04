import { createContext, useContext, useEffect, useState } from 'react'
import {
  PROFILE,
  NAV_LINKS,
  MARQUEE_ITEMS,
  ABOUT,
  EXPERIENCE,
  PROJECTS,
  SKILLS,
  CERTIFICATIONS,
  CONTACT,
} from './data/site'

const SiteDataContext = createContext({
  PROFILE,
  NAV_LINKS,
  MARQUEE_ITEMS,
  ABOUT,
  EXPERIENCE,
  PROJECTS,
  SKILLS,
  CERTIFICATIONS,
  CONTACT,
  loaded: true,
  fromApi: false,
})

const FALLBACK = {
  PROFILE,
  NAV_LINKS,
  MARQUEE_ITEMS,
  ABOUT,
  EXPERIENCE,
  PROJECTS,
  SKILLS,
  CERTIFICATIONS,
  CONTACT,
}

export function SiteDataProvider({ children }) {
  const [state, setState] = useState({ ...FALLBACK, loaded: false, fromApi: false })

  useEffect(() => {
    let active = true
    fetch('/api/site/')
      .then((res) => {
        if (!res.ok) throw new Error(`API responded ${res.status}`)
        return res.json()
      })
      .then((data) => {
        if (!active) return
        setState({ ...FALLBACK, ...data, loaded: true, fromApi: true })
      })
      .catch(() => {
        if (!active) return
        setState({ ...FALLBACK, loaded: true, fromApi: false })
      })
    return () => {
      active = false
    }
  }, [])

  return <SiteDataContext.Provider value={state}>{children}</SiteDataContext.Provider>
}

export function useSiteData() {
  return useContext(SiteDataContext)
}
