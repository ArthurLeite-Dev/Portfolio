export const GITHUB_USERNAME = "ArthurLeite-Dev";
export const GITHUB_PROFILE_URL = `https://github.com/${GITHUB_USERNAME}`;
export const GITHUB_REPOS_URL = `https://github.com/${GITHUB_USERNAME}?tab=repositories`;

// This repo is pinned first regardless of recency — it's the flagship project
// Arthur presented to investors at Minas Summit.
const FEATURED_REPO = "PIT-game-matchmaking-platform";

// GitHub's own auto-generated social preview image for any public repo.
// No auth, no extra request — same image GitHub uses when the repo link is
// shared on social media. This is ALWAYS a generic "name + avatar + stats"
// card — GitHub never screenshots the deployed site itself, even once one
// exists.
export function repoPreviewImage(fullName: string) {
  return `https://opengraph.githubassets.com/1/${fullName}`;
}

// A real, live screenshot of a deployed site, generated on demand by
// Microlink's free public screenshot API — no signup or key required. This
// is what actually shows the real project UI once a repo has a live URL
// (either GitHub's own "Website" field, or an override in
// project-overrides.ts). It's rendered fresh in the visitor's own browser
// each time, so it always reflects the current live site.
export function liveScreenshotUrl(url: string) {
  const params = new URLSearchParams({
    url,
    screenshot: "true",
    meta: "false",
    embed: "screenshot.url",
    "viewport.width": "1280",
    "viewport.height": "800",
  });
  return `https://api.microlink.io/?${params.toString()}`;
}

export type GithubRepo = {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics: string[];
  stargazers_count: number;
  fork: boolean;
  archived: boolean;
  pushed_at: string;
};

/** Turns "PIT-game-matchmaking-platform" into "PIT game matchmaking platform". */
export function formatRepoName(name: string) {
  return name.replace(/[-_]+/g, " ").trim();
}

export async function fetchGithubRepos(): Promise<GithubRepo[]> {
  const res = await fetch(
    `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=pushed`,
    {
      headers: { Accept: "application/vnd.github+json" },
      signal: AbortSignal.timeout(4000),
    },
  );

  if (!res.ok) {
    throw new Error(`GitHub API respondeu ${res.status}`);
  }

  const repos = (await res.json()) as GithubRepo[];

  return repos
    .filter((r) => !r.fork && !r.archived && r.name !== GITHUB_USERNAME)
    .sort((a, b) => {
      if (a.name === FEATURED_REPO) return -1;
      if (b.name === FEATURED_REPO) return 1;
      return new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime();
    })
    .slice(0, 3);
}
