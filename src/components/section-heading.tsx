import { cx } from "@/lib/utils";

type SectionHeadingProps = {
  index: string;
  eyebrow: string;
  title?: string;
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
    <div className={cx("max-w-4xl", className)}>
      <p className="type-meta mb-6 flex items-center gap-3 text-faint">
        <span className="text-accent">{index}</span>
        <span className="text-accent/50">/</span>
        {eyebrow}
      </p>
      {title ? (
        <h2 className="type-section max-w-[18ch] text-ink">
          {title}
        </h2>
      ) : null}
      {description ? (
        <p className="mt-6 max-w-lg text-[1.05rem] leading-relaxed text-muted">
          {description}
        </p>
      ) : null}
    </div>
  );
}
