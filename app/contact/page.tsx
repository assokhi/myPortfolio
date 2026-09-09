import type { Metadata } from "next";
import { profile } from "@/content/profile";
import { displayHeading, cardSurface } from "@/lib/utils";
import ContactForm from "@/components/sections/ContactForm";
import ContactSocials from "@/components/sections/ContactSocials";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${profile.name} — open to full-time engineering roles.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-5 pt-8 pb-12">
      <div className="grid gap-10 lg:grid-cols-[1fr_260px]">
        <div>
          <h1 className={displayHeading}>Get in touch</h1>
          <p className="mt-2 max-w-xl font-serif text-muted">
            Open to full-time roles. Tell me what you are building and I will
            tell you whether I am the right person for it.
          </p>

          <ContactForm />
        </div>

        <div className={`${cardSurface} h-fit p-6 lg:mt-24`}>
          <p className="text-sm text-muted">Prefer social? Find me here.</p>
          <div className="mt-4">
            <ContactSocials />
          </div>
        </div>
      </div>
    </div>
  );
}
