// Import React and necessary components
import React from 'react';
import { useState } from 'react';
import { Book, Menu, ScrollText, ChevronDown, ChevronRight, Home, Sun, Moon } from 'lucide-react';

// Our main App component that serves as the root of our application
function App() {
  // State management for our interface
  const [viewMode, setViewMode] = useState('tree');  // Controls if we're in tree or book view
  const [theme, setTheme] = useState('light');       // Manages light/dark theme
  const [sidebarOpen, setSidebarOpen] = useState(true); // Controls sidebar visibility
  const [expandedSections, setExpandedSections] = useState({}); // Tracks which sections are open
  const [selectedChapter, setSelectedChapter] = useState(null); // Currently selected chapter

  // Sample content structure - this will later be replaced with your actual content
  const sampleTexts = {
    inPraiseOfWisdom: {
      id: 'ipow',
      title: "In Praise of Wisdom",
      sections: [
        {
          id: 'ipow-1',
          title: "Book I: Dawn's Awakening",
          chapters: [
            {
              id: 'ipow-1-1',
              title: "Chapter 1: The First Light",
              content: `# The First Light

In the gentle dawn of understanding,
Where wisdom first breaks through the night,
We gather to sing praise eternal,
To knowledge pure and bright.`
            }
          ]
        }
      ]
    }
  };

  // Helper function to toggle section expansion
  const toggleSection = (id) => {
    setExpandedSections(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Navigation bar component at the top of our application
  const NavigationBar = () => (
    <div className="fixed top-0 left-0 right-0 h-12 bg-purple-700 text-white px-4 flex items-center justify-between z-50">
      <div className="flex items-center space-x-4">
        <button onClick={() => window.location.href = '/'} 
                className="hover:bg-purple-600 p-2 rounded">
          <Home size={20} />
        </button>
        <h1 className="font-bold">Sacred Text Archives</h1>
      </div>
      <button
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        className="hover:bg-purple-600 p-2 rounded"
      >
        {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
      </button>
    </div>
  );

  // Grid view of all books when in "book" view mode
  const BookView = () => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {Object.values(sampleTexts).map(text => (
        <div
          key={text.id}
          onClick={() => {
            setViewMode('tree');
            setExpandedSections({ [text.id]: true });
          }}
          className="bg-white rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow"
        >
          <Book className="w-12 h-12 text-purple-600 mb-4" />
          <h3 className="font-bold text-purple-800">{text.title}</h3>
          <p className="text-sm text-purple-600 mt-2">
            {text.sections.reduce((acc, section) => 
              acc + section.chapters.length, 0)} chapters
          </p>
        </div>
      ))}
    </div>
  );

  // Sidebar component for navigation
  const Sidebar = () => (
    <div className={`w-72 h-screen bg-pink-50 border-purple-200 border-r fixed left-0 top-12 
                    p-4 transition-all ${sidebarOpen ? 'translate-x-0' : '-translate-x-72'} 
                    overflow-y-auto`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <ScrollText className="text-purple-600" size={24} />
          <h2 className="text-xl font-bold text-purple-600">Tianmu Canon</h2>
        </div>
        <button onClick={() => setSidebarOpen(false)} 
                className="p-2 rounded-full hover:bg-purple-100">
          <Menu size={20} className="text-purple-600" />
        </button>
      </div>

      {/* View mode toggle button */}
      <div className="space-y-4 mb-6">
        <button
          onClick={() => setViewMode(viewMode === 'tree' ? 'books' : 'tree')}
          className="w-full bg-purple-100 text-purple-700 px-4 py-2 rounded hover:bg-purple-200 
                    transition-colors"
        >
          {viewMode === 'tree' ? 'Switch to Book View' : 'Switch to Tree View'}
        </button>
      </div>
      
      {/* Tree navigation structure */}
      {viewMode === 'tree' && (
        <div className="space-y-4">
          {Object.entries(sampleTexts).map(([key, text]) => (
            <div key={key} className="border-b border-purple-200 pb-4">
              <button
                onClick={() => toggleSection(text.id)}
                className="w-full flex items-center justify-between p-2 hover:bg-purple-100 
                          rounded"
              >
                <span className="font-semibold text-purple-700">{text.title}</span>
                {expandedSections[text.id] ? (
                  <ChevronDown className="w-4 h-4 text-purple-600" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-purple-600" />
                )}
              </button>
              
              {expandedSections[text.id] && text.sections.map((section) => (
                <div key={section.id} className="ml-4 mt-2">
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="w-full flex items-center justify-between p-2 hover:bg-purple-100 
                              rounded"
                  >
                    <span className="text-sm text-purple-600">{section.title}</span>
                    {expandedSections[section.id] ? (
                      <ChevronDown className="w-4 h-4 text-purple-600" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-purple-600" />
                    )}
                  </button>
                  
                  {expandedSections[section.id] && (
                    <ul className="ml-4 space-y-1">
                      {section.chapters.map((chapter) => (
                        <li
                          key={chapter.id}
                          onClick={() => setSelectedChapter(chapter)}
                          className={`cursor-pointer text-sm p-2 rounded hover:bg-purple-100
                            ${selectedChapter?.id === chapter.id ? 
                              'bg-purple-100 text-purple-700' : 'text-purple-600'}`}
                        >
                          {chapter.title}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // Main content area where the selected text is displayed
  const MainContent = () => (
    <div className={`min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 
                    dark:from-gray-800 dark:to-purple-900 
                    ${sidebarOpen ? 'ml-72' : 'ml-0'} transition-all pt-12`}>
      <button
        onClick={() => setSidebarOpen(true)}
        className={`fixed top-16 left-4 p-2 rounded-full hover:bg-purple-100 
                   bg-pink-50 shadow-md ${sidebarOpen ? 'hidden' : ''}`}
      >
        <Menu size={20} className="text-purple-600" />
      </button>
      
      <div className="max-w-4xl mx-auto p-8">
        {viewMode === 'books' ? (
          <BookView />
        ) : selectedChapter ? (
          <div className="prose lg:prose-xl">
            <div className="markdown-content bg-white rounded-lg p-8 shadow-md">
              <pre className="whitespace-pre-wrap font-serif text-gray-800">
                {selectedChapter.content}
              </pre>
            </div>
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-lg shadow-md">
            <Book size={48} className="mx-auto mb-4 text-purple-400" />
            <h2 className="text-xl text-purple-600">Select a text to begin your journey</h2>
            <p className="text-purple-400 mt-2">Choose from our sacred texts in the sidebar</p>
          </div>
        )}
      </div>
    </div>
  );

  // Render the complete application
  return (
    <div className={`flex ${theme === 'dark' ? 'dark' : ''}`}>
      <NavigationBar />
      <Sidebar />
      <MainContent />
    </div>
  );
}

export default App;