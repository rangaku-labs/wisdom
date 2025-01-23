import React, { useState, useEffect } from 'react';
import { Book, Menu, Home, Sun, Moon, Search, Type, ArrowUpDown } from 'lucide-react';
import structure from '../data/goodworks-structure.json';
import Sidebar from './Sidebar';

export default function GoodWorks({ theme, setTheme, onBack }) {
  const [selectedContent, setSelectedContent] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [viewMode, setViewMode] = useState('tree');
  const [fontSize, setFontSize] = useState(() => 
    localStorage.getItem('goodworks-fontSize') || 'text-base'
  );
  const [lineHeight, setLineHeight] = useState(() => 
    localStorage.getItem('goodworks-lineHeight') || '0.6'
  );
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [readProgress, setReadProgress] = useState(() => 
    JSON.parse(localStorage.getItem('goodworks-progress') || '{}')
  );

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Escape') setSidebarOpen(false);
      if (e.ctrlKey && e.key === 'b') setSidebarOpen(prev => !prev);
      if (e.ctrlKey && e.key === 'f') {
        document.getElementById('search-input')?.focus();
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  // Save preferences
  useEffect(() => {
    localStorage.setItem('goodworks-fontSize', fontSize);
    localStorage.setItem('goodworks-lineHeight', lineHeight);
  }, [fontSize, lineHeight]);

  // Loading state
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  // Track reading progress
  useEffect(() => {
    if (selectedContent) {
      const progress = { ...readProgress, [selectedContent.id]: true };
      localStorage.setItem('goodworks-progress', JSON.stringify(progress));
      setReadProgress(progress);
    }
  }, [selectedContent]);

  const handleContentSelect = (content) => {
    setSelectedContent(content);
    setIsLoading(true);
  };

  const onClickItem = (itemId) => {
    setSelectedItemId(itemId);
  };

  const BookView = () => (
    <div className="w-full p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {structure.map((collection) => (
          <div
            key={collection.id}
            onClick={() => {
              setViewMode('tree');
              if (collection.contents?.[0]?.contents?.[0]) {
                setSelectedContent(collection.contents[0].contents[0]);
              }
            }}
            className="bg-black hover:bg-white rounded-lg shadow-lg p-6 cursor-pointer 
                     hover:shadow-xl transition-all duration-200 border border-gray-800
                     group"
          >
            <Book className="w-12 h-12 text-white group-hover:text-black mb-4" />
            <h3 className="font-bold text-lg text-white group-hover:text-black">
              {collection.title}
            </h3>
            <p className="text-sm text-gray-400 group-hover:text-gray-600 mt-2">
              {collection.contents?.[0]?.contents?.length || 0} texts
            </p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderContent = () => (
    <div className="max-w-none prose prose-invert">
      <h1 className="text-2xl font-bold mb-4 text-center text-white">
        {selectedContent.title}
      </h1>
      <div 
        className={`${fontSize} whitespace-pre-wrap text-white`} 
        style={{ lineHeight }}
      >
        {selectedContent.content}
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-black">
      {/* Header Bar */}
      <header className="fixed top-0 left-0 w-full flex items-center justify-between bg-black text-white p-4 z-50 border-b border-gray-800">
        <div className="flex items-center space-x-4">
          <button onClick={onBack} className="p-2 rounded hover:bg-white hover:text-black transition-colors">
            <Home className="w-6 h-6" />
          </button>
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded hover:bg-white hover:text-black transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
          <input
            id="search-input"
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-1 rounded bg-gray-900 text-white border border-gray-700 focus:outline-none focus:border-white"
          />
        </div>
        <h1 className="font-bold text-xl">Good Work Project</h1>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setFontSize(size => size === 'text-base' ? 'text-lg' : 'text-base')}
            className="p-2 rounded hover:bg-white hover:text-black transition-colors"
            title="Toggle Font Size"
          >
            <Type className="w-6 h-6" />
          </button>
          <button
            onClick={() => setLineHeight(h => h === '0.6' ? '1' : '0.6')}
            className="p-2 rounded hover:bg-white hover:text-black transition-colors"
            title="Toggle Line Height"
          >
            <ArrowUpDown className="w-6 h-6" />
          </button>
          <button
            onClick={() => setViewMode(viewMode === 'tree' ? 'book' : 'tree')}
            className="px-3 py-1 rounded hover:bg-white hover:text-black transition-colors text-sm"
          >
            {viewMode === 'tree' ? 'Book View' : 'Tree View'}
          </button>
          <button
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="p-2 rounded hover:bg-white hover:text-black transition-colors"
          >
            {theme === 'light' ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      {viewMode === 'book' ? (
        <div className="pt-16">
          <BookView />
        </div>
      ) : (
        <div className="flex pt-16 min-h-screen">
          {/* Sidebar */}
          <div 
            className={`fixed left-0 top-16 bottom-0 w-80 transform transition-transform duration-300 ease-in-out 
              ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
              lg:translate-x-0 z-40 bg-black border-r border-gray-800`}
          >
            <Sidebar 
              data={structure} 
              onSelect={handleContentSelect}
              selectedContent={selectedContent}
              selectedItem={selectedItemId}
              onClickItem={onClickItem}
              readProgress={readProgress}
              searchTerm={searchTerm}
            />
          </div>

          {/* Main Content */}
          <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'lg:ml-80' : 'ml-0'}`}>
            <div className="max-w-4xl mx-auto p-8">
              {selectedContent ? (
                renderContent()
              ) : (
                <div className="text-center py-20">
                  <Book className="w-16 h-16 mx-auto mb-4 text-white opacity-50" />
                  <h2 className="text-xl text-white">
                    Select a text to begin reading
                  </h2>
                  <p className="text-gray-400 mt-2">
                    Choose from our collection of spiritual texts in the sidebar
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}