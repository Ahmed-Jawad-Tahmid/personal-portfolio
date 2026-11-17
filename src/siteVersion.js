// Which site visitors see at ahmedjt.com.
//   "sky"     -> the new sky page      (src/sky/)
//   "classic" -> the original portfolio (src/pages/Home.jsx and src/components/)
//
// To switch: change DEFAULT_SITE below and push, or set VITE_DEFAULT_SITE in Vercel
// (Project Settings -> Environment Variables) and redeploy. The Vercel setting wins.
// Both sites are always reachable directly at /sky and /classic.

const DEFAULT_SITE = "sky";

const fromEnv = import.meta.env.VITE_DEFAULT_SITE;

export const SITE = fromEnv === "sky" || fromEnv === "classic" ? fromEnv : DEFAULT_SITE;
