/**
 * AMP rendering of the home page.
 *
 * Produces a self-contained HTML ⚡ document with the same home content
 * and shared JSON-LD, for the `/amp` route.
 *
 * @packageDocumentation
 */

import { navCta, navLinks } from "@/ui/components/header/nav";
import areas from "@/ui/components/areas/areas.json";
import community from "@/ui/components/community/community.json";
import footer from "@/ui/components/footer/footer.json";
import hero from "@/ui/components/hero/hero.json";
import how from "@/ui/components/how/how.json";
import join from "@/ui/components/join/join.json";
import membership from "@/ui/components/membership/membership.json";
import principles from "@/ui/components/principles/principles.json";
import kit from "@/ui/components/starter-kit/starter-kit.json";
import technologiesCopy from "@/ui/components/technologies/technologies.json";
import { studyTracks } from "@/ui/components/tracks/study-tracks";
import { communityLinks, locationBarLabel } from "@/ui/site/site";
import { siteJsonLd } from "@/lib/site-json-ld";
import {
  getSiteUrl,
  googleAnalyticsId,
  googleSiteVerification,
  siteDescription,
  siteName,
  siteTitle,
} from "@/lib/site";

/**
 * Escapes text for safe HTML interpolation.
 *
 * @param value - Raw content from configuration.
 */
function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Same as {@link escapeHtml}, converting line breaks to `<br>`.
 *
 * @param value - Possibly multiline text.
 */
function lines(value: string) {
  return escapeHtml(value).replace(/\n/g, "<br>");
}

/**
 * First item in a phrase list, used by `typed` animations.
 *
 * @param values - Config sequence; may be empty.
 */
function first(values: string[]) {
  return values[0] ?? "";
}

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

/**
 * Full AMP document for the home page.
 *
 * Includes the sidebar, home sections, kit, conditional analytics, and
 * Search Console verification when those variables are set.
 *
 * @returns HTML string ready to serve on the AMP route.
 */
