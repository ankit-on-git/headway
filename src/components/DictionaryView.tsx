import React, { useState } from 'react';
import { Search, Volume2, BookOpen } from 'lucide-react';
import { DICTIONARY_ENTRIES } from '../data/mockData';

export const DictionaryView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  const speakWord = (word: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = 'en-GB'; // British English for Oxford
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const filteredEntries = DICTIONARY_ENTRIES.filter((entry) => {
    const matchesSearch = entry.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.definition.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLetter = selectedLetter
      ? entry.word.toUpperCase().startsWith(selectedLetter)
      : true;
    return matchesSearch && matchesLetter;
  });

  return (
    <div id="dictionary-view" className="p-8 max-w-4xl mx-auto">
      {/* Top Search Bar */}
      <div className="relative mb-6">
        <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search Headway 5e Dictionary & Vocabulary..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-11 pr-4 py-3 bg-white border border-gray-300 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-[#701563] focus:ring-1 focus:ring-[#701563] shadow-xs"
        />
      </div>

      {/* A-Z Filter Alphabet Bar */}
      <div className="flex flex-wrap gap-1 mb-6 pb-2 border-b border-gray-200">
        <button
          onClick={() => setSelectedLetter(null)}
          className={`px-2.5 py-1 text-xs font-semibold rounded cursor-pointer transition-colors ${
            selectedLetter === null
              ? 'bg-[#701563] text-white'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          All
        </button>
        {alphabet.map((letter) => (
          <button
            key={letter}
            onClick={() => setSelectedLetter(selectedLetter === letter ? null : letter)}
            className={`w-7 h-7 flex items-center justify-center text-xs font-semibold rounded cursor-pointer transition-colors ${
              selectedLetter === letter
                ? 'bg-[#701563] text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {letter}
          </button>
        ))}
      </div>

      {/* Word Entries List */}
      <div className="space-y-4">
        {filteredEntries.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <BookOpen className="w-10 h-10 mx-auto mb-2 text-gray-300" />
            <p className="text-sm">No dictionary words found matching your query.</p>
          </div>
        ) : (
          filteredEntries.map((entry) => (
            <div
              key={entry.id}
              className="bg-white border border-gray-200 rounded-lg p-5 shadow-2xs hover:border-gray-300 transition-all"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-baseline gap-3 flex-wrap">
                  <h3 className="text-base font-bold text-[#701563]">
                    {entry.word}
                  </h3>
                  <span className="text-xs text-gray-500 font-mono">
                    {entry.phonetic}
                  </span>
                  <span className="text-[11px] font-semibold text-gray-500 italic bg-gray-100 px-2 py-0.5 rounded">
                    {entry.partOfSpeech}
                  </span>
                </div>

                {/* Pronounce Button */}
                <button
                  onClick={() => speakWord(entry.word)}
                  className="p-1.5 rounded-full hover:bg-gray-100 text-gray-600 hover:text-[#701563] transition-colors cursor-pointer"
                  title="Listen to British English pronunciation"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>

              <p className="text-xs text-gray-700 leading-relaxed mb-3">
                {entry.definition}
              </p>

              <div className="bg-gray-50 rounded p-3 text-xs text-gray-600 border-l-2 border-[#701563]">
                <strong className="text-gray-800">Example: </strong>
                <span>&ldquo;{entry.example}&rdquo;</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
