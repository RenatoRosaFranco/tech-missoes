import { AgendaListing, type CommunityEvent } from "@/ui/componentes/agenda/agenda";
import { SitePage } from "@/ui/componentes/site-page/site-page";
import page from "./eventos.json";

export function Eventos() {
  return (
    <SitePage location={page.location} trail={{ current: page.title, href: "/eventos" }} footerLine={page.footerLine}>
      <AgendaListing page={page} items={page.items as CommunityEvent[]} listLabel="Próximos eventos" />
    </SitePage>
  );
}
