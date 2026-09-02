import { GITHUB_PROFILE_URL } from "@/lib/github";

export const profile = {
  name: "Arthur Leite",
  role: "Desenvolvedor Full-Stack Jr.",
  email: "arthur.sl.work@gmail.com",
  location: "Belo Horizonte, Brasil",
  socials: [
    { label: "GitHub", href: GITHUB_PROFILE_URL },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/arthur-leite-/" },
  ],
};

export const navLinks = [
  { label: "Sobre", href: "#about" },
  { label: "Stack", href: "#stack" },
  { label: "Projetos", href: "#work" },
  { label: "Experiência", href: "#experience" },
  { label: "Contato", href: "#contact" },
];

export const facts = [
  { label: "Localização", value: "Belo Horizonte, Brasil" },
  { label: "Formação", value: "Ciência da Computação — FUMEC" },
  { label: "Foco", value: "Web · Automação · Boas práticas" },
  { label: "Destaque", value: "Co-Up, apresentado no Minas Summit" },
];

export const stack = [
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
];

export const experience = [
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
];
