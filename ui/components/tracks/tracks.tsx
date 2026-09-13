"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Arrow } from "@/ui/components/social-icon/social-icon";
import { studyTracks, type StudyTrack, type TrackIcon } from "./study-tracks";
import "./tracks.scss";

const TRACK_EVENT = "tech-missoes:track";

const glyphs: Record<TrackIcon, ReactNode> = {
  code: <><path d="m15 13-11 11 11 11m18-22 11 11-11 11M28 7l-8 34" /></>,
  ai: <><path d="m24 5 17 10v19L24 44 7 34V15zM7 15l17 10 17-10M24 25v19M24 5v11M7 34l10-6m24 6-10-6" /><circle cx="24" cy="24" r="7" /></>,
  robot: <><rect x="8" y="14" width="32" height="27" rx="3" /><path d="M24 14V7M3 23v10m42-10v10M17 33h14" /><circle cx="24" cy="5" r="2" /><circle cx="17" cy="24" r="2" /><circle cx="31" cy="24" r="2" /></>,
  devops: <path d="M24 24c-4-5.3-8-8-12-8a8 8 0 1 0 0 16c4 0 8-2.7 12-8s8-8 12-8a8 8 0 0 1 0 16c-4 0-8-2.7-12-8" />,
  automation: <><rect x="7" y="8" width="14" height="10" rx="2" /><rect x="27" y="8" width="14" height="10" rx="2" /><rect x="17" y="30" width="14" height="10" rx="2" /><path d="M14 18v4c0 4 4 8 10 8M34 18v4c0 4-4 8-10 8" /></>,
  venture: <><path d="M8 38V16l12 8V10l16 8" /><path d="M8 38h32M16 38V28h8v10" /></>,
};

function TrackIconMark({ kind }: { kind: TrackIcon }) {
  return (
    <svg width="32" height="32" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      {glyphs[kind]}
    </svg>
  );
}

export function TrackCards({ tracks = studyTracks }: { tracks?: StudyTrack[] }) {
  return (
    <div className="track-grid">
      {tracks.map((track, index) => (
        <a
          href="#participe"
          className="track-card"
          key={track.number}
          onClick={() => window.dispatchEvent(new CustomEvent(TRACK_EVENT, { detail: index }))}
        >
          <div className="track-top">
            <TrackIconMark kind={track.icon} />
            <span>{track.number}</span>
          </div>
          <h3>{track.name}</h3>
          <p>{track.description}</p>
          <div className="track-bottom">
            <span>{track.tags}</span>
            <Arrow />
          </div>
        </a>
      ))}
    </div>
  );
}

export function TrackSelector({ tracks = studyTracks }: { tracks?: StudyTrack[] }) {
  const [selectedTrack, setSelectedTrack] = useState(0);

  useEffect(() => {
    const onTrack = (event: Event) => setSelectedTrack((event as CustomEvent<number>).detail);
    window.addEventListener(TRACK_EVENT, onTrack);
    return () => window.removeEventListener(TRACK_EVENT, onTrack);
  }, []);

  const track = tracks[selectedTrack];
  if (!track) return null;

  return (
    <div className="track-selector">
      <label htmlFor="track">O que você quer explorar?</label>
      <select id="track" value={selectedTrack} onChange={event => setSelectedTrack(Number(event.target.value))}>
        {tracks.map((item, index) => (
          <option key={item.number} value={index}>{item.name}</option>
        ))}
      </select>
      <div aria-live="polite" aria-atomic="true">
        <div className="track-plan" key={selectedTrack}>
          <span className="plan-label">SEU PRIMEIRO DESAFIO</span>
          <h3>{track.name}</h3>
          <ol>{track.steps.map(step => <li key={step}>{step}</li>)}</ol>
        </div>
      </div>
      <p className="selector-note">Uma sugestão para começar, no seu ritmo.</p>
    </div>
  );
}
