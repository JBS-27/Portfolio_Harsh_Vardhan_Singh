import archive from "@/content/orbit-fallback.json";
import { parseOrbitHtml, type OrbitPost } from "@/lib/orbit-parse";

export const ORBIT_HANDLE = "singharshll52";

export type OrbitWire = {
  handle: string;
  source: "live" | "archive";
  posts: OrbitPost[];
};

const PROFILE = `https://x.com/${ORBIT_HANDLE}`;

function fromArchive(): OrbitWire {
  return {
    handle: ORBIT_HANDLE,
    source: "archive",
    posts: archive as OrbitPost[],
  };
}

export async function getOrbitWire(): Promise<OrbitWire> {
  try {
    const response = await fetch(PROFILE, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml",
        "Accept-Language": "en-US,en;q=0.9",
      },
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) return fromArchive();

    const posts = parseOrbitHtml(await response.text(), ORBIT_HANDLE);
    if (!posts.length) return fromArchive();

    return { handle: ORBIT_HANDLE, source: "live", posts };
  } catch {
    return fromArchive();
  }
}

export function formatOrbitDate(iso: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    timeZone: "Asia/Kolkata",
  }).format(new Date(iso));
}
