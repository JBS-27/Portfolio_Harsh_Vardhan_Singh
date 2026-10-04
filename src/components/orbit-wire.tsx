import Image from "next/image";
import { formatOrbitDate, type OrbitWire as OrbitWireData } from "@/lib/orbit";

const kindLabel = {
  studio: "Studio",
  ship: "Ship",
  note: "Note",
} as const;

export function OrbitWire({ wire }: { wire: OrbitWireData }) {
  if (!wire.posts.length) return null;

  return (
    <section id="wire" className="relative scroll-mt-28">
      <div className="mx-auto max-w-7xl px-5 pt-6 pb-4 sm:px-8">
        <div className="flex flex-wrap items-baseline justify-between gap-3 border-t border-white/10 pt-8">
          <p className="type-meta text-faint">
            Wire <span className="text-accent/55">/</span> @{wire.handle}
          </p>
          <p className="type-meta text-faint">
            {wire.source === "live" ? "From X" : "Last good copy"}
          </p>
        </div>

        <ol className="mt-2 divide-y divide-white/10 border-b border-white/10">
          {wire.posts.map((post) => (
            <li
              key={post.id}
              className="grid gap-3 py-5 sm:grid-cols-[7.5rem_5.5rem_1fr_auto] sm:items-start sm:gap-6"
            >
              <p className="type-meta text-faint">{formatOrbitDate(post.createdAt)}</p>
              <p className="type-meta text-accent/80">{kindLabel[post.kind]}</p>
              <div>
                <a
                  href={post.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="line-clamp-2 text-[1.02rem] leading-relaxed text-ink hover:text-white"
                >
                  {post.text}
                </a>
                {post.liveUrl ? (
                  <a
                    href={post.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 block text-sm text-muted hover:text-ink"
                  >
                    {post.liveUrl.replace(/^https:\/\//, "")}
                  </a>
                ) : null}
              </div>
              {post.image ? (
                <a
                  href={post.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative hidden h-16 w-28 overflow-hidden bg-black sm:block"
                >
                  <Image
                    src={post.image}
                    alt=""
                    fill
                    unoptimized
                    sizes="112px"
                    className="object-cover"
                  />
                </a>
              ) : (
                <span className="hidden w-28 sm:block" />
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
