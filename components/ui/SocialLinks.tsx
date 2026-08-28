import { Mail, FileText } from "lucide-react";
import { Github, Linkedin, Instagram } from "@/components/ui/BrandIcons";
import { profile, mailtoHref } from "@/content/profile";
import { cn } from "@/lib/utils";

const icons = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
  instagram: Instagram,
  "file-text": FileText,
};

const tile =
  "group relative flex size-10 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:border-accent hover:text-accent";
const tooltip =
  "pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 rounded-md border border-border bg-surface px-2 py-1 text-xs font-medium text-fg opacity-0 shadow-lg transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100";

/** Email / socials / resume as one icon row. Server component: the links are
 *  in the HTML for scrapers wherever it is placed. */
export default function SocialLinks({ className }: { className?: string }) {
  return (
    <ul className={cn("flex items-center gap-2", className)}>
      <li>
        <a href={mailtoHref} aria-label={`Email ${profile.name}`} className={tile}>
          <Mail className="size-4" aria-hidden="true" />
          <span className={tooltip}>Email</span>
        </a>
      </li>
      {profile.socials.map((s) => {
        const Icon = icons[s.icon] ?? Mail;
        return (
          <li key={s.href}>
            <a
              href={s.href}
              target="_blank"
              rel="noreferrer"
              aria-label={s.label}
              className={tile}
            >
              <Icon className="size-4" aria-hidden="true" />
              <span className={tooltip}>{s.label}</span>
            </a>
          </li>
        );
      })}
      <li>
        <a
          href={profile.resumePath}
          target="_blank"
          rel="noreferrer"
          aria-label="Open resume (PDF)"
          className={tile}
        >
          <FileText className="size-4" aria-hidden="true" />
          <span className={tooltip}>Resume</span>
        </a>
      </li>
    </ul>
  );
}
