export type OrbitKind = "studio" | "ship" | "note";

export type OrbitPost = {
  id: string;
  text: string;
  createdAt: string;
  href: string;
  image?: string;
  media: "photo" | "video" | "none";
  kind: OrbitKind;
  liveUrl?: string;
};

const FULL_TEXT = /full_text:"((?:\\.|[^"\\])*)"/g;

function unescapeText(value: string) {
  return value
    .replace(/\\n/g, "\n")
    .replace(/\\r/g, "")
    .replace(/\\"/g, '"')
    .replace(/\\\\/g, "\\")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

function classify(text: string, liveUrl?: string): OrbitKind {
  if (/billboard|concept\s*#|campaign/i.test(text)) return "studio";
  if (liveUrl) return "ship";
  return "note";
}

export function parseOrbitHtml(html: string, handle: string): OrbitPost[] {
  const posts: OrbitPost[] = [];
  const seen = new Set<string>();

  for (const match of html.matchAll(FULL_TEXT)) {
    const raw = match[1];
    if (!raw || match.index === undefined) continue;

    const start = match.index + match[0].length;
    const next = html.indexOf("full_text:", start);
    const after = html.slice(start, next === -1 ? start + 2800 : next);
    const before = html.slice(Math.max(0, match.index - 420), match.index);

    const id =
      after.match(/edit_tweet_ids:\$R\[\d+\]=\["(\d+)"\]/)?.[1] ??
      after.match(/entry_id:"tweet-(\d+)"/)?.[1];
    const created = before.match(/created_at_ms:(\d+)/)?.[1];
    if (!id || !created || seen.has(id)) continue;

    const text = unescapeText(raw)
      .replace(/https:\/\/t\.co\/\w+/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    if (!text || text.startsWith("@") || text.startsWith("RT @")) continue;

    const mediaUrl = after.match(/media_url_https:"(https:[^"]+)"/)?.[1];
    const mediaType = after.match(/type:"(photo|video)"/)?.[1];
    const image = mediaUrl ? unescapeText(mediaUrl) : undefined;

    const liveUrl = [...after.matchAll(/expanded_url:"(https:[^"]+)"/g)]
      .map((item) => unescapeText(item[1]))
      .find(
        (url) =>
          /vercel\.app|github\.com/i.test(url) &&
          !url.includes("/status/") &&
          !url.includes("x.com/") &&
          !url.includes("twitter.com/"),
      );

    seen.add(id);
    posts.push({
      id,
      text,
      createdAt: new Date(Number(created)).toISOString(),
      href: `https://x.com/${handle}/status/${id}`,
      image,
      media: mediaType === "photo" || mediaType === "video" ? mediaType : "none",
      kind: classify(text, liveUrl),
      liveUrl,
    });
  }

  return posts.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)).slice(0, 6);
}
