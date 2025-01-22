import React, { useState } from 'react';
import { Book, Menu, ScrollText } from 'lucide-react';

// This component is the main layout of our library
// It includes a sidebar for navigation and a main content area
function TianmuLibrary() {
  // These state variables help manage our interface
  const [sidebarOpen, setSidebarOpen] = useState(true);  // Controls if sidebar is visible
  const [selectedText, setSelectedText] = useState(null); // Keeps track of which text we're viewing
  const [viewMode, setViewMode] = useState('tree');      // Switches between tree and book view

  // Sample data - later we'll load this from your markdown files
  const sampleTexts = {
    inPraiseOfWisdom: {
      title: "In Praise of Wisdom",
      sections: [
        {
          title: "Book I: Dawn's Awakening",
          chapters: [
            {
              title: "Chapter 1: The First Light",
              content: `
# The First Light

In the gentle dawn of understanding,
Where wisdom first breaks through the night...
              `
            }
          ]
        }
      ]
    }
  };

  // This component renders the navigation sidebar
  const Sidebar = () => (
    <div className={`w-72 h-screen bg-pink-50 border-purple-200 border-r fixed left-0 top-0 p-4 
                    transition-all ${sidebarOpen ? 'translate-x-0' : '-translate-x-72'}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <ScrollText className="text-purple-600" size={24} />
          <h2 className="text-xl font-bold text-purple-600">Order of Tianmu</h2>
        </div>
        <button onClick={() => setSidebarOpen(false)} 
                className="p-2 rounded-full hover:bg-purple-100">
          <Menu size={20} className="text-purple-600" />
        </button>
      </div>
      
      {/* View mode switcher */}
      <button onClick={() => setViewMode(viewMode === 'tree' ? 'books' : 'tree')}
              className="w-full bg-purple-100 text-purple-700 px-4 py-2 rounded hover:bg-purple-200 
                         transition-colors mb-6">
        {viewMode === 'tree' ? 'Switch to Book View' : 'Switch to Tree View'}
      </button>

      {/* Navigation content changes based on view mode */}
      {viewMode === 'tree' ? (
        <TreeView texts={sampleTexts} onSelect={setSelectedText} />
      ) : (
        <BookView texts={sampleTexts} onSelect={setSelectedText} />
      )}
    </div>
  );

  // The main content area where texts are displayed
  const MainContent = () => (
    <div className={`min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 
                    ${sidebarOpen ? 'ml-72' : 'ml-0'} transition-all`}>
      {/* Menu button shows when sidebar is closed */}
      <button onClick={() => setSidebarOpen(true)}
              className={`fixed top-4 left-4 p-2 rounded-full hover:bg-purple-100 
                         bg-pink-50 shadow-md ${sidebarOpen ? 'hidden' : ''}`}>
        <Menu size={20} className="text-purple-600" />
      </button>
      
      <div className="max-w-4xl mx-auto p-8">
        {selectedText ? (
          <div className="prose lg:prose-xl">
            <div className="markdown-content bg-white rounded-lg p-8 shadow-md">
              <h1 className="text-3xl font-bold mb-8">{selectedText.title}</h1>
              <div className="whitespace-pre-wrap font-serif text-gray-800">
                {selectedText.content}
              </div>
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

  return (
    <div className="flex">
      <Sidebar />
      <MainContent />
    </div>
  );
}

export default TianmuLibrary;