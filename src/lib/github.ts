export const GITHUB_USERNAME = "ArthurLeite-Dev";
export const GITHUB_PROFILE_URL = `https://github.com/${GITHUB_USERNAME}`;

// This repo is pinned first regardless of recency — it's the flagship project
// Arthur presented to investors at Minas Summit.
const FEATURED_REPO = "PIT-game-matchmaking-platform";

// GitHub's own auto-generated social preview image for any public repo.
// No auth, no extra request — same image GitHub uses when the repo link is
// shared on social media.
export function repoPreviewImage(fullName: string) {
  return `https://opengraph.githubassets.com/1/${fullName}`;
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
    { headers: { Accept: "application/vnd.github+json" } },
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
    .slice(0, 12);
}
