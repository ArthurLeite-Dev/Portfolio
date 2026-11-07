import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Language = "pt" | "en";

const STORAGE_KEY = "arthur-leite-portfolio:lang";

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
  stack: {
    title: string;
    meta: string;
    items: { name: string; note: string }[];
  };
  projects: {
    title: string;
    metaWithCount: (count: number) => string;
    metaFallback: string;
    viewAll: string;
    github: string;
    live: string;
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
  footer: { rights: string; tagline: string };
}

const pt: Translations = {
  meta: {
    title: "Arthur Leite — Desenvolvedor Full-Stack Jr.",
    description:
      "Portfólio de Arthur Leite, desenvolvedor full-stack: projetos open source no GitHub, stack em TypeScript, React e Node.js, e experiência construindo sistemas de recomendação.",
  },
  nav: {
    links: [
      { label: "Sobre", href: "#about" },
      { label: "Stack", href: "#stack" },
      { label: "Projetos", href: "#work" },
      { label: "Experiência", href: "#experience" },
      { label: "Contato", href: "#contact" },
    ],
    talk: "Vamos conversar",
    openMenu: "Abrir menu",
    closeMenu: "Fechar menu",
    mobileContact: "Entrar em contato",
  },
  hero: {
    hello: "Olá, eu sou",
    roleLine1: "Desenvolvedor",
    roleLine2: "Full-Stack",
    subtitle:
      "Estudante de Ciência da Computação que gosta de ir do código à apresentação do produto — como fiz com o Co-Up, plataforma que idealizei e levei a investidores no Minas Summit.",
    ctaProjects: "Ver projetos",
    ctaContact: "Entre em contato",
  },
  about: {
    title: "About",
    meta: "Quem constrói",
    heading1: "Construindo coisas",
    heading2: "que importam.",
    bio1: "Sou estudante de Ciência da Computação (Universidade FUMEC) e técnico em Tecnologia pelo COTEMIG, com experiência prática construindo aplicações full-stack em TypeScript, React, Node.js e Firebase.",
    bio2: "Idealizei, arquitetei e apresentei o Co-Up — da arquitetura do backend à lógica de recomendação entre usuários — a investidores no Minas Summit. Busco aplicar lógica de programação, automação e boas práticas de engenharia em produtos orientados a dados.",
    facts: [
      { label: "Localização", value: "Belo Horizonte, Brasil" },
      { label: "Formação", value: "Ciência da Computação — FUMEC" },
      { label: "Foco", value: "Web · Automação · Boas práticas" },
      { label: "Destaque", value: "Co-Up, apresentado no Minas Summit" },
    ],
  },
  stack: {
    title: "Stack",
    meta: "Ferramentas do dia a dia",
    items: [
      { name: "TypeScript", note: "Tipagem em todo o stack" },
      { name: "JavaScript", note: "Base de tudo" },
      { name: "React", note: "Interfaces e componentes" },
      { name: "Node.js", note: "APIs e regras de negócio" },
      { name: "Express", note: "Rotas e middlewares" },
      { name: "Firebase / Firestore", note: "Auth, dados em tempo real" },
      { name: "MySQL", note: "Modelagem relacional" },
      { name: "Python", note: "Lógica e automação" },
      { name: "Java", note: "Fundamentos de POO" },
      { name: "C#", note: "Lógica de programação" },
      { name: "Kotlin", note: "Mobile" },
      { name: "Dart / Flutter", note: "Mobile multiplataforma" },
      { name: "Git / GitHub", note: "Versionamento" },
    ],
  },
  projects: {
    title: "Selected work",
    metaWithCount: (count) => `${count} repositórios via GitHub`,
    metaFallback: "via GitHub API",
    viewAll: "Ver todos os repositórios ↗",
    github: "GitHub",
    live: "Live",
    fallbackDescription: "Repositório pessoal — veja o código e o histórico de commits no GitHub.",
    emptyError:
      "Não foi possível carregar os repositórios agora (a API do GitHub pode estar limitando requisições).",
    emptyNone: "Nenhum repositório público encontrado por aqui no momento.",
    emptySuffix: "Veja a lista completa direto no",
  },
  experience: {
    title: "Experience",
    meta: "2024 — hoje",
    items: [
      {
        period: "2025 — 2026",
        role: "Auxiliar Administrativo",
        company: "MRV & CO",
        description:
          "Consulta e análise de dados financeiros no SAP, com controle de vencimentos e redução de atrasos e multas. Criação de planilhas e painéis em Excel para acompanhamento de pagamentos e pendências.",
      },
      {
        period: "2024 — 2025",
        role: "Monitor Voluntário de Lógica de Programação",
        company: "Colégio COTEMIG",
        description:
          "Ensino introdutório de lógica de programação (Scratch, HTML, CSS, Python) para crianças e adolescentes em ações de inclusão digital.",
      },
    ],
  },
  contact: {
    available: "Disponível para novos projetos",
    heading: ["Vamos", "construir", "algo."],
    nameLabel: "Nome",
    namePlaceholder: "Seu nome",
    emailLabel: "Email",
    emailPlaceholder: "voce@email.com",
    messageLabel: "Mensagem",
    messagePlaceholder: "Conte um pouco sobre o projeto, a vaga ou a ideia...",
    submitIdle: "Enviar mensagem",
    submitSending: "Enviando...",
    sentMessage: "Mensagem enviada — retorno em breve.",
    errorMessage: "Algo deu errado. Tente de novo ou escreva direto para",
    orEmail: "Ou, direto no email",
  },
  footer: {
    rights: "© 2026 — Todos os direitos reservados.",
    tagline: "Feito com intenção.",
  },
};

