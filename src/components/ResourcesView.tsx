import React, { useState, useEffect, useRef } from 'react';
import { Menu, ChevronDown, ChevronUp, Play, Pause, Download, Volume2, Video as VideoIcon, FileText, CheckCircle2 } from 'lucide-react';
import { AUDIO_RESOURCES } from '../data/mockData';
import { ResourceUnit } from '../types';

type ResourceSubTab = 'students_audio' | 'workbook_audio' | 'video' | 'other_resources';

export const ResourcesView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ResourceSubTab>('students_audio');
  const [expandedUnitId, setExpandedUnitId] = useState<number | null>(1);

  // Audio player state
  const [currentPlayingTrack, setCurrentPlayingTrack] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  // Synthetic tone generator for audio playback
  const audioCtxRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<number | null>(null);

  const togglePlayTrack = (trackId: string) => {
    if (currentPlayingTrack === trackId && isPlaying) {
      // Pause
      setIsPlaying(false);
      if (intervalRef.current) clearInterval(intervalRef.current);
    } else {
      // Play
      setCurrentPlayingTrack(trackId);
      setIsPlaying(true);
      setProgress(0);

      // Play pleasant audio chord with Web Audio
      try {
        if (!audioCtxRef.current) {
          audioCtxRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        }
        const ctx = audioCtxRef.current;
        if (ctx.state === 'suspended') ctx.resume();

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);
        osc.start();
        osc.stop(ctx.currentTime + 1.2);
      } catch {
        // Fallback
      }

      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = window.setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            if (intervalRef.current) clearInterval(intervalRef.current);
            return 0;
          }
          return prev + 2;
        });
      }, 500);
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const handleDownload = (title: string) => {
    const element = document.createElement('a');
    const file = new Blob([`Oxford Headway 5e Audio Resource: ${title}\n(c) Oxford University Press`], {
      type: 'text/plain',
    });
    element.href = URL.createObjectURL(file);
    element.download = `${title.replace(/\s+/g, '_')}.mp3`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div id="resources-view" className="flex min-h-[calc(100vh-48px)] bg-white">
      {/* Sub-navigation sidebar tabs */}
      <div className="w-52 border-r border-gray-200 p-4 space-y-1 select-none shrink-0 bg-white">
        <button
          id="res-tab-students-audio"
          onClick={() => setActiveTab('students_audio')}
          className={`w-full text-left px-3.5 py-2.5 text-xs font-semibold rounded transition-colors cursor-pointer ${
            activeTab === 'students_audio'
              ? 'bg-[#c6f2ea] text-gray-900 border border-[#ba1376]'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          Student&apos;s Book Audio
        </button>

        <button
          id="res-tab-workbook-audio"
          onClick={() => setActiveTab('workbook_audio')}
          className={`w-full text-left px-3.5 py-2.5 text-xs font-semibold rounded transition-colors cursor-pointer ${
            activeTab === 'workbook_audio'
              ? 'bg-[#c6f2ea] text-gray-900 border border-[#ba1376]'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          Workbook Audio
        </button>

        <button
          id="res-tab-video"
          onClick={() => setActiveTab('video')}
          className={`w-full text-left px-3.5 py-2.5 text-xs font-semibold rounded transition-colors cursor-pointer ${
            activeTab === 'video'
              ? 'bg-[#c6f2ea] text-gray-900 border border-[#ba1376]'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          Video
        </button>

        <button
          id="res-tab-other-resources"
          onClick={() => setActiveTab('other_resources')}
          className={`w-full text-left px-3.5 py-2.5 text-xs font-semibold rounded transition-colors cursor-pointer ${
            activeTab === 'other_resources'
              ? 'bg-[#c6f2ea] text-gray-900 border border-[#ba1376]'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          Other Resources
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6 max-w-4xl overflow-y-auto">
        {/* Section Heading with Hamburger icon */}
        <div className="flex items-center gap-2 text-sm font-semibold text-gray-800 mb-4 select-none">
          <Menu className="w-4 h-4 text-[#ba1376]" />
          <span>
            {activeTab === 'students_audio' && "Student's Book Audio"}
            {activeTab === 'workbook_audio' && 'Workbook Audio'}
            {activeTab === 'video' && 'Headway 5e Classroom Videos'}
            {activeTab === 'other_resources' && 'Teacher & Student Reference Documents'}
          </span>
        </div>

        {/* Audio List (Student's and Workbook) */}
        {(activeTab === 'students_audio' || activeTab === 'workbook_audio') && (
          <div className="space-y-3">
            {AUDIO_RESOURCES.map((unit) => {
              const isExpanded = expandedUnitId === unit.id;
              const unitTitle = activeTab === 'workbook_audio'
                ? unit.title.replace("Student's Book", 'Workbook')
                : unit.title;

              return (
                <div
                  key={unit.id}
                  className="rounded border border-gray-200 bg-white overflow-hidden shadow-2xs"
                >
                  {/* Accordion Header Row */}
                  <div
                    onClick={() => setExpandedUnitId(isExpanded ? null : unit.id)}
                    className="p-3.5 flex items-center justify-between cursor-pointer hover:bg-gray-50/80 transition-colors select-none"
                  >
                    <div className="flex items-center gap-3">
                      {/* Purple circle icon */}
                      <div className="w-6 h-6 rounded-full bg-[#701563] shrink-0" />
                      <span className="text-xs font-semibold text-gray-800">
                        {unitTitle}
                      </span>
                    </div>

                    {/* Circular Chevron Button */}
                    <div className="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors">
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </div>

                  {/* Expanded Audio Tracks List */}
                  {isExpanded && (
                    <div className="border-t border-gray-200 bg-gray-50/50 p-4 divide-y divide-gray-200/80 space-y-3">
                      {unit.tracks.map((track) => {
                        const trackIsPlaying = currentPlayingTrack === track.id && isPlaying;

                        return (
                          <div
                            key={track.id}
                            className="pt-3 first:pt-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                          >
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => togglePlayTrack(track.id)}
                                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-xs ${
                                  trackIsPlaying
                                    ? 'bg-[#701563] text-white ring-2 ring-[#ba1376]'
                                    : 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-300'
                                }`}
                                title={trackIsPlaying ? 'Pause' : 'Play'}
                              >
                                {trackIsPlaying ? (
                                  <Pause className="w-3.5 h-3.5 fill-white" />
                                ) : (
                                  <Play className="w-3.5 h-3.5 fill-gray-700 ml-0.5" />
                                )}
                              </button>

                              <div>
                                <h4 className="text-xs font-semibold text-gray-800">
                                  {track.title}
                                </h4>
                                <div className="text-[11px] text-gray-500 flex items-center gap-2">
                                  <span>Track {track.trackNumber}</span>
                                  <span>•</span>
                                  <span>{track.duration}</span>
                                </div>
                              </div>
                            </div>

                            {/* Player Bar & Download */}
                            <div className="flex items-center gap-3 pl-11 sm:pl-0">
                              {trackIsPlaying && (
                                <div className="w-32 bg-gray-200 rounded-full h-1.5 overflow-hidden">
                                  <div
                                    className="bg-[#ba1376] h-1.5 rounded-full transition-all duration-300"
                                    style={{ width: `${progress}%` }}
                                  />
                                </div>
                              )}

                              <button
                                onClick={() => handleDownload(track.title)}
                                className="inline-flex items-center gap-1 text-[11px] font-semibold text-gray-600 hover:text-[#701563] px-2.5 py-1 rounded bg-white hover:bg-gray-100 border border-gray-200 transition-colors cursor-pointer"
                                title="Download MP3"
                              >
                                <Download className="w-3.5 h-3.5" />
                                <span>MP3</span>
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Video Resources Tab */}
        {activeTab === 'video' && (
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
              <div className="aspect-video bg-black rounded overflow-hidden relative flex items-center justify-center group shadow-md">
                <div className="text-center p-6 text-white">
                  <VideoIcon className="w-12 h-12 mx-auto mb-2 text-[#49c5b6]" />
                  <div className="font-bold text-sm">Unit 1 Documentary: A Global Village</div>
                  <div className="text-xs text-gray-300 mt-1">Multi-ethnic London neighborhoods & community life</div>
                  <button
                    onClick={() => alert('Playing video clip: Headway 5e Unit 1 Video documentary')}
                    className="mt-4 px-4 py-1.5 bg-[#ba1376] hover:bg-[#960f5e] text-white text-xs font-semibold rounded-full inline-flex items-center gap-2 cursor-pointer shadow-sm"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>Watch Video (1080p HD)</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                { title: 'Unit 2 Video: Polar Exploration & Survival', duration: '5:12' },
                { title: 'Unit 3 Video: Everyday Acts of Altruism', duration: '4:45' },
                { title: 'Unit 4 Video: Lie Detection & Psychology', duration: '6:30' },
                { title: 'Unit 5 Video: Smart Cities in 2050', duration: '5:50' },
              ].map((v, i) => (
                <div
                  key={i}
                  onClick={() => alert(`Opening ${v.title}`)}
                  className="p-3 bg-white border border-gray-200 hover:border-[#ba1376] rounded cursor-pointer transition-all flex items-center gap-3"
                >
                  <div className="w-9 h-9 rounded bg-[#701563] text-white flex items-center justify-center shrink-0">
                    <Play className="w-4 h-4 fill-white ml-0.5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-gray-800 line-clamp-1">{v.title}</div>
                    <div className="text-[10.5px] text-gray-500">{v.duration} • With English Subtitles</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Other Resources Tab */}
        {activeTab === 'other_resources' && (
          <div className="space-y-3">
            {[
              { title: 'Upper Intermediate Complete Wordlist (PDF)', size: '2.4 MB', type: 'Vocabulary' },
              { title: 'Grammar Reference & Practice Summary (PDF)', size: '3.1 MB', type: 'Grammar' },
              { title: 'Audio Scripts - Student Book Units 1-12', size: '1.8 MB', type: 'Scripts' },
              { title: 'Irregular Verbs Cheat Sheet (PDF)', size: '420 KB', type: 'Reference' },
            ].map((doc, idx) => (
              <div
                key={idx}
                className="p-4 bg-white border border-gray-200 hover:border-gray-300 rounded flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-[#f7e6f2] text-[#701563] flex items-center justify-center">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-gray-800">{doc.title}</h4>
                    <span className="text-[11px] text-gray-500">{doc.type} • {doc.size}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleDownload(doc.title)}
                  className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded text-xs font-medium inline-flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
