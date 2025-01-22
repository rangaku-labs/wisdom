import React, { useState, useEffect } from 'react'
import { ArchiveSelector } from './components/ArchiveSelector'
import TianmuLibrary from './components/TianmuLibrary'

export default function App() {
  const [page, setPage] = useState('home')
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    // Apply theme to document
    document.documentElement.classList.remove('dark', 'light')
    document.documentElement.classList.add(theme)
  }, [theme])

  function onEnterArchive(archiveName) {
    if (archiveName === 'tianmu') {
      setPage('tianmu')
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {page === 'home' ? (
        <ArchiveSelector onEnterArchive={onEnterArchive} theme={theme} setTheme={setTheme} />
      ) : (
        <TianmuLibrary 
          theme={theme}
          setTheme={setTheme}
          onBack={() => setPage('home')}
        />
      )}
    </div>
  )
}
