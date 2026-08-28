"use client";

import { useState } from "react";
import { cn, cardSurface } from "@/lib/utils";

/** Restrained blue/cyan/purple, plus a neutral for the catch-all bucket —
 *  never rainbow. Cycles if there are ever more languages than colours. */
const COLORS = ["#60a5fa", "#22d3ee", "#a78bfa", "#34d399"];
const OTHER_COLOR = "#71717a";

export function LanguageDistribution({
  languages,
}: {
  languages: { name: string; bytes: number; percent: number }[];
}) {
  const [active, setActive] = useState<number | null>(null);

  const colors = languages.map((l, i) => (l.name === "Other" ? OTHER_COLOR : COLORS[i % COLORS.length]));

  const size = 140;
  const stroke = 18;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offsets = languages.reduce<number[]>((acc, lang, i) => {
    const prev = i === 0 ? 0 : acc[i - 1] + (languages[i - 1].percent / 100) * circumference;
    acc.push(prev);
    return acc;
  }, []);

  return (
    <div className={cn(cardSurface, "p-6")}>
      <h3 className="text-base font-semibold text-fg">Languages</h3>
      <p className="mt-1 text-sm text-muted">Most used technologies</p>

      <div className="mt-6 flex items-center gap-6">
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="shrink-0 -rotate-90"
          role="img"
          aria-label="Language distribution by bytes of code"
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            className="text-white/5"
            strokeWidth={stroke}
          />
          {languages.map((lang, i) => {
            const dash = (lang.percent / 100) * circumference;
            const dashOffset = offsets[i];
            return (
              <circle
                key={lang.name}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={colors[i]}
                strokeWidth={stroke}
                strokeDasharray={`${dash} ${circumference - dash}`}
                strokeDashoffset={-dashOffset}
                className="transition-opacity duration-200"
                opacity={active === null || active === i ? 1 : 0.25}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
              />
            );
          })}
        </svg>

        <ul className="flex-1 space-y-2.5">
          {languages.map((lang, i) => (
            <li
              key={lang.name}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              className={cn(
                "flex items-center justify-between gap-3 text-sm transition-opacity duration-200",
                active !== null && active !== i && "opacity-40",
              )}
            >
              <span className="flex items-center gap-2 text-fg">
                <span
                  aria-hidden="true"
                  className="size-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: colors[i] }}
                />
                {lang.name}
              </span>
              <span className="font-mono tabular-nums text-muted">{lang.percent}%</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
