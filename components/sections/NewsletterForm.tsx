"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { useClickSound } from "@/lib/use-click-sound";

type State = "idle" | "sending" | "done" | "error";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<State>("idle");
  const [message, setMessage] = useState("");
  const click = useClickSound();

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    click();
    setState("sending");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const result = (await res.json()) as { ok: boolean; error?: string };

      if (result.ok) {
        setState("done");
        setMessage("You're on the list.");
        setEmail("");
      } else {
        setState("error");
        setMessage(result.error ?? "That didn't work. Try again?");
      }
    } catch {
      // Network failure, or the endpoint is not deployed yet. Say something
      // true and actionable rather than "unknown error".
      setState("error");
      setMessage("Couldn't reach the server. Email me instead?");
    }
  }

  return (
    <form onSubmit={onSubmit} className="w-full max-w-sm">
      <label htmlFor="newsletter-email" className="sr-only">
        Your email address
      </label>

      <div className="flex items-center gap-2 rounded-full border border-border bg-surface/60 py-1.5 pr-1.5 pl-4 focus-within:border-accent-2">
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="min-w-0 flex-1 bg-transparent text-sm text-fg outline-none placeholder:text-muted"
        />
        <button
          type="submit"
          disabled={state === "sending"}
          // The icon is the whole button, so the name has to be written here.
          aria-label="Subscribe to the newsletter"
          className="flex size-9 shrink-0 items-center justify-center rounded-full bg-accent text-bg transition-[transform,opacity] duration-200 hover:opacity-90 active:scale-95 disabled:opacity-50"
        >
          <Send size={16} aria-hidden="true" />
        </button>
      </div>

      {/* aria-live so the result is announced without moving focus. Always in
          the DOM: a region added at the same moment its text appears is often
          missed by screen readers. */}
      <p
        aria-live="polite"
        className={`mt-2 min-h-5 text-xs ${
          state === "error" ? "text-accent-2" : "text-muted"
        }`}
      >
        {message}
      </p>
    </form>
  );
}
