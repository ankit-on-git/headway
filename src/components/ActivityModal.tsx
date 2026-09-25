import React, { useState } from 'react';
import { X, CheckCircle, AlertCircle, RotateCcw, Award } from 'lucide-react';
import { Activity, Question } from '../types';
import { CategoryBadge } from './CategoryBadge';

interface ActivityModalProps {
  activity: Activity | null;
  unitTitle: string;
  unitNumber: number;
  onClose: () => void;
  onComplete: (activityId: string, score: number) => void;
}

export const ActivityModal: React.FC<ActivityModalProps> = ({
  activity,
  unitTitle,
  unitNumber,
  onClose,
  onComplete,
}) => {
  if (!activity) return null;

  // Default questions if not populated
  const questions: Question[] = activity.questions && activity.questions.length > 0
    ? activity.questions
    : [
        {
          id: 'q-default-1',
          prompt: `Complete the practice sentence for ${activity.title}: "The expedition team _______ preparing their equipment all morning."`,
          type: 'select',
          options: ['has been', 'have been', 'is', 'were'],
          correctAnswer: 'has been',
          explanation: 'The collective noun expedition team takes a singular verb here.',
        },
        {
          id: 'q-default-2',
          prompt: 'Choose the most appropriate response in this scenario:',
          type: 'select',
          options: [
            'I couldn\'t agree more.',
            'Never mind that.',
            'What about it?',
            'No way at all.',
          ],
          correctAnswer: 'I couldn\'t agree more.',
          explanation: 'Expressing strong polite agreement.',
        },
      ];

  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (questionId: string, option: string) => {
    if (checked) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  const handleCheckAnswers = () => {
    setChecked(true);
    // Play a friendly tone using Web Audio API
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.3);
    } catch {
      // AudioContext fallback
    }
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setChecked(false);
    setSubmitted(false);
  };

  // Calculate score
  let correctCount = 0;
  questions.forEach((q) => {
    if (selectedAnswers[q.id] === q.correctAnswer) {
      correctCount++;
    }
  });
  const scorePercent = Math.round((correctCount / questions.length) * 100);

  const handleFinish = () => {
    setSubmitted(true);
    onComplete(activity.id, scorePercent);
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  const allAnswered = questions.every((q) => !!selectedAnswers[q.id]);

  return (
    <div
      id="activity-modal-overlay"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
    >
      <div
        id="activity-modal-dialog"
        className="bg-white rounded-lg shadow-2xl w-full max-w-2xl overflow-hidden border border-gray-200 flex flex-col max-h-[90vh]"
      >
        {/* Modal Top Header */}
        <div className="bg-[#701563] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="bg-white/20 text-white text-xs px-2.5 py-0.5 rounded-full font-semibold">
              Unit {unitNumber}
            </span>
            <div className="flex flex-col">
              <h3 className="text-base font-bold tracking-tight">
                {activity.title}
              </h3>
              <span className="text-xs text-pink-200">{unitTitle}</span>
            </div>
          </div>
          <button
            id="activity-modal-close-btn"
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sub-header info bar */}
        <div className="bg-gray-50 border-b border-gray-200 px-6 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">Category:</span>
            <CategoryBadge category={activity.category} />
          </div>
          <div className="text-xs text-gray-600 font-medium">
            Previous attempt:{' '}
            <span className="text-[#701563] font-semibold">
              {activity.score !== null ? `${activity.score}%` : 'Not completed yet'}
            </span>
          </div>
        </div>

        {/* Modal Body / Questions */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          <div className="text-sm font-semibold text-gray-800 border-b border-gray-100 pb-2">
            Practice Task: Answer all questions below then click Check Answers.
          </div>

          {questions.map((question, index) => {
            const isCorrect = selectedAnswers[question.id] === question.correctAnswer;
            const hasAnswered = !!selectedAnswers[question.id];

            return (
              <div
                key={question.id}
                className={`p-4 rounded-md border transition-all ${
                  checked
                    ? isCorrect
                      ? 'border-emerald-300 bg-emerald-50/50'
                      : 'border-red-300 bg-red-50/50'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <div className="flex items-start gap-2.5 mb-3">
                  <span className="w-6 h-6 rounded-full bg-gray-100 text-gray-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {index + 1}
                  </span>
                  <p className="text-sm font-medium text-gray-800 leading-relaxed">
                    {question.prompt}
                  </p>
                </div>

                {/* Question Options */}
                {question.options && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-8">
                    {question.options.map((option) => {
                      const isSelected = selectedAnswers[question.id] === option;
                      const optionIsCorrect = option === question.correctAnswer;

                      let buttonClass = 'border-gray-200 hover:border-gray-400 bg-white text-gray-700';

                      if (checked) {
                        if (optionIsCorrect) {
                          buttonClass = 'border-emerald-500 bg-emerald-100 text-emerald-900 font-semibold';
                        } else if (isSelected && !optionIsCorrect) {
                          buttonClass = 'border-red-500 bg-red-100 text-red-900 line-through';
                        } else {
                          buttonClass = 'border-gray-200 bg-gray-50 text-gray-400 opacity-70';
                        }
                      } else if (isSelected) {
                        buttonClass = 'border-[#701563] bg-[#701563]/10 text-[#701563] font-semibold ring-1 ring-[#701563]';
                      }

                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => handleSelect(question.id, option)}
                          disabled={checked}
                          className={`px-3.5 py-2 rounded text-xs text-left border transition-all cursor-pointer flex items-center justify-between ${buttonClass}`}
                        >
                          <span>{option}</span>
                          {checked && optionIsCorrect && (
                            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                          )}
                          {checked && isSelected && !optionIsCorrect && (
                            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Explanation feedback */}
                {checked && (
                  <div className="mt-3 pl-8 text-xs">
                    {isCorrect ? (
                      <span className="text-emerald-700 font-medium flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5" /> Correct! {question.explanation}
                      </span>
                    ) : (
                      <span className="text-red-600 font-medium flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> Correct answer: {question.correctAnswer}. {question.explanation}
                      </span>
                    )}
                  </div>
                )}
              </div>
            );
          })}

          {/* Results Summary Box after Checking */}
          {checked && (
            <div className="bg-[#701563]/10 border border-[#701563]/30 rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#701563] text-white flex items-center justify-center">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-sm font-bold text-gray-900">
                    Activity Score: {scorePercent}%
                  </div>
                  <div className="text-xs text-gray-600">
                    {correctCount} out of {questions.length} questions correct
                  </div>
                </div>
              </div>
              <button
                id="activity-try-again-btn"
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#701563] hover:bg-[#701563]/10 rounded transition-colors cursor-pointer border border-[#701563]/30"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Try again</span>
              </button>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-gray-50 border-t border-gray-200 px-6 py-3.5 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
          >
            Cancel
          </button>

          <div className="flex items-center gap-3">
            {!checked ? (
              <button
                id="activity-check-answers-btn"
                type="button"
                onClick={handleCheckAnswers}
                disabled={!allAnswered}
                className="px-5 py-2 bg-[#701563] hover:bg-[#5b0e50] disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-xs font-semibold rounded shadow-xs transition-colors cursor-pointer"
              >
                Check answers
              </button>
            ) : (
              <button
                id="activity-submit-btn"
                type="button"
                onClick={handleFinish}
                disabled={submitted}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded shadow-xs transition-colors cursor-pointer"
              >
                {submitted ? 'Submitted!' : 'Submit & Save Score'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
