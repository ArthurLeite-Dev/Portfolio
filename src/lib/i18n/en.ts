import type { Translations } from "./types";

// English — all visible site text in English lives ONLY here.
export const en: Translations = {
  meta: {
    title: "Arthur Leite — Jr. Full-Stack Developer",
    description:
      "Arthur Leite's portfolio: open source projects on GitHub, a TypeScript, React, and Node.js stack, and experience building recommendation systems.",
  },
  nav: {
    links: [
      { label: "About", href: "#about" },
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
  projects: {
    title: "Selected work",
    metaWithCount: (count) => `${count} repositories via GitHub`,
    metaFallback: "via GitHub API",
    viewAll: "View all repositories ↗",
    github: "GitHub",
    live: "Live",
    previewAlt: (title) => `Preview of the ${title} project`,
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
  },
  a11y: {
    mainNav: "Main navigation",
    mobileNav: "Mobile menu",
    switchLanguage: "Switch to Portuguese",
  },
};
