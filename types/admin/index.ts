// Firestore document types - matching actual seeded data schema

export interface VisualizationTemplate {
  id: string;
  title: string;
  description: string;
  category: string;
  supportedSports: string[];
  durationMinutes: number;
  difficultyLevel: 'beginner' | 'intermediate' | 'advanced';
  placeholders: string[];
  scriptText: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface BreathworkTechnique {
  id: string;
  slug: string;
  name: string;
  purpose: string;
  category: string;
  steps: string[];  // Array of instruction strings
  whenToUse: string[];
  durationRounds: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface AomiLoop {
  loopNumber: number;
  loopName: string;
  observationFocus: string;
  imageryFocus: string;
  observationDurationSeconds: number;
  imageryDurationSeconds: number;
}

export interface AomiTechnique {
  id: string;
  slug: string;
  name: string;
  sport: string;
  purpose: string;
  benefits: string[];
  whenToUse: string[];
  videoGuidance: string;
  durationMinutes: number;
  difficultyLevel: 'beginner' | 'intermediate' | 'advanced';
  isActive: boolean;
  loops: AomiLoop[];
  createdAt: Date;
  updatedAt: Date;
}

export type ContentType = 'visualizations' | 'breathwork' | 'aomi';
