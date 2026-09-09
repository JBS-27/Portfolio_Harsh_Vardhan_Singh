import type { ReactNode } from "react";
import { cx } from "@/lib/utils";

type IconProps = { className?: string };

function Svg({
  className,
  children,
  viewBox = "0 0 24 24",
}: {
  className?: string;
  children: ReactNode;
  viewBox?: string;
}) {
  return (
    <svg viewBox={viewBox} className={className} aria-hidden fill="currentColor">
      {children}
    </svg>
  );
}

const icons: Record<string, (props: IconProps) => ReactNode> = {
  React: ({ className }) => (
    <Svg className={className}>
      <circle cx="12" cy="12" r="2.1" />
      <ellipse cx="12" cy="12" rx="10" ry="3.8" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <ellipse cx="12" cy="12" rx="10" ry="3.8" fill="none" stroke="currentColor" strokeWidth="1.4" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="3.8" fill="none" stroke="currentColor" strokeWidth="1.4" transform="rotate(120 12 12)" />
    </Svg>
  ),
  "Next.js": ({ className }) => (
    <Svg className={className}>
      <circle cx="12" cy="12" r="10" fill="currentColor" />
      <path d="M9 8h2.1l4.4 8H13.3L9 8z" fill="#000" />
      <path d="M15.2 8v8" stroke="#000" strokeWidth="1.6" />
    </Svg>
  ),
  TypeScript: ({ className }) => (
    <Svg className={className}>
      <rect x="2" y="2" width="20" height="20" rx="3" />
      <path
        d="M12.7 17.4v-1.6c.5.3 1.1.5 1.8.5.6 0 .9-.2.9-.5 0-.3-.2-.4-.9-.6l-1-.3c-1.3-.4-1.9-1.1-1.9-2.2 0-1.3 1.1-2.2 2.8-2.2.8 0 1.6.2 2.2.5v1.5c-.5-.3-1.1-.5-1.8-.5-.5 0-.8.2-.8.5s.3.4 1 .6l1 .3c1.4.4 2 1.1 2 2.3 0 1.4-1.1 2.3-3 2.3-.9 0-1.8-.2-2.3-.6zm-6.2-5.2h3.6v1.1H8.7V17.4H7.2v-4.1H5.5v-1.1h1z"
        fill="#fff"
      />
    </Svg>
  ),
  JavaScript: ({ className }) => (
    <Svg className={className}>
      <rect x="2" y="2" width="20" height="20" rx="3" />
      <path
        d="M11.1 17.5c0 1.3-.8 1.9-2.1 1.9-1.1 0-1.8-.5-2.2-1.2l1.2-.7c.2.4.5.7.9.7.5 0 .8-.2.8-.9v-5.2h1.4v5.4zm1.6.1c0-1.5 1-2.4 2.6-2.4.9 0 1.5.2 2 .6l-.9 1c-.3-.2-.7-.4-1.1-.4-.6 0-1 .4-1 1v.1c.4-.2.9-.4 1.5-.4 1.4 0 2.4.8 2.4 2.1 0 1.4-1.1 2.2-2.7 2.2-1.2 0-2.1-.5-2.6-1.3l1.1-.7c.3.5.8.8 1.4.8.6 0 1-.3 1-.8 0-.5-.4-.8-1.2-.8-.5 0-1 .1-1.5.4v-1.5z"
        fill="#111"
      />
    </Svg>
  ),
  "Tailwind CSS": ({ className }) => (
    <Svg className={className}>
      <path d="M12 6.5c-2.7 0-4.4 1.3-5 4 1-1.3 2.1-1.8 3.4-1.5.8.2 1.3.7 1.9 1.3.9 1 2 2.2 4.7 2.2 2.7 0 4.4-1.3 5-4-1 1.3-2.1 1.8-3.4 1.5-.8-.2-1.3-.7-1.9-1.3C15.8 7.7 14.7 6.5 12 6.5zm-5 6c-2.7 0-4.4 1.3-5 4 1-1.3 2.1-1.8 3.4-1.5.8.2 1.3.7 1.9 1.3.9 1 2 2.2 4.7 2.2 2.7 0 4.4-1.3 5-4-1 1.3-2.1 1.8-3.4 1.5-.8-.2-1.3-.7-1.9-1.3-1-1.2-2.1-2.4-4.7-2.4z" />
    </Svg>
  ),
  "HTML / CSS": ({ className }) => (
    <Svg className={className}>
      <path d="M4.4 3h15.2l-1.4 15.7L12 21l-6.2-2.3L4.4 3zm3.2 5.1h8.8l-.2 1.8H9.3l.2 1.9h6.7l-.6 6.3L12 19.1l-3.6-1.1-.2-2.3h1.8l.1 1.1 1.9.5 1.9-.5.2-2.2H8.6L7.6 8.1z" />
    </Svg>
  ),
  "Framer Motion": ({ className }) => (
    <Svg className={className}>
      <path d="M5 4h14v5.3H12L19 15h-7v5L5 14.7V4z" />
    </Svg>
  ),
  "Node.js": ({ className }) => (
    <Svg className={className}>
      <path d="M11.4 2.3 3.9 6.6c-.4.3-.7.8-.7 1.3v8.2c0 .6.3 1.1.7 1.3l7.5 4.3c.4.2.9.2 1.3 0l7.5-4.3c.4-.3.7-.8.7-1.3V7.9c0-.6-.3-1.1-.7-1.3L12.7 2.3c-.4-.2-.9-.2-1.3 0zM12 7.2c2.5 0 3.1 1.7 3.1 2.5h-1.6c0-.3-.2-1.1-1.5-1.1-1.2 0-1.7.5-1.7 1.1 0 .6.3.8 1.6 1.1l.9.2c1.8.4 2.7 1.1 2.7 2.6 0 1.6-1.2 2.7-3.4 2.7-2.4 0-3.5-1.3-3.6-2.8h1.7c.1.7.4 1.4 1.9 1.4 1.2 0 1.6-.5 1.6-1.1 0-.6-.3-.9-1.6-1.2l-.9-.2c-1.7-.4-2.7-1.2-2.7-2.6 0-1.6 1.3-2.6 3.3-2.6z" />
    </Svg>
  ),
  Express: ({ className }) => (
    <Svg className={className}>
      <path d="M3 13.2h5.4c.2 0 .3.1.3.3v.6c0 1.1-.9 1.9-2 1.9H4.6v1.8H3V13.2zm1.6 1.2v1h1.8c.3 0 .5-.2.5-.5s-.2-.5-.5-.5H4.6zm6.3 3.4-2.3-4.6h1.8l1.4 3 1.4-3h1.8l-2.4 4.6h-1.7zm5.8-4.6h1.6l2.5 3.5v-3.5H22v4.6h-1.5l-2.6-3.6v3.6h-1.6v-4.6z" />
    </Svg>
  ),
  FastAPI: ({ className }) => (
    <Svg className={className}>
      <circle cx="12" cy="12" r="10" />
      <path d="M8.4 12.8 12 6.6l3.6 6.2h-2.1v4.6H10.5v-4.6H8.4z" fill="#fff" />
    </Svg>
  ),
  Python: ({ className }) => (
    <Svg className={className}>
      <path d="M12.1 3c-4.2 0-3.9 1.8-3.9 1.8v2.1h4v.6H6.4S3 7.3 3 12.1c0 4.7 2.6 4.5 2.6 4.5h1.6v-2.2s-.1-2.6 2.6-2.6h4.4s2.5.1 2.5-2.4V6.9S17.9 3 12.1 3zm-2 1.4a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8z" />
      <path d="M11.9 21c4.2 0 3.9-1.8 3.9-1.8v-2.1h-4v-.6h5.8s3.4.2 3.4-4.6c0-4.7-2.6-4.5-2.6-4.5h-1.6v2.2s.1 2.6-2.6 2.6H9.8s-2.5-.1-2.5 2.4v3.1S6.1 21 11.9 21zm2 1.4a.9.9 0 1 1 0-1.8.9.9 0 0 1 0 1.8z" />
    </Svg>
  ),
  "REST APIs": ({ className }) => (
    <Svg className={className}>
      <path d="M7.2 8.2 3.6 12l3.6 3.8 1.2-1.1L6 12l2.4-2.7-1.2-1.1zm9.6 0-1.2 1.1L18 12l-2.4 2.7 1.2 1.1L20.4 12 16.8 8.2zM10.3 16.6h1.6l1.8-9.2h-1.6z" />
    </Svg>
  ),
  JWT: ({ className }) => (
    <Svg className={className}>
      <path d="M12 3.4 5 7v5.3c0 4.1 2.9 7.9 7 8.8 4.1-.9 7-4.7 7-8.8V7l-7-3.6zm0 2.1 5 2.6v4.2c0 3.1-2.1 6-5 6.8-2.9-.8-5-3.7-5-6.8V8.1l5-2.6zm0 2.3a3.2 3.2 0 1 0 2.1 5.6l1.6 1.6 1.1-1.1-1.6-1.6A3.2 3.2 0 0 0 12 7.8zm0 1.6a1.6 1.6 0 1 1 0 3.2 1.6 1.6 0 0 1 0-3.2z" />
    </Svg>
  ),
  TensorFlow: ({ className }) => (
    <Svg className={className}>
      <path d="M12.2 2.4 3.8 7v2.4l6.6-3.8v14.2l1.8 1 1.8-1V12l3.5 2v-2.6L12.2 8.6V2.4zm.1 0 8.3 4.6v2.4l-3-1.7V5.8l-5.3-3.4z" />
    </Svg>
  ),
  "scikit-learn": ({ className }) => (
    <Svg className={className}>
      <circle cx="8.2" cy="9.2" r="3.1" />
      <circle cx="16.4" cy="8.4" r="2.4" />
      <circle cx="13.4" cy="16.2" r="3.4" />
    </Svg>
  ),
  Streamlit: ({ className }) => (
    <Svg className={className}>
      <path d="M5.2 16.6c1.6-3.6 4.6-8.8 6.8-8.8 1.2 0 1.8 1.3 2.4 2.6.6 1.4 1.3 2.8 2.6 2.8 1.8 0 2.8-2.5 2.8-2.5l1.4.7s-1.3 3.8-4.2 3.8c-1.6 0-2.5-1.3-3.1-2.6-.6-1.3-1.1-2.4-2-2.4-1.6 0-4 4.2-4.9 6.2l-1.8-.8z" />
    </Svg>
  ),
  LLMs: ({ className }) => (
    <Svg className={className}>
      <path d="M12 3.5 4.5 8v8L12 20.5 19.5 16V8L12 3.5zm0 2.2 5.3 3.1v5.4L12 17.3 6.7 14.2V8.8L12 5.7zM9.6 10.4h4.8v1.3h-1.7v4h-1.4v-4H9.6v-1.3z" />
    </Svg>
  ),
  "CNN–LSTM–GRU": ({ className }) => (
    <Svg className={className}>
      <rect x="3" y="6" width="4" height="12" rx="1" />
      <rect x="8.5" y="8" width="3" height="8" rx="1" />
      <rect x="13" y="5" width="3.2" height="14" rx="1" />
      <path d="M17 12h4M19.4 9.6 21.8 12l-2.4 2.4" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </Svg>
  ),
  SHAP: ({ className }) => (
    <Svg className={className}>
      <path d="M12 3 5 7.2v9.6L12 21l7-4.2V7.2L12 3zm0 2.4 5 3v6.2l-5 3-5-3V8.4l5-3z" />
      <circle cx="12" cy="12" r="2.2" />
    </Svg>
  ),
  "RLHF foundations": ({ className }) => (
    <Svg className={className}>
      <path d="M8 14.5a4 4 0 1 1 8 0H8zm-2.2 1.6h12.4v1.6H5.8v-1.6zM7 18.8h10v1.5H7v-1.5zM12 4.2l1.3 2.7 3 .4-2.2 2.1.5 3L12 11.1 9.4 12.4l.5-3-2.2-2.1 3-.4L12 4.2z" />
    </Svg>
  ),
  MongoDB: ({ className }) => (
    <Svg className={className}>
      <path d="M12.4 2s4.8 3.4 4.8 9.4c0 5.2-3.3 8.1-4.4 8.8-.2.1-.3.1-.4.2V2.1c.1 0 .10.0.0.4zm-.8 0C11.5 2 11.4 2 11.3 2 10.2 2.8 6.8 5.6 6.8 11.4c0 6 4.8 9.4 4.8 9.4s.1 0 .2-.1c-1.1-.8-4.1-3.6-4.1-8.6 0-6 4-9.4 4.7-10.1z" />
    </Svg>
  ),
  MySQL: ({ className }) => (
    <Svg className={className}>
      <path d="M4.4 15.6c.4.3 1 .4 1.6.4 1.3 0 2-.6 2-1.6 0-.8-.5-1.3-1.5-1.7l-.7-.3c-.4-.2-.6-.4-.6-.7 0-.4.3-.6.9-.6.5 0 .9.1 1.2.4l.5-1.1c-.5-.3-1.1-.5-1.8-.5-1.2 0-2 .7-2 1.6 0 .8.5 1.3 1.5 1.7l.7.3c.4.2.6.4.6.7 0 .4-.4.7-1 .7-.6 0-1.1-.2-1.5-.5l-.4 1.2zm5.2-4.4h-1.4l1.8 5.2h1.5l1.8-5.2h-1.4l-1.1 3.5-1.2-3.5zm5.1 0v5.2h1.3v-2.1h1.7c1.5 0 2.3-.7 2.3-1.6 0-.9-.8-1.5-2.2-1.5h-3.1zm1.3 1.1h1.5c.6 0 1 .3 1 .7s-.4.7-1 .7h-1.5v-1.4zM4 8.2c2.2-1 4.6-1.6 8-1.6s5.8.6 8 1.6" fill="none" stroke="currentColor" strokeWidth="1.4" />
    </Svg>
  ),
  Postgres: ({ className }) => (
    <Svg className={className}>
      <path d="M16.7 4.6c-1-.7-2.4-1-3.9-.9-2.1.1-4.2 1.1-5.3 3.1C6.3 8.6 6 10.7 6.3 13c.1.8.4 1.6.8 2.3-.2.6-.2 1.3 0 2 .3 1 1.1 1.7 2.1 1.9.3.7.9 1.2 1.6 1.5.8.3 1.7.3 2.5 0 .5-.2.9-.6 1.1-1.1.8 0 1.6-.2 2.3-.6.9-.6 1.4-1.5 1.5-2.6.6-.3 1.1-.8 1.4-1.4.4-.8.5-1.7.3-2.6-.3-1.2-1.1-2.2-2.2-2.8.1-.7 0-1.5-.3-2.1-.4-.9-1.1-1.6-2-2.1zm-4.3 12.6c-.4 0-.8-.2-1-.5l.1-.1c.2.1.5.1.7.1h.3l-.1.5zm4.6-3.4c-.2.1-.4.1-.6.1h-.2c0-.4-.1-.8-.2-1.2.6.2 1.1.6 1 .1.1.4 0 .7 0 1z" />
    </Svg>
  ),
  SQL: ({ className }) => (
    <Svg className={className}>
      <ellipse cx="12" cy="6.5" rx="7.5" ry="3" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4.5 6.5v11c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3v-11" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4.5 12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </Svg>
  ),
};

