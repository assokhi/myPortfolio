import Link from "next/link";
import { cn, displayHeading } from "@/lib/utils";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-start px-5 py-24">
      <p className="font-mono text-sm text-accent">404</p>
      <h1 className={cn(displayHeading, "mt-3")}>
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
