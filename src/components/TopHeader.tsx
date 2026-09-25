import React from 'react';
import { PlusCircle, Printer } from 'lucide-react';
import { NavigationTab } from '../types';

interface TopHeaderProps {
  currentTab: NavigationTab;
  onAddLevel?: () => void;
  onPrint?: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({ currentTab, onAddLevel }) => {
  if (currentTab === 'practice') {
    // PracticeView renders its own top purple banner and tan "My practice" subheader bar
    return null;
  }

  const getTitle = () => {
    switch (currentTab) {
      case 'home':
        return 'Home';
      case 'resources':
        return 'Resources';
      case 'account':
        return 'My Account';
      case 'dictionary':
        return 'Dictionary';
      default:
        return 'Headway 5e';
    }
  };

  return (
    <header
      id="top-header"
      className="h-12 bg-white border-b border-gray-200 px-6 flex items-center justify-between shrink-0 shadow-xs select-none"
    >
      <div className="w-28" /> {/* Left spacer for optical center alignment */}

      {/* Center Screen Title */}
      <h1 className="text-gray-700 text-sm font-medium tracking-wide">
        {getTitle()}
      </h1>

      {/* Right Actions */}
      <div className="w-28 flex justify-end">
        {currentTab === 'home' && onAddLevel && (
          <button
            id="header-add-level-btn"
            onClick={onAddLevel}
            className="inline-flex items-center gap-1.5 text-[#b51475] hover:text-[#8e0e5b] text-xs font-semibold tracking-tight transition-colors cursor-pointer"
          >
            <PlusCircle className="w-4 h-4 fill-[#b51475] text-white" />
            <span>Add a level</span>
          </button>
        )}
      </div>
    </header>
  );
};