const tones: Record<string, string> = {
  React: "text-[#61DAFB] bg-[#61DAFB]/12",
  "Next.js": "text-white bg-white/10",
  TypeScript: "text-[#3178C6] bg-[#3178C6]/15",
  JavaScript: "text-[#F7DF1E] bg-[#F7DF1E]/12",
  "Tailwind CSS": "text-[#38BDF8] bg-[#38BDF8]/12",
  "HTML / CSS": "text-[#E34F26] bg-[#E34F26]/12",
  "Framer Motion": "text-[#A78BFA] bg-[#A78BFA]/12",
  "Node.js": "text-[#5FA04E] bg-[#5FA04E]/12",
  Express: "text-white bg-white/10",
  FastAPI: "text-[#009688] bg-[#009688]/15",
  Python: "text-[#3776AB] bg-[#3776AB]/15",
  "REST APIs": "text-cyan bg-cyan/10",
  JWT: "text-amber bg-amber/10",
  TensorFlow: "text-[#FF6F00] bg-[#FF6F00]/12",
  "scikit-learn": "text-[#F7931E] bg-[#F7931E]/12",
  Streamlit: "text-[#FF4B4B] bg-[#FF4B4B]/12",
  LLMs: "text-violet bg-violet/15",
  "CNN–LSTM–GRU": "text-cyan bg-cyan/10",
  SHAP: "text-[#60A5FA] bg-[#60A5FA]/12",
  "RLHF foundations": "text-amber bg-amber/10",
  MongoDB: "text-[#47A248] bg-[#47A248]/12",
  MySQL: "text-[#4479A1] bg-[#4479A1]/15",
  Postgres: "text-[#4169E1] bg-[#4169E1]/15",
  SQL: "text-[#93C5FD] bg-[#93C5FD]/10",
};

