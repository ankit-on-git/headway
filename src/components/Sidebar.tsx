import React from 'react';
import { Home, CheckCircle2, Download, HelpCircle, LogOut } from 'lucide-react';
import { NavigationTab } from '../types';

interface SidebarProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  onOpenHelp: () => void;
  onSignOut: () => void;
  inCourseView?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  onOpenHelp,
  onSignOut,
  inCourseView = true,
}) => {
  return (
    <aside
      id="main-sidebar"
      className="w-[76px] shrink-0 bg-[#222222] text-white flex flex-col justify-between select-none z-30 min-h-screen"
    >
      {/* Top Group */}
      <div className="flex flex-col">
        {/* Home */}
        <button
          id="nav-home-btn"
          onClick={() => onSelectTab('home')}
          className={`w-full py-4 flex flex-col items-center justify-center transition-colors relative ${
            currentTab === 'home'
              ? 'bg-[#49c5b6] text-[#111111] font-semibold'
              : 'text-[#d8d8d8] hover:bg-[#2e2e2e] hover:text-white'
          }`}
          title="Home"
        >
          <Home className="w-6 h-6 mb-1" strokeWidth={2.2} />
          <span className="text-[11px] tracking-tight">Home</span>
        </button>

        {/* Practice (available inside course) */}
        {inCourseView && (
          <button
            id="nav-practice-btn"
            onClick={() => onSelectTab('practice')}
            className={`w-full py-4 flex flex-col items-center justify-center transition-colors relative ${
              currentTab === 'practice'
                ? 'bg-[#49c5b6] text-[#111111] font-semibold'
                : 'text-[#d8d8d8] hover:bg-[#2e2e2e] hover:text-white'
            }`}
            title="Practice"
          >
            <div className="relative mb-1">
              <CheckCircle2 className="w-6 h-6" strokeWidth={2.4} />
            </div>
            <span className="text-[11px] tracking-tight">Practice</span>
          </button>
        )}

        {/* Resources (available inside course) */}
        {inCourseView && (
          <button
            id="nav-resources-btn"
            onClick={() => onSelectTab('resources')}
            className={`w-full py-4 flex flex-col items-center justify-center transition-colors relative ${
              currentTab === 'resources'
                ? 'bg-[#49c5b6] text-[#111111] font-semibold'
                : 'text-[#d8d8d8] hover:bg-[#2e2e2e] hover:text-white'
            }`}
            title="Resources"
          >
            {/* Tray with download arrow */}
            <div className="relative mb-1">
              <Download className="w-6 h-6" strokeWidth={2.2} />
            </div>
            <span className="text-[11px] tracking-tight">Resources</span>
          </button>
        )}

        {/* Dictionary (available inside course) */}
        {inCourseView && (
          <button
            id="nav-dictionary-btn"
            onClick={() => onSelectTab('dictionary')}
            className={`w-full py-4 flex flex-col items-center justify-center transition-colors relative ${
              currentTab === 'dictionary'
                ? 'bg-[#49c5b6] text-[#111111] font-semibold'
                : 'text-[#d8d8d8] hover:bg-[#2e2e2e] hover:text-white'
            }`}
            title="Dictionary"
          >
            {/* A-Z Circular Icon */}
            <div
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-[10px] font-bold mb-1 leading-none ${
                currentTab === 'dictionary' ? 'border-[#111111] text-[#111111]' : 'border-white text-white'
              }`}
            >
              A-Z
            </div>
            <span className="text-[11px] tracking-tight">Dictionary</span>
          </button>
        )}
      </div>

      {/* Bottom Group */}
      <div className="flex flex-col border-t border-[#333333]">
        {/* Help */}
        <button
          id="nav-help-btn"
          onClick={onOpenHelp}
          className="w-full py-4 flex flex-col items-center justify-center text-[#d8d8d8] hover:bg-[#2e2e2e] hover:text-white transition-colors"
          title="Help"
        >
          <HelpCircle className="w-6 h-6 mb-1" strokeWidth={2.2} />
          <span className="text-[11px] tracking-tight">Help</span>
        </button>

        {/* Account */}
        <button
          id="nav-account-btn"
          onClick={() => onSelectTab('account')}
          className={`w-full py-4 flex flex-col items-center justify-center transition-colors relative ${
            currentTab === 'account'
              ? 'bg-[#49c5b6] text-[#111111] font-semibold'
              : 'text-[#d8d8d8] hover:bg-[#2e2e2e] hover:text-white'
          }`}
          title="Account"
        >
          {/* User ID card / badge icon */}
          <div
            className={`w-6 h-6 rounded border-2 flex flex-col items-center justify-center mb-1 ${
              currentTab === 'account' ? 'border-[#111111]' : 'border-white'
            }`}
          >
            <div
              className={`w-2 h-2 rounded-full mb-0.5 ${
                currentTab === 'account' ? 'bg-[#111111]' : 'bg-white'
              }`}
            />
            <div
              className={`w-3.5 h-1.5 rounded-t-sm ${
                currentTab === 'account' ? 'bg-[#111111]' : 'bg-white'
              }`}
            />
          </div>
          <span className="text-[11px] tracking-tight">Account</span>
        </button>

        {/* Sign out */}
        <button
          id="nav-signout-btn"
          onClick={onSignOut}
          className="w-full py-4 flex flex-col items-center justify-center text-[#d8d8d8] hover:bg-[#2e2e2e] hover:text-white transition-colors"
          title="Sign out"
        >
          <LogOut className="w-6 h-6 mb-1" strokeWidth={2.2} />
          <span className="text-[11px] tracking-tight">Sign out</span>
        </button>
      </div>
    </aside>
  );
};
