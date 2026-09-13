import { AgendaListing, type CommunityEvent } from "@/ui/componentes/agenda/agenda";
import { SitePage } from "@/ui/componentes/site-page/site-page";
import page from "./hackatons.json";

export function Hackatons() {
  return (
    <SitePage location={page.location} trail={{ current: page.title, href: "/hackatons" }} footerLine={page.footerLine}>
      <AgendaListing page={page} items={page.items as CommunityEvent[]} listLabel="Próximos hackatons" />
    </SitePage>
  );
}