export const skillGlow: Record<string, string> = {
  React: "rgba(97, 218, 251, 0.38)",
  "Next.js": "rgba(255, 255, 255, 0.28)",
  TypeScript: "rgba(49, 120, 198, 0.4)",
  JavaScript: "rgba(247, 223, 30, 0.32)",
  "Tailwind CSS": "rgba(56, 189, 248, 0.36)",
  "HTML / CSS": "rgba(227, 79, 38, 0.36)",
  "Framer Motion": "rgba(255, 0, 85, 0.32)",
  "Node.js": "rgba(95, 160, 78, 0.38)",
  Express: "rgba(255, 255, 255, 0.22)",
  FastAPI: "rgba(0, 150, 136, 0.4)",
  Python: "rgba(55, 118, 171, 0.4)",
  "REST APIs": "rgba(103, 200, 212, 0.32)",
  JWT: "rgba(251, 191, 36, 0.3)",
  TensorFlow: "rgba(255, 111, 0, 0.38)",
  "scikit-learn": "rgba(247, 147, 30, 0.36)",
  Streamlit: "rgba(255, 75, 75, 0.34)",
  LLMs: "rgba(124, 58, 237, 0.36)",
  "CNN–LSTM–GRU": "rgba(103, 200, 212, 0.32)",
  SHAP: "rgba(96, 165, 250, 0.34)",
  "RLHF foundations": "rgba(251, 191, 36, 0.3)",
  MongoDB: "rgba(71, 162, 72, 0.4)",
  MySQL: "rgba(68, 121, 161, 0.38)",
  Postgres: "rgba(65, 105, 225, 0.38)",
  SQL: "rgba(147, 197, 253, 0.3)",
};

export function SkillGlyph({ name, className }: { name: string; className?: string }) {
  const Icon = icons[name];
  if (!Icon) {
    return <span className="font-mono text-[10px] tracking-[0.12em]">{name[0]}</span>;
  }
  return <Icon className={className} />;
}

export function SkillChip({ name }: { name: string }) {
  const Icon = icons[name];
  return (
    <span
      className={cx(
        "inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/2 px-2.5 py-1.5 text-sm text-ink/90",
        "transition duration-400 hover:border-cyan/35 hover:bg-white/4 hover:shadow-[0_0_18px_rgb(34_211_238/0.16)]",
      )}
    >
      <span
        className={cx(
          "grid size-8 shrink-0 place-items-center rounded-[0.55rem]",
          tones[name] ?? "text-ink bg-white/8",
        )}
      >
        {Icon ? <Icon className="size-[18px]" /> : <span className="text-[10px] font-mono">{name[0]}</span>}
      </span>
      <span className="pr-0.5">{name}</span>
    </span>
  );
}
