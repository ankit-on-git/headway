import React from 'react';

interface DonutProgressProps {
  completed: number;
  total: number;
  size?: number;
}

export const DonutProgress: React.FC<DonutProgressProps> = ({
  completed,
  total,
  size = 28,
}) => {
  const percentage = total > 0 ? (completed / total) * 100 : 0;
  const strokeWidth = 4;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center shrink-0" style={{ width: size, height: size }}>
      <svg className="w-full h-full -rotate-90" viewBox={`0 0 ${size} ${size}`}>
        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e3e3e3"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress stroke */}
        {completed > 0 && (
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#e08e20"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="none"
          />
        )}
      </svg>
    </div>
  );
};
