import "./mission-art.scss";
export function MissionArt({ ids = "home" }: { ids?: string }) {
  const grid = `${ids}-grid`;
  const lines = `${ids}-lines`;
  return (
    <div className="mission-art" aria-label="Ilustração arquitetônica abstrata de um arco missioneiro conectado a circuitos" role="img">
      <div className="art-label"><span>RAÍZES LOCAIS.</span><span>CONEXÕES SEM LIMITES.</span></div>
      <svg viewBox="0 0 600 590" fill="none" aria-hidden="true">
        <defs>
          <pattern id={grid} width="30" height="30" patternUnits="userSpaceOnUse"><path d="M30 0H0v30" stroke="#fff" strokeOpacity=".09" strokeWidth=".6" /></pattern>
          <pattern id={lines} width="7" height="7" patternUnits="userSpaceOnUse"><path d="M0 0v7" stroke="#f0b8ac" strokeOpacity=".5" strokeWidth="1" /></pattern>
        </defs>
        <path fill={`url(#${grid})`} d="M0 0h600v590H0z" />
        <circle cx="308" cy="298" r="210" stroke="#e3a293" strokeOpacity=".3" />
        <circle cx="308" cy="298" r="165" stroke="#e3a293" strokeOpacity=".2" strokeDasharray="3 7" />
        <path d="M54 461h492M308 66v444M62 298h488" stroke="#e4a598" strokeOpacity=".3" strokeDasharray="5 6" />
        <path d="m135 442 66-38V239c0-76 48-126 112-126 23 0 44 6 61 17-31-28-64-42-101-30-83 17-138 75-138 160z" fill="#721b24" stroke="#efa797" />
        <path d="M201 404V246c0-65 43-118 98-118s99 53 99 118v158h-62V250c0-33-17-60-37-60s-37 27-37 60v154z" fill="#e7b0a0" />
        <path d="M201 404V246c0-65 43-118 98-118s99 53 99 118v158h-62V250c0-33-17-60-37-60s-37 27-37 60v154z" fill={`url(#${lines})`} stroke="#ffd5bf" />
        <path d="m398 404 51 30V257c0-58-21-108-64-132l-41-22c35 24 54 69 54 143z" fill="#741c26" stroke="#dc8e82" />
        <path d="m262 404 34 20V252c0-24 6-40 16-47-4-9-9-15-13-15-20 0-37 27-37 60z" fill="#77222b" stroke="#e7ab99" />
        <path d="m135 442 67 38 60-35v-41l-61 35v-35zM336 404v42l62 35 51-30v-17l-51 30z" fill="#cc796e" stroke="#f1b7a5" />
        <path d="m201 439 61-35m136 60v-60M135 442l66 38v-41" stroke="#f9cab4" />
        <g stroke="#e9ad9c" strokeWidth="1.3">
          <path d="M74 184h63l32 32M414 179l37-37h60M449 310h63l27 27v53M99 356h37M296 423v77h93l31 31h71M74 491h80l24-24" />
          <circle cx="70" cy="184" r="4" />
          <circle cx="515" cy="142" r="4" />
          <circle cx="539" cy="394" r="4" />
          <circle cx="95" cy="356" r="4" />
          <circle cx="495" cy="531" r="4" />
          <circle cx="70" cy="491" r="4" />
        </g>
        <g fill="#f4c1ac">
          <path d="M87 104h12v2H87zM92 99h2v12h-2zM488 449h12v2h-12zM493 444h2v12h-2z" />
          <circle cx="461" cy="92" r="3" />
        </g>
        <text x="55" y="551" fill="#efb6a8" fontSize="10" fontFamily="monospace" letterSpacing="2">28°08′ S / 54°44′ W</text>
        <text x="476" y="551" fill="#efb6a8" fontSize="10" fontFamily="monospace">FIG. 001</text>
      </svg>
      <div className="art-caption"><span>DO NOSSO TERRITÓRIO PARA O FUTURO.</span><span>TM — RS</span></div>
    </div>
  );
}
