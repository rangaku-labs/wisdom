import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

function SidebarItem({ item, level = 0, onSelect, selectedId, onClickItem, selectedItem }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const paddingLeft = `${level * 1.5}rem`;
  const isSelected = selectedId === item.id;

  const handleClick = () => {
    if (item.type === 'content') {
      onSelect(item);
    } else {
      setIsExpanded(!isExpanded);
    }
    onClickItem(item.id);
  };

  return (
    <div>
      <div
        className={`py-2 px-4 flex items-center justify-between cursor-pointer transition-colors
          ${selectedItem==item.id ? 'bg-blue-100 dark:bg-blue-900' : 'bg-purple-100 dark:bg-purple-900'}
          `}
        style={{ paddingLeft }}
        onClick={handleClick}
      >
        <span className={`transition-colors ${isSelected ? 'text-purple-900 dark:text-purple-100 font-medium' : 'text-gray-800 dark:text-gray-200'}`}>
          {item.title}
        </span>
        {item.type === 'division' && item.contents && item.contents.length > 0 && (
          isExpanded ? 
            <ChevronDown className={`w-4 h-4 ${isSelected ? 'text-purple-900 dark:text-purple-100' : 'text-purple-600'}`} /> : 
            <ChevronRight className={`w-4 h-4 ${isSelected ? 'text-purple-900 dark:text-purple-100' : 'text-purple-600'}`} />
        )}
      </div>

      
      {isExpanded && item.contents && (
        <div>
          {item.contents.map((child) => (
            <SidebarItem
              key={child.id}
              item={child}
              level={level + 1}
              onSelect={onSelect}
              selectedId={selectedId}
              onClickItem={onClickItem}
              selectedItem={selectedItem}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Sidebar({ data, onSelect, selectedContent, selectedItem, onClickItem }) {

  return (
    <div className="h-full overflow-y-auto bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700">
      <div className="p-4">
        {data.map((item) => (
          <SidebarItem
            key={item.id}
            item={item}
            onSelect={onSelect}
            selectedId={selectedContent?.id}
            onClickItem={onClickItem}
            selectedItem={selectedItem}
          />
        ))}
      </div>
    </div>
  );
}