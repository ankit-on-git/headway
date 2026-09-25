import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  stars: number;
}

export const StarRating: React.FC<StarRatingProps> = ({ stars }) => {
  if (stars === 0) return <div className="w-10" />;

  if (stars === 3) {
    // 3 gold stars cluster (like in screenshot 3 & 6: 3 stars overlapping or in a cluster)
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
