import { AgendaListing, type CommunityEvent } from "@/ui/components/agenda/agenda";
import { SitePage } from "@/ui/components/site-page/site-page";
import page from "./hackathons.json";

export function Hackathons() {
  return (
    <SitePage location={page.location} trail={{ current: page.title, href: "/hackathons" }} footerLine={page.footerLine}>
      <AgendaListing page={page} items={page.items as CommunityEvent[]} listLabel="Próximos hackatons" />
    </SitePage>
  );
}
