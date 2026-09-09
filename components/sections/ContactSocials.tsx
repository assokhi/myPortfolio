import { Mail } from "lucide-react";
import { Github, Linkedin, Instagram } from "@/components/ui/BrandIcons";
import { profile, mailtoHref } from "@/content/profile";

/** Icon-only button. No card, no border — a plain hairline-free control that
 *  just fills on hover, matching the reference's flat, chrome-free surfaces. */
const iconButton =
  "flex size-14 items-center justify-center rounded-full text-muted transition-colors duration-200 hover:bg-surface hover:text-fg";

const icons = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
  instagram: Instagram,
};

/** Email + socials as a horizontal row. */
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
      {items.map(({ key, href, label, Icon, external }) => (
        <li key={key}>
          <a
            href={href}
            {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
            className={iconButton}
            aria-label={label}
          >
            <Icon className="size-6" aria-hidden="true" />
          </a>
        </li>
      ))}
    </ul>
  );
}
