"use client";

import { useState, type CSSProperties } from "react";
import { DeveloperIllustration } from "./developer-illustration";
import { TechDotField } from "./tech-dot-field";
import { TypedLine } from "./typed-line";

const aroundTyped = ["Possibilidades ao redor.", "Ferramentas ao redor.", "Pessoas ao redor."];

const technologies = [
  { name: "TypeScript", context: "Código com tipagem", icon: "typescript", area: "Software", description: "Tipos e ferramentas para escrever código mais claro e manter aplicações com confiança." },
  { name: "React", context: "Interfaces interativas", icon: "reactjs", area: "Software", description: "Interfaces construídas com componentes, estado e experiências interativas para a web." },
  { name: "Node.js", context: "APIs e serviços", icon: "nodejs", area: "Software", description: "JavaScript no servidor para desenvolver APIs, serviços e ferramentas de automação." },
  { name: "Ruby", context: "Código expressivo", icon: "ruby", area: "Software", description: "Uma linguagem com foco na clareza e na produtividade para desenvolver aplicações e automatizar tarefas." },
  { name: "Rails", context: "Aplicações web completas", icon: "ruby-on-rails", area: "Software", description: "Um framework em Ruby que reúne convenções e ferramentas para criar aplicações web, da persistência de dados à interface." },
  { name: "Python", context: "Dados e automação", icon: "python", area: "Inteligência artificial", description: "Uma linguagem para explorar dados, experimentar modelos e automatizar tarefas." },
  { name: "PyTorch", context: "Redes neurais", icon: "pytorch", area: "Inteligência artificial", description: "Experimentos com redes neurais para estudar como os modelos aprendem com os dados." },
  { name: "Arduino", context: "Sensores e protótipos", icon: "arduino", area: "Robótica", description: "Programação e eletrônica para conectar sensores, controlar componentes e criar protótipos." },
  { name: "Raspberry Pi", context: "Projetos conectados", icon: "raspberry-pi", area: "Robótica", description: "Computação em pequenos projetos que conectam software, dispositivos e o mundo físico." },
  { name: "Git", context: "Histórico de alterações", icon: "git", area: "Colaboração", description: "Controle de versão para acompanhar mudanças, experimentar ideias e trabalhar em equipe." },
  { name: "GitHub", context: "Revisão de código", icon: "github", area: "Colaboração", description: "Um espaço para compartilhar projetos, revisar código e contribuir com outras pessoas." },
  { name: "Docker", context: "Ambientes reproduzíveis", icon: "docker", area: "Infraestrutura", description: "Ambientes em contêineres para executar e compartilhar projetos de forma consistente." },
];

const mobilePositions = [[12, 10], [37, 10], [63, 10], [88, 10], [88, 36], [88, 64], [88, 90], [63, 90], [37, 90], [12, 90], [12, 64], [12, 36]];

export function Technologies() {
  const [selected, setSelected] = useState(0);
  const [orbitPaused, setOrbitPaused] = useState(false);
  const technology = technologies[selected];

  return <section className="technologies section" id="tecnologias" aria-labelledby="technologies-title">
    <TechDotField />
    <div className="container">
    <div className="section-heading"><div><span className="eyebrow">02 / TECNOLOGIAS E FERRAMENTAS</span><h2 id="technologies-title">Você no centro.<br /><em><TypedLine inView strings={aroundTyped} /></em></h2></div><p>Da primeira linha de código ao próximo protótipo.<br />Explore as ferramentas que conectam nossas áreas de estudo.</p></div>
    <div className="tech-universe" data-orbit-paused={orbitPaused}>
      <div className="tech-rotor">
      <div className="tech-orbit tech-orbit-outer" aria-hidden="true" /><div className="tech-orbit tech-orbit-inner" aria-hidden="true" />
      <svg className="tech-connections tech-connections-desktop" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">{technologies.map((item, index) => {
        const angle = (index * (360 / technologies.length) - 90) * Math.PI / 180;
        return <line key={item.name} x1="50" y1="50" x2={50 + 37 * Math.cos(angle)} y2={50 + 39 * Math.sin(angle)} className={index === selected ? "active" : ""} />;
      })}</svg>
      <svg className="tech-connections tech-connections-mobile" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">{technologies.map((item, index) => <line key={item.name} x1="50" y1="50" x2={mobilePositions[index][0]} y2={mobilePositions[index][1]} className={index === selected ? "active" : ""} />)}</svg>
      <ul className="tech-nodes" aria-label="Explore as tecnologias">{technologies.map((item, index) => {
        const angle = (index * (360 / technologies.length) - 90) * Math.PI / 180;
        const style = { "--mobile-x": `${mobilePositions[index][0]}%`, "--mobile-y": `${mobilePositions[index][1]}%`, "--node-x": `${50 + 37 * Math.cos(angle)}%`, "--node-y": `${50 + 39 * Math.sin(angle)}%` } as CSSProperties;
        return <li key={item.name} style={style}><button type="button" className={`tech-node${selected === index ? " selected" : ""}`} onClick={() => setSelected(index)} aria-pressed={selected === index} aria-controls="technology-detail"><span className="tech-mark tech-logo-mask" aria-hidden="true" style={{ maskImage: `url(/technologies/monochrome/${item.icon}.svg)` }} /><span>{item.name}</span></button></li>;
      })}</ul>
      </div>
      <div className="tech-dev"><DeveloperIllustration /><strong>Você, dev.</strong><span>APRENDA. CONECTE. CRIE.</span></div>
      <span className="tech-diagram-caption" aria-hidden="true">PESSOAS × CONHECIMENTO × TECNOLOGIA</span>
    </div>
    <div className="orbit-controls"><button type="button" className="orbit-toggle" onClick={() => setOrbitPaused(paused => !paused)} aria-pressed={orbitPaused}><span aria-hidden="true">{orbitPaused ? "▷" : "Ⅱ"}</span>{orbitPaused ? "Retomar rotação" : "Pausar rotação"}</button></div>
    <div className="tech-detail" id="technology-detail" aria-live="polite" aria-atomic="true"><div><span className="eyebrow">{technology.area}</span><h3>{technology.name}</h3></div><p>{technology.description}</p><div className="tech-context"><span className="eyebrow">NA PRÁTICA</span><span>{technology.context}</span></div></div>
    </div>
  </section>;
}
