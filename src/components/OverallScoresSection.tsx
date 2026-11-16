import React from 'react';
import { Clock } from 'lucide-react';
import { Unit } from '../types';

interface OverallScoresSectionProps {
  units: Unit[];
  onPrint?: () => void;
}

interface CategoryScoreCard {
  name: string;
  bgColor: string;
  score: number;
  activitiesDone: number;
  totalActivities: number;
  stars: 0 | 1 | 3;
  starVariant?: 'gold' | 'silver';
}

export const OverallScoresSection: React.FC<OverallScoresSectionProps> = ({ units }) => {
  const unitsDoneCount = units.reduce((sum, u) => sum + u.activitiesDone, 0);
  const totalDoneCount = 219 + (unitsDoneCount - 201);

  const avgScore = 77; // Overall compilation score matching the updated screenshot
  const totalCourseActivities = 242; // Standard Oxford Headway 5e Upper Intermediate total

  // Official Oxford Headway Upper Intermediate category distribution matching updated screenshot
  const categoryCards: CategoryScoreCard[] = [
    {
      name: 'Grammar Tutor',
      bgColor: '#0f75bc',
      score: 82,
      activitiesDone: 34,
      totalActivities: 36,
      stars: 3,
      starVariant: 'gold',
    },
    {
      name: 'Vocabulary',
      bgColor: '#00873d',
      score: 90,
      activitiesDone: 34,
      totalActivities: 38,
      stars: 3,
      starVariant: 'gold',
    },
    {
      name: 'Everyday English',
      bgColor: '#af7518',
      score: 85,
      activitiesDone: 21,
      totalActivities: 24,
      stars: 3,
      starVariant: 'gold',
    },
    {
      name: 'Video',
      bgColor: '#5c5d5f',
      score: 92,
      activitiesDone: 22,
      totalActivities: 24,
      stars: 3,
      starVariant: 'gold',
    },
    {
      name: 'Listening',
      bgColor: '#973b8c',
      score: 84,
      activitiesDone: 21,
      totalActivities: 24,
      stars: 3,
      starVariant: 'gold',
    },
    {
      name: 'Reading',
      bgColor: '#d63333',
      score: 89,
      activitiesDone: 22,
      totalActivities: 24,
      stars: 3,
      starVariant: 'gold',
    },
    {
      name: 'Writing',
      bgColor: '#3c7d62',
      score: 48,
      activitiesDone: 22,
      totalActivities: 24,
      stars: 1,
      starVariant: 'gold',
    },
    {
      name: 'Speaking',
      bgColor: '#885e71',
      score: 0,
      activitiesDone: 10,
      totalActivities: 12,
      stars: 0,
    },
    {
      name: 'Check your progress',
      bgColor: '#008299',
      score: 92,
      activitiesDone: 33,
      totalActivities: 36,
      stars: 3,
      starVariant: 'gold',
    },
  ];

  return (
    <div
      id="overall-scores-section"
      className="max-w-5xl w-full mx-auto px-4 sm:px-6 pt-10 pb-16 select-none"
    >
      {/* Top Center Icon & Header */}
      <div className="flex flex-col items-center justify-center mb-6">
        <div
          className="w-10 h-10 rounded-md bg-[#251e24] text-white flex items-center justify-center shadow-xs"
          title="Overall Scores"
        >
          {/* Authentic 3-Bar Chart Icon from screenshot */}
          <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
            <rect x="3" y="10" width="4" height="11" rx="0.5" />
            <rect x="10" y="4" width="4" height="17" rx="0.5" />
            <rect x="17" y="7" width="4" height="14" rx="0.5" />
          </svg>
        </div>

        <h2 className="text-[21px] sm:text-[22px] font-bold text-[#222222] mt-2.5 tracking-tight text-center">
          Overall scores
        </h2>
      </div>

      {/* Top 3 Metrics Row with Top and Bottom Borders */}
      <div className="border-t border-b border-gray-200/90 py-5 my-6">
        <div className="flex flex-col sm:flex-row items-center justify-around gap-6 sm:gap-2">
          {/* 1. Activities done */}
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-3">
              <span className="text-[26px] font-bold text-[#222222] tracking-tight">
                {totalDoneCount}
                <span className="text-gray-400 font-medium text-[20px]">
                  /{totalCourseActivities}
                </span>
              </span>

              {/* Progress Donut */}
              <DonutMetric
                completed={totalDoneCount}
                total={totalCourseActivities}
                size={34}
                strokeWidth={4.5}
                trackColor="#e5e7eb"
                fillColor="#2b252a"
              />
            </div>
            <span className="text-[12px] text-gray-500 font-normal mt-0.5">
              Activities done
            </span>
          </div>

          {/* 2. Scores */}
          <div className="flex flex-col items-center">
            <span className="text-[12px] text-gray-500 font-normal">Scores</span>
            <span className="text-[26px] font-bold text-[#222222] tracking-tight mt-0.5">
              {avgScore}%
            </span>
          </div>

          {/* 3. Time on activities */}
          <div className="flex items-center gap-3">
            <Clock className="w-8 h-8 text-[#222222] stroke-[1.75]" />
            <div className="flex flex-col">
              <span className="text-[12px] text-gray-500 font-normal">
                Time on activities
              </span>
              <span className="text-[26px] font-bold text-[#222222] tracking-tight mt-0.5 leading-none">
                12<span className="font-normal">hrs</span> 52
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 9 Category Score Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 mt-6">
        {categoryCards.map((card) => (
          <div
            key={card.name}
            style={{ backgroundColor: card.bgColor }}
            className="text-white rounded-[3px] p-4 flex flex-col justify-between min-h-[156px] shadow-2xs hover:brightness-105 transition-all"
          >
            {/* Category Title */}
            <h3 className="font-semibold text-[15px] sm:text-[16px] text-white leading-tight">
              {card.name}
            </h3>

            {/* Middle Section: Scores & Star */}
            <div className="flex items-start justify-between mt-2.5">
              <div>
                <div className="text-[11px] text-white/90 font-normal leading-none">
                  Scores
                </div>
                <div className="text-[24px] font-bold text-white mt-1 leading-none tracking-tight">
                  {card.score}%
                </div>
              </div>

              {(card.stars === 1 || card.stars === 3) && (
                <div className="shrink-0 -mt-0.5">
                  <CategoryStarBadge stars={card.stars} variant={card.starVariant || 'gold'} />
                </div>
              )}
            </div>

            {/* Bottom Section: Activities Done & Donut Ring */}
            <div className="mt-3 pt-1">
              <div className="text-[11px] text-white/90 font-normal leading-none mb-1">
                Activities done
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[18px] font-bold text-white tracking-tight">
                  {card.activitiesDone}/{card.totalActivities}
                </span>

                {/* Card Specific White Fill Donut Ring */}
                <CardWhiteDonut
                  completed={card.activitiesDone}
                  total={card.totalActivities}
                  size={26}
                  strokeWidth={3.8}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Top Summary Donut Ring
interface DonutMetricProps {
  completed: number;
  total: number;
  size: number;
  strokeWidth: number;
  trackColor: string;
  fillColor: string;
}

const DonutMetric: React.FC<DonutMetricProps> = ({
  completed,
  total,
  size,
  strokeWidth,
  trackColor,
  fillColor,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const fraction = total > 0 ? Math.min(Math.max(completed / total, 0), 1) : 0;
  const strokeDashoffset = circumference - fraction * circumference;

  return (
    <svg width={size} height={size} className="shrink-0 transform -rotate-90">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke={trackColor}
        strokeWidth={strokeWidth}
        fill="transparent"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke={fillColor}
        strokeWidth={strokeWidth}
        fill="transparent"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
      />
    </svg>
  );
};

// Card Donut with White Fill Arc matching the uploaded screenshot
interface CardWhiteDonutProps {
  completed: number;
  total: number;
  size?: number;
  strokeWidth?: number;
}

const CardWhiteDonut: React.FC<CardWhiteDonutProps> = ({
  completed,
  total,
  size = 26,
  strokeWidth = 3.8,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const fraction = total > 0 ? Math.min(Math.max(completed / total, 0), 1) : 0;
  const strokeDashoffset = circumference - fraction * circumference;

  return (
    <svg width={size} height={size} className="shrink-0 transform -rotate-90">
      {/* White Remaining Track */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="rgba(255, 255, 255, 0.9)"
        strokeWidth={strokeWidth}
        fill="transparent"
      />
      {/* Dark Completed Progress Arc */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="#111111"
        strokeWidth={strokeWidth}
        fill="transparent"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
      />
    </svg>
  );
};

interface CategoryStarBadgeProps {
  stars: 1 | 3;
  variant: 'gold' | 'silver';
}

const CategoryStarBadge: React.FC<CategoryStarBadgeProps> = ({ stars, variant }) => {
  const sideFill = variant === 'gold' ? '#e3a52c' : '#b8bec7';
  const centerFill = variant === 'gold' ? '#f8c546' : '#d5dae0';
  const singleFill = variant === 'gold' ? '#9e7023' : '#b8bec7';
  const strokeColor = 'rgba(255, 255, 255, 0.9)';

  if (stars === 1) {
    return (
      <svg className="w-6 h-6 drop-shadow-2xs" viewBox="0 0 24 24">
        <polygon
          points="12 2.5 14.9 8.4 21.4 9.3 16.7 13.9 17.8 20.4 12 17.3 6.2 20.4 7.3 13.9 2.6 9.3 9.1 8.4 12 2.5"
          fill={singleFill}
          stroke={strokeColor}
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <div className="flex items-center -space-x-2.5 pt-0.5">
      <svg className="w-5 h-5 drop-shadow-2xs" viewBox="0 0 24 24">
        <polygon
          points="12 2.5 14.9 8.4 21.4 9.3 16.7 13.9 17.8 20.4 12 17.3 6.2 20.4 7.3 13.9 2.6 9.3 9.1 8.4 12 2.5"
          fill={sideFill}
          stroke={strokeColor}
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
      <svg className="w-6 h-6 -translate-y-1 z-10 drop-shadow-xs" viewBox="0 0 24 24">
        <polygon
          points="12 2.5 14.9 8.4 21.4 9.3 16.7 13.9 17.8 20.4 12 17.3 6.2 20.4 7.3 13.9 2.6 9.3 9.1 8.4 12 2.5"
          fill={centerFill}
          stroke={strokeColor}
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      </svg>
      <svg className="w-5 h-5 drop-shadow-2xs" viewBox="0 0 24 24">
        <polygon
          points="12 2.5 14.9 8.4 21.4 9.3 16.7 13.9 17.8 20.4 12 17.3 6.2 20.4 7.3 13.9 2.6 9.3 9.1 8.4 12 2.5"
          fill={sideFill}
          stroke={strokeColor}
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

