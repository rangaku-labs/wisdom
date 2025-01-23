import React, { useState, useEffect } from 'react'
import { ArchiveSelector } from './components/ArchiveSelector'
import TianmuLibrary from './components/TianmuLibrary'
import GoodWorks from './components/GoodWorks'
import ErrorBoundary from './components/ErrorBoundary'

export default function App() {
  const [page, setPage] = useState('home')
  const [theme, setTheme] = useState('dark') // Changed default to dark

  useEffect(() => {
    document.documentElement.classList.remove('dark', 'light')
    document.documentElement.classList.add(theme)
  }, [theme])

  function onEnterArchive(archiveName) {
    if (archiveName === 'tianmu') {
      setPage('tianmu')
    } else if (archiveName === 'goodworks') {
      setPage('goodworks')
    }
  }

  return (
    <div className="min-h-screen bg-black">
      <ErrorBoundary>
        {page === 'home' ? (
          <ArchiveSelector onEnterArchive={onEnterArchive} theme={theme} setTheme={setTheme} />
        ) : page === 'goodworks' ? (
          <GoodWorks 
            theme={theme}
            setTheme={setTheme}
            onBack={() => setPage('home')}
          />
        ) : (
          <TianmuLibrary 
            theme={theme}
            setTheme={setTheme}
            onBack={() => setPage('home')}
          />
        )}
      </ErrorBoundary>
    </div>
  )
}