import { communityLinks, starterKit } from "@/app/community-links";
import { siteJsonLd } from "@/lib/site-json-ld";
import { studyTracks } from "@/lib/study-tracks";
import {
  getSiteUrl,
  googleAnalyticsId,
  googleSiteVerification,
  siteDescription,
  siteName,
  siteTitle,
} from "@/lib/site";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const technologies = [
  { name: "TypeScript", area: "Software" },
  { name: "React", area: "Software" },
  { name: "Node.js", area: "Software" },
  { name: "Ruby", area: "Software" },
  { name: "Rails", area: "Software" },
  { name: "Python", area: "Inteligência artificial" },
  { name: "PyTorch", area: "Inteligência artificial" },
  { name: "Arduino", area: "Robótica" },
  { name: "Raspberry Pi", area: "Robótica" },
  { name: "Git", area: "Colaboração" },
  { name: "GitHub", area: "Colaboração" },
  { name: "Docker", area: "Infraestrutura" },
];

const howSteps = [
  { title: "Estudamos juntos", text: "Grupos de estudo para aprofundar fundamentos, discutir referências e trocar descobertas em cada área." },
  { title: "Tiramos ideias do papel", text: "Projetos colaborativos para experimentar tecnologias e desenvolver soluções conectadas à nossa realidade." },
  { title: "Compartilhamos o caminho", text: "Trocas de experiências, demonstrações e conversas abertas. O aprendizado de uma pessoa abre portas para outras." },
];

const kitProducts = [
  { src: "/illustrations/mousepad.png", title: "Mousepad com guia de consulta", text: "Seu espaço de trabalho com referências de programação sempre à mão.", alt: "Mousepad vermelho da Tech Missões com a marca da comunidade e um guia de consulta de programação e ferramentas." },
  { src: "/illustrations/camisa.png", title: "Camiseta da comunidade", text: "Vista a Tech Missões e leve o espírito da comunidade para onde você for.", alt: "Frente e costas da camiseta vermelha da Tech Missões, com a marca da comunidade e o slogan Juntos, construímos o futuro." },
  { src: "/illustrations/copo.png", title: "Copo personalizado", text: "Uma companhia para as pausas, as conversas e as próximas linhas de código.", alt: "Duas vistas do copo vermelho personalizado da Tech Missões, com tampa, marca da comunidade e o slogan Juntos, construímos o futuro." },
];

