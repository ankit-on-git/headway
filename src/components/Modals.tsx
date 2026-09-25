import React, { useState } from 'react';
import { X, Check, KeyRound, School, HelpCircle, LogOut, Printer, BookOpen } from 'lucide-react';
import { Unit } from '../types';

/* =========================================================================
   1. JOIN CLASS MODAL
   ========================================================================= */
interface JoinClassModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (classCode: string) => void;
}

export const JoinClassModal: React.FC<JoinClassModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [classCode, setClassCode] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!classCode.trim()) {
      setError('Please enter a valid Class ID Code.');
      return;
    }
    onSuccess(classCode);
    setClassCode('');
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-2xs flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden border border-gray-200">
        <div className="bg-[#701563] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <School className="w-5 h-5" />
            <h3 className="font-bold text-sm tracking-tight">Join a Class</h3>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded-full cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <p className="text-xs text-gray-700 leading-relaxed mb-4">
            If your teacher has created an online class for Headway 5e, ask them for the Class ID Code and enter it below.
          </p>

          <label className="block text-xs font-semibold text-gray-800 mb-1.5">
            Class ID Code
          </label>
          <input
            type="text"
            placeholder="e.g. C-849204"
            value={classCode}
            onChange={(e) => {
              setClassCode(e.target.value);
              setError('');
            }}
            className="w-full px-3.5 py-2.5 text-xs border border-gray-300 rounded focus:border-[#701563] focus:ring-1 focus:ring-[#701563] uppercase tracking-wider font-mono mb-2"
          />

          {error && <p className="text-xs text-red-600 mb-3">{error}</p>}

          <div className="mt-6 flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-gray-600 hover:text-gray-900 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#701563] hover:bg-[#580e4e] text-white text-xs font-semibold rounded cursor-pointer transition-colors shadow-xs"
            >
              Join class
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

/* =========================================================================
   2. ADD A LEVEL MODAL
   ========================================================================= */
interface AddLevelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (level: string) => void;
}

