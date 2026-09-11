import Image from "next/image";
import { starterKit } from "./community-links";
import { TypedLine } from "./typed-line";

const kitTyped = ["O kit da comunidade.", "Leve a marca com você.", "Três itens. Uma identidade."];

function ProductArt({ product }: { product: "mousepad" | "shirt" | "cup" }) {
  return <div className={`kit-art kit-art-${product}`}>
    {product === "mousepad" ? <Image className="kit-product-photo" src="/illustrations/mousepad.png" alt="Mousepad vermelho da Tech Missões com a marca da comunidade e um guia de consulta de programação e ferramentas." fill sizes="(max-width: 760px) calc(100vw - 40px), (max-width: 1100px) 30vw, 427px" /> : product === "shirt" ? <Image className="kit-product-photo" src="/illustrations/camisa.png" alt="Frente e costas da camiseta vermelha da Tech Missões, com a marca da comunidade e o slogan Juntos, construímos o futuro." fill sizes="(max-width: 760px) calc(100vw - 40px), (max-width: 1100px) 30vw, 427px" /> : <Image className="kit-product-photo" src="/illustrations/copo.png" alt="Duas vistas do copo vermelho personalizado da Tech Missões, com tampa, marca da comunidade e o slogan Juntos, construímos o futuro." fill sizes="(max-width: 760px) calc(100vw - 40px), (max-width: 1100px) 30vw, 427px" />}
  </div>;
}

export function StarterKit() {
  return <section className="starter-kit" id="starter-kit" aria-labelledby="kit-title">
    <div className="container">
      <div className="section-heading kit-heading"><div><span className="eyebrow">07 / LEVE A COMUNIDADE COM VOCÊ</span><h2 id="kit-title">Seu próximo capítulo.<br /><em><TypedLine inView strings={kitTyped} /></em></h2></div><p>Na mesa de estudos, nas novas ideias e no dia a dia.<br />Três itens para quem aprende e constrói em comunidade.</p></div>
      <div className="kit-products">
        {[{ type: "mousepad" as const, number: "01", title: "Mousepad com guia de consulta", text: "Seu espaço de trabalho com referências de programação sempre à mão." }, { type: "shirt" as const, number: "02", title: "Camiseta da comunidade", text: "Vista a Tech Missões e leve o espírito da comunidade para onde você for." }, { type: "cup" as const, number: "03", title: "Copo personalizado", text: "Uma companhia para as pausas, as conversas e as próximas linhas de código." }].map(product => <article className="kit-product" key={product.type}><ProductArt product={product.type} /><div className="kit-product-copy"><span className="eyebrow">{product.number} / NO SEU KIT</span><h3>{product.title}</h3><p>{product.text}</p></div></article>)}
      </div>
      <div className="kit-order"><div><span className="eyebrow">KIT DA COMUNIDADE</span><h3>Três itens. Uma identidade em comum.</h3><p>Mousepad com guia de consulta, camiseta e copo personalizado.</p><small>Ilustrações conceituais dos produtos. O visual final pode variar.</small></div><div className="kit-buy">{starterKit.price && <span className="kit-price">{starterKit.price}</span>}{starterKit.purchaseUrl ? <a className="button button-red" href={starterKit.purchaseUrl} target="_blank" rel="noopener noreferrer">Comprar meu kit <span aria-hidden="true">↗</span></a> : <><button className="button button-red" disabled>Kit disponível em breve <span aria-hidden="true">↗</span></button><span className="kit-availability">As vendas ainda não começaram.</span></>}</div></div>
    </div>
  </section>;
}
