import React from 'react';
import upperIntermediateAvatar from '../assets/images/regenerated_image_1789991361629.png';

interface AvatarProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-14 h-14',
    lg: 'w-16 h-16',
  }[size];

  return (
    <img
      src={upperIntermediateAvatar}
      alt="Upper Intermediate Student"
      className={`${sizeClasses} object-cover shrink-0 select-none ${className}`}
      referrerPolicy="no-referrer"
    />
  );
};