const ampCss = `
:root{--bg:#faf9f6;--fg:#252623;--red:#9b2635;--muted:#65665f;--border:#deded6;--surface:#eaece5}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--fg);font-family:Arial,Helvetica,sans-serif;line-height:1.45}
a{color:inherit;text-decoration:none}
h1,h2,h3,p,ul,ol,figure{margin:0}
.wrap{width:calc(100% - 40px);max-width:720px;margin-inline:auto}
.bar{background:#eee;color:#292a27;font-family:monospace;font-size:10px;letter-spacing:1.1px;padding:10px 0}
.dot{display:inline-block;width:6px;height:6px;background:#ca6f6d;border-radius:50%;margin-right:8px;vertical-align:middle}
header{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:18px 0;border-bottom:1px solid var(--border)}
.brand{display:flex;gap:10px;align-items:center;font-weight:800;letter-spacing:-1px;line-height:.92;font-size:22px}
.brand svg{width:36px;height:34px;fill:var(--red)}
.brand b{display:block;font-weight:800}
.period{color:var(--red)}
.menu{border:1px solid var(--red);background:transparent;color:var(--red);padding:10px 14px;font:inherit;font-size:13px;font-weight:600}
amp-sidebar{width:280px;background:var(--bg);padding:28px 22px}
amp-sidebar .close{display:block;margin:0 0 28px auto;border:0;background:transparent;color:var(--fg);font:inherit;font-weight:600}
amp-sidebar nav{display:flex;flex-direction:column;gap:18px;font-weight:600}
amp-sidebar a{padding:4px 0}
.hero{padding:42px 0 28px}
.eyebrow{font-size:10px;letter-spacing:1.4px;color:var(--muted);display:flex;align-items:center;gap:10px;font-weight:600}
.eyebrow:before{content:"";width:28px;height:2px;background:var(--red)}
h1{font-size:42px;letter-spacing:-1.6px;line-height:1.05;font-weight:500;margin:18px 0 16px}
h1 em{font-style:italic;font-weight:500}
.hero p,.lead{font-size:16px;color:#3d3e39;max-width:34em}
.actions{display:flex;flex-wrap:wrap;gap:18px;align-items:center;margin-top:26px}
.btn{background:var(--red);color:#fff;padding:15px 18px;display:inline-flex;align-items:center;gap:12px;font-size:13px;font-weight:600}
.note{margin-top:28px;color:var(--muted);font-size:11px}
.art{margin-top:32px;background:#982c38;color:#f5d7cd;padding:18px 16px 12px}
.art svg{width:100%;height:auto;display:block}
.art figcaption{display:flex;justify-content:space-between;font-family:monospace;font-size:9px;letter-spacing:1px;color:#f4c3b4;margin-top:8px}
.principles{border-top:1px solid var(--border);border-bottom:1px solid var(--border);padding:22px 0;display:grid;gap:14px}
.principles strong{display:block;font-size:13px;letter-spacing:.4px}
.principles p{font-size:15px}
.section{padding:48px 0}
h2{font-size:32px;letter-spacing:-1.1px;line-height:1.12;font-weight:500;margin:12px 0 14px}
h2 em{font-style:italic}
.section>p{font-size:15px;color:#3d3e39}
.cards,.how,.kit{display:grid;gap:14px;margin-top:28px}
.card,.step,.kit article{border:1px solid var(--border);padding:20px}
.card span,.step span,.kit .n{font-size:11px;color:var(--muted);letter-spacing:1px}
h3{font-size:21px;letter-spacing:-.5px;font-weight:500;margin:10px 0}
.card p,.step p,.kit p{font-size:14px;color:#3d3e39}
.tags{margin-top:16px;font-size:10px;letter-spacing:.8px;color:var(--muted)}
.tech{display:flex;flex-wrap:wrap;gap:8px;margin-top:22px}
.tech span{border:1px solid var(--border);padding:8px 10px;font-size:12px}
.portrait{width:168px;margin:28px 0 8px}
.community{background:var(--surface);padding:48px 0}
.place{display:inline-block;margin-top:18px;font-family:monospace;font-size:11px;letter-spacing:.8px}
ol{padding-left:18px;margin-top:10px}
ol li{margin:8px 0;font-size:14px}
.join{background:var(--surface);padding:22px;margin-top:18px}
.caption{display:block;margin-top:16px;font-size:11px;letter-spacing:.6px;color:var(--muted)}
.soon{opacity:.65;pointer-events:none}
.kit amp-img{background:#e9e8e3}
.order{margin-top:22px;padding-top:22px;border-top:1px solid var(--border)}
.order small{display:block;margin-top:10px;color:var(--muted);font-size:11px}
footer{border-top:1px solid var(--border);padding:28px 0 40px;display:grid;gap:16px}
footer p{font-size:14px}
address{font-style:normal;font-size:12px;color:var(--muted)}
.full{font-size:12px;font-weight:600;border-bottom:1px solid #aaa99f;padding-bottom:4px;justify-self:start}
@media (prefers-color-scheme:dark){
:root{--bg:#191a18;--fg:#f1eee7;--muted:#b6b7ad;--border:#3c3e37;--red:#ef919a;--surface:#252922}
.bar{background:#22241f;color:#f1eee7}
.art{background:#7a1f28}
.btn{background:#a83043}
}
`.replace(/\n/g, "").trim();

