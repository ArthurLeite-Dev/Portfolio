import { motion } from "motion/react";
import { useMemo, useState } from "react";
import { useLanguage } from "@/lib/i18n";
import {
  formatRepoName,
  GITHUB_REPOS_URL,
  liveScreenshotUrl,
  repoPreviewImage,
  type GithubRepo,
} from "@/lib/github";
import { projectOverrides } from "@/lib/project-overrides";
import { cn } from "@/lib/utils";
import { MagneticButton } from "./MagneticButton";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const ease = [0.16, 1, 0.3, 1] as const;
const FEATURED_REPO = "PIT-game-matchmaking-platform";

function ProjectCard({
  repo,
  dimmed,
  onHover,
  githubLabel,
  liveLabel,
  fallbackDescription,
}: {
  repo: GithubRepo;
  dimmed: boolean;
  onHover: (hovering: boolean) => void;
  githubLabel: string;
  liveLabel: string;
  fallbackDescription: string;
}) {
  const [hovered, setHovered] = useState(false);
  const [imageStage, setImageStage] = useState(0);

  const setHover = (v: boolean) => {
    setHovered(v);
    onHover(v);
  };

  const override = projectOverrides[repo.name];
  const liveUrl = override?.liveUrl ?? repo.homepage ?? null;
  const featured = repo.name === FEATURED_REPO;

  // Tries, in order: a manually provided screenshot, then a live on-demand
  // screenshot of the deployed site (once one exists), then GitHub's own
  // auto-generated card. Falls back to no image at all if every source
  // fails to load.
  const imageCandidates = useMemo(() => {
    const candidates: string[] = [];
    if (override?.image) candidates.push(override.image);
    if (liveUrl) candidates.push(liveScreenshotUrl(liveUrl));
    candidates.push(repoPreviewImage(repo.full_name));
    return candidates;
  }, [override?.image, liveUrl, repo.full_name]);

  const image = imageStage < imageCandidates.length ? imageCandidates[imageStage] : null;

  const tech = [repo.language, ...repo.topics].filter((t): t is string => Boolean(t)).slice(0, 3);
  const title = formatRepoName(repo.name);
  const description = repo.description ?? fallbackDescription;

  return (
    <motion.article
      className="group relative"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      animate={{ opacity: dimmed && !hovered ? 0.5 : 1 }}
      transition={{ duration: 0.4, ease }}
    >
      <a
        href={repo.html_url}
        target="_blank"
        rel="noreferrer noopener"
        aria-label={`${title} — ${githubLabel}`}
        className="block rounded-lg border border-transparent p-2 transition-colors duration-500 hover:border-border focus-visible:border-border"
      >
        {image && (
          <div className="relative aspect-[2/1] overflow-hidden rounded-md bg-card">
            <motion.img
              src={image}
              alt={`Preview — ${title}`}
              width={1200}
              height={600}
              loading="lazy"
              onError={() => setImageStage((s) => s + 1)}
              className="h-full w-full object-cover grayscale contrast-[1.05]"
              animate={hovered ? { scale: 1.04 } : { scale: 1 }}
              transition={{ duration: 0.7, ease }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-background transition-opacity duration-500"
              style={{ opacity: hovered ? 0.06 : 0.16 }}
            />
            {featured && (
              <span className="label-xs absolute left-2.5 top-2.5 rounded-full bg-background/85 px-2.5 py-1 backdrop-blur-sm">
                ★
              </span>
            )}
          </div>
        )}

        <div className="mt-3 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate font-display text-sm font-bold tracking-tight sm:text-base">
              {title}
            </h3>
            {repo.stargazers_count > 0 && (
              <span className="label-xs mt-0.5 block">★ {repo.stargazers_count}</span>
            )}
          </div>
          <motion.span
            aria-hidden
            className="mt-0.5 shrink-0 font-display text-sm text-muted-foreground"
            animate={{ x: hovered ? 4 : 0, opacity: hovered ? 1 : 0.5 }}
            transition={{ duration: 0.4, ease }}
          >
            ↗
          </motion.span>
        </div>

        <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
          {description}
        </p>

        {tech.length > 0 && (
          <ul className="mt-2.5 flex flex-wrap gap-x-2.5 gap-y-1">
            {tech.map((t) => (
              <li key={t} className="label-xs">
                {t}
              </li>
            ))}
          </ul>
        )}
      </a>

      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 px-2">
        <a
          href={repo.html_url}
          target="_blank"
          rel="noreferrer noopener"
          className="link-underline inline-flex min-h-9 items-center font-display text-[10px] uppercase tracking-[0.16em]"
        >
          {githubLabel}
        </a>
        {liveUrl && (
          <a
            href={liveUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="link-underline inline-flex min-h-9 items-center font-display text-[10px] uppercase tracking-[0.16em] text-muted-foreground hover:text-foreground"
          >
            {liveLabel}
          </a>
        )}
      </div>
    </motion.article>
  );
}

export function Projects({ repos, error }: { repos: GithubRepo[]; error?: boolean }) {
  const { t } = useLanguage();
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section id="work" className="container-editorial scroll-mt-24 py-24 md:py-36">
      <SectionHeading
        index="03 / 06"
        title={t.projects.title}
        meta={repos.length > 0 ? t.projects.metaWithCount(repos.length) : t.projects.metaFallback}
      />

      {repos.length > 0 ? (
        <>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 md:mt-14 lg:grid-cols-3">
            {repos.map((repo, i) => (
              <Reveal key={repo.id} delay={Math.min(i, 4) * 0.5}>
                <ProjectCard
                  repo={repo}
                  dimmed={hoveredId !== null && hoveredId !== repo.id}
                  onHover={(h) => setHoveredId(h ? repo.id : null)}
                  githubLabel={t.projects.github}
                  liveLabel={t.projects.live}
                  fallbackDescription={t.projects.fallbackDescription}
                />
              </Reveal>
            ))}
          </div>

          <Reveal delay={2} className="mt-12 flex justify-center md:mt-16">
            <MagneticButton href={GITHUB_REPOS_URL} className="w-full sm:w-auto">
              {t.projects.viewAll}
            </MagneticButton>
          </Reveal>
        </>
      ) : (
        <Reveal
          delay={2}
          className="mt-14 border border-border p-8 text-sm text-muted-foreground md:mt-20 md:p-12"
        >
          {error ? t.projects.emptyError : t.projects.emptyNone} {t.projects.emptySuffix}{" "}
          <a
            href={GITHUB_REPOS_URL}
            target="_blank"
            rel="noreferrer noopener"
            className={cn("link-underline text-foreground")}
          >
            GitHub
          </a>
          .
        </Reveal>
      )}
    </section>
  );
}
