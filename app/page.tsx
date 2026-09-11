"use client";

import { useState } from "react";
import { Breadcrumb } from "./breadcrumb";
import { PageMotion } from "./page-motion";
import { Technologies } from "./technologies";
import { StarterKit } from "./starter-kit";
import { SiteHeader } from "./site-header";
import { CommunityChat } from "./community-chat";
import { communityLinks } from "./community-links";
import { MissionArt } from "./mission-art";
import { TypedLine } from "./typed-line";

const heroTyped = ["o futuro.", "software.", "inteligência.", "robótica.", "comunidade."];
const locationTyped = [
  "CONHECIMENTO QUE CONECTA. TECNOLOGIA QUE TRANSFORMA.",
  "APRENDER COM PROFUNDIDADE. CONSTRUIR NA PRÁTICA.",
  "RAÍZES LOCAIS. CONEXÕES SEM LIMITES.",
];
const areasTyped = ["Infinitas conexões.", "Três trilhas abertas.", "Mãos na massa."];
const communityTyped = ["futuro.", "código.", "território."];
const howTyped = ["Aprender. Fazer. Compartilhar."];
const joinTyped = ["o único pré-requisito.", "o primeiro passo.", "o que nos une."];
const membershipTyped = ["comunidade.", "conversa.", "construção."];
const captionTyped = ["APRENDER É MELHOR QUANDO A GENTE SE CONECTA.", "A CONVERSA COMEÇA NO WHATSAPP.", "DE CERRO LARGO PARA TODAS AS POSSIBILIDADES."];
const footerTyped = ["Conhecimento compartilhado.", "Futuro construído em comunidade."];
const principles = [
  ["Aprender com profundidade."],
  ["Construir na prática."],
  ["Evoluir em comunidade."],
];

