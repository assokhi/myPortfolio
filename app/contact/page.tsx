import type { Metadata } from "next";
import { profile } from "@/content/profile";
import { displayHeading } from "@/lib/utils";
import ContactForm from "@/components/sections/ContactForm";
import ContactSocials from "@/components/sections/ContactSocials";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${profile.name} — open to full-time engineering roles.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-5 pt-10 pb-20">
      <h1 className={displayHeading}>Get in touch</h1>
      <p className="mt-3 max-w-xl font-serif text-muted">
        Open to full-time roles. Tell me what you are building and I will tell
        you whether I am the right person for it.
      </p>

      <ContactForm />

      <div className="mt-14">
        <ContactSocials />
      </div>
    </div>
  );
}
