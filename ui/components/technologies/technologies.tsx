"use client";

import { useState, type CSSProperties } from "react";
import { Lines } from "@/ui/components/lines/lines";
import { SectionHeading } from "@/ui/components/section-heading/section-heading";
import { TypedLine } from "@/ui/components/typed-line/typed-line";
import { DeveloperIllustration } from "./developer-illustration";
import { TechDotField } from "./tech-dot-field";
import { techMobilePositions, technologies, technologiesCopy } from "./tech";
import "./technologies.scss";

function orbitPoint(index: number, total: number) {
  const angle = ((index * 360) / total - 90) * (Math.PI / 180);
  return {
    x: 50 + 37 * Math.cos(angle),
    y: 50 + 39 * Math.sin(angle),
  };
}

export function Technologies() {
  const [selected, setSelected] = useState(0);
  const [orbitPaused, setOrbitPaused] = useState(false);
  const technology = technologies[selected];
  const total = technologies.length;
  const copy = technologiesCopy;

  function nodeStyle(index: number): CSSProperties {
    const orbit = orbitPoint(index, total);
    const [mobileX, mobileY] = techMobilePositions[index] ?? [50, 50];
    return {
      "--mobile-x": `${mobileX}%`,
      "--mobile-y": `${mobileY}%`,
      "--node-x": `${orbit.x}%`,
      "--node-y": `${orbit.y}%`,
    } as CSSProperties;
  }

  return (
    <section className="technologies section" id="tecnologias" aria-labelledby="technologies-title">
      <TechDotField />
      <div className="container">
        <SectionHeading
          eyebrow={copy.eyebrow}
          titleId="technologies-title"
          title={<>{copy.title}<br /><em><TypedLine inView strings={copy.typed} /></em></>}
        >
          <Lines text={copy.lead} />
        </SectionHeading>
        <div className="tech-universe" data-orbit-paused={orbitPaused}>
          <div className="tech-rotor">
            <div className="tech-orbit tech-orbit-outer" aria-hidden="true" />
            <div className="tech-orbit tech-orbit-inner" aria-hidden="true" />
            <svg className="tech-connections tech-connections-desktop" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              {technologies.map((item, index) => {
                const orbit = orbitPoint(index, total);
                return <line key={item.name} x1="50" y1="50" x2={orbit.x} y2={orbit.y} className={index === selected ? "active" : ""} />;
              })}
            </svg>
            <svg className="tech-connections tech-connections-mobile" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              {technologies.map((item, index) => (
                <line key={item.name} x1="50" y1="50" x2={techMobilePositions[index]?.[0]} y2={techMobilePositions[index]?.[1]} className={index === selected ? "active" : ""} />
              ))}
            </svg>
            <ul className="tech-nodes" aria-label="Explore as tecnologias">
              {technologies.map((item, index) => (
                <li key={item.name} style={nodeStyle(index)}>
                  <button
                    type="button"
                    className={selected === index ? "tech-node selected" : "tech-node"}
                    onClick={() => setSelected(index)}
                    aria-pressed={selected === index}
                    aria-controls="technology-detail"
                  >
                    <span className="tech-mark tech-logo-mask" aria-hidden="true" style={{ maskImage: `url(/technologies/monochrome/${item.icon}.svg)` }} />
                    <span>{item.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="tech-dev">
            <DeveloperIllustration />
            <strong>Você, dev.</strong>
            <span>APRENDA. CONECTE. CRIE.</span>
          </div>
          <span className="tech-diagram-caption" aria-hidden="true">PESSOAS × CONHECIMENTO × TECNOLOGIA</span>
        </div>
        <div className="orbit-controls">
          <button
            type="button"
            className="orbit-toggle"
            onClick={() => setOrbitPaused(paused => !paused)}
            aria-pressed={orbitPaused}
          >
            <span aria-hidden="true">{orbitPaused ? "▷" : "Ⅱ"}</span>
            {orbitPaused ? "Retomar rotação" : "Pausar rotação"}
          </button>
        </div>
        {technology ? (
          <div className="tech-detail" id="technology-detail" aria-live="polite" aria-atomic="true">
            <div>
              <span className="eyebrow">{technology.area}</span>
              <h3>{technology.name}</h3>
            </div>
            <p>{technology.description}</p>
            <div className="tech-context">
              <span className="eyebrow">NA PRÁTICA</span>
              <span>{technology.context}</span>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
