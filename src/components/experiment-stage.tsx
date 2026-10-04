"use client";

import { useState } from "react";
import type { Project } from "@/lib/data";

export function ExperimentStage({ project }: { project: Project }) {
  const [running, setRunning] = useState(false);

  if (!project.liveUrl) return null;

  return (
    <div className="border border-white/10 bg-black">
      {running ? (
        <div>
          <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-3">
            <p className="type-meta text-faint">{project.title}</p>
            <button
              type="button"
              onClick={() => setRunning(false)}
              className="type-meta text-muted hover:text-ink"
            >
              Close
            </button>
          </div>
          <div className="relative aspect-video bg-black">
            <iframe
              src={project.liveUrl}
              title={project.title}
              className="absolute inset-0 h-full w-full"
              loading="lazy"
              allow="fullscreen"
            />
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap items-center justify-between gap-4 px-5 py-5 sm:px-6">
          <p className="max-w-xl text-sm leading-relaxed text-muted">
            This one runs here. The case study stays a click away.
          </p>
          <button
            type="button"
            onClick={() => setRunning(true)}
            className="type-meta text-ink"
          >
            Run the piece
          </button>
        </div>
      )}
    </div>
  );
}
