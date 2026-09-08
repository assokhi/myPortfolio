"use client";

import { useCallback, useRef } from "react";

const SRC = "/sounds/click.mp3";
const MUTE_KEY = "sound_muted";

/** Returns a `play()` for primary button feedback.
 *
 *  Every failure path is a silent no-op, on purpose: the file may not be in
 *  public/ at all, autoplay policy may block the first play before the visitor
 *  has interacted, and storage may throw in private browsing. None of those are
 *  worth an error in the console, let alone a broken button — the sound is
 *  decoration and the click still works without it.
 *
 *  ponytail: one shared Audio element per hook instance, so rapid clicks
 *  restart the sound rather than overlapping. Swap to a pool of elements only
 *  if overlapping clicks ever become a real interaction. */
export function useClickSound(volume = 0.2) {
  const ref = useRef<HTMLAudioElement | null>(null);

  return useCallback(() => {
    try {
      if (localStorage.getItem(MUTE_KEY) === "1") return;
    } catch {
      // Storage blocked: fall through and play. Muting is the exception, so a
      // failed read must not silence everyone.
    }

    try {
      // Created on first use, never during render: an Audio element built at
      // module scope would run on the server, where it does not exist.
      ref.current ??= new Audio(SRC);
      ref.current.volume = volume;
      ref.current.currentTime = 0;
      // play() rejects on autoplay policy and on a missing file. Both are fine.
      void ref.current.play().catch(() => {});
    } catch {}
  }, [volume]);
}

/** Reads and writes the mute preference. Exposed so a settings control can be
 *  added later without this file growing a UI. */
export const soundPreference = {
  isMuted() {
    try {
      return localStorage.getItem(MUTE_KEY) === "1";
    } catch {
      return false;
    }
  },
  setMuted(muted: boolean) {
    try {
      localStorage.setItem(MUTE_KEY, muted ? "1" : "0");
    } catch {}
  },
};
