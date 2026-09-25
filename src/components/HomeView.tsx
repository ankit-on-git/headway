import React from 'react';
import { Settings, Plus } from 'lucide-react';
import { PurpleCourseBanner } from './PurpleCourseBanner';

interface HomeViewProps {
  onGoToPractice: () => void;
  onJoinClass: () => void;
  onAddLevel: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onGoToPractice,
  onJoinClass,
  onAddLevel,
}) => {
  return (
    <div id="home-view" className="p-8 max-w-5xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Course Card */}
        <div
          id="course-card-upper-intermediate"
          className="bg-white rounded border border-gray-300 shadow-xs flex flex-col overflow-hidden"
        >
          {/* Purple Top Banner */}
          <PurpleCourseBanner variant="card" onGoToPractice={onGoToPractice} />

          {/* White Bottom Body */}
          <div className="p-6 flex flex-col justify-between min-h-[190px]">
            <div>
              <p className="text-gray-700 text-sm leading-relaxed mb-4">
                You aren&apos;t in a class for this level. If your teacher has asked you to join an online class, enter the Class ID Code to join.
              </p>

              {/* Join a class link */}
              <button
                id="home-join-class-btn"
                onClick={onJoinClass}
                className="inline-flex items-center gap-1.5 text-gray-800 hover:text-[#701563] text-sm font-semibold transition-colors cursor-pointer group"
              >
                <Settings className="w-4 h-4 text-gray-700 group-hover:text-[#701563] transition-colors" />
                <span>Join a class</span>
              </button>
            </div>

            {/* Expiration date */}
            <div className="text-gray-500 text-xs mt-6 pt-2">
              Expires August 26th 2028
            </div>
          </div>
        </div>

        {/* Add a Level Card */}
        <div
          id="add-a-level-card"
          onClick={onAddLevel}
          className="bg-[#e7e7e7] hover:bg-[#e0e0e0] border border-gray-300 rounded p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all min-h-[295px] shadow-xs group"
        >
          <div className="w-14 h-14 rounded-full bg-[#333333] group-hover:bg-[#222222] text-white flex items-center justify-center shadow-xs mb-4 transition-transform group-hover:scale-105">
            <Plus className="w-8 h-8 stroke-[2.5]" />
          </div>

          <h3 className="font-semibold text-gray-800 text-base mb-2">
            Add a level
          </h3>

          <p className="text-gray-600 text-xs leading-relaxed max-w-xs">
            There are more levels in the Headway 5e Online Practice series. You will need an access code for each level you want to add.
          </p>
        </div>
      </div>
    </div>
  );
};
