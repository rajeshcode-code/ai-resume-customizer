export interface ExperienceItem {
  company: string;
  role: string;
  duration: string;
  bullets: string[];
}

export interface ResumeOutput {
  summary: string;
  skills: string[];
  experience: ExperienceItem[];
  missing_keywords: string[];
}

export interface CustomizationResponse {
  match_score: number;
  ats_score: number;
  conservative_version: ResumeOutput;
  aggressive_version: ResumeOutput;
  cover_letter: string;
}