import data from "./tracks.json";

export const TRACK_ICONS = ["code", "ai", "robot", "devops", "automation", "venture"] as const;
export type TrackIcon = (typeof TRACK_ICONS)[number];

export type StudyTrack = {
  number: string;
  name: string;
  description: string;
  tags: string;
  icon: TrackIcon;
  steps: string[];
};

export const studyTracks = data.tracks as StudyTrack[];
