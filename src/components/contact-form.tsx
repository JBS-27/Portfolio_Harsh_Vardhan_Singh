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

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
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
        const subject = encodeURIComponent(`Portfolio note from ${String(data.name)}`);
        const body = encodeURIComponent(
          `${String(data.message)}\n\n— ${String(data.name)} (${String(data.email)})`,
        );
        window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
      }

      form.reset();
      setStatus("sent");
      setMessage(
        payload.fallback === "mailto"
          ? "Opening your mail app — or write me directly."
          : "Sent. I’ll get back to you.",
      );
    } catch {
      setStatus("error");
      setMessage("Something broke. Email me instead — it’s faster anyway.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <label className="block">
        <span className="mb-2 block text-sm text-muted">Name</span>
        <input
          required
          name="name"
          autoComplete="name"
          className="w-full border border-white/10 bg-black px-4 py-3 text-ink outline-none placeholder:text-faint focus:border-cyan"
          placeholder="Your name"
        />
      </label>
      <label className="block">
        <span className="mb-2 block text-sm text-muted">Email</span>
        <input
          required
          type="email"
          name="email"
          autoComplete="email"
          className="w-full border border-white/10 bg-black px-4 py-3 text-ink outline-none placeholder:text-faint focus:border-cyan"
          placeholder="you@studio.com"
        />
      </label>
      <label className="block">
        <span className="mb-2 block text-sm text-muted">Message</span>
        <textarea
          required
          name="message"
          rows={5}
          className="w-full resize-y border border-white/10 bg-black px-4 py-3 text-ink outline-none placeholder:text-faint focus:border-cyan"
          placeholder="What are we making?"
        />
      </label>
      <MagneticButton
        type="submit"
        className="w-full border border-white/10 bg-white text-black hover:bg-cyan disabled:opacity-60 sm:w-auto"
      >
        {status === "sending" ? "Sending…" : "Send message"}
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