const en: Translations = {
  meta: {
    title: "Arthur Leite — Jr. Full-Stack Developer",
    description:
      "Arthur Leite's portfolio: open source projects on GitHub, a TypeScript, React, and Node.js stack, and experience building recommendation systems.",
  },
  nav: {
    links: [
      { label: "About", href: "#about" },
      { label: "Stack", href: "#stack" },
      { label: "Projects", href: "#work" },
      { label: "Experience", href: "#experience" },
      { label: "Contact", href: "#contact" },
    ],
    talk: "Let's talk",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    mobileContact: "Get in touch",
  },
  hero: {
    hello: "Hello, I'm",
    roleLine1: "Full-Stack",
    roleLine2: "Developer",
    subtitle:
      "A Computer Science student who likes going from code to product pitch — just like I did with Co-Up, the platform I built and took to investors at Minas Summit.",
    ctaProjects: "View projects",
    ctaContact: "Get in touch",
  },
  about: {
    title: "About",
    meta: "Who's behind it",
    heading1: "Building things",
    heading2: "that matter.",
    bio1: "I'm a Computer Science student at Universidade FUMEC and a Technology graduate from COTEMIG, with hands-on experience building full-stack applications in TypeScript, React, Node.js, and Firebase.",
    bio2: "I designed, architected, and pitched Co-Up — from the backend architecture to the user-matching recommendation logic — to investors at Minas Summit. I'm looking to apply programming logic, automation, and solid engineering practices to data-driven products.",
    facts: [
      { label: "Location", value: "Belo Horizonte, Brazil" },
      { label: "Education", value: "Computer Science — FUMEC" },
      { label: "Focus", value: "Web · Automation · Best practices" },
      { label: "Highlight", value: "Co-Up, pitched at Minas Summit" },
    ],
  },
  stack: {
    title: "Stack",
    meta: "Everyday tools",
    items: [
      { name: "TypeScript", note: "Typed across the whole stack" },
      { name: "JavaScript", note: "The foundation of it all" },
      { name: "React", note: "Interfaces & components" },
      { name: "Node.js", note: "APIs & business logic" },
      { name: "Express", note: "Routes & middleware" },
      { name: "Firebase / Firestore", note: "Auth, real-time data" },
      { name: "MySQL", note: "Relational modeling" },
      { name: "Python", note: "Logic & automation" },
      { name: "Java", note: "OOP fundamentals" },
      { name: "C#", note: "Programming logic" },
      { name: "Kotlin", note: "Mobile" },
      { name: "Dart / Flutter", note: "Cross-platform mobile" },
      { name: "Git / GitHub", note: "Version control" },
    ],
  },
  projects: {
    title: "Selected work",
    metaWithCount: (count) => `${count} repositories via GitHub`,
    metaFallback: "via GitHub API",
    viewAll: "View all repositories ↗",
    github: "GitHub",
    live: "Live",
    fallbackDescription: "Personal repository — check the code and commit history on GitHub.",
    emptyError:
      "Couldn't load repositories right now (the GitHub API may be rate-limiting requests).",
    emptyNone: "No public repositories found here at the moment.",
    emptySuffix: "See the full list directly on",
  },
  experience: {
    title: "Experience",
    meta: "2024 — present",
    items: [
      {
        period: "2025 — 2026",
        role: "Administrative Assistant",
        company: "MRV & CO",
        description:
          "Financial data review and analysis in SAP, tracking due dates and reducing late payments and fees. Built Excel spreadsheets and dashboards to track payments and pending items.",
      },
      {
        period: "2024 — 2025",
        role: "Volunteer Programming Logic Mentor",
        company: "Colégio COTEMIG",
        description:
          "Taught introductory programming logic (Scratch, HTML, CSS, Python) to children and teenagers as part of digital inclusion initiatives.",
      },
    ],
  },
  contact: {
    available: "Available for new projects",
    heading: ["Let's", "build", "something."],
    nameLabel: "Name",
    namePlaceholder: "Your name",
    emailLabel: "Email",
    emailPlaceholder: "you@email.com",
    messageLabel: "Message",
    messagePlaceholder: "Tell me a bit about the project, the role, or the idea...",
    submitIdle: "Get in touch",
    submitSending: "Sending...",
    sentMessage: "Message sent — I'll get back to you soon.",
    errorMessage: "Something went wrong. Try again or write directly to",
    orEmail: "Or, straight to my email",
  },
  footer: {
    rights: "© 2026 — All rights reserved.",
    tagline: "Designed & built with intention.",
  },
};

