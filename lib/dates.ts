const MONTH_YEAR: Intl.DateTimeFormatOptions = { month: "short", year: "numeric" };

/** "2024-06" -> "Jun 2024". Accepts "2024-06" or a full ISO date. */
export function formatMonth(iso: string): string {
  const d = new Date(iso.length === 7 ? `${iso}-01` : iso);
  return Number.isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString("en-GB", MONTH_YEAR);
}

/** "2024-06", undefined -> "Jun 2024 — Present" */
export function formatRange(start: string, end?: string): string {
  return `${formatMonth(start)} — ${end ? formatMonth(end) : "Present"}`;
}

export function formatDate(iso: string): string {
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}
