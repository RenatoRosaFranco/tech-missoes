import { RedCta } from "@/ui/components/cta/cta";
import { SocialIcon } from "@/ui/components/social-icon/social-icon";
import { TypedLine } from "@/ui/components/typed-line/typed-line";
import { communityLinks } from "@/ui/site/site";
import copy from "./membership.json";
import "./membership.scss";

export function Membership() {
  return (
    <section className="membership container" id="faca-parte" aria-labelledby="membership-title">
      <div className="membership-copy">
        <span className="eyebrow">{copy.eyebrow}</span>
        <h2 id="membership-title">{copy.title}<br /><em><TypedLine inView strings={copy.typed} /></em></h2>
        <p>{copy.lead}</p>
      </div>
      <div className="membership-invite">
        <span className="whatsapp-icon"><SocialIcon name="WhatsApp" /></span>
        <h3>{copy.inviteTitle}</h3>
        <p>{copy.inviteText}</p>
        <RedCta
          href={communityLinks.whatsapp}
          pending={<p className="membership-pending">{copy.pending}</p>}
        >
          {copy.cta}
        </RedCta>
        <span className="membership-caption"><TypedLine inView strings={copy.caption} typeSpeed={24} /></span>
      </div>
    </section>
  );
}
