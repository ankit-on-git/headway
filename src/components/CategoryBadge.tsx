import React from 'react';
import { ActivityCategory } from '../types';

interface CategoryBadgeProps {
  category: ActivityCategory;
}

export const CategoryBadge: React.FC<CategoryBadgeProps> = ({ category }) => {
  const getBadgeStyle = (cat: ActivityCategory) => {
    switch (cat) {
      case 'Grammar Tutor':
        return 'bg-[#0070ba] text-white';
      case 'Vocabulary':
        return 'bg-[#1e7e34] text-white';
      case 'Everyday English':
        return 'bg-[#9b6426] text-white';
      case 'Reading':
        return 'bg-[#d9534f] text-white';
      case 'Listening':
        return 'bg-[#93548b] text-white';
      case 'Speaking':
        return 'bg-[#795290] text-white';
      case 'Writing':
        return 'bg-[#367b6b] text-white';
      case 'Video':
        return 'bg-[#555555] text-white';
      case 'Check your progress':
        return 'bg-[#137f8f] text-white';
      default:
        return 'bg-gray-600 text-white';
    }
  };

  return (
    <span
      className={`inline-block px-2.5 py-0.5 rounded-full text-[10.5px] font-medium tracking-tight whitespace-nowrap shadow-2xs ${getBadgeStyle(
        category
      )}`}
    >
      {category}
    </span>
  );
};
