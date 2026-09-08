import { cx } from "@/lib/utils";

type SectionHeadingProps = {
  index: string;
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
};

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cx("max-w-3xl", className)}>
      <p className="mb-5 flex items-center gap-4 font-mono text-[10px] tracking-[0.28em] text-faint uppercase">
        <span className="text-cyan">{index}</span>
        <span className="h-px w-10 bg-white/15" />
        {eyebrow}
      </p>
      <h2 className="glow-title font-display text-4xl leading-[0.95] font-medium tracking-[-0.04em] text-ink sm:text-6xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">
          {description}
        </p>
      ) : null}
    </div>
  );
}