export function renderAmpPage() {
  const siteUrl = getSiteUrl();
  const gaId = googleAnalyticsId();
  const verification = googleSiteVerification();
  const year = new Date().getFullYear();
  const whatsapp = communityLinks.whatsapp;

  const nav = [
    ["#comunidade", "A comunidade"],
    ["#areas", "Áreas de estudo"],
    ["#como-funciona", "Como funciona"],
    ["#starter-kit", "Nosso kit"],
    ["/entrar", "Entrar"],
  ]
    .map(([href, label]) => `<a href="${escapeHtml(href === "/entrar" ? `${siteUrl}/entrar` : href)}">${escapeHtml(label)}</a>`)
    .join("");

  return `<!doctype html>
<html ⚡ lang="pt-BR">
<head>
<meta charset="utf-8">
<script async src="https://cdn.ampproject.org/v0.js"></script>
<script async custom-element="amp-sidebar" src="https://cdn.ampproject.org/v0/amp-sidebar-0.1.js"></script>
${gaId ? `<script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>` : ""}
<title>${escapeHtml(siteTitle)}</title>
<link rel="canonical" href="${escapeHtml(siteUrl)}">
<link rel="icon" href="${escapeHtml(siteUrl)}/icon.svg" type="image/svg+xml">
<meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
<meta name="description" content="${escapeHtml(siteDescription)}">
<meta name="robots" content="index,follow">
${verification ? `<meta name="google-site-verification" content="${escapeHtml(verification)}">` : ""}
<script type="application/ld+json">${JSON.stringify(siteJsonLd())}</script>
<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
<style amp-custom>${ampCss}</style>
</head>
<body>
${gaId ? `<amp-analytics type="gtag" data-credentials="include"><script type="application/json">${JSON.stringify({ vars: { gtag_id: gaId, config: { [gaId]: { groups: "default" } } } })}</script></amp-analytics>` : ""}
<amp-sidebar id="menu" layout="nodisplay" side="right">
<button class="close" on="tap:menu.close" aria-label="Fechar menu">Fechar −</button>
<nav aria-label="Navegação principal">${nav}</nav>
</amp-sidebar>
<div class="bar"><div class="wrap"><span class="dot"></span>CERRO LARGO, RS · REGIÃO DAS MISSÕES</div></div>
<header class="wrap">
<a class="brand" href="#inicio" aria-label="${escapeHtml(siteName)}, início">
<svg viewBox="0 0 46 42" aria-hidden="true"><path d="M0 0h27v8h-9v34H9V8H0zM23 13h8v29h-8zM35 0h9v42h-9z"></path></svg>
<span>tech<b>missões<span class="period">.</span></b></span>
</a>
<button class="menu" on="tap:menu.open" aria-label="Abrir menu">Menu +</button>
</header>
<main id="inicio">
<section class="wrap hero">
<div class="eyebrow">UMA COMUNIDADE. MUITAS POSSIBILIDADES.</div>
<h1><em>Juntos,</em> construímos o futuro.</h1>
<p>Somos a Tech Missões. Uma comunidade de estudo e desenvolvimento que conecta pessoas para aprender, criar e transformar a nossa região por meio da tecnologia.</p>
<div class="actions">
<a class="btn" href="#faca-parte">Faça parte da comunidade ↗</a>
<a class="full" href="#comunidade">Conheça a comunidade</a>
</div>
<p class="note">+ De Cerro Largo para todas as possibilidades.</p>
<figure class="art">
<svg viewBox="0 0 600 590" fill="none" aria-hidden="true">
<circle cx="308" cy="298" r="210" stroke="#e3a293" stroke-opacity=".3"></circle>
<path d="m135 442 66-38V239c0-76 48-126 112-126 23 0 44 6 61 17-31-28-64-42-101-30-83 17-138 75-138 160z" fill="#721b24" stroke="#efa797"></path>
<path d="M201 404V246c0-65 43-118 98-118s99 53 99 118v158h-62V250c0-33-17-60-37-60s-37 27-37 60v154z" fill="#e7b0a0" stroke="#ffd5bf"></path>
<path d="m398 404 51 30V257c0-58-21-108-64-132l-41-22c35 24 54 69 54 143z" fill="#741c26" stroke="#dc8e82"></path>
</svg>
<figcaption><span>DO NOSSO TERRITÓRIO PARA O FUTURO.</span><span>TM — RS</span></figcaption>
</figure>
</section>
<div class="wrap principles">
<strong>MENTES CURIOSAS. PROPÓSITO EM COMUM.</strong>
<p>Aprender com profundidade.</p>
<p>Construir na prática.</p>
<p>Evoluir em comunidade.</p>
</div>
<section class="wrap section" id="areas">
<div class="eyebrow">01 / NOSSAS ÁREAS DE ESTUDO</div>
<h2>Seis caminhos. Infinitas conexões.</h2>
<p>Exploramos as tecnologias que movem o mundo. Com fundamentos sólidos e mãos na massa.</p>
<div class="cards">${studyTracks.map(track => `<article class="card"><span>${escapeHtml(track.number)}</span><h3>${escapeHtml(track.name)}</h3><p>${escapeHtml(track.description)}</p><div class="tags">${escapeHtml(track.tags)}</div></article>`).join("")}</div>
</section>
<section class="wrap section" id="tecnologias">
<div class="eyebrow">02 / TECNOLOGIAS E FERRAMENTAS</div>
<h2>Você no centro. Possibilidades ao redor.</h2>
<p>Da primeira linha de código ao próximo protótipo. Explore as ferramentas que conectam nossas áreas de estudo.</p>
<div class="tech">${technologies.map(item => `<span>${escapeHtml(item.name)}</span>`).join("")}</div>
<div class="portrait">
<amp-img src="${escapeHtml(siteUrl)}/illustrations/community-developer.png" width="480" height="480" layout="responsive" alt="Ilustração de uma pessoa desenvolvedora da comunidade Tech Missões."></amp-img>
</div>
</section>
<section class="community" id="comunidade">
<div class="wrap">
<div class="eyebrow">03 / A NOSSA ESSÊNCIA</div>
<h2>Raízes nas Missões. Olhar para o futuro.</h2>
<p class="lead">Grandes ideias também nascem fora dos grandes centros.</p>
<p>A Tech Missões nasce em Cerro Largo com uma convicção: conhecimento cresce quando é compartilhado. Queremos aproximar quem está começando de quem já tem experiência, unindo diferentes perspectivas em torno de desafios reais.</p>
<p>Um espaço para perguntar, experimentar e construir. Porque o próximo passo da nossa região pode começar com uma conversa, uma linha de código ou uma ideia sua.</p>
<span class="place"><span class="dot"></span> CERRO LARGO · RIO GRANDE DO SUL · BRASIL</span>
</div>
</section>
<section class="wrap section" id="como-funciona">
<div class="eyebrow">05 / DO CONHECIMENTO À PRÁTICA</div>
<h2>Aprender. Fazer. Compartilhar.</h2>
<p>Uma comunidade se constrói com participação. Cada pessoa tem algo a aprender e a ensinar.</p>
<div class="how">${howSteps.map((step, index) => `<article class="step"><span>0${index + 1}</span><h3>${escapeHtml(step.title)}</h3><p>${escapeHtml(step.text)}</p></article>`).join("")}</div>
</section>
<section class="wrap section" id="participe">
<div class="eyebrow">06 / O SEU PONTO DE PARTIDA</div>
<h2>Curiosidade é o único pré-requisito.</h2>
<p>Iniciante, estudante ou profissional: existe espaço para você. Escolha uma área e descubra um primeiro caminho para colocar seu conhecimento em movimento.</p>
<div class="cards">${studyTracks.map(track => `<article class="card"><span>SEU PRIMEIRO DESAFIO</span><h3>${escapeHtml(track.name)}</h3><ol>${track.steps.map(step => `<li>${escapeHtml(step)}</li>`).join("")}</ol></article>`).join("")}</div>
</section>
<section class="wrap section" id="faca-parte">
<div class="eyebrow">07 / A PRÓXIMA CONEXÃO É COM VOCÊ</div>
<h2>Faça parte da comunidade.</h2>
<p>Todo mundo tem algo a compartilhar. Traga suas dúvidas, suas ideias e sua vontade de aprender. Vamos construir o próximo capítulo da Tech Missões juntos.</p>
<div class="join">
<h3>A conversa começa no WhatsApp.</h3>
<p>Conecte-se com pessoas da região, troque referências e encontre companhia para estudar e desenvolver projetos.</p>
${whatsapp ? `<a class="btn" href="${escapeHtml(whatsapp)}" target="_blank" rel="noopener noreferrer">Entrar no grupo do WhatsApp ↗</a>` : `<span class="btn soon">O convite para o grupo estará disponível em breve.</span>`}
<span class="caption">APRENDER É MELHOR QUANDO A GENTE SE CONECTA.</span>
</div>
</section>
<section class="wrap section" id="starter-kit">
<div class="eyebrow">08 / LEVE A COMUNIDADE COM VOCÊ</div>
<h2>Seu próximo capítulo. O kit da comunidade.</h2>
<p>Na mesa de estudos, nas novas ideias e no dia a dia. Três itens para quem aprende e constrói em comunidade.</p>
<div class="kit">${kitProducts.map((product, index) => `<article><amp-img src="${escapeHtml(siteUrl)}${product.src}" width="854" height="640" layout="responsive" alt="${escapeHtml(product.alt)}"></amp-img><span class="n">0${index + 1} / NO SEU KIT</span><h3>${escapeHtml(product.title)}</h3><p>${escapeHtml(product.text)}</p></article>`).join("")}</div>
<div class="order">
<h3>Três itens. Uma identidade em comum.</h3>
<p>Mousepad com guia de consulta, camiseta e copo personalizado.</p>
${starterKit.purchaseUrl ? `<a class="btn" href="${escapeHtml(starterKit.purchaseUrl)}" target="_blank" rel="noopener noreferrer">Comprar meu kit ↗</a>` : `<span class="btn soon">Kit disponível em breve ↗</span><span class="caption">As vendas ainda não começaram.</span>`}
<small>Ilustrações conceituais dos produtos. O visual final pode variar.</small>
</div>
</section>
</main>
<footer class="wrap">
<a class="brand" href="#inicio" aria-label="${escapeHtml(siteName)}, voltar ao início">
<svg viewBox="0 0 46 42" aria-hidden="true"><path d="M0 0h27v8h-9v34H9V8H0zM23 13h8v29h-8zM35 0h9v42h-9z"></path></svg>
<span>tech<b>missões<span class="period">.</span></b></span>
</a>
<p>Conhecimento compartilhado. Futuro construído em comunidade.</p>
<address>Cerro Largo · Região das Missões · Rio Grande do Sul · Brasil</address>
<span>TECH MISSÕES © ${year}</span>
<a class="full" href="${escapeHtml(siteUrl)}">Ver versão completa</a>
</footer>
</body>
</html>`;
}
