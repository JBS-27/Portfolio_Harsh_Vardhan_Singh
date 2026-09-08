import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center px-5">
      <div>
        <p className="font-mono text-[10px] tracking-[0.24em] text-cyan uppercase">
          {`Signal lost // 404`}
        </p>
        <h1 className="mt-4 font-display text-5xl tracking-[-0.05em] text-ink">
          Off trajectory.
        </h1>
        <p className="mt-3 text-muted">That coordinate is empty.</p>
        <Link
          href="/"
          className="mt-8 inline-flex bg-white px-5 py-2.5 text-sm text-black"
        >
          Return to launch
        </Link>
      </div>
    </main>
  );
}
