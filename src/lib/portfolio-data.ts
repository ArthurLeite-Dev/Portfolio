import { GITHUB_PROFILE_URL } from "@/lib/github";

// Language-invariant facts (name, email, links). Everything that changes
// between Portuguese and English lives in src/lib/i18n.tsx instead.
export const profile = {
  name: "Arthur Leite",
  role: "Full-Stack Developer Jr.",
  email: "arthur.sl.work@gmail.com",
  location: "Belo Horizonte, Brasil",
  socials: [
    { label: "GitHub", href: GITHUB_PROFILE_URL },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/arthur-leite-/" },
  ],
};
