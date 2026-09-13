import type { Metadata } from "next";
import { SitePage } from "@/components/layout/site-page";
import { communityEvents, communityLinks, pageCopy } from "@/lib/app-config";

const page = pageCopy.events;

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  alternates: { canonical: "/eventos" },
  openGraph: { title: page.title, description: page.description, url: "/eventos" },
  twitter: { title: page.title, description: page.description },
};

export default function Page() {
  const [lead, rest] = page.lead.split("\n");

  return (
    <SitePage location={page.location} trail={{ current: page.title, href: "/eventos" }} footerLine={page.footerLine}>
      <section className="section container events-page">
        <div className="section-heading">
          <div>
            <span className="eyebrow">{page.eyebrow}</span>
            <h1>{page.heading}</h1>
          </div>
          <p>{lead}{rest ? <><br />{rest}</> : null}</p>
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
              <h2 id="events-empty-title">{page.emptyTitle}</h2>
              <p>{page.emptyText}</p>
            </div>
            <div className="events-empty-actions">
              {communityLinks.whatsapp ? <a className="button button-red" href={communityLinks.whatsapp} target="_blank" rel="noopener noreferrer">Acompanhar no WhatsApp <span aria-hidden="true">↗</span></a> : null}
              <a className="text-link" href="/">Voltar ao início <span aria-hidden="true">↑</span></a>
            </div>
          </div>
        )}
      </section>
    </SitePage>
  );
}
