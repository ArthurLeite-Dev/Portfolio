import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { About } from "@/components/portfolio/About";
import { Contact } from "@/components/portfolio/Contact";
import { CustomCursor } from "@/components/portfolio/CustomCursor";
import { Experience } from "@/components/portfolio/Experience";
import { Footer } from "@/components/portfolio/Footer";
import { Hero } from "@/components/portfolio/Hero";
import { Navbar } from "@/components/portfolio/Navbar";
import { Preloader } from "@/components/portfolio/Preloader";
import { Projects } from "@/components/portfolio/Projects";
import { SpotlightBackground } from "@/components/portfolio/SpotlightBackground";
import { TechStack } from "@/components/portfolio/TechStack";
import { fetchGithubRepos, type GithubRepo } from "@/lib/github";
import { profile } from "@/lib/portfolio-data";

const title = `${profile.name} — ${profile.role}`;
const description =
  "Portfólio de Arthur Leite, desenvolvedor full-stack: projetos open source no GitHub, stack em TypeScript, React e Node.js, e experiência construindo sistemas de recomendação.";

export const Route = createFileRoute("/")({
  loader: async (): Promise<{ repos: GithubRepo[]; reposError: boolean }> => {
    try {
      const repos = await fetchGithubRepos();
      return { repos, reposError: false };
    } catch (error) {
      console.error("Falha ao buscar repositórios do GitHub:", error);
      return { repos: [], reposError: true };
    }
  },
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: profile.name,
          jobTitle: profile.role,
          email: `mailto:${profile.email}`,
          address: profile.location,
          url: "/",
          sameAs: profile.socials.map((s) => s.href),
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  const { repos, reposError } = Route.useLoaderData();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    document.body.style.overflow = loaded ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [loaded]);

  return (
    <>
      <Preloader done={loaded} />
      <CustomCursor />
      <SpotlightBackground />
      <Navbar />
      <main className="relative z-10 overflow-x-clip">
        <Hero start={loaded} />
        <About />
        <TechStack />
        <Projects repos={repos} error={reposError} />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
