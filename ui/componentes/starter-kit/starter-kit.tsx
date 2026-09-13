import Image from "next/image";
import { RedCta } from "@/ui/componentes/cta/cta";
import { Lines } from "@/ui/componentes/lines/lines";
import { SectionHeading } from "@/ui/componentes/section-heading/section-heading";
import { TypedLine } from "@/ui/componentes/typed-line/typed-line";
import copy from "./starter-kit.json";
import "./starter-kit.css";

export type KitProduct = (typeof copy.products)[number];

function ProductArt({ product }: { product: KitProduct }) {
  return (
    <div className={`kit-art kit-art-${product.type}`}>
      <Image
        className="kit-product-photo"
        src={product.src}
        alt={product.alt}
        fill
        sizes="(max-width: 760px) calc(100vw - 40px), (max-width: 1100px) 30vw, 427px"
      />
    </div>
  );
}

export function StarterKit() {
  return (
    <section className="starter-kit" id="starter-kit" aria-labelledby="kit-title">
      <div className="container">
        <SectionHeading
          className="kit-heading"
          eyebrow={copy.eyebrow}
          titleId="kit-title"
          title={<>{copy.title}<br /><em><TypedLine inView strings={copy.typed} /></em></>}
        >
          <Lines text={copy.lead} />
        </SectionHeading>
        <div className="kit-products">
          {copy.products.map(product => (
            <article className="kit-product" key={product.type}>
              <ProductArt product={product} />
              <div className="kit-product-copy">
                <span className="eyebrow">{product.number} / {copy.productEyebrow}</span>
                <h3>{product.title}</h3>
                <p>{product.text}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="kit-order">
          <div>
            <span className="eyebrow">{copy.orderEyebrow}</span>
            <h3>{copy.orderTitle}</h3>
            <p>{copy.orderLead}</p>
            <small>{copy.disclaimer}</small>
          </div>
          <div className="kit-buy">
            {copy.price ? <span className="kit-price">{copy.price}</span> : null}
            <RedCta
              href={copy.purchaseUrl}
              pending={<span className="kit-availability">{copy.availability}</span>}
            >
              {copy.purchaseUrl ? copy.buy : copy.soon}
            </RedCta>
          </div>
        </div>
      </div>
    </section>
  );
}
