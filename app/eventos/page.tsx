import type { Metadata } from "next";
import { communityLinks } from "../community-links";
import { PageTrail } from "../page-trail";
import { SiteHeader } from "../site-header";
import { communityEvents } from "@/lib/events";

const description =
  "Agenda da Tech Missões em Cerro Largo e na região das Missões: grupos de estudo, encontros e apresentações da comunidade.";

export const metadata: Metadata = {
  title: "Eventos",
  description,
  alternates: { canonical: "/eventos" },
  openGraph: { title: "Eventos", description, url: "/eventos" },
  twitter: { title: "Eventos", description },
};

function Mark() {
  return <svg viewBox="0 0 46 42" fill="currentColor" aria-hidden="true"><path d="M0 0h27v8h-9v34H9V8H0zM23 13h8v29h-8zM35 0h9v42h-9z" /></svg>;
}

export default function Page() {
  return (
    <>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <div className="location-bar">
        <div className="container">
          <span><span className="location-dot" />CERRO LARGO, RS · REGIÃO DAS MISSÕES</span>
          <span>AGENDA DA COMUNIDADE</span>
        </div>
      </div>
      <div className="site-header">
        <SiteHeader />
        <PageTrail current="Eventos" href="/eventos" />
      </div>
      <main id="conteudo">
        <section className="section container events-page">
          <div className="section-heading">
            <div>
              <span className="eyebrow">AGENDA · ENCONTROS DA COMUNIDADE</span>
              <h1>Quando a gente se encontra.</h1>
            </div>
            <p>Grupos de estudo, conversas abertas e apresentações em Cerro Largo e na região das Missões.<br />A agenda ainda está em branco — o primeiro encontro aparece aqui.</p>
          </div>
          {communityEvents.length ? (
            <div className="events-list" aria-label="Próximos eventos">
              {communityEvents.map(event => (
                <article className="event-card" key={event.id}>
                  <span className="event-date">{event.dateLabel}</span>
                  <div>
                    <h2>{event.title}</h2>
                    <p>{event.description}</p>
                    <span className="event-place">{event.place}</span>
                  </div>
                  {event.href ? <a className="text-link" href={event.href}>Saiba mais <span aria-hidden="true">↗</span></a> : null}
                </article>
              ))}
            </div>
          ) : (
            <div className="events-empty" aria-labelledby="events-empty-title">
              <span className="step-number" aria-hidden="true">00</span>
              <div>
                <h2 id="events-empty-title">Nenhum evento publicado.</h2>
                <p>Ainda não há data, lugar nem programação nesta página. Quando a comunidade marcar um encontro, ele entra na agenda.</p>
              </div>
              <div className="events-empty-actions">
                {communityLinks.whatsapp ? <a className="button button-red" href={communityLinks.whatsapp} target="_blank" rel="noopener noreferrer">Acompanhar no WhatsApp <span aria-hidden="true">↗</span></a> : null}
                <a className="text-link" href="/">Voltar ao início <span aria-hidden="true">↑</span></a>
              </div>
            </div>
          )}
        </section>
      </main>
      <footer className="container footer">
        <a className="brand" href="/" aria-label="Tech Missões, voltar ao início"><Mark /><span>tech<span>missões<span className="brand-period">.</span></span></span></a>
        <p>A agenda se constrói em comunidade.</p>
        <div>
          <address>Cerro Largo · Região das Missões · Rio Grande do Sul · Brasil</address>
          <span>TECH MISSÕES © {new Date().getFullYear()}</span>
          <a href="/">Feito de pessoas e possibilidades. <span aria-hidden="true">↑</span></a>
        </div>
      </footer>
    </>
  );
}
