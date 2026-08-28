"use client";

import { Mail } from "lucide-react";
import { Github, Linkedin, Instagram } from "@/components/ui/BrandIcons";
import { profile, mailtoHref } from "@/content/profile";
import { cn, cardSurface } from "@/lib/utils";

const icons = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
  instagram: Instagram,
};

/** Icon-only button: scales up and lifts on hover, snaps back on hover-out.
 *  `transition-transform` plus the global prefers-reduced-motion rule (which
 *  zeroes transition-duration site-wide) means reduced-motion users get the
 *  end state instantly with no animated lift. */
const iconButton = cn(
  cardSurface,
  "flex size-14 items-center justify-center rounded-full transition-transform duration-200 ease-out hover:-translate-y-1.5 hover:scale-110",
);

/** C major scale, ascending: index 0 is middle C, each step after climbs the
 *  next scale degree (wrapping an octave up every 7 keys). Reads as a piano
 *  run as the pointer crosses the row left to right, whatever the icon count. */
const MAJOR_SCALE_SEMITONES = [0, 2, 4, 5, 7, 9, 11];
const MIDDLE_C = 261.63;
function noteFrequency(index: number) {
  const octave = Math.floor(index / MAJOR_SCALE_SEMITONES.length);
  const semitone = MAJOR_SCALE_SEMITONES[index % MAJOR_SCALE_SEMITONES.length] + octave * 12;
  return MIDDLE_C * 2 ** (semitone / 12);
}

/** One shared AudioContext for the row, created lazily on first hover — audio
 *  contexts start suspended until a user gesture, and hover doesn't always
 *  count as one, so the very first note in a session can be silent until the
 *  visitor has clicked anywhere on the page. Nothing to fix on our side: it's
 *  the browser's autoplay policy, not a bug. */
let audioCtx: AudioContext | null = null;
function playNote(freq: number) {
  audioCtx ??= new AudioContext();
  if (audioCtx.state === "suspended") void audioCtx.resume();

  const now = audioCtx.currentTime;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = "triangle";
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(0.2, now + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);
  osc.connect(gain).connect(audioCtx.destination);
  osc.start(now);
  osc.stop(now + 0.5);
}

/** Email + socials as a horizontal row. Each icon plays its own piano note on
 *  hover/focus, pitch climbing left to right, so running the pointer across
 *  the row plays a little ascending run. */
export default function ContactSocials() {
  const items = [
    { key: "mail", href: mailtoHref, label: `Email me at ${profile.email}`, Icon: Mail, external: false },
    ...profile.socials.map((s) => ({
      key: s.href,
      href: s.href,
      label: `${s.label} (opens in a new tab)`,
      Icon: icons[s.icon] ?? Mail,
      external: true,
    })),
  ];

  return (
    <ul className="mt-4 flex flex-row flex-wrap items-center justify-center gap-5">
      {items.map(({ key, href, label, Icon, external }, i) => (
        <li key={key}>
          <a
            href={href}
            {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
            className={iconButton}
            aria-label={label}
            onPointerEnter={() => playNote(noteFrequency(i))}
            onFocus={() => playNote(noteFrequency(i))}
          >
            <Icon className="size-6 text-accent" aria-hidden="true" />
          </a>
        </li>
      ))}
    </ul>
  );
}
