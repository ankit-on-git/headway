import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopHeader } from './components/TopHeader';
import { HomeView } from './components/HomeView';
import { PracticeView } from './components/PracticeView';
import { ResourcesView } from './components/ResourcesView';
import { AccountView } from './components/AccountView';
import { DictionaryView } from './components/DictionaryView';
import { ActivityModal } from './components/ActivityModal';
import {
  JoinClassModal,
  AddLevelModal,
  HelpModal,
  SignOutModal,
  PrintModal,
} from './components/Modals';
import { INITIAL_ACCOUNT, INITIAL_UNITS } from './data/mockData';
import { Activity, NavigationTab, Unit } from './types';
import { CheckCircle2, LogIn } from 'lucide-react';

export default function App() {
  // Navigation State
  const [currentTab, setCurrentTab] = useState<NavigationTab>('home');
  const [inCourseView, setInCourseView] = useState<boolean>(true);

  // Data States
  const [units, setUnits] = useState<Unit[]>(INITIAL_UNITS);
  const [expandedUnitId, setExpandedUnitId] = useState<number | null>(2); // Unit 2 expanded initially as in Screenshot 3
  const [account, setAccount] = useState(INITIAL_ACCOUNT);

  // Interactive Activity Modal
  const [activePracticeModal, setActivePracticeModal] = useState<{
    unit: Unit;
    activity: Activity;
  } | null>(null);

  // Dialog Modals State
  const [isJoinClassOpen, setIsJoinClassOpen] = useState(false);
  const [isAddLevelOpen, setIsAddLevelOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isSignOutOpen, setIsSignOutOpen] = useState(false);
  const [isPrintOpen, setIsPrintOpen] = useState(false);

  // Banner alerts / feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isSignedOut, setIsSignedOut] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Toggle unit expansion
  const handleToggleUnit = (unitId: number) => {
    setExpandedUnitId((prev) => (prev === unitId ? null : unitId));
  };

  // Select activity from practice list
  const handleSelectActivity = (unit: Unit, activity: Activity) => {
    setActivePracticeModal({ unit, activity });
  };

  // Complete an activity
  const handleCompleteActivity = (activityId: string, score: number) => {
    if (!activePracticeModal) return;
    const unitId = activePracticeModal.unit.id;

    setUnits((prevUnits) =>
      prevUnits.map((unit) => {
        if (unit.id !== unitId) return unit;

        const updatedActivities = unit.activities.map((act) => {
          if (act.id !== activityId) return act;
          return {
            ...act,
            tries: act.tries + 1,
            score: score,
            status: 'done' as const,
          };
        });

        // Recalculate completed count
        const completedCount = updatedActivities.filter(
          (a) => a.status === 'done' || a.status === 'submitted'
        ).length;

        // Recalculate score average
        const scoredActivities = updatedActivities.filter((a) => a.score !== null);
        const avgScore = scoredActivities.length > 0
          ? Math.round(
              scoredActivities.reduce((sum, a) => sum + (a.score || 0), 0) /
                scoredActivities.length
            )
          : unit.score;

        return {
          ...unit,
          activities: updatedActivities,
          activitiesDone: Math.min(unit.totalActivities, completedCount),
          score: avgScore,
          stars: completedCount === unit.totalActivities ? 3 : completedCount > 5 ? 1 : 0,
        };
      })
    );

    showToast(`Activity score of ${score}% saved to Headway 5e gradebook.`);
  };

  // Join Class Handler
  const handleJoinClassSuccess = (code: string) => {
    showToast(`Successfully enrolled in class ${code.toUpperCase()}! Your teacher can now review your assignments.`);
  };

  // Add Level Handler
  const handleAddLevelSuccess = (levelName: string) => {
    showToast(`Level "${levelName}" successfully unlocked!`);
  };

  // Update Account
  const handleUpdateAccount = (updated: Partial<typeof account>) => {
    setAccount((prev) => ({ ...prev, ...updated }));
  };

  // Sign out
  const handleSignOutConfirm = () => {
    setIsSignOutOpen(false);
    setIsSignedOut(true);
  };

  if (isSignedOut) {
    return (
      <div className="min-h-screen bg-[#1e1e1e] flex items-center justify-center p-4">
        <div className="bg-white rounded-lg p-8 max-w-md w-full text-center shadow-2xl">
          <div className="w-14 h-14 bg-[#701563] text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
            H5e
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">You have signed out</h2>
          <p className="text-xs text-gray-600 mb-6">
            Thank you for practicing with Headway 5th Edition Oxford Online Practice.
          </p>
          <button
            onClick={() => setIsSignedOut(false)}
            className="w-full py-2.5 bg-[#701563] hover:bg-[#590f4e] text-white text-xs font-semibold rounded cursor-pointer transition-colors inline-flex items-center justify-center gap-2"
          >
            <LogIn className="w-4 h-4" />
            <span>Sign back into {account.fullName}</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-[#f7f7f7] font-sans antialiased text-gray-900 overflow-x-hidden">
      {/* Left Charcoal Sidebar */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          if (tab === 'practice' || tab === 'resources' || tab === 'dictionary') {
            setInCourseView(true);
          }
        }}
        onOpenHelp={() => setIsHelpOpen(true)}
        onSignOut={() => setIsSignOutOpen(true)}
        inCourseView={inCourseView}
      />

      {/* Main Content Column */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top White Header Bar */}
        <TopHeader
          currentTab={currentTab}
          onAddLevel={() => setIsAddLevelOpen(true)}
          onPrint={() => setIsPrintOpen(true)}
        />

        {/* Global Action Toast Notification */}
        {toastMessage && (
          <div className="fixed top-14 right-6 z-40 bg-gray-900 text-white text-xs px-4 py-2.5 rounded shadow-lg flex items-center gap-2 border border-gray-700 animate-in fade-in duration-200">
            <CheckCircle2 className="w-4 h-4 text-[#49c5b6] shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Screen Views */}
        <main className="flex-1 overflow-y-auto">
          {currentTab === 'home' && (
            <HomeView
              onGoToPractice={() => {
                setInCourseView(true);
                setCurrentTab('practice');
              }}
              onJoinClass={() => setIsJoinClassOpen(true)}
              onAddLevel={() => setIsAddLevelOpen(true)}
            />
          )}

          {currentTab === 'practice' && (
            <PracticeView
              units={units}
              expandedUnitId={expandedUnitId}
              onToggleUnit={handleToggleUnit}
              onSelectActivity={handleSelectActivity}
              onPrint={() => setIsPrintOpen(true)}
            />
          )}

          {currentTab === 'resources' && <ResourcesView />}

          {currentTab === 'account' && (
            <AccountView
              account={account}
              onUpdateAccount={handleUpdateAccount}
            />
          )}

          {currentTab === 'dictionary' && <DictionaryView />}
        </main>
      </div>

      {/* Interactive Activity Practice Modal */}
      {activePracticeModal && (
        <ActivityModal
          activity={activePracticeModal.activity}
          unitTitle={activePracticeModal.unit.title}
          unitNumber={activePracticeModal.unit.number}
          onClose={() => setActivePracticeModal(null)}
          onComplete={handleCompleteActivity}
        />
      )}

      {/* Join Class Modal */}
      <JoinClassModal
        isOpen={isJoinClassOpen}
        onClose={() => setIsJoinClassOpen(false)}
        onSuccess={handleJoinClassSuccess}
      />

      {/* Add Level Modal */}
      <AddLevelModal
        isOpen={isAddLevelOpen}
        onClose={() => setIsAddLevelOpen(false)}
        onSuccess={handleAddLevelSuccess}
      />

      {/* Help Modal */}
      <HelpModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />

      {/* Sign Out Modal */}
      <SignOutModal
        isOpen={isSignOutOpen}
        onClose={() => setIsSignOutOpen(false)}
        onConfirm={handleSignOutConfirm}
      />

      {/* Print Progress Modal */}
      <PrintModal
        isOpen={isPrintOpen}
        onClose={() => setIsPrintOpen(false)}
        units={units}
        userName={account.fullName}
      />
    </div>
  );
}
