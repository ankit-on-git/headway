export type NavigationTab = 'home' | 'practice' | 'resources' | 'dictionary' | 'account';

export type ActivityCategory =
  | 'Grammar Tutor'
  | 'Vocabulary'
  | 'Everyday English'
  | 'Video'
  | 'Reading'
  | 'Listening'
  | 'Speaking'
  | 'Writing'
  | 'Check your progress';

export interface Question {
  id: string;
  prompt: string;
  type: 'multiple_choice' | 'fill_in' | 'select';
  options?: string[];
  correctAnswer: string;
  explanation?: string;
}

export interface Activity {
  id: string;
  title: string;
  category: ActivityCategory;
  section: 'look_again' | 'practice' | 'check_your_progress';
  tries: number;
  score: number | null; // e.g., 88, 100, or null
  status: 'done' | 'submitted' | 'pending';
  questions?: Question[];
}

export interface Unit {
  id: number;
  number: number;
  title: string;
  activitiesDone: number;
  totalActivities: number;
  score: number;
  stars: number;
  activities: Activity[];
}

export interface AccountInfo {
  fullName: string;
  username: string;
  email: string;
  country: string;
}

export interface AudioTrack {
  id: string;
  trackNumber: string;
  title: string;
  duration: string;
}

export interface ResourceUnit {
  id: number;
  unitNumber: number;
  title: string;
  tracks: AudioTrack[];
}

export interface DictionaryEntry {
  id: string;
  word: string;
  phonetic: string;
  partOfSpeech: string;
  definition: string;
  example: string;
}
