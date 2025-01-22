import React from 'react'
import { Book, Library, ArrowRight, Sun, Moon } from 'lucide-react'
import structure from '../data/structure.json'

export function ArchiveSelector({ onEnterArchive, theme, setTheme }) {
  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} p-8 transition-colors`}>
      <div className="max-w-6xl mx-auto space-y-12">
        <h1 className="text-4xl font-bold text-center text-gray-800">Sacred Text Archives</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Tianmu Canon */}
          <div className="bg-pink-50 rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center space-x-4 mb-4">
              <Book className="w-12 h-12 text-purple-600 mb-4" />
              <h2 className="text-2xl font-bold text-purple-800">Tianmu Canon</h2>
            </div>
            <p className="text-purple-700 mb-6">
              Journey through the sacred texts of the Order of Tianmu - modern interpretations 
              that bridge ancient wisdom with contemporary understanding, crafted by our 
              dedicated members to illuminate the path of wisdom for all seekers.
            </p>
            <button 
              onClick={() => onEnterArchive('tianmu')}
              className="flex items-center space-x-2 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
            >
              <span>Enter Archive</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Good Work Project */}
          <div className="bg-gray-50 rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center space-x-4 mb-4">
              <Library className="w-8 h-8 text-gray-700" />
              <h2 className="text-2xl font-bold text-gray-800">Good Work Project</h2>
            </div>
            <p className="text-gray-600 mb-6">
              A collaborative initiative to make the world's religious and spiritual texts 
              freely accessible to all. Clear, straightforward translations presented without 
              academic complexity, ensuring these timeless teachings remain open and 
              comprehensible to everyone.
            </p>
            <button className="flex items-center space-x-2 bg-gray-700 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors">
              <span>Enter Archive</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export function parseTianmuOnly(fullStructure) {
  const tianmuContents = fullStructure[0].contents;
  return {
    sections: tianmuContents.map(book => ({
      id: book.id,
      title: book.title,
      parts: book.contents.map(part => ({
        id: part.id,
        title: part.title,
        chapters: part.contents.map(chapter => ({
          id: chapter.id,
          title: chapter.title,
          content: chapter.content
        }))
      }))
    }))
  };
}
