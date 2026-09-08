import { profile, mailtoHref } from "@/content/profile";
import SocialLinks from "@/components/ui/SocialLinks";
import NewsletterForm from "@/components/sections/NewsletterForm";
import VisitorCounter from "@/components/sections/VisitorCounter";

/** Peerlist (or any embeddable social-proof profile). Configured entirely by
 *  environment variable so the block simply does not exist when there is no
 *  profile to show — an empty card that says "no upvotes" is worse than no
 *  card. Read at build time: this is a static export, so the value is baked in.
 */
const peerlistUrl = process.env.NEXT_PUBLIC_PEERLIST_URL;

/** The initials, for when there is no photo. Kept here rather than in the
 *  content file because it is derived, not authored. */
const initials = profile.name
  .split(" ")
  .map((part) => part[0])
  .slice(0, 2)
  .join("");

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-3xl flex-col items-center px-5 py-16 text-center">
        {/* Decorative divider. aria-hidden because "middle dot middle dot
            middle dot" is not information. */}
        <p aria-hidden="true" className="text-2xl tracking-[0.5em] text-muted">
          &middot;&middot;&middot;
        </p>

        {/* The signature. A connected script is unreadable below about 2rem,
            which is why the size is fixed here rather than left to a caller. */}
        <p className="mt-6 font-script text-5xl leading-none text-fg">
          {profile.name}
        </p>

        {peerlistUrl ? (
          <iframe
            src={peerlistUrl}
            title={`${profile.name} on Peerlist`}
            loading="lazy"
            className="mt-8 h-[3.25rem] w-[13rem] border-0"
          />
        ) : null}

        {/* --- Newsletter --- */}
        <div className="mt-12 flex w-full flex-col items-center gap-4">
          <div className="flex items-center gap-3">
            {profile.avatar ? (
              // Images are unoptimized on Workers; next/image adds nothing here.
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={profile.avatar}
                alt=""
                width={40}
                height={40}
                loading="lazy"
                className="size-10 rounded-full object-cover"
              />
            ) : (
              <span
                aria-hidden="true"
                className="flex size-10 items-center justify-center rounded-full bg-lime text-sm font-bold text-on-bright"
              >
                {initials}
              </span>
            )}
            <p className="text-sm text-muted">
              Get notified when I drop something new.
            </p>
          </div>

          <NewsletterForm />
        </div>

        <div className="mt-10">
          <SocialLinks />
        </div>

        <div className="mt-10">
          <VisitorCounter />
        </div>

        <div className="mt-10 h-px w-full bg-border" />

        <div className="mt-6 space-y-1 text-xs text-muted">
          <p>
            Built with{" "}
            <span aria-label="love" role="img">
              &hearts;
            </span>{" "}
            by{" "}
            <a
              href={mailtoHref}
              className="underline underline-offset-2 transition-colors hover:text-fg"
            >
              {profile.name}
            </a>{" "}
            © {new Date().getFullYear()}. All rights reserved.
          </p>
          <p>
            Next.js, Tailwind CSS and Motion, on Cloudflare Workers. Icons by{" "}
            <a
              href="https://lucide.dev"
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-2 transition-colors hover:text-fg"
            >
              Lucide
            </a>{" "}
            (ISC) and{" "}
            <a
              href="https://simpleicons.org"
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-2 transition-colors hover:text-fg"
            >
              Simple Icons
            </a>{" "}
            (CC0).
          </p>
        </div>
      </div>
    </footer>
  );
}
