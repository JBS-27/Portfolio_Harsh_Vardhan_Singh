"use client";

import { useState } from "react";
import { projects } from "@/lib/data";
import { cx } from "@/lib/utils";

const stack = ["Conv1D", "LSTM", "GRU", "Attention"];

export function CaseInstrument({ slug }: { slug: string }) {
  if (slug === "aqi-forecasting") return <AqiInstrument />;
  if (slug === "nirmaan") return <LedgerInstrument />;
  return null;
}

function AqiInstrument() {
  const project = projects.find((item) => item.slug === "aqi-forecasting");
  const results = project?.caseStudy.results ?? [];
  const [active, setActive] = useState(0);
  const current = results[active];
  if (!current) return null;

  return (
    <section className="mt-14 border border-white/10 px-5 py-6 sm:px-8 sm:py-8">
      <p className="type-meta text-faint">Instrument</p>
      <p className="mt-4 font-display text-[clamp(2.2rem,5vw,3.6rem)] leading-none tracking-[-0.05em] text-ink">
        {current.value}
      </p>
      <p className="mt-3 text-sm text-muted">{current.label}</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {results.map((result, index) => (
          <button
            key={result.label}
            type="button"
            aria-pressed={index === active}
            onClick={() => setActive(index)}
            className={cx(
              "border px-3 py-2 font-mono text-[10px] tracking-[0.16em] uppercase",
              index === active
                ? "border-accent/50 text-ink"
                : "border-white/10 text-faint hover:text-ink",
            )}
          >
            {result.label}
          </button>
        ))}
      </div>
      <ol className="mt-8 grid gap-2 sm:grid-cols-4">
        {stack.map((step, index) => (
          <li key={step} className="border border-white/10 px-3 py-3">
            <p className="type-meta text-faint">{String(index + 1).padStart(2, "0")}</p>
            <p className="mt-2 font-display text-lg tracking-[-0.03em] text-ink">{step}</p>
          </li>
        ))}
      </ol>
      <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted">
        Attention weights which days actually matter. A national average can still miss a city like Patna.
      </p>
    </section>
  );
}

function LedgerInstrument() {
  const project = projects.find((item) => item.slug === "nirmaan");
  const ledger = project?.caseStudy.decisions.find((item) => item.title === "Ledger before LLM");
  const rows = [
    {
      label: "Cement left",
      body: "Read from the bill of quantities on the twin.",
    },
    {
      label: "Cash envelope",
      body: "Scoped to the signed-in owner, beside the materials.",
    },
    {
      label: "Crew",
      body: "Attendance stays on the same record as the money.",
    },
  ];
  const [row, setRow] = useState(0);
  const [model, setModel] = useState(false);
  const current = rows[row];

  return (
    <section className="mt-14 border border-white/10 px-5 py-6 sm:px-8 sm:py-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="type-meta text-faint">Instrument</p>
        <button
          type="button"
          aria-pressed={model}
          onClick={() => setModel((value) => !value)}
          className={cx(
            "border px-3 py-2 font-mono text-[10px] tracking-[0.16em] uppercase",
            model ? "border-accent/50 text-ink" : "border-white/10 text-faint",
          )}
        >
          Model {model ? "on" : "off"}
        </button>
      </div>
      <div className="mt-6 grid gap-2 sm:grid-cols-3">
        {rows.map((item, index) => (
          <button
            key={item.label}
            type="button"
            aria-pressed={index === row}
            onClick={() => setRow(index)}
            className={cx(
              "border px-4 py-4 text-left",
              index === row ? "border-white/30" : "border-white/10",
            )}
          >
            <p className="type-meta text-faint">{String(index + 1).padStart(2, "0")}</p>
            <p className="mt-2 font-display text-2xl tracking-[-0.04em] text-ink">{item.label}</p>
          </button>
        ))}
      </div>
      <p className="mt-6 max-w-xl text-[1.02rem] leading-relaxed text-muted">{current.body}</p>
      <p className="mt-4 max-w-xl border-l border-white/20 pl-4 text-sm leading-relaxed text-ink">
        {model
          ? "Grok, OpenAI, or Gemini sit on top of those numbers."
          : (ledger?.body ?? "The twin is useful even without a model.")}
      </p>
    </section>
  );
}
