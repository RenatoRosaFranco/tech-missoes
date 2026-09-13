export const TRACK_ICONS = ["code", "ai", "robot", "devops", "automation", "venture"] as const;
export type TrackIcon = (typeof TRACK_ICONS)[number];

export const KIT_PRODUCT_TYPES = ["mousepad", "shirt", "cup"] as const;
export type KitProductType = (typeof KIT_PRODUCT_TYPES)[number];

export const FEATURES = ["partners"] as const;
export type FeatureName = (typeof FEATURES)[number];

export const SOCIAL_PROFILE_NAMES = ["Facebook", "Instagram", "YouTube", "TikTok"] as const;
export type SocialProfileName = (typeof SOCIAL_PROFILE_NAMES)[number];

export type NavLink = {
  href: string;
  label: string;
  feature?: FeatureName;
};

export type NavCta = {
  href: string;
  label: string;
};

export type HomeSection = {
  id: string;
  label: string;
  feature?: FeatureName;
};

export type StudyTrack = {
  number: string;
  name: string;
  description: string;
  tags: string;
  icon: TrackIcon;
  steps: string[];
};

export type Technology = {
  name: string;
  context: string;
  icon: string;
  area: string;
  description: string;
};

export type KitProduct = {
  type: KitProductType;
  number: string;
  title: string;
  text: string;
  src: string;
  alt: string;
};

export type Partner = {
  id: string;
  name: string;
  full: string;
  place: string;
  href: string;
};

export type BlogAuthor = {
  name: string;
  role: string;
  initials: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  dateLabel: string;
  track: string;
  readingMinutes: number;
  cover: string;
  coverAlt: string;
  author: BlogAuthor;
  paragraphs: string[];
};

export type CommunityEvent = {
  id: string;
  title: string;
  dateLabel: string;
  place: string;
  description: string;
  href?: string;
};

export type PageCopy = {
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

export type SitePlace = {
  locality: string;
  region: string;
  regionName: string;
  country: string;
  area: string;
  latitude: number;
  longitude: number;
};

export type SiteFooter = {
  address: string;
  credit: string;
};

export type HomeCopy = {
  hero: {
    eyebrow: string;
    titleLead: string;
    titleRest: string;
    srOnly: string;
    lead: string;
    primaryCta: string;
    primaryHref: string;
    secondaryCta: string;
    secondaryHref: string;
    footnote: string;
  };
  principles: {
    kicker: string;
    emphasis: string;
    items: string[];
  };
  areas: { eyebrow: string; title: string; lead: string };
  technologies: { eyebrow: string; title: string; lead: string };
  community: {
    eyebrow: string;
    title: string;
    titleAfter: string;
    lead: string;
    paragraphs: string[];
    location: string;
  };
  partners: { eyebrow: string; title: string; lead: string; pending: string };
  how: { eyebrow: string; lead: string };
  join: { eyebrow: string; title: string; lead: string; note: string; openNote: string };
  membership: {
    eyebrow: string;
    title: string;
    lead: string;
    inviteTitle: string;
    inviteText: string;
    cta: string;
    pending: string;
  };
  kit: {
    eyebrow: string;
    title: string;
    lead: string;
    productEyebrow: string;
    orderEyebrow: string;
    orderTitle: string;
    orderLead: string;
    disclaimer: string;
    buy: string;
    soon: string;
    availability: string;
  };
};

export type ChatTopic = {
  id: string;
  title: string;
  keywords: string[];
  related?: string[];
};

export type SocialProfile = {
  name: SocialProfileName;
  href: string;
};

export type AppConfig = {
  site: {
    name: string;
    tagline: string;
    title: string;
    description: string;
    locationBar: string;
    place: SitePlace;
    footer: SiteFooter;
    sitemapImages: string[];
  };
  links: {
    whatsapp: string;
    facebook: string;
    instagram: string;
    youtube: string;
    tiktok: string;
  };
  features: Record<FeatureName, boolean>;
  navigation: {
    cta: NavCta;
    links: NavLink[];
  };
  home: {
    sections: HomeSection[];
    typed: {
      hero: string[];
      location: string[];
      areas: string[];
      community: string[];
      how: string[];
      join: string[];
      membership: string[];
      caption: string[];
      footer: string[];
      kit: string[];
      partners: string[];
      around: string[];
    };
    howSteps: { title: string; text: string }[];
    copy: HomeCopy;
  };
  starterKit: {
    price: string;
    purchaseUrl: string;
    products: KitProduct[];
  };
  tracks: StudyTrack[];
  technologies: Technology[];
  technologyLayout: {
    mobilePositions: [number, number][];
  };
  partners: Partner[];
  blog: BlogPost[];
  events: CommunityEvent[];
  pages: {
    blog: PageCopy;
    events: PageCopy;
  };
  chat: {
    welcome: string;
    greeting: string;
    thanks: string;
    fallback: string;
    suggestedQuestions: string[];
    topics: ChatTopic[];
  };
};
