'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type BackendData = any // Replace with your real type

const BackendContext = createContext<BackendData | null>(null)

export function useBackend() {
  return useContext(BackendContext)
}

export function BackendProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<BackendData | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/backend')
        const json = await res.json()
        setData(json)
      } catch (err) {
        console.error('Error fetching backend data:', err)
      }
    }

    fetchData()
  }, [])

  return <BackendContext.Provider value={data}>{children}</BackendContext.Provider>
}
