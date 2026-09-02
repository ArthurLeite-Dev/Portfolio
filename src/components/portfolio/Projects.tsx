import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { usePointerFine } from "@/hooks/use-pointer-fine";
import {
  formatRepoName,
  GITHUB_PROFILE_URL,
  repoPreviewImage,
  type GithubRepo,
} from "@/lib/github";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const ease = [0.16, 1, 0.3, 1] as const;

function ProjectCard({
  repo,
  featured,
  dimmed,
  onHover,
}: {
  repo: GithubRepo;
  featured: boolean;
  dimmed: boolean;
  onHover: (hovering: boolean) => void;
}) {
  const fine = usePointerFine();
  const ref = useRef<HTMLElement>(null);
  const [hovered, setHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  const px = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 });
  const py = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 });
  const rotateY = useTransform(px, [-0.5, 0.5], ["2.2deg", "-2.2deg"]);
  const rotateX = useTransform(py, [-0.5, 0.5], ["-1.6deg", "1.6deg"]);

  const setHover = (v: boolean) => {
    setHovered(v);
    onHover(v);
    if (!v) {
      px.set(0);
      py.set(0);
    }
  };

  const tech = [repo.language, ...repo.topics].filter((t): t is string => Boolean(t)).slice(0, 4);
  const title = formatRepoName(repo.name);
  const description =
    repo.description ?? "Repositório pessoal — veja o código e o histórico de commits no GitHub.";

  return (
    <motion.article
      ref={ref}
      data-cursor="view"
      className={cn("group relative", featured ? "col-span-full" : "col-span-full md:col-span-6")}
      onMouseEnter={() => fine && setHover(true)}
      onMouseLeave={() => fine && setHover(false)}
      onMouseMove={(e) => {
        if (!fine || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        px.set((e.clientX - r.left) / r.width - 0.5);
        py.set((e.clientY - r.top) / r.height - 0.5);
      }}
      animate={{ opacity: dimmed && !hovered ? 0.45 : 1 }}
      transition={{ duration: 0.5, ease }}
      style={{ perspective: 1200 }}
    >
      <motion.a
        href={repo.html_url}
        target="_blank"
        rel="noreferrer noopener"
        aria-label={`Abrir repositório ${title} no GitHub`}
        className="block rounded-lg border border-transparent p-2 transition-colors duration-500 hover:border-border focus-visible:border-border sm:p-3"
        {...(fine ? { style: { rotateX, rotateY, transformStyle: "preserve-3d" as const } } : {})}
        whileTap={{ scale: 0.99 }}
        {...(fine ? { whileHover: { scale: 1.008 } } : {})}
        transition={{ type: "spring", stiffness: 200, damping: 24 }}
      >
        {!imageError && (
          <div
            className={cn(
              "relative overflow-hidden rounded-md bg-card",
              featured ? "aspect-[16/10] md:aspect-[21/9]" : "aspect-[4/3]",
            )}
          >
            <motion.img
              src={repoPreviewImage(repo.full_name)}
              alt={`Preview do repositório ${title}`}
              width={1280}
              height={640}
              loading={featured ? "eager" : "lazy"}
              onError={() => setImageError(true)}
              className="h-full w-full object-cover grayscale contrast-[1.05]"
              animate={hovered ? { scale: 1.05, x: -6, y: -6 } : { scale: 1, x: 0, y: 0 }}
              transition={{ duration: 0.9, ease }}
            />
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-background"
              animate={{ opacity: hovered ? 0.08 : 0.2 }}
              transition={{ duration: 0.6, ease }}
            />
          </div>
        )}

        <div className="mt-5 grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 sm:mt-6">
          <div className="min-w-0">
            <div className="flex items-baseline gap-3">
              <motion.h3
                className={cn(
                  "truncate font-display font-bold uppercase tracking-tight",
                  featured ? "text-2xl sm:text-4xl lg:text-6xl" : "text-xl sm:text-2xl lg:text-3xl",
                )}
                animate={{ x: hovered ? 6 : 0 }}
                transition={{ duration: 0.5, ease }}
              >
                {title}
              </motion.h3>
              {repo.stargazers_count > 0 && (
                <span className="label-xs shrink-0">★ {repo.stargazers_count}</span>
              )}
            </div>
            <p
              className={cn(
                "mt-3 text-sm leading-relaxed text-muted-foreground",
                featured ? "max-w-2xl" : "max-w-md",
              )}
            >
              {description}
            </p>
            {tech.length > 0 && (
              <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-1">
                {tech.map((t) => (
                  <li key={t} className="label-xs">
                    {t}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <motion.span
            aria-hidden
            className="mt-1 font-display text-xl text-muted-foreground sm:text-2xl"
            animate={{ x: hovered ? 8 : 0, opacity: hovered ? 1 : 0.55 }}
            transition={{ duration: 0.5, ease }}
          >
            ↗
          </motion.span>
        </div>
      </motion.a>

      <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 px-2 sm:px-3">
        <a
          href={repo.html_url}
          target="_blank"
          rel="noreferrer noopener"
          className="link-underline inline-flex min-h-11 items-center font-display text-[11px] uppercase tracking-[0.18em]"
        >
          GitHub
        </a>
        {repo.homepage && (
          <a
            href={repo.homepage}
            target="_blank"
            rel="noreferrer noopener"
            className="link-underline inline-flex min-h-11 items-center font-display text-[11px] uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground"
          >
            Live
          </a>
        )}
      </div>
    </motion.article>
  );
}

export function Projects({ repos, error }: { repos: GithubRepo[]; error?: boolean }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="work" className="container-editorial scroll-mt-24 py-24 md:py-36">
      <SectionHeading
        index="03 / 06"
        title="Selected work"
        meta={repos.length > 0 ? `${repos.length} reposit\u00f3rios via GitHub` : "via GitHub API"}
      />

      <Reveal delay={1} className="mt-6">
        <a
          href={GITHUB_PROFILE_URL}
          target="_blank"
          rel="noreferrer noopener"
          className="link-underline inline-flex items-center gap-2 font-display text-[11px] uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground"
        >
          Ver todos os repositórios ↗
        </a>
      </Reveal>

      {repos.length > 0 ? (
        <div className="mt-10 grid grid-cols-12 gap-x-6 gap-y-16 md:mt-16 md:gap-y-28">
          {repos.map((repo, i) => (
            <Reveal key={repo.id} className={i === 0 ? "col-span-12" : "col-span-12 md:col-span-6"}>
              <ProjectCard
                repo={repo}
                featured={i === 0}
                dimmed={hoveredIndex !== null && hoveredIndex !== i}
                onHover={(h) => setHoveredIndex(h ? i : null)}
              />
            </Reveal>
          ))}
        </div>
      ) : (
        <Reveal
          delay={2}
          className="mt-14 border border-border p-8 text-sm text-muted-foreground md:mt-24 md:p-12"
        >
          {error
            ? "Não foi possível carregar os repositórios agora (a API do GitHub pode estar limitando requisições). "
            : "Nenhum repositório público encontrado por aqui no momento. "}
          Veja a lista completa direto no{" "}
          <a
            href={GITHUB_PROFILE_URL}
            target="_blank"
            rel="noreferrer noopener"
            className="link-underline text-foreground"
          >
            GitHub
          </a>
          .
        </Reveal>
      )}
    </section>
  );
}
