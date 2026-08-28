import { profile } from "@/content/profile";
import SocialLinks from "@/components/ui/SocialLinks";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface/40">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p className="text-sm text-fg">
            {profile.name} — {profile.role}
          </p>
          <p className="text-xs text-muted">
            Built with Next.js, Tailwind CSS and Motion. Icons by{" "}
            <a
              href="https://lucide.dev"
              className="underline underline-offset-2 hover:text-fg"
              target="_blank"
              rel="noreferrer"
            >
              Lucide
            </a>{" "}
            (ISC).
          </p>
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} {profile.name}
          </p>
        </div>

        <SocialLinks />
      </div>
    </footer>
  );
}
