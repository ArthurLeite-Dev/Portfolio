import { createFileRoute } from "@tanstack/react-router";
import { About } from "@/components/portfolio/About";
import { Contact } from "@/components/portfolio/Contact";
import { Experience } from "@/components/portfolio/Experience";
import { Footer } from "@/components/portfolio/Footer";
import { Hero } from "@/components/portfolio/Hero";
import { Navbar } from "@/components/portfolio/Navbar";
import { Projects } from "@/components/portfolio/Projects";
import { fetchGithubRepos, type GithubRepo } from "@/lib/github";
import { translations } from "@/lib/i18n";
import { profile } from "@/lib/portfolio-data";

const { title, description } = translations.pt.meta;

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
  return (
    <>
      <Navbar />
      <main className="relative z-10 overflow-x-clip">
        <Hero />
        <About />
        <Projects repos={repos} error={reposError} />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
