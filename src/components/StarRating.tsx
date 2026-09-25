import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  stars: number;
  score?: number;
}

export const StarRating: React.FC<StarRatingProps> = ({ stars, score }) => {
  if (stars === 0) return <div className="w-10" />;

  const isSilver = score !== undefined && score < 80;

  if (stars >= 2 || stars === 3) {
    if (isSilver) {
      // Silver/grey star cluster for scores below 80% (matching screenshot for Units 3 & 4)
      return (
        <div className="flex items-center -space-x-1.5" title={`${score}% - Passed`}>
          <Star className="w-5 h-5 fill-[#d1d5db] text-[#9ca3af] drop-shadow-2xs opacity-80" />
          <Star className="w-6 h-6 fill-[#e5e7eb] text-[#9ca3af] drop-shadow-xs -translate-y-0.5 z-10 opacity-80" />
          <Star className="w-5 h-5 fill-[#d1d5db] text-[#9ca3af] drop-shadow-2xs opacity-80" />
        </div>
      );
    }

    // 3 gold stars cluster (like in screenshot for Units 1 & 2: 88% and 85%)
    return (
      <div className="flex items-center -space-x-1.5" title="3 Stars Mastered">
        <Star className="w-5 h-5 fill-[#d4992a] text-[#b87d15] drop-shadow-xs" />
        <Star className="w-6 h-6 fill-[#f1af30] text-[#c98c19] drop-shadow-sm -translate-y-0.5 z-10" />
        <Star className="w-5 h-5 fill-[#d4992a] text-[#b87d15] drop-shadow-xs" />
      </div>
    );
  }

  // 1 gold star
  return (
    <div className="flex items-center" title="1 Star">
      <Star className="w-5 h-5 fill-[#d4992a] text-[#a67116] drop-shadow-xs" />
    </div>
  );
};
