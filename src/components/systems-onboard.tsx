import { learningNow, skillGroups } from "@/lib/data";
import { SkillGlyph, skillGlow } from "@/components/skill-icons";
import { cx } from "@/lib/utils";

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

const groupGlow: Record<string, string> = {
  Frontend: "rgba(97, 218, 251, 0.58)",
  Backend: "rgba(0, 150, 136, 0.55)",
  "Data & AI": "rgba(255, 111, 0, 0.55)",
  Databases: "rgba(71, 162, 72, 0.58)",
};

const groups = skillGroups.slice(0, 4);

export function SystemsOnboard() {
  return (
    <div id="skills" className="mt-24 scroll-mt-28 border-t border-white/10 pt-12">
      <p className="type-meta text-faint">Systems onboard</p>
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
        {groups.map((group, index) => (
          <article
            key={group.title}
            data-cursor="interactive"
            className="group relative flex min-h-full min-w-0 flex-col rounded-2xl border border-white/10 bg-white/[0.035] px-5 py-6 backdrop-blur-sm transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:border-white/25 hover:shadow-[0_0_40px_2px_var(--group-glow),0_22px_48px_-10px_var(--group-glow)] sm:px-6 sm:py-7"
            style={{
              ["--group-glow" as string]: groupGlow[group.title] ?? "rgba(243,241,234,0.22)",
            }}
          >
            <p className="type-meta text-faint">
              {String(index + 1).padStart(2, "0")} / {group.title}
            </p>
            <h3 className="mt-3 font-display text-[1.65rem] tracking-[-0.04em] text-ink">
              {group.title}
            </h3>
            <ul className="mt-6 grid flex-1 grid-cols-2 gap-2.5">
              {group.items.map((name) => (
                <li
                  key={name}
                  className="flex min-w-0 items-center gap-3 rounded-xl border border-white/6 bg-black/25 px-2.5 py-2"
                >
                  <span
                    className={cx(
                      "grid size-8 shrink-0 place-items-center rounded-lg",
                      tones[name] ?? "bg-white/8 text-ink",
                    )}
                    style={{
                      boxShadow: `0 0 18px -6px ${skillGlow[name] ?? "transparent"}`,
                    }}
                  >
                    <SkillGlyph name={name} className="size-[17px]" />
                  </span>
                  <span className="truncate text-sm tracking-[-0.015em] text-ink/90">
                    {name}
                  </span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <p className="type-meta mt-10 text-faint">
        {`Learning // ${learningNow.join(" / ")}`}
      </p>
    </div>
  );
}
