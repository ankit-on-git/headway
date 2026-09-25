import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Avatar } from './Avatar';
import upperIntermediateAvatar from '../assets/images/regenerated_image_1789991361629.png';

interface PurpleCourseBannerProps {
  variant?: 'full' | 'card';
  onGoToPractice?: () => void;
}

export const PurpleCourseBanner: React.FC<PurpleCourseBannerProps> = ({
  variant = 'full',
  onGoToPractice,
}) => {
  if (variant === 'card') {
    return (
      <div
        id="course-banner-card"
        className="bg-[#701563] text-white px-4 py-3.5 flex items-center gap-3.5 rounded-t select-none"
      >
        <img
          src={upperIntermediateAvatar}
          alt="Upper Intermediate"
          className="w-14 h-14 object-cover shrink-0 select-none"
          referrerPolicy="no-referrer"
        />
        <div className="flex flex-col items-start">
          <span className="font-semibold text-[17px] leading-tight text-white mb-1.5">
            Upper Intermediate
          </span>
          {onGoToPractice && (
            <button
              id="go-to-practice-btn"
              onClick={onGoToPractice}
              className="inline-flex items-center gap-1.5 bg-[#20041d] hover:bg-[#130111] text-white text-[12px] px-3.5 py-1 rounded-full font-medium transition-colors cursor-pointer shadow-xs border border-white/5"
            >
              <span>Go to practice</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          )}
        </div>
      </div>
    );
  }

  // Full banner spanning across top of practice content matching the user picture
  return (
    <div
      id="course-banner-full"
      className="bg-[#701563] text-white pl-3.5 pr-0 h-[58px] flex items-center shadow-xs border-t border-[#881773]/50 border-b border-[#4d023e] relative select-none overflow-hidden"
    >
      <div className="flex items-center gap-3.5 h-full">
        {/* Student Avatar Icon */}
        <img
          src={upperIntermediateAvatar}
          alt="Upper Intermediate"
          className="h-[50px] w-[50px] object-cover shrink-0 select-none"
          referrerPolicy="no-referrer"
        />

        {/* Level Heading */}
        <span className="text-white font-semibold text-[18px] sm:text-[19px] tracking-tight select-none">
          Upper Intermediate
        </span>
      </div>

      {/* Right vertical white divider line from picture */}
      <div className="ml-auto w-[2px] h-full bg-white/85" />
    </div>
  );
};

