/**
 * Optional manual overrides for individual GitHub repos shown in the
 * "Selected work" section.
 *
 * You almost never need to touch this file. Each card already picks an
 * image automatically, trying these in order:
 *
 *  1. A manual `image` set below (if you want full control over the shot)
 *  2. A REAL, live screenshot of the deployed site — generated on demand
 *     the moment the repo has a live URL. That URL comes from either:
 *       a) the repo's "Website" field on GitHub — the easiest way, just go
 *          to the repo page → gear icon next to "About" → paste the URL.
 *          No code changes, nothing to redeploy here.
 *       b) or a `liveUrl` set below, if you don't want to touch GitHub's
 *          settings for some reason
 *  3. GitHub's own generic "name + avatar + stats" card as a last resort
 *     (this is what shows today, before anything is deployed)
 *
 * So: once you deploy a project and set its GitHub "Website" field, its
 * card image updates itself automatically — no screenshot, no override,
 * no redeploy of the portfolio needed.
 *
 * Use this file only when you want to override that automatic choice, e.g.
 * a hand-picked screenshot instead of the auto one, or a live link for a
 * project that isn't a website (like a mobile app) so "Live" points
 * somewhere useful (an app store page, a demo video, etc).
 *
 * Example:
 *
 * export const projectOverrides: ProjectOverrides = {
 *   "PIT-game-matchmaking-platform": {
 *     image: "/projects/co-up.png", // drop the file in /public/projects/
 *     liveUrl: "https://co-up.example.com",
 *   },
 * };
 *
 * Screenshots should be roughly 1200×600px (a 2:1 ratio) for the best crop
 * inside the card.
 */
export type ProjectOverrides = Record<string, { image?: string; liveUrl?: string }>;

export const projectOverrides: ProjectOverrides = {
  // "repo-name": { image: "/projects/repo-name.png", liveUrl: "https://..." },
};
