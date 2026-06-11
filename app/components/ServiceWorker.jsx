'use client'
import { useEffect } from 'react'

export default function ServiceWorker() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js', { scope: '/' })
        .then(reg => console.log('SW registered:', reg.scope))
        .catch(err => console.log('SW error:', err))
    }
  }, [])
  return null
}
