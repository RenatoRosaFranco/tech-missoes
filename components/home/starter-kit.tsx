import Image from "next/image";
import { RedCta } from "@/components/ui/cta";
import { SectionHeading } from "@/components/ui/section-heading";
import { TypedLine } from "@/components/ui/typed-line";
import { homeCopy, homeTyped, kitProducts, starterKit } from "@/lib/app-config";
import { Lines } from "@/components/ui/lines";

function ProductArt({ product }: { product: (typeof kitProducts)[number] }) {
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
  const copy = homeCopy.kit;
  return (
    <section className="starter-kit" id="starter-kit" aria-labelledby="kit-title">
      <div className="container">
        <SectionHeading
          className="kit-heading"
          eyebrow={copy.eyebrow}
          titleId="kit-title"
          title={<>{copy.title}<br /><em><TypedLine inView strings={homeTyped.kit} /></em></>}
        >
          <Lines text={copy.lead} />
        </SectionHeading>
        <div className="kit-products">
          {kitProducts.map(product => (
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
            {starterKit.price ? <span className="kit-price">{starterKit.price}</span> : null}
            <RedCta
              href={starterKit.purchaseUrl}
              pending={<span className="kit-availability">{copy.availability}</span>}
            >
              {starterKit.purchaseUrl ? copy.buy : copy.soon}
            </RedCta>
          </div>
        </div>
      </div>
    </section>
  );
}