export function renderAmpPage() {
  const siteUrl = getSiteUrl();
  const gaId = googleAnalyticsId();
  const verification = googleSiteVerification();
  const year = new Date().getFullYear();
  const whatsapp = communityLinks.whatsapp;
  const copy = {
    hero,
    principles,
    areas,
    community,
    how,
    join,
    membership,
    kit,
    technologies: technologiesCopy,
  };
  const homeTyped = {
    areas: areas.typed,
    around: technologiesCopy.typed,
    community: community.typed,
    how: how.typed,
    join: join.typed,
    membership: membership.typed,
    caption: membership.caption,
    kit: kit.typed,
    footer: footer.typed,
    hero: hero.typed,
  };
  const howSteps = how.steps;
  const kitProducts = kit.products;
  const starterKit = { price: kit.price, purchaseUrl: kit.purchaseUrl };
  const technologies = technologiesCopy.items;
  const siteFooter = footer;
  const nav = [...navLinks.flatMap(item => item.children?.length ? item.children : [item]), navCta]
    .map(item => `<a href="${escapeHtml(item.href.startsWith("/") ? `${siteUrl}${item.href}` : item.href)}">${escapeHtml(item.label)}</a>`)
    .join("");
  const kitCta = starterKit.purchaseUrl
    ? `<a class="btn" href="${escapeHtml(starterKit.purchaseUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(copy.kit.buy)} ↗</a>`
    : `<span class="btn soon">${escapeHtml(copy.kit.soon)} ↗</span><span class="caption">${escapeHtml(copy.kit.availability)}</span>`;
  const membershipCta = whatsapp
    ? `<a class="btn" href="${escapeHtml(whatsapp)}" target="_blank" rel="noopener noreferrer">${escapeHtml(copy.membership.cta)} ↗</a>`
    : `<span class="btn soon">${escapeHtml(copy.membership.pending)}</span>`;

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
<div class="bar"><div class="wrap"><span class="dot"></span>${escapeHtml(locationBarLabel)}</div></div>
<header class="wrap">
<a class="brand" href="#inicio" aria-label="${escapeHtml(siteName)}, início">
<svg viewBox="0 0 46 42" aria-hidden="true"><path d="M0 0h27v8h-9v34H9V8H0zM23 13h8v29h-8zM35 0h9v42h-9z"></path></svg>
<span>tech<b>missões<span class="period">.</span></b></span>
</a>
<button class="menu" on="tap:menu.open" aria-label="Abrir menu">Menu +</button>
</header>
<main id="inicio">
<section class="wrap hero">
<div class="eyebrow">${escapeHtml(copy.hero.eyebrow)}</div>
<h1><em>${escapeHtml(copy.hero.titleLead)}</em> ${escapeHtml(copy.hero.titleRest)} ${escapeHtml(copy.hero.srOnly)}</h1>
<p>${escapeHtml(copy.hero.lead)}</p>
<div class="actions">
<a class="btn" href="${escapeHtml(copy.hero.primaryHref)}">${escapeHtml(copy.hero.primaryCta)} ↗</a>
<a class="full" href="${escapeHtml(copy.hero.secondaryHref)}">${escapeHtml(copy.hero.secondaryCta)}</a>
</div>
<p class="note">+ ${escapeHtml(copy.hero.footnote)}</p>
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
<strong>${escapeHtml(copy.principles.kicker)} ${escapeHtml(copy.principles.emphasis)}</strong>
${copy.principles.items.map(item => `<p>${escapeHtml(item)}</p>`).join("")}
</div>
<section class="wrap section" id="areas">
<div class="eyebrow">${escapeHtml(copy.areas.eyebrow)}</div>
<h2>${escapeHtml(copy.areas.title)} ${escapeHtml(first(homeTyped.areas))}</h2>
<p>${lines(copy.areas.lead)}</p>
<div class="cards">${studyTracks.map(track => `<article class="card"><span>${escapeHtml(track.number)}</span><h3>${escapeHtml(track.name)}</h3><p>${escapeHtml(track.description)}</p><div class="tags">${escapeHtml(track.tags)}</div></article>`).join("")}</div>
</section>
<section class="wrap section" id="tecnologias">
<div class="eyebrow">${escapeHtml(copy.technologies.eyebrow)}</div>
<h2>${escapeHtml(copy.technologies.title)} ${escapeHtml(first(homeTyped.around))}</h2>
<p>${lines(copy.technologies.lead)}</p>
<div class="tech">${technologies.map(item => `<span>${escapeHtml(item.name)}</span>`).join("")}</div>
<div class="portrait">
<amp-img src="${escapeHtml(siteUrl)}/illustrations/community-developer.png" width="480" height="480" layout="responsive" alt="Ilustração de uma pessoa desenvolvedora da comunidade Tech Missões."></amp-img>
</div>
</section>
<section class="community" id="comunidade">
<div class="wrap">
<div class="eyebrow">${escapeHtml(copy.community.eyebrow)}</div>
<h2>${escapeHtml(copy.community.title)} ${escapeHtml(copy.community.titleAfter)} ${escapeHtml(first(homeTyped.community))}</h2>
<p class="lead">${lines(copy.community.lead)}</p>
${copy.community.paragraphs.map(paragraph => `<p>${escapeHtml(paragraph)}</p>`).join("")}
<span class="place"><span class="dot"></span> ${escapeHtml(copy.community.location)}</span>
</div>
</section>
<section class="wrap section" id="como-funciona">
<div class="eyebrow">${escapeHtml(copy.how.eyebrow)}</div>
<h2>${escapeHtml(first(homeTyped.how))}</h2>
<p>${lines(copy.how.lead)}</p>
<div class="how">${howSteps.map((step, index) => `<article class="step"><span>0${index + 1}</span><h3>${escapeHtml(step.title)}</h3><p>${escapeHtml(step.text)}</p></article>`).join("")}</div>
</section>
<section class="wrap section" id="participe">
<div class="eyebrow">${escapeHtml(copy.join.eyebrow)}</div>
<h2>${escapeHtml(copy.join.title)} ${escapeHtml(first(homeTyped.join))}</h2>
<p>${escapeHtml(copy.join.lead)}</p>
<div class="cards">${studyTracks.map(track => `<article class="card"><span>SEU PRIMEIRO DESAFIO</span><h3>${escapeHtml(track.name)}</h3><ol>${track.steps.map(step => `<li>${escapeHtml(step)}</li>`).join("")}</ol></article>`).join("")}</div>
</section>
<section class="wrap section" id="faca-parte">
<div class="eyebrow">${escapeHtml(copy.membership.eyebrow)}</div>
<h2>${escapeHtml(copy.membership.title)} ${escapeHtml(first(homeTyped.membership))}</h2>
<p>${escapeHtml(copy.membership.lead)}</p>
<div class="join">
<h3>${escapeHtml(copy.membership.inviteTitle)}</h3>
<p>${escapeHtml(copy.membership.inviteText)}</p>
${membershipCta}
<span class="caption">${escapeHtml(first(homeTyped.caption))}</span>
</div>
</section>
<section class="wrap section" id="starter-kit">
<div class="eyebrow">${escapeHtml(copy.kit.eyebrow)}</div>
<h2>${escapeHtml(copy.kit.title)} ${escapeHtml(first(homeTyped.kit))}</h2>
<p>${lines(copy.kit.lead)}</p>
<div class="kit">${kitProducts.map(product => `<article><amp-img src="${escapeHtml(siteUrl)}${product.src}" width="854" height="640" layout="responsive" alt="${escapeHtml(product.alt)}"></amp-img><span class="n">${escapeHtml(product.number)} / ${escapeHtml(copy.kit.productEyebrow)}</span><h3>${escapeHtml(product.title)}</h3><p>${escapeHtml(product.text)}</p></article>`).join("")}</div>
<div class="order">
<h3>${escapeHtml(copy.kit.orderTitle)}</h3>
<p>${escapeHtml(copy.kit.orderLead)}</p>
${kitCta}
<small>${escapeHtml(copy.kit.disclaimer)}</small>
</div>
</section>
</main>
<footer class="wrap">
<a class="brand" href="#inicio" aria-label="${escapeHtml(siteName)}, voltar ao início">
<svg viewBox="0 0 46 42" aria-hidden="true"><path d="M0 0h27v8h-9v34H9V8H0zM23 13h8v29h-8zM35 0h9v42h-9z"></path></svg>
<span>tech<b>missões<span class="period">.</span></b></span>
</a>
<p>${escapeHtml(homeTyped.footer.join(" "))}</p>
<address>${escapeHtml(siteFooter.address)}</address>
<span>TECH MISSÕES © ${year}</span>
<a class="full" href="${escapeHtml(siteUrl)}">Ver versão completa</a>
</footer>
</body>
</html>`;
}
