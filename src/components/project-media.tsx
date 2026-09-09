import Image from "next/image";
import type { Project } from "@/lib/data";
import { ProjectCover } from "@/components/project-cover";
import { cx } from "@/lib/utils";

export function isProjectPhoto(src: string) {
  return /\.(jpe?g|png|webp)$/i.test(src);
}

export function ProjectMedia({
  project,
  sizes,
  priority,
  className,
}: {
  project: Project;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  if (project.image.endsWith(".svg")) {
    return (
      // Decorative cover; next/image does not optimize local SVGs.
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={project.image}
        alt={`${project.title} — ${project.subtitle}`}
        className={cx("absolute inset-0 h-full w-full object-cover", className)}
      />
    );
  }

  if (!isProjectPhoto(project.image)) {
    return (
      <div
        className={cx("absolute inset-0", className)}
        style={{
          background: `linear-gradient(155deg, ${project.cover.from}, ${project.cover.to})`,
        }}
      >
        <ProjectCover motif={project.cover.motif} title={project.title} />
      </div>
    );
  }

  return (
    <Image
      src={project.image}
      alt={`${project.title} — ${project.subtitle}`}
      fill
      sizes={sizes}
      priority={priority}
      className={cx("object-cover", className)}
    />
  );
}
