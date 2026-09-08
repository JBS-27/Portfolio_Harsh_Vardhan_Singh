import Image from "next/image";

export function EarthField() {
  return (
    <div className="relative mx-auto aspect-[4/5] w-full max-w-[560px] lg:max-w-none lg:aspect-[5/6]">
      <div className="absolute inset-0 overflow-hidden rounded-[1.75rem] border border-white/8">
        <Image
          src="/earth-space.jpg"
          alt="Earth in space, sunlit along the terminator"
          fill
          priority
          quality={90}
          sizes="(min-width: 1024px) 46vw, 90vw"
          className="object-cover object-[62%_42%]"
        />

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 18% 12%, rgb(255 220 160 / 0.34), transparent 58%), radial-gradient(ellipse 40% 28% at 8% 6%, rgb(255 248 230 / 0.55), transparent 46%)",
          }}
        />

        <div
          aria-hidden
          className="pointer-events-none absolute top-[11%] -left-[18%] h-px w-[160%] origin-left rotate-[-16deg] bg-linear-to-r from-transparent via-amber/80 to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute top-[13%] -left-[10%] h-[2px] w-[130%] origin-left rotate-[-16deg] bg-linear-to-r from-white/0 via-white/70 to-cyan/0 blur-[1px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute top-[9%] left-[6%] h-24 w-24 rounded-full bg-[radial-gradient(circle,rgb(255_248_220_/_0.9),rgb(251_191_36_/_0.18)_38%,transparent_70%)] blur-[2px]"
        />

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,#000_0%,transparent_28%,transparent_78%,#000_100%),linear-gradient(180deg,#000_0%,transparent_18%,transparent_82%,#000_100%)]"
        />
      </div>
    </div>
  );
}
