import Link from "next/link";
import { cn, heading1, pageShell } from "@/lib/utils";

export default function NotFound() {
  return (
    <div className={cn("flex flex-col items-start", pageShell)}>
      <p className="text-sm font-medium tracking-wide text-accent">404</p>
      <h1 className={cn(heading1, "mt-3")}>
        That page doesn&apos;t exist
      </h1>
      <p className="mt-2 text-muted">
        The link may be old, or the address slightly off.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-bg"
      >
        Back to home
      </Link>
    </div>
  );
}