const tracks = [
  { number: "01", name: "Engenharia de software", short: "Software", description: "Mais do que escrever código. Entender sistemas, compartilhar boas práticas e construir software que faz a diferença.", tags: "ARQUITETURA · OPEN SOURCE · DESENVOLVIMENTO", icon: "code", steps: ["Explore lógica de programação e controle de versão com Git.", "Construa uma aplicação para um problema da sua comunidade.", "Documente suas decisões e convide alguém para revisar o código."] },
  { number: "02", name: "Inteligência artificial", short: "Inteligência artificial", description: "Da curiosidade à aplicação. Investigar dados, entender modelos e experimentar novas possibilidades com responsabilidade.", tags: "MACHINE LEARNING · DADOS · IA APLICADA", icon: "ai", steps: ["Pratique Python explorando pequenos conjuntos de dados.", "Experimente um modelo simples e compare seus resultados.", "Compartilhe o experimento, suas limitações e o que aprendeu."] },
  { number: "03", name: "Robótica", short: "Robótica", description: "Ideias que ganham movimento. Conectar programação, eletrônica e criatividade para interagir com o mundo real.", tags: "ELETRÔNICA · AUTOMAÇÃO · PROTOTIPAGEM", icon: "robot", steps: ["Conheça circuitos, sensores e microcontroladores em um simulador.", "Programe um protótipo que responda a uma leitura de sensor.", "Registre o circuito e o código para que outras pessoas possam reproduzir o projeto."] },
];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function SocialIcon({ name }: { name: string }) {
  return <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {name === "Facebook" && <path d="M14 21v-8h3l.5-4H14V7c0-1 .5-2 2-2h2V2h-3c-3 0-5 2-5 5v2H7v4h3v8" />}
    {name === "Instagram" && <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none" /></>}
    {name === "YouTube" && <><rect x="2" y="5" width="20" height="14" rx="4" /><path d="m10 9 5 3-5 3z" /></>}
    {name === "TikTok" && <path d="M14 3v12a4 4 0 1 1-4-4v3a1 1 0 1 0 1 1V3h3c.5 3 2 4 5 4v3c-2 0-4-1-5-2" />}
    {name === "WhatsApp" && <><path d="M21 11.5a9 9 0 0 1-13.4 7.8L3 21l1.6-4.6A9 9 0 1 1 21 11.5Z" /><path d="m8 7-1 2c1 4 3 6 7 7l2-1-2-3-2 1-2-2 1-2z" /></>}
  </svg>;
}

const socialProfiles = [
  { name: "Facebook", href: communityLinks.facebook },
  { name: "Instagram", href: communityLinks.instagram },
  { name: "YouTube", href: communityLinks.youtube },
  { name: "TikTok", href: communityLinks.tiktok },
];

function Mark() {
  return <svg viewBox="0 0 46 42" fill="currentColor" aria-hidden="true"><path d="M0 0h27v8h-9v34H9V8H0zM23 13h8v29h-8zM35 0h9v42h-9z" /></svg>;
}

function TrackIcon({ kind }: { kind: string }) {
  return <svg width="42" height="42" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">{kind === "code" ? <><path d="m15 13-11 11 11 11m18-22 11 11-11 11M28 7l-8 34" /></> : kind === "ai" ? <><path d="m24 5 17 10v19L24 44 7 34V15zM7 15l17 10 17-10M24 25v19M24 5v11M7 34l10-6m24 6-10-6" /><circle cx="24" cy="24" r="7" /></> : <><rect x="8" y="14" width="32" height="27" rx="3" /><path d="M24 14V7M3 23v10m42-10v10M17 33h14" /><circle cx="24" cy="5" r="2" /><circle cx="17" cy="24" r="2" /><circle cx="31" cy="24" r="2" /></>}</svg>;
}

export default function Home() {
  const [selectedTrack, setSelectedTrack] = useState(0);
  return <>
    <PageMotion />
    <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
    <div className="location-bar"><div className="container"><span><span className="location-dot" />CERRO LARGO, RS · REGIÃO DAS MISSÕES</span><span aria-hidden="true"><TypedLine strings={locationTyped} typeSpeed={28} /></span></div></div>
    <div className="site-header">
    <SiteHeader />
    <Breadcrumb />
    </div>
    <main id="conteudo">
      <section className="hero container" id="inicio">
        <div className="hero-copy"><div className="eyebrow"><span className="red-line" /> UMA COMUNIDADE. MUITAS POSSIBILIDADES.</div><h1><span className="hero-title-line"><em>Juntos,</em> construímos</span><br /><span className="sr-only">o futuro.</span><span className="hero-typed" aria-hidden="true"><TypedLine strings={heroTyped} /></span></h1><p>Somos a Tech Missões. Uma comunidade de estudo e desenvolvimento que conecta pessoas para aprender, criar e transformar a nossa região por meio da tecnologia.</p><div className="hero-actions"><a className="button button-red" href="#faca-parte">Faça parte da comunidade <Arrow /></a><a className="text-link" href="#comunidade">Conheça a comunidade <span aria-hidden="true">↓</span></a></div><div className="hero-footnote"><span className="small-cross">+</span> De Cerro Largo para todas as possibilidades.</div></div>
        <MissionArt />
      </section>
      <div className="principles container"><span>MENTES CURIOSAS.<br /><strong>PROPÓSITO EM COMUM.</strong></span><p><TypedLine inView loop={false} strings={principles[0]} /></p><span className="principle-star">✳</span><p><TypedLine inView loop={false} strings={principles[1]} /></p><span className="principle-star">✳</span><p><TypedLine inView loop={false} strings={principles[2]} /></p></div>
      <section className="areas section container" id="areas"><div className="section-heading"><div><span className="eyebrow">01 / NOSSAS ÁREAS DE ESTUDO</span><h2>Três caminhos.<br /><TypedLine inView strings={areasTyped} /></h2></div><p>Exploramos as tecnologias que movem o mundo.<br />Com fundamentos sólidos e mãos na massa.</p></div><div className="track-grid">{tracks.map((track, index) => <a href="#participe" className="track-card" key={track.number} onClick={() => setSelectedTrack(index)}><div className="track-top"><TrackIcon kind={track.icon} /><span>{track.number}</span></div><h3>{track.name}</h3><p>{track.description}</p><div className="track-bottom"><span>{track.tags}</span><Arrow /></div></a>)}</div></section>
      <Technologies />
      <section className="community" id="comunidade"><div className="container community-inner"><div><span className="eyebrow">03 / A NOSSA ESSÊNCIA</span><h2>Raízes nas Missões.<br />Olhar para o <em><TypedLine inView strings={communityTyped} /></em></h2></div><div><p className="community-lead">Grandes ideias também nascem<br />fora dos grandes centros.</p><p>A Tech Missões nasce em Cerro Largo com uma convicção: conhecimento cresce quando é compartilhado. Queremos aproximar quem está começando de quem já tem experiência, unindo diferentes perspectivas em torno de desafios reais.</p><p>Um espaço para perguntar, experimentar e construir. Porque o próximo passo da nossa região pode começar com uma conversa, uma linha de código ou uma ideia sua.</p><span className="community-location"><span className="location-dot" /> CERRO LARGO · RIO GRANDE DO SUL · BRASIL</span></div></div></section>
      <section className="section container how" id="como-funciona"><div className="section-heading"><div><span className="eyebrow">04 / DO CONHECIMENTO À PRÁTICA</span><h2><TypedLine inView loop={false} strings={howTyped} /></h2></div><p>Uma comunidade se constrói com participação.<br />Cada pessoa tem algo a aprender e a ensinar.</p></div><div className="how-grid">{[{ title: "Estudamos juntos", text: "Grupos de estudo para aprofundar fundamentos, discutir referências e trocar descobertas em cada área." }, { title: "Tiramos ideias do papel", text: "Projetos colaborativos para experimentar tecnologias e desenvolver soluções conectadas à nossa realidade." }, { title: "Compartilhamos o caminho", text: "Trocas de experiências, demonstrações e conversas abertas. O aprendizado de uma pessoa abre portas para outras." }].map((item, i) => <div className="how-step" key={item.title}><span className="step-number">0{i + 1}</span><h3>{item.title}</h3><p>{item.text}</p></div>)}</div></section>
      <section className="join container" id="participe"><div className="join-copy"><span className="eyebrow">05 / O SEU PONTO DE PARTIDA</span><h2>Curiosidade é<br /><TypedLine inView strings={joinTyped} /></h2><p>Iniciante, estudante ou profissional: existe espaço para você. Escolha uma área e descubra um primeiro caminho para colocar seu conhecimento em movimento.</p><span className="join-note">Diferentes trajetórias. A mesma vontade de aprender.</span></div><div className="track-selector"><label htmlFor="track">O que você quer explorar?</label><select id="track" value={selectedTrack} onChange={event => setSelectedTrack(Number(event.target.value))}>{tracks.map((track, i) => <option key={track.number} value={i}>{track.name}</option>)}</select><div aria-live="polite" aria-atomic="true"><div className="track-plan" key={selectedTrack}><span className="plan-label">SEU PRIMEIRO DESAFIO</span><h3>{tracks[selectedTrack].name}</h3><ol>{tracks[selectedTrack].steps.map(step => <li key={step}>{step}</li>)}</ol></div></div><p className="selector-note">Uma sugestão para começar, no seu ritmo.</p></div></section>
      <section className="membership container" id="faca-parte" aria-labelledby="membership-title">
        <div className="membership-copy">
          <span className="eyebrow">06 / A PRÓXIMA CONEXÃO É COM VOCÊ</span>
          <h2 id="membership-title">Faça parte da<br /><em><TypedLine inView strings={membershipTyped} /></em></h2>
          <p>Todo mundo tem algo a compartilhar. Traga suas dúvidas, suas ideias e sua vontade de aprender. Vamos construir o próximo capítulo da Tech Missões juntos.</p>
        </div>
        <div className="membership-invite">
          <span className="whatsapp-icon"><SocialIcon name="WhatsApp" /></span>
          <h3>A conversa começa no WhatsApp.</h3>
          <p>Conecte-se com pessoas da região, troque referências e encontre companhia para estudar e desenvolver projetos.</p>
          {communityLinks.whatsapp ? <a className="button button-red" href={communityLinks.whatsapp} target="_blank" rel="noopener noreferrer">Entrar no grupo do WhatsApp <Arrow /></a> : <><button className="button button-red" disabled>Entrar no grupo do WhatsApp <Arrow /></button><p className="membership-pending">O convite para o grupo estará disponível em breve.</p></>}
          <span className="membership-caption"><TypedLine inView strings={captionTyped} typeSpeed={24} /></span>
        </div>
      </section>
      <StarterKit />
    </main>
    <footer className="container footer"><a className="brand" href="#inicio" aria-label="Tech Missões, voltar ao início"><Mark /><span>tech<span>missões<span className="brand-period">.</span></span></span></a><p><TypedLine inView strings={footerTyped} /></p><nav className="social-links" aria-label="Redes sociais da Tech Missões">{socialProfiles.map(profile => profile.href ? <a key={profile.name} href={profile.href} target="_blank" rel="noopener noreferrer" title={profile.name} aria-label={`${profile.name} da Tech Missões (abre em nova aba)`}><SocialIcon name={profile.name} /></a> : <button type="button" className="social-pending" key={profile.name} aria-disabled="true" aria-label={`${profile.name}: em breve`} title={`${profile.name} — em breve`}><SocialIcon name={profile.name} /></button>)}</nav><div><span>TECH MISSÕES © {new Date().getFullYear()}</span><a href="#inicio">Feito de pessoas e possibilidades. <span aria-hidden="true">↑</span></a></div></footer>
    <CommunityChat />
  </>;
}
