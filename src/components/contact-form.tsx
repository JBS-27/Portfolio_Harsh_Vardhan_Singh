"use client";

import { useState } from "react";
import { site } from "@/lib/data";
import { MagneticButton } from "@/components/magnetic-button";

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setMessage("");

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const windowLabel = String(data.window ?? "").trim();
    const mission = String(data.message ?? "").trim();
    const dispatch = {
      name: String(data.name ?? ""),
      email: String(data.email ?? ""),
      message: windowLabel ? `Window: ${windowLabel}\n\n${mission}` : mission,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dispatch),
      });
      const payload = (await response.json()) as {
        ok?: boolean;
        fallback?: string;
        error?: string;
      };

      if (!response.ok) {
        throw new Error(payload.error || "Could not send");
      }

      if (payload.fallback === "mailto") {
        const subject = encodeURIComponent(`Mission from ${dispatch.name}`);
        const body = encodeURIComponent(
          `${dispatch.message}\n\n— ${dispatch.name} (${dispatch.email})`,
        );
        window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
      }

      form.reset();
      setStatus("sent");
      setMessage(
        payload.fallback === "mailto"
          ? "Opening your mail app — or write me directly."
          : "SYS // RECEIVED",
      );
    } catch {
      setStatus("error");
      setMessage("Something broke. Email me instead — it’s faster anyway.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <label className="block">
        <span className="mb-2 block type-meta text-faint">Signal</span>
        <input
          required
          name="name"
          autoComplete="name"
          className="w-full border-b border-white/12 bg-transparent px-0 py-3 text-ink outline-none placeholder:text-faint focus:border-ink/50"
          placeholder="Your name"
        />
      </label>
      <label className="block">
        <span className="mb-2 block type-meta text-faint">Channel</span>
        <input
          required
          type="email"
          name="email"
          autoComplete="email"
          className="w-full border-b border-white/12 bg-transparent px-0 py-3 text-ink outline-none placeholder:text-faint focus:border-ink/50"
          placeholder="you@studio.com"
        />
      </label>
      <label className="block">
        <span className="mb-2 block type-meta text-faint">Window</span>
        <select
          required
          name="window"
          defaultValue=""
          className="w-full border-b border-white/12 bg-transparent px-0 py-3 text-ink outline-none [color-scheme:dark] focus:border-ink/50"
        >
          <option value="" disabled>
            Choose one
          </option>
          <option>Internship</option>
          <option>Freelance</option>
          <option>Collaboration</option>
          <option>Full-time</option>
        </select>
      </label>
      <label className="block">
        <span className="mb-2 block type-meta text-faint">Mission</span>
        <textarea
          required
          name="message"
          rows={5}
          className="w-full resize-y border-b border-white/12 bg-transparent px-0 py-3 text-ink outline-none placeholder:text-faint focus:border-ink/50"
          placeholder="What should get finished?"
        />
      </label>
      <MagneticButton
        type="submit"
        className="w-full border border-white/12 bg-ink text-black hover:bg-white disabled:opacity-60 sm:w-auto"
      >
        {status === "sending" ? "Sending…" : "Dispatch"}
      </MagneticButton>
      {message ? (
        <p
          role="status"
          className={status === "error" ? "text-sm text-red-400" : "text-sm text-muted"}
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
