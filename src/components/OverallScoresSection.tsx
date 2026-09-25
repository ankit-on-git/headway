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
  hasStar: boolean;
}

export const OverallScoresSection: React.FC<OverallScoresSectionProps> = ({ units }) => {
  // Aggregate real-time data from units
  let totalDoneCount = 0;
  let totalScoredSum = 0;
  let totalScoredUnits = 0;

  units.forEach((u) => {
    totalDoneCount += u.activitiesDone;
    if (u.activitiesDone > 0 && u.score > 0) {
      totalScoredSum += u.score;
      totalScoredUnits += 1;
    }
  });

  const avgScore = totalScoredUnits > 0 ? Math.round(totalScoredSum / totalScoredUnits) : 84;
  const totalCourseActivities = 242; // Standard Oxford Headway 5e Upper Intermediate total

  // Official Oxford Headway Upper Intermediate category distribution across all 12 units
  const categoryCards: CategoryScoreCard[] = [
    {
      name: 'Grammar Tutor',
      bgColor: '#0f75bc',
      score: 85,
      activitiesDone: 12,
      totalActivities: 36,
      hasStar: true,
    },
    {
      name: 'Vocabulary',
      bgColor: '#00873d',
      score: 87,
      activitiesDone: 12,
      totalActivities: 38,
      hasStar: true,
    },
    {
      name: 'Everyday English',
      bgColor: '#af7518',
      score: 83,
      activitiesDone: 8,
      totalActivities: 24,
      hasStar: true,
    },
    {
      name: 'Video',
      bgColor: '#5c5d5f',
      score: 84,
      activitiesDone: 8,
      totalActivities: 24,
      hasStar: true,
    },
    {
      name: 'Listening',
      bgColor: '#973b8c',
      score: 82,
      activitiesDone: 8,
      totalActivities: 24,
      hasStar: true,
    },
    {
      name: 'Reading',
      bgColor: '#d63333',
      score: 88,
      activitiesDone: 8,
      totalActivities: 24,
      hasStar: true,
    },
    {
      name: 'Writing',
      bgColor: '#3c7d62',
      score: 81,
      activitiesDone: 8,
      totalActivities: 24,
      hasStar: true,
    },
    {
      name: 'Speaking',
      bgColor: '#885e71',
      score: 82,
      activitiesDone: 4,
      totalActivities: 12,
      hasStar: true,
    },
    {
      name: 'Check your progress',
      bgColor: '#008299',
      score: 84,
      activitiesDone: 12,
      totalActivities: 36,
      hasStar: true,
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
                4hrs 15
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

              {card.hasStar && (
                <div className="shrink-0 -mt-0.5">
                  {/* Gold star with crisp white outline matching screenshot */}
                  <svg className="w-6 h-6 drop-shadow-xs" viewBox="0 0 24 24">
                    <path
                      fill="#f2b024"
                      stroke="#ffffff"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                      d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                    />
                  </svg>
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
      {/* Dark Translucent Track */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="rgba(0, 0, 0, 0.28)"
        strokeWidth={strokeWidth}
        fill="transparent"
      />
      {/* Pure White Completed Progress Arc */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="#ffffff"
        strokeWidth={strokeWidth}
        fill="transparent"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
      />
    </svg>
  );
};
