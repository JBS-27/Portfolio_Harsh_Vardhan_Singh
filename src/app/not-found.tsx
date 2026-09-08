import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center px-5">
      <div className="text-center">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-faint">
          404
        </p>
        <h1 className="mt-4 font-display text-5xl text-ink">Off the board.</h1>
        <p className="mt-3 text-muted">That page isn’t in this campaign.</p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-ink px-5 py-2.5 text-sm text-bg"
        >
          Back home
        </Link>
      </div>
    </main>
  );
}
