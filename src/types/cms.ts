export type Language = 'ar' | 'en';

export interface LocalizedText {
  ar: string;
  en: string;
}

export interface Product {
  id: string;
  slug: string;
  name: LocalizedText;
  subtitle: LocalizedText;
  description: LocalizedText;
  price: LocalizedText;
  category: string;
  collectionSlug: string;
  image: string;
  gallery: string[];
  fabric: LocalizedText;
  origin: LocalizedText;
  leadTime: LocalizedText;
  features: LocalizedText[];
  featured: boolean;
  available: boolean;
  badge?: LocalizedText;
}

export interface Collection {
  id: string;
  slug: string;
  title: LocalizedText;
  subtitle: LocalizedText;
  description: LocalizedText;
  image: string;
  season: LocalizedText;
  featured: boolean;
}

export interface ServiceItem {
  id: string;
  slug: string;
  title: LocalizedText;
  subtitle: LocalizedText;
  description: LocalizedText;
  duration: LocalizedText;
  priceNote: LocalizedText;
  image: string;
  highlights: LocalizedText[];
}

export interface GalleryItem {
  id: string;
  title: LocalizedText;
  caption: LocalizedText;
  category: LocalizedText;
  image: string;
}

export interface ArticleItem {
  id: string;
  slug: string;
  title: LocalizedText;
  excerpt: LocalizedText;
  content: LocalizedText;
  category: LocalizedText;
  readTime: LocalizedText;
  publishedAt: string;
  image: string;
}

export interface OfferItem {
  id: string;
  title: LocalizedText;
  subtitle: LocalizedText;
  description: LocalizedText;
  priceText: LocalizedText;
  validUntil: LocalizedText;
  badge: LocalizedText;
  image: string;
  active: boolean;
}

export interface StaticPageContent {
  title: LocalizedText;
  subtitle: LocalizedText;
  sections: {
    heading: LocalizedText;
    body: LocalizedText;
  }[];
}

export interface ThemeColors {
  primaryBg: string;
  surfaceBg: string;
  accentGold: string;
  accentLightGold: string;
  textPrimary: string;
  textMuted: string;
}

export interface HomeSectionsConfig {
  showPillars: boolean;
  showCollections: boolean;
  showFeaturedProducts: boolean;
  showCraftsmanshipBanner: boolean;
  collectionsEyebrow: LocalizedText;
  collectionsTitle: LocalizedText;
  productsEyebrow: LocalizedText;
  productsTitle: LocalizedText;
  pillars: {
    title: LocalizedText;
    description: LocalizedText;
  }[];
}

export interface SEOSettings {
  metaTitle: LocalizedText;
  metaDescription: LocalizedText;
  keywords: LocalizedText;
  ogImage: string;
}

export interface SocialLinks {
  instagram: string;
  snapchat: string;
  tiktok: string;
  twitter: string;
  facebook: string;
  youtube: string;
  googleMaps: string;
}

export interface SiteSettings {
  brandName: string;
  logoUrl?: string;
  tagline: LocalizedText;
  whatsappNumber: string;
  phoneDisplay: string;
  contactEmail: string;
  address: LocalizedText;
  workingHours: LocalizedText;
  adminEmail: string;
  instagramUrl: string;
  socials?: SocialLinks;
  seo?: SEOSettings;
  theme?: ThemeColors;
  homeSections?: HomeSectionsConfig;
  hero: {
    eyebrow: LocalizedText;
    title: LocalizedText;
    subtitle: LocalizedText;
    primaryCta: LocalizedText;
    secondaryCta: LocalizedText;
    image: string;
  };
  craftsmanshipBanner: {
    eyebrow: LocalizedText;
    title: LocalizedText;
    description: LocalizedText;
    image: string;
  };
}

export interface CMSData {
  settings: SiteSettings;
  collections: Collection[];
  products: Product[];
  services: ServiceItem[];
  gallery: GalleryItem[];
  articles: ArticleItem[];
  offers: OfferItem[];
  pages: {
    about: StaticPageContent;
    privacy: StaticPageContent;
    terms: StaticPageContent;
  };
  updatedAt?: string;
}
