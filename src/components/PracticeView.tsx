import React, { useState } from 'react';
import { ChevronDown, Check, Printer } from 'lucide-react';
import { Activity, Unit } from '../types';
import { PurpleCourseBanner } from './PurpleCourseBanner';
import { DonutProgress } from './DonutProgress';
import { StarRating } from './StarRating';
import { CategoryBadge } from './CategoryBadge';
import { OverallScoresSection } from './OverallScoresSection';

interface PracticeViewProps {
  units: Unit[];
  expandedUnitId: number | null;
  onToggleUnit: (unitId: number) => void;
  onSelectActivity: (unit: Unit, activity: Activity) => void;
  onPrint?: () => void;
}

export const PracticeView: React.FC<PracticeViewProps> = ({
  units,
  expandedUnitId,
  onToggleUnit,
  onSelectActivity,
  onPrint,
}) => {
  // Dropdown filter states
  const [submitTime, setSubmitTime] = useState<'off' | 'on'>('off');
  const [attemptView, setAttemptView] = useState<'Last attempt' | 'First attempt' | 'Best attempt'>('Last attempt');
  const [scoreFormat, setScoreFormat] = useState<'Scores %' | 'Raw Points'>('Scores %');

  const [openFilter, setOpenFilter] = useState<string | null>(null);

  return (
    <div id="practice-view" className="flex flex-col min-h-full pb-16 bg-[#f7f7f7]">
      {/* Top Purple Banner */}
      <PurpleCourseBanner variant="full" />

      {/* Subheader Bar: White background, Centered "My practice" + Right "Print" button */}
      <div
        id="practice-subheader-bar"
        className="w-full bg-white border-b border-gray-200 px-6 sm:px-8 h-11 flex items-center justify-between text-xs select-none shadow-2xs"
      >
        <div className="w-24" />
        <span className="font-semibold text-[#222222] text-[15px] tracking-tight">
          My practice
        </span>
        <div className="w-24 flex justify-end">
          {onPrint && (
            <button
              id="practice-subbar-print-btn"
              onClick={onPrint}
              className="inline-flex items-center gap-1.5 text-[#881773] hover:text-[#5e0d4f] font-semibold text-xs tracking-tight transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4 text-[#881773]" />
              <span>Print</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter / Settings Strip */}
      <div className="max-w-5xl w-full mx-auto px-4 sm:px-6 pt-3 pb-1 flex justify-end items-center gap-6 text-xs text-gray-700 select-none relative z-20">
        {/* Submit Time */}
        <div className="relative">
          <button
            onClick={() => setOpenFilter(openFilter === 'submitTime' ? null : 'submitTime')}
            className="flex items-center gap-1 hover:text-gray-900 cursor-pointer font-medium"
          >
            <span>Submit <strong>Time {submitTime}</strong></span>
            <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
          </button>
          {openFilter === 'submitTime' && (
            <div className="absolute right-0 mt-1.5 w-32 bg-white border border-gray-200 rounded shadow-md py-1 z-30">
              <button
                onClick={() => { setSubmitTime('off'); setOpenFilter(null); }}
                className={`w-full px-3 py-1.5 text-left hover:bg-gray-100 ${submitTime === 'off' ? 'font-bold text-[#701563]' : ''}`}
              >
                Time off
              </button>
              <button
                onClick={() => { setSubmitTime('on'); setOpenFilter(null); }}
                className={`w-full px-3 py-1.5 text-left hover:bg-gray-100 ${submitTime === 'on' ? 'font-bold text-[#701563]' : ''}`}
              >
                Time on
              </button>
            </div>
          )}
        </div>

        {/* Show Attempt */}
        <div className="relative">
          <button
            onClick={() => setOpenFilter(openFilter === 'attempt' ? null : 'attempt')}
            className="flex items-center gap-1 hover:text-gray-900 cursor-pointer font-medium"
          >
            <span>Show <strong>{attemptView}</strong></span>
            <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
          </button>
          {openFilter === 'attempt' && (
            <div className="absolute right-0 mt-1.5 w-36 bg-white border border-gray-200 rounded shadow-md py-1 z-30">
              {(['Last attempt', 'First attempt', 'Best attempt'] as const).map((view) => (
                <button
                  key={view}
                  onClick={() => { setAttemptView(view); setOpenFilter(null); }}
                  className={`w-full px-3 py-1.5 text-left hover:bg-gray-100 ${attemptView === view ? 'font-bold text-[#701563]' : ''}`}
                >
                  {view}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Scores % */}
        <div className="relative">
          <button
            onClick={() => setOpenFilter(openFilter === 'score' ? null : 'score')}
            className="flex items-center gap-1 hover:text-gray-900 cursor-pointer font-medium"
          >
            <span><strong>{scoreFormat}</strong></span>
            <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
          </button>
          {openFilter === 'score' && (
            <div className="absolute right-0 mt-1.5 w-32 bg-white border border-gray-200 rounded shadow-md py-1 z-30">
              {(['Scores %', 'Raw Points'] as const).map((fmt) => (
                <button
                  key={fmt}
                  onClick={() => { setScoreFormat(fmt); setOpenFilter(null); }}
                  className={`w-full px-3 py-1.5 text-left hover:bg-gray-100 ${scoreFormat === fmt ? 'font-bold text-[#701563]' : ''}`}
                >
                  {fmt}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Units Accordion List */}
      <div className="max-w-5xl w-full mx-auto px-4 sm:px-6 space-y-2.5 mt-1">
        {units.map((unit) => {
          const isExpanded = unit.id === expandedUnitId;

          // Group activities by section
          const lookAgainActivities = unit.activities.filter((a) => a.section === 'look_again');
          const practiceActivities = unit.activities.filter((a) => a.section === 'practice');
          const progressActivities = unit.activities.filter((a) => a.section === 'check_your_progress');

          return (
            <div
              key={unit.id}
              id={`unit-card-${unit.id}`}
              className="rounded bg-white transition-all shadow-2xs overflow-hidden"
            >
              {/* Unit Header Row */}
              <div
                onClick={() => onToggleUnit(unit.id)}
                className={`flex items-center justify-between px-5 py-3.5 cursor-pointer select-none transition-colors border ${
                  isExpanded
                    ? 'border-2 border-[#881773] bg-white'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                {/* Left: Unit Number badge and Unit Title */}
                <div className="flex items-center gap-3.5">
                  <div className="w-7 h-7 rounded-full bg-[#3d1a33] text-white flex items-center justify-center font-bold text-xs shrink-0">
                    {unit.number}
                  </div>
                  <h3 className="font-medium text-[#2d2d2d] text-[14px] tracking-tight">
                    {unit.title}
                  </h3>
                </div>

                {/* Right: Progress Donut, Activities Done, Score %, Gold Stars */}
                <div className="flex items-center gap-6 sm:gap-8">
                  {/* Activities Done + Donut */}
                  <div className="flex items-center gap-2.5">
                    <div className="text-right">
                      <div className={`text-xs font-semibold ${unit.activitiesDone > 0 ? 'text-[#e08e20]' : 'text-gray-700'}`}>
                        {unit.activitiesDone}/{unit.totalActivities}
                      </div>
                      <div className="text-[10px] text-gray-500 tracking-tight leading-none mt-0.5">
                        Activities done
                      </div>
                    </div>
                    <DonutProgress completed={unit.activitiesDone} total={unit.totalActivities} size={26} />
                  </div>

                  {/* Score % */}
                  <div className="text-right min-w-[42px]">
                    <span className={`text-sm ${unit.score > 0 ? 'font-bold text-gray-700' : 'font-normal text-gray-500'}`}>
                      {unit.score}%
                    </span>
                  </div>

                  {/* Stars - Only rendered when unit has stars (matching the photo where 0% units have no stars) */}
                  <div className="w-12 flex justify-center">
                    {unit.stars > 0 && <StarRating stars={unit.stars} />}
                  </div>
                </div>
              </div>

              {/* Expanded Unit Activities Panel */}
              {isExpanded && (
                <div className="border-x border-b border-gray-200 bg-white divide-y divide-gray-100">
                  {/* 1. LOOK AGAIN SECTION */}
                  {lookAgainActivities.length > 0 && (
                    <div className="activities-section">
                      {/* Section Title Header */}
                      <div className="bg-[#efefef] px-6 py-2 border-y border-gray-200">
                        <span className="text-xs font-medium text-gray-600">
                          Look again
                        </span>
                      </div>

                      {/* Section Item Rows */}
                      <div className="divide-y divide-gray-100">
                        {lookAgainActivities.map((activity) => (
                          <ActivityRow
                            key={activity.id}
                            activity={activity}
                            onClick={() => onSelectActivity(unit, activity)}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 2. PRACTICE SECTION */}
                  {practiceActivities.length > 0 && (
                    <div className="activities-section">
                      {/* Section Title Header */}
                      <div className="bg-[#efefef] px-6 py-2 border-y border-gray-200">
                        <span className="text-xs font-medium text-gray-600">
                          Practice
                        </span>
                      </div>

                      {/* Section Item Rows */}
                      <div className="divide-y divide-gray-100">
                        {practiceActivities.map((activity) => (
                          <ActivityRow
                            key={activity.id}
                            activity={activity}
                            onClick={() => onSelectActivity(unit, activity)}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 3. CHECK YOUR PROGRESS SECTION */}
                  {progressActivities.length > 0 && (
                    <div className="activities-section">
                      {/* Section Title Header */}
                      <div className="bg-[#efefef] px-6 py-2 border-y border-gray-200">
                        <span className="text-xs font-medium text-gray-600">
                          Check your progress
                        </span>
                      </div>

                      {/* Section Item Rows */}
                      <div className="divide-y divide-gray-100">
                        {progressActivities.map((activity) => (
                          <ActivityRow
                            key={activity.id}
                            activity={activity}
                            onClick={() => onSelectActivity(unit, activity)}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Overall Scores Section matching uploaded screenshot */}
      <OverallScoresSection units={units} onPrint={onPrint} />
    </div>
  );
};

// Activity Row Component
interface ActivityRowProps {
  activity: Activity;
  onClick: () => void;
}

const ActivityRow: React.FC<ActivityRowProps> = ({ activity, onClick }) => {
  const isDone = activity.status === 'done' || activity.status === 'submitted';

  return (
    <div
      onClick={onClick}
      className="px-6 py-3 flex items-center justify-between hover:bg-gray-50/80 cursor-pointer transition-colors group select-none"
    >
      {/* Left: Status Icon, Title, and Category Tag */}
      <div className="flex items-center gap-3 flex-1 pr-4">
        {/* Status Check Icon */}
        <div className="shrink-0">
          {isDone ? (
            <div className="w-4 h-4 rounded-full bg-[#333333] text-white flex items-center justify-center">
              <Check className="w-2.5 h-2.5 stroke-[3]" />
            </div>
          ) : (
            <div className="w-4 h-4 rounded-full border-2 border-gray-300 flex items-center justify-center">
              <Check className="w-2.5 h-2.5 text-gray-300 stroke-[3]" />
            </div>
          )}
        </div>

        {/* Title */}
        <span className="text-xs font-medium text-gray-800 group-hover:text-[#701563] transition-colors">
          {activity.title}
        </span>

        {/* Category Badge */}
        <CategoryBadge category={activity.category} />
      </div>

      {/* Right: Tries count & Score / Status (Two small vertical stacked columns) */}
      <div className="flex items-center gap-6 shrink-0 text-right text-gray-600">
        {/* Tries Column */}
        <div className="w-12 text-center">
          <div className="text-xs font-bold text-gray-700 leading-tight">
            {activity.tries}
          </div>
          <div className="text-[10px] text-gray-400 leading-none">
            {activity.tries === 1 ? 'try' : 'tries'}
          </div>
        </div>

        {/* Score / Status Column */}
        <div className="w-16 text-center">
          {activity.status === 'submitted' ? (
            <div className="text-xs font-semibold text-gray-700">
              Submitted
            </div>
          ) : activity.score !== null ? (
            <>
              <div className="text-xs font-bold text-gray-700 leading-tight">
                {activity.score}%
              </div>
              <div className="text-[10px] text-gray-400 leading-none">
                last
              </div>
            </>
          ) : activity.status === 'done' ? (
            <>
              <div className="text-xs font-bold text-gray-700 leading-tight flex justify-center">
                <Check className="w-3.5 h-3.5 text-gray-700 stroke-[3]" />
              </div>
              <div className="text-[10px] text-gray-400 leading-none">
                done
              </div>
            </>
          ) : (
            <>
              <div className="text-xs font-bold text-gray-400 leading-tight">
                -
              </div>
              <div className="text-[10px] text-gray-400 leading-none">
                last
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
