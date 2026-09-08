"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import { useClickSound } from "@/lib/use-click-sound";

/** "Mail Me" — copies the address instead of opening a mail client.
 *
 *  Why copy rather than mailto: a recruiter on a work laptop often has no mail
 *  client bound to mailto:, and a dead click is worse than an extra paste. The
 *  address is also rendered as a real mailto link elsewhere on the page, so
 *  nothing is lost for people who do have one. */
export default function CopyEmailButton({
  email,
  className,
}: {
  email: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const click = useClickSound();

  // Clearing on unmount keeps setState off a component that has gone away.
  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  async function copy() {
    click();
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard is permission-gated and absent over plain HTTP. Falling back
      // to the mail client beats a button that silently does nothing.
      window.location.href = `mailto:${email}`;
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-2 text-sm font-medium text-fg transition-[background-color,transform] duration-200 hover:bg-surface active:scale-[0.98]",
        className,
      )}
    >
      {copied ? (
        <Check size={16} aria-hidden="true" className="text-mint" />
      ) : (
        <Copy size={16} aria-hidden="true" />
      )}
      {copied ? "Copied" : "Mail me"}
      {/* The visible label already changes, but a screen reader gets no event
          from a text swap inside a button it is not focused on. This says it
          out loud once. */}
      <span aria-live="polite" className="sr-only">
        {copied ? `${email} copied to clipboard` : ""}
      </span>
    </button>
  );
}
