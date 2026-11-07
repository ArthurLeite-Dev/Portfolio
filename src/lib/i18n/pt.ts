import type { Translations } from "./types";

// Português (pt-BR) — todo texto visível do site em português fica SÓ aqui.
export const pt: Translations = {
  meta: {
    title: "Arthur Leite — Desenvolvedor Full-Stack Jr.",
    description:
      "Portfólio de Arthur Leite, desenvolvedor full-stack: projetos open source no GitHub, stack em TypeScript, React e Node.js, e experiência construindo sistemas de recomendação.",
  },
  nav: {
    links: [
      { label: "Sobre", href: "#about" },
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
    title: "Sobre",
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
  projects: {
    title: "Projetos selecionados",
    metaWithCount: (count) => `${count} repositórios via GitHub`,
    metaFallback: "via GitHub API",
    viewAll: "Ver todos os repositórios ↗",
    github: "GitHub",
    live: "Ao vivo",
    previewAlt: (title) => `Prévia do projeto ${title}`,
    fallbackDescription: "Repositório pessoal — veja o código e o histórico de commits no GitHub.",
    emptyError:
      "Não foi possível carregar os repositórios agora (a API do GitHub pode estar limitando requisições).",
    emptyNone: "Nenhum repositório público encontrado por aqui no momento.",
    emptySuffix: "Veja a lista completa direto no",
  },
  experience: {
    title: "Experiência",
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
  },
  a11y: {
    mainNav: "Navegação principal",
    mobileNav: "Menu mobile",
    switchLanguage: "Mudar para inglês",
  },
};
