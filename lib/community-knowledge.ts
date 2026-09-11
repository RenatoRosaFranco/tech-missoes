import { communityLinks, showPartnersSection, starterKit } from "@/app/community-links";

export type KnowledgeDoc = {
  id: string;
  title: string;
  keywords: string[];
  answer: string;
  related?: string[];
};

export function communityKnowledge(): KnowledgeDoc[] {
  const whatsapp = communityLinks.whatsapp
    ? `O convite oficial está neste [grupo do WhatsApp](${communityLinks.whatsapp}).`
    : "O convite para o grupo do WhatsApp ainda não foi publicado no site. Quando estiver pronto, o botão em Faça parte da comunidade leva direto para o grupo.";
  const socials = [
    ["Facebook", communityLinks.facebook],
    ["Instagram", communityLinks.instagram],
    ["YouTube", communityLinks.youtube],
    ["TikTok", communityLinks.tiktok],
  ] as const;
  const socialLines = socials
    .map(([name, href]) => (href ? `${name}: ${href}` : `${name}: ainda sem endereço oficial no site`))
    .join(" ");
  const kitBuy = starterKit.purchaseUrl
    ? `As vendas estão abertas neste endereço: ${starterKit.purchaseUrl}.`
    : "As vendas ainda não começaram. O site avisa quando o kit estiver disponível.";
  const kitPrice = starterKit.price ? `O preço de exibição agora é ${starterKit.price}.` : "O preço ainda não foi publicado.";

  return [
    {
      id: "identidade",
      title: "O que é a Tech Missões",
      keywords: ["tech missoes", "quem sao", "o que e", "comunidade", "sobre", "apresentacao", "voces"],
      answer: "Somos a Tech Missões: uma comunidade de estudo e desenvolvimento que nasceu em Cerro Largo, na região das Missões. Conectamos pessoas para aprender, criar e transformar a região por meio da tecnologia.",
      related: ["essencia", "local", "participar"],
    },
    {
      id: "essencia",
      title: "A essência da comunidade",
      keywords: ["essencia", "proposito", "missao", "por que", "conviccao", "raizes", "futuro", "grandes centros"],
      answer: "A convicção da Tech Missões é que grandes ideias também nascem fora dos grandes centros e que conhecimento cresce quando é compartilhado. Queremos aproximar quem está começando de quem já tem experiência, unindo perspectivas diferentes em torno de desafios reais. É um espaço para perguntar, experimentar e construir.",
      related: ["principios", "como-funciona"],
    },
    {
      id: "local",
      title: "Onde estamos",
      keywords: ["onde", "local", "cidade", "cerro largo", "missoes", "rio grande do sul", "rs", "brasil", "territorio", "regiao", "endereco"],
      answer: "A Tech Missões nasce em Cerro Largo, na região das Missões, Rio Grande do Sul. Raízes locais, conexões sem limites.",
      related: ["identidade", "participar"],
    },
    {
      id: "principios",
      title: "Princípios",
      keywords: ["principio", "valores", "como pensam", "aprender", "construir", "evoluir"],
      answer: "Três princípios guiam a comunidade: aprender com profundidade, construir na prática e evoluir em comunidade. Mentes curiosas, propósito em comum.",
      related: ["como-funciona", "essencia"],
    },
    {
      id: "areas",
      title: "Áreas de estudo",
      keywords: ["area", "trilha", "caminho", "estudo", "o que estudam", "eixos", "cursos"],
      answer: "Há três áreas de estudo: **engenharia de software**, **inteligência artificial** e **robótica**. Cada uma com fundamentos sólidos e prática.",
      related: ["software", "inteligencia", "robotica", "tecnologias"],
    },
    {
      id: "software",
      title: "Engenharia de software",
      keywords: ["software", "programacao", "codigo", "dev", "desenvolvimento", "arquitetura", "open source", "engenharia"],
      answer: "A trilha de engenharia de software vai além de escrever código: entender sistemas, compartilhar boas práticas e construir software que faz a diferença. Os temas passam por arquitetura, open source e desenvolvimento. Um primeiro caminho: explorar lógica de programação e Git, construir uma aplicação para um problema da sua comunidade e documentar as decisões convidando alguém para revisar o código.",
      related: ["areas", "tecnologias", "como-comecar"],
    },
    {
      id: "inteligencia",
      title: "Inteligência artificial",
      keywords: ["inteligencia artificial", "ia", "ai", "machine learning", "ml", "dados", "modelo", "python", "pytorch"],
      answer: "A trilha de inteligência artificial vai da curiosidade à aplicação: investigar dados, entender modelos e experimentar com responsabilidade. Os temas passam por machine learning, dados e IA aplicada. Um primeiro caminho: praticar Python com conjuntos pequenos de dados, experimentar um modelo simples comparando resultados e compartilhar o experimento, as limitações e o que você aprendeu.",
      related: ["areas", "tecnologias", "como-comecar"],
    },
    {
      id: "robotica",
      title: "Robótica",
      keywords: ["robotica", "robo", "eletronica", "automacao", "prototipo", "sensor", "arduino", "raspberry", "circuito"],
      answer: "A trilha de robótica é sobre ideias que ganham movimento: conectar programação, eletrônica e criatividade para interagir com o mundo real. Os temas passam por eletrônica, automação e prototipagem. Um primeiro caminho: conhecer circuitos, sensores e microcontroladores em um simulador, programar um protótipo que responda a um sensor e registrar o circuito e o código para outras pessoas reproduzirem.",
      related: ["areas", "tecnologias", "como-comecar"],
    },
    {
      id: "parceiras",
      title: "Instituições parceiras",
      keywords: ["universidade", "parceira", "uffs", "uri", "unijui", "setrem", "iffar", "unipampa", "fasa", "uergs", "ufsm", "unicruz", "campus", "faculdade", "instituto"],
      answer: showPartnersSection
        ? "A Tech Missões caminha com instituições de ensino da Rota das Missões e do noroeste: UFFS, campus Cerro Largo; URI, em Santo Ângelo, São Luiz Gonzaga e Cerro Largo; UNIJUÍ; SETREM, em Três de Maio; IFFar; UNIPAMPA; FASA, em Santo Ângelo; UERGS, unidade de São Luiz Gonzaga; UFSM, campus Palmeira das Missões; e UNICRUZ, em Cruz Alta. No site, a seção Instituições parceiras reúne esses nomes e os endereços oficiais de cada uma."
        : "As parcerias com universidades e institutos da região ainda estão sendo fechadas. Quando estiverem confirmadas, a seção Instituições parceiras entra no site.",
      related: ["local", "participar", "areas"],
    },
    {
      id: "como-funciona",
      title: "Como a comunidade funciona",
      keywords: ["como funciona", "encontros", "grupos", "projetos", "estudo", "pratica", "compartilhar", "evento", "reuniao"],
      answer: "A comunidade se constrói com participação. Estudamos juntos em grupos para aprofundar fundamentos e trocar descobertas. Tiramos ideias do papel em projetos colaborativos ligados à nossa realidade. E compartilhamos o caminho com trocas, demonstrações e conversas abertas: o aprendizado de uma pessoa abre portas para outras. Cada pessoa tem algo a aprender e a ensinar.",
      related: ["principios", "participar"],
    },
    {
      id: "como-comecar",
      title: "Como começar",
      keywords: ["comecar", "primeiro", "inicio", "desafio", "iniciante", "por onde", "trilha"],
      answer: "Escolha uma área e siga um primeiro desafio no seu ritmo. Em software: lógica, Git e uma aplicação para a comunidade. Em inteligência artificial: Python, um modelo simples e o relato do que aprendeu. Em robótica: sensores, um protótipo e o registro para outras pessoas reproduzirem. Iniciante, estudante ou profissional: existe espaço para você.",
      related: ["software", "inteligencia", "robotica", "participar"],
    },
    {
      id: "quem",
      title: "Quem pode participar",
      keywords: ["quem", "pode", "requisito", "idade", "iniciante", "profissional", "estudante", "gratis", "gratuito", "custo"],
      answer: "Curiosidade é o único pré-requisito. Iniciante, estudante ou profissional: existe espaço para você. A comunidade é um espaço aberto de estudo e troca; o site não cobra inscrição para participar. O kit da comunidade é um conjunto de itens à parte e só entra à venda quando o endereço oficial for publicado.",
      related: ["participar", "kit"],
    },
    {
      id: "participar",
      title: "Como fazer parte",
      keywords: ["fazer parte", "entrar", "participar", "juntar", "inscrever", "membro", "whatsapp", "zap", "grupo", "wpp", "conversa"],
      answer: `A conversa da comunidade começa no WhatsApp: é o lugar para se conectar com pessoas da região, trocar referências e encontrar companhia para estudar e desenvolver projetos. ${whatsapp} No site, a seção Faça parte da comunidade concentra esse convite.`,
      related: ["quem", "redes"],
    },
    {
      id: "tecnologias",
      title: "Tecnologias e ferramentas",
      keywords: ["tecnologia", "ferramenta", "typescript", "react", "node", "ruby", "rails", "python", "pytorch", "git", "github", "docker", "linguagem", "stack"],
      answer: "Ao redor de quem desenvolve, a comunidade explora TypeScript, React, Node.js, Ruby, Rails, Python, PyTorch, Arduino, Raspberry Pi, Git, GitHub e Docker. Elas atravessam software, inteligência artificial, robótica, colaboração e infraestrutura. A ideia é colocar você no centro e as possibilidades ao redor.",
      related: ["areas", "software", "inteligencia", "robotica"],
    },
    {
      id: "kit",
      title: "Kit da comunidade",
      keywords: ["kit", "mousepad", "camiseta", "camisa", "copo", "loja", "comprar", "preco", "produto", "merchandising"],
      answer: `O kit da comunidade tem três itens: mousepad com guia de consulta de programação, camiseta da Tech Missões e copo personalizado. É uma forma de levar a identidade da comunidade para a mesa de estudos e o dia a dia. As ilustrações no site são conceituais e o visual final pode variar. ${kitPrice} ${kitBuy}`,
      related: ["identidade", "participar"],
    },
    {
      id: "redes",
      title: "Redes sociais",
      keywords: ["rede", "social", "facebook", "instagram", "youtube", "tiktok", "contato", "seguir"],
      answer: `As redes oficiais da Tech Missões no rodapé do site são Facebook, Instagram, YouTube e TikTok. ${socialLines}`,
      related: ["participar", "identidade"],
    },
  ];
}

export const suggestedQuestions = [
  "O que é a Tech Missões?",
  "Como faço parte?",
  "Quais são as áreas de estudo?",
  "Tem kit da comunidade?",
];

export const welcomeMessage =
  "Olá. Sou o guia da Tech Missões. Posso falar sobre a comunidade, as áreas de estudo, como participar e o kit. O que você quer saber?";

export function knowledgePrompt() {
  return communityKnowledge()
    .map(doc => `## ${doc.title}\n${doc.answer}`)
    .join("\n\n");
}