export const translations: Record<Language, Translations> = { pt, en };

const htmlLang: Record<Language, string> = { pt: "pt-BR", en: "en" };

interface LanguageContextValue {
  lang: Language;
  t: Translations;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function readInitialLanguage(): Language {
  if (typeof window === "undefined") return "pt";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "pt" || stored === "en") return stored;
  return window.navigator.language?.toLowerCase().startsWith("pt") ? "pt" : "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Server-rendered markup is always Portuguese; we swap in the visitor's
  // real preference right after mount to avoid a hydration mismatch.
  const [lang, setLang] = useState<Language>("pt");

  useEffect(() => {
    setLang(readInitialLanguage());
  }, []);

  useEffect(() => {
    document.documentElement.lang = htmlLang[lang];
    window.localStorage.setItem(STORAGE_KEY, lang);

    const current = translations[lang];
    document.title = current.meta.title;
    const descriptionTag = document.querySelector('meta[name="description"]');
    if (descriptionTag) descriptionTag.setAttribute("content", current.meta.description);
    const ogTitleTag = document.querySelector('meta[property="og:title"]');
    if (ogTitleTag) ogTitleTag.setAttribute("content", current.meta.title);
    const ogDescriptionTag = document.querySelector('meta[property="og:description"]');
    if (ogDescriptionTag) ogDescriptionTag.setAttribute("content", current.meta.description);
  }, [lang]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      lang,
      t: translations[lang],
      toggleLanguage: () => setLang((current) => (current === "pt" ? "en" : "pt")),
      setLanguage: setLang,
    }),
    [lang],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}
