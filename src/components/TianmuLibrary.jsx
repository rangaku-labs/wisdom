import React, { useState } from 'react';
import { Book, Menu, Home, Sun, Moon } from 'lucide-react';
import structure from '../data/structure.json';
import Sidebar from './Sidebar';

export default function TianmuLibrary({ theme, setTheme, onBack }) {
  const [selectedContent, setSelectedContent] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [viewMode, setViewMode] = useState('tree');

  const handleContentSelect = (content) => {
    setSelectedContent(content);
  };

  const onClickItem = (itemId) => {
    console.log()
    setSelectedItemId(itemId);
  }

  // Book view component
  const BookView = () => (
    <div className="w-full p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {structure.map((book) => (
          <div
            key={book.id}
            onClick={() => {
              setViewMode('tree');
              if (book.contents?.[0]?.contents?.[0]) {
                setSelectedContent(book.contents[0].contents[0]);
              }
            }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 cursor-pointer 
                     hover:shadow-xl transition-shadow"
          >
            <Book className="w-12 h-12 text-purple-600 dark:text-purple-400 mb-4" />
            <h3 className="font-bold text-lg text-purple-800 dark:text-purple-300">{book.title}</h3>
            <p className="text-sm text-purple-600 dark:text-purple-400 mt-2">
              {book.contents?.[0]?.contents?.length || 0} chapters
            </p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderContent = () => (
    <div className="max-w-none dark:prose-invert">
      <h1 className="text-2xl font-bold mb-4 text-center">{selectedContent.title}</h1>
      <div className="text-base whitespace-pre-wrap" style={{ lineHeight: '0.6' }}>
        {selectedContent.content}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header Bar */}
      <header className="fixed top-0 left-0 w-full flex items-center justify-between bg-purple-700 text-white p-4 z-50">
        <div className="flex items-center space-x-4">
          <button onClick={onBack} className="p-2 rounded hover:bg-purple-600 transition-colors">
            <Home className="w-6 h-6" />
          </button>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded hover:bg-purple-600 transition-colors lg:hidden"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
        <h1 className="font-bold text-xl">Tianmu Canon</h1>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode(viewMode === 'tree' ? 'book' : 'tree')}
            className="px-3 py-1 rounded hover:bg-purple-600 transition-colors text-sm"
          >
            {viewMode === 'tree' ? 'Book View' : 'Tree View'}
          </button>
          <button
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="p-2 rounded hover:bg-purple-600 transition-colors"
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
              lg:translate-x-0 z-40`}
          >
            <Sidebar 
              data={structure} 
              onSelect={handleContentSelect}
              selectedContent = {selectedContent}
              selectedItem={selectedItemId}
              onClickItem={onClickItem}
            />
          </div>

          {/* Main Content */}
          <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'lg:ml-80' : 'ml-0'}`}>
            <div className="max-w-4xl mx-auto p-8">
              {selectedContent ? (
                renderContent()
              ) : (
                <div className="text-center py-20">
                  <Book className="w-16 h-16 mx-auto mb-4 text-purple-600 opacity-50" />
                  <h2 className="text-xl text-gray-800 dark:text-gray-200">
                    Select a text to begin your journey
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">
                    Choose from our sacred texts in the sidebar
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