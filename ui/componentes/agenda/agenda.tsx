import { communityLinks } from "@/ui/site/site";
import { Lines } from "@/ui/componentes/lines/lines";
import "./agenda.css";

export type CommunityEvent = {
  id: string;
  title: string;
  dateLabel: string;
  place: string;
  description: string;
  href?: string;
};

export type AgendaPage = {
  title: string;
  description: string;
  location: string;
  footerLine: string;
  eyebrow: string;
  heading: string;
  lead: string;
  emptyTitle?: string;
  emptyText?: string;
};

export function AgendaListing({
  page,
  items,
  listLabel,
}: {
  page: AgendaPage;
  items: CommunityEvent[];
  listLabel: string;
}) {
  return (
    <section className="section container events-page">
      <div className="section-heading">
        <div>
          <span className="eyebrow">{page.eyebrow}</span>
          <h1>{page.heading}</h1>
        </div>
        <p><Lines text={page.lead} /></p>
      </div>
      {items.length ? (
        <div className="events-list" aria-label={listLabel}>
          {items.map(item => (
            <article className="event-card" key={item.id}>
              <span className="event-date">{item.dateLabel}</span>
              <div>
                <h2>{item.title}</h2>
                <p>{item.description}</p>
                <span className="event-place">{item.place}</span>
              </div>
              {item.href ? <a className="text-link" href={item.href}>Saiba mais <span aria-hidden="true">↗</span></a> : null}
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
  );
}