export const AddLevelModal: React.FC<AddLevelModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [accessCode, setAccessCode] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('Intermediate');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessCode.trim() || accessCode.length < 6) {
      setError('Please enter the 12-digit access code found inside your student book.');
      return;
    }
    onSuccess(selectedLevel);
    setAccessCode('');
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-2xs flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden border border-gray-200">
        <div className="bg-[#701563] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <KeyRound className="w-5 h-5" />
            <h3 className="font-bold text-sm tracking-tight">Add a Level</h3>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded-full cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <p className="text-xs text-gray-700 leading-relaxed mb-4">
            Enter your access code to unlock an additional level in the Headway 5th Edition series.
          </p>

          <label className="block text-xs font-semibold text-gray-800 mb-1.5">
            Select Course Level
          </label>
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:border-[#701563] focus:ring-1 focus:ring-[#701563] mb-4 bg-white"
          >
            <option value="Beginner">Beginner</option>
            <option value="Elementary">Elementary</option>
            <option value="Pre-Intermediate">Pre-Intermediate</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Upper Intermediate">Upper Intermediate (Current)</option>
            <option value="Advanced">Advanced</option>
          </select>

          <label className="block text-xs font-semibold text-gray-800 mb-1.5">
            12-Digit Access Code
          </label>
          <input
            type="text"
            placeholder="e.g. S-940-128-4902"
            value={accessCode}
            onChange={(e) => {
              setAccessCode(e.target.value);
              setError('');
            }}
            className="w-full px-3.5 py-2.5 text-xs border border-gray-300 rounded focus:border-[#701563] focus:ring-1 focus:ring-[#701563] uppercase tracking-wider font-mono mb-2"
          />

          {error && <p className="text-xs text-red-600 mb-3">{error}</p>}

          <div className="mt-6 flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-gray-600 hover:text-gray-900 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#701563] hover:bg-[#580e4e] text-white text-xs font-semibold rounded cursor-pointer transition-colors shadow-xs"
            >
              Add level
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

/* =========================================================================
   3. HELP MODAL
   ========================================================================= */
interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-2xs flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg overflow-hidden border border-gray-200 flex flex-col max-h-[85vh]">
        <div className="bg-[#701563] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5" />
            <h3 className="font-bold text-sm tracking-tight">Oxford Headway Help & Support</h3>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded-full cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-4 text-xs text-gray-700 leading-relaxed">
          <div>
            <h4 className="font-bold text-gray-900 text-sm mb-1">How does scoring work?</h4>
            <p className="text-gray-600">
              Each unit contains activities across Grammar, Vocabulary, Everyday English, Reading, and Listening. Scores reflect your last submitted attempt. Complete all 20 activities to achieve a 3-star rating.
            </p>
          </div>

          <div className="border-t border-gray-100 pt-3">
            <h4 className="font-bold text-gray-900 text-sm mb-1">How do I access audio offline?</h4>
            <p className="text-gray-600">
              Navigate to the <strong>Resources</strong> section in the sidebar. You can stream or download MP3 audio tracks for both Student&apos;s Book and Workbook units.
            </p>
          </div>

          <div className="border-t border-gray-100 pt-3">
            <h4 className="font-bold text-gray-900 text-sm mb-1">Joining a Teacher&apos;s Class</h4>
            <p className="text-gray-600">
              Click &ldquo;Join a class&rdquo; on the Home screen and enter the unique 8-digit Class ID provided by your institution. Your progress will automatically sync with your teacher&apos;s gradebook.
            </p>
          </div>

          <div className="border-t border-gray-100 pt-3 bg-gray-50 p-3 rounded">
            <span className="font-semibold text-gray-800">Need direct technical assistance?</span>
            <p className="text-gray-500 mt-0.5">
              Contact Oxford University Press Support at: <a href="mailto:eltsupport@oup.com" className="text-[#701563] underline">eltsupport@oup.com</a>
            </p>
          </div>
        </div>

        <div className="bg-gray-50 border-t border-gray-200 px-6 py-3 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#701563] text-white text-xs font-semibold rounded cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   4. SIGN OUT MODAL
   ========================================================================= */
interface SignOutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const SignOutModal: React.FC<SignOutModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-2xs flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-sm overflow-hidden border border-gray-200">
        <div className="p-6 text-center">
          <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-3">
            <LogOut className="w-6 h-6 ml-0.5" />
          </div>
          <h3 className="font-bold text-base text-gray-900 mb-1">
            Sign out of Headway 5e?
          </h3>
          <p className="text-xs text-gray-500 leading-relaxed mb-6">
            All your current practice scores and activity completions are automatically saved to your Oxford account.
          </p>

          <div className="flex items-center justify-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 text-xs font-medium rounded hover:bg-gray-50 cursor-pointer"
            >
              Stay signed in
            </button>
            <button
              onClick={onConfirm}
              className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded cursor-pointer transition-colors shadow-xs"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   5. PRINT PROGRESS REPORT MODAL
   ========================================================================= */
interface PrintModalProps {
  isOpen: boolean;
  onClose: () => void;
  units: Unit[];
  userName: string;
}

export const PrintModal: React.FC<PrintModalProps> = ({
  isOpen,
  onClose,
  units,
  userName,
}) => {
  if (!isOpen) return null;

  const totalDone = units.reduce((acc, u) => acc + u.activitiesDone, 0);
  const totalAct = units.reduce((acc, u) => acc + u.totalActivities, 0);
  const avgScore = Math.round(
    units.reduce((acc, u) => acc + u.score, 0) / (units.filter(u => u.activitiesDone > 0).length || 1)
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-2xs flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl overflow-hidden border border-gray-200 flex flex-col max-h-[90vh]">
        <div className="bg-[#701563] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Printer className="w-5 h-5" />
            <h3 className="font-bold text-sm tracking-tight">Student Practice Report</h3>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded-full cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-5 text-xs text-gray-800" id="printable-report">
          {/* Oxford Header in report */}
          <div className="border-b-2 border-[#701563] pb-4 flex justify-between items-end">
            <div>
              <div className="text-xl font-bold text-[#701563]">Headway 5th Edition</div>
              <div className="text-sm font-semibold text-gray-700">Upper Intermediate Online Practice Report</div>
            </div>
            <div className="text-right text-[11px] text-gray-500">
              <div>Student: <strong>{userName}</strong></div>
              <div>Date: {new Date().toLocaleDateString('en-GB')}</div>
            </div>
          </div>

          {/* Performance Summary Cards */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 bg-gray-50 border rounded text-center">
              <div className="text-[10.5px] text-gray-500">Activities Completed</div>
              <div className="text-base font-bold text-[#701563]">{totalDone} / {totalAct}</div>
            </div>
            <div className="p-3 bg-gray-50 border rounded text-center">
              <div className="text-[10.5px] text-gray-500">Average Score</div>
              <div className="text-base font-bold text-[#701563]">{avgScore}%</div>
            </div>
            <div className="p-3 bg-gray-50 border rounded text-center">
              <div className="text-[10.5px] text-gray-500">Course Level</div>
              <div className="text-base font-bold text-gray-800">Upper Intermediate</div>
            </div>
          </div>

          {/* Units Progress Table */}
          <table className="w-full text-left border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100 text-gray-700 font-semibold border-b border-gray-200">
                <th className="p-2 border-r border-gray-200">Unit</th>
                <th className="p-2 border-r border-gray-200">Title</th>
                <th className="p-2 border-r border-gray-200 text-center">Progress</th>
                <th className="p-2 border-r border-gray-200 text-center">Score</th>
                <th className="p-2 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {units.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50">
                  <td className="p-2 border-r border-gray-200 font-bold">Unit {u.number}</td>
                  <td className="p-2 border-r border-gray-200">{u.title}</td>
                  <td className="p-2 border-r border-gray-200 text-center font-mono">
                    {u.activitiesDone}/{u.totalActivities}
                  </td>
                  <td className="p-2 border-r border-gray-200 text-center font-bold">
                    {u.score}%
                  </td>
                  <td className="p-2 text-center">
                    {u.activitiesDone === u.totalActivities ? (
                      <span className="text-emerald-700 font-semibold">Completed</span>
                    ) : u.activitiesDone > 0 ? (
                      <span className="text-amber-700 font-semibold">In Progress</span>
                    ) : (
                      <span className="text-gray-400">Not Started</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-gray-50 border-t border-gray-200 px-6 py-3 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-gray-600 hover:text-gray-900 cursor-pointer"
          >
            Close
          </button>
          <button
            onClick={() => {
              window.print();
            }}
            className="px-5 py-2 bg-[#701563] hover:bg-[#580e4e] text-white text-xs font-semibold rounded cursor-pointer transition-colors inline-flex items-center gap-2 shadow-xs"
          >
            <Printer className="w-4 h-4" />
            <span>Print Report</span>
          </button>
        </div>
      </div>
    </div>
  );
};
