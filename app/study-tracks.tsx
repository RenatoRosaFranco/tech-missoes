"use client";

import { useEffect, useState } from "react";
import { TRACK_EVENT, studyTracks } from "@/lib/study-tracks";

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function TrackIcon({ kind }: { kind: string }) {
  return <svg width="42" height="42" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">{kind === "code" ? <><path d="m15 13-11 11 11 11m18-22 11 11-11 11M28 7l-8 34" /></> : kind === "ai" ? <><path d="m24 5 17 10v19L24 44 7 34V15zM7 15l17 10 17-10M24 25v19M24 5v11M7 34l10-6m24 6-10-6" /><circle cx="24" cy="24" r="7" /></> : <><rect x="8" y="14" width="32" height="27" rx="3" /><path d="M24 14V7M3 23v10m42-10v10M17 33h14" /><circle cx="24" cy="5" r="2" /><circle cx="17" cy="24" r="2" /><circle cx="31" cy="24" r="2" /></>}</svg>;
}

export function TrackCards() {
  return (
    <div className="track-grid">
      {studyTracks.map((track, index) => (
        <a
          href="#participe"
          className="track-card"
          key={track.number}
          onClick={() => window.dispatchEvent(new CustomEvent(TRACK_EVENT, { detail: index }))}
        >
          <div className="track-top"><TrackIcon kind={track.icon} /><span>{track.number}</span></div>
          <h3>{track.name}</h3>
          <p>{track.description}</p>
          <div className="track-bottom"><span>{track.tags}</span><Arrow /></div>
        </a>
      ))}
    </div>
  );
}

export function TrackSelector() {
  const [selectedTrack, setSelectedTrack] = useState(0);

  useEffect(() => {
    const onTrack = (event: Event) => setSelectedTrack((event as CustomEvent<number>).detail);
    window.addEventListener(TRACK_EVENT, onTrack);
    return () => window.removeEventListener(TRACK_EVENT, onTrack);
  }, []);

  const track = studyTracks[selectedTrack];

  return (
    <div className="track-selector">
      <label htmlFor="track">O que você quer explorar?</label>
      <select id="track" value={selectedTrack} onChange={event => setSelectedTrack(Number(event.target.value))}>
        {studyTracks.map((item, index) => <option key={item.number} value={index}>{item.name}</option>)}
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
