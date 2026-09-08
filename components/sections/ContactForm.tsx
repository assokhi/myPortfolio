"use client";

import { useState } from "react";
import Script from "next/script";
import { Send } from "lucide-react";
import { profile, mailtoHref } from "@/content/profile";
import { useClickSound } from "@/lib/use-click-sound";

type State = "idle" | "sending" | "done" | "error";

const fieldClass =
  "w-full rounded-xl border border-border bg-surface/60 px-4 py-2.5 text-sm text-fg outline-none transition-colors placeholder:text-muted focus:border-accent-2";

/** Public by design — it is rendered into the page for the browser to use. The
 *  secret half never leaves the Worker. Empty at build time means Turnstile was
 *  not configured, and the widget is skipped entirely rather than rendering a
 *  broken box. */
const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

export default function ContactForm() {
  const [state, setState] = useState<State>("idle");
  const [message, setMessage] = useState("");
  const click = useClickSound();

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    click();
    setState("sending");

    const form = new FormData(event.currentTarget);
    const payload = {
      name: String(form.get("name") ?? ""),
      email: String(form.get("email") ?? ""),
      subject: String(form.get("subject") ?? ""),
      message: String(form.get("message") ?? ""),
      // Turnstile writes its token into this hidden input. Absent when the
      // widget is not configured; the Worker treats it as required only when
      // it has a secret key of its own.
      token: String(form.get("cf-turnstile-response") ?? ""),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await res.json()) as { ok: boolean; error?: string };

      if (result.ok) {
        setState("done");
        setMessage("Sent. I read everything and usually reply within a day.");
        (event.target as HTMLFormElement).reset();
      } else {
        setState("error");
        setMessage(result.error ?? "That didn't send. Try again?");
      }
    } catch {
      setState("error");
      setMessage("Couldn't reach the server.");
    }
  }

  return (
    <>
      {SITE_KEY ? (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          strategy="lazyOnload"
        />
      ) : null}

      <form onSubmit={onSubmit} className="mt-8 max-w-xl space-y-4">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-fg">
            Name
          </label>
          <input id="name" name="name" required autoComplete="name" className={fieldClass} />
        </div>

        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-fg">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="subject" className="mb-1.5 block text-sm font-medium text-fg">
            Subject
          </label>
          {/* A native <select>. It is keyboard operable, screen-reader correct
              and touch-friendly on every platform without a line of code —
              which no div-based listbox manages on the first try. */}
          <select id="subject" name="subject" required className={fieldClass} defaultValue={profile.contactSubjects[0]}>
            {profile.contactSubjects.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-fg">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={6}
            className={`${fieldClass} resize-y`}
          />
        </div>

        {SITE_KEY ? (
          <div className="cf-turnstile" data-sitekey={SITE_KEY} data-theme="auto" />
        ) : null}

        <button
          type="submit"
          disabled={state === "sending"}
          className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-bg transition-[opacity,transform] duration-200 hover:opacity-90 active:scale-[0.98] disabled:opacity-50"
        >
          <Send size={16} aria-hidden="true" />
          {state === "sending" ? "Sending…" : "Send message"}
        </button>

        <p
          aria-live="polite"
          className={`min-h-5 text-sm ${state === "error" ? "text-accent-2" : "text-muted"}`}
        >
          {message}
        </p>

        {/* The escape hatch. If the endpoint is down, or Turnstile blocks a
            real person, there is still a way to reach me on this page. */}
        {state === "error" ? (
          <p className="text-sm text-muted">
            Or email me directly at{" "}
            <a href={mailtoHref} className="underline underline-offset-4 hover:text-fg">
              {profile.email}
            </a>
            .
          </p>
        ) : null}
      </form>
    </>
  );
}
