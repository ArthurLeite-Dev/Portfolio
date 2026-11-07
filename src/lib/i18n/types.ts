export type Language = "pt" | "en";

export interface Translations {
  meta: { title: string; description: string };
  nav: {
    links: { label: string; href: string }[];
    talk: string;
    openMenu: string;
    closeMenu: string;
    mobileContact: string;
  };
  hero: {
    hello: string;
    roleLine1: string;
    roleLine2: string;
    subtitle: string;
    ctaProjects: string;
    ctaContact: string;
  };
  about: {
    title: string;
    meta: string;
    heading1: string;
    heading2: string;
    bio1: string;
    bio2: string;
    facts: { label: string; value: string }[];
  };
  projects: {
    title: string;
    metaWithCount: (count: number) => string;
    metaFallback: string;
    viewAll: string;
    github: string;
    live: string;
    previewAlt: (title: string) => string;
    fallbackDescription: string;
    emptyError: string;
    emptyNone: string;
    emptySuffix: string;
  };
  experience: {
    title: string;
    meta: string;
    items: { period: string; role: string; company: string; description: string }[];
  };
  contact: {
    available: string;
    heading: [string, string, string];
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    submitIdle: string;
    submitSending: string;
    sentMessage: string;
    errorMessage: string;
    orEmail: string;
  };
  footer: { rights: string };
  a11y: { mainNav: string; mobileNav: string; switchLanguage: string };
}
