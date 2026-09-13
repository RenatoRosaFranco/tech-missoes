import { AgendaListing, type CommunityEvent } from "@/ui/components/agenda/agenda";
import { SitePage } from "@/ui/components/site-page/site-page";
import page from "./events.json";

export function Events() {
  return (
    <SitePage location={page.location} trail={{ current: page.title, href: "/events" }} footerLine={page.footerLine}>
      <AgendaListing page={page} items={page.items as CommunityEvent[]} listLabel="Próximos eventos" />
    </SitePage>
  );
}
