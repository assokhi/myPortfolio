import type { Certification } from "./types";

// TODO(you): only list certificates that have a public verification URL.
// An unverifiable badge is worth less than no badge.
export const certifications: Certification[] = [
  {
    name: "AWS Certified Solutions Architect – Associate",
    issuer: "Amazon Web Services",
    issuedOn: "2026-03-14",
    credentialId: "ABC-123-XYZ",
    verifyUrl: "https://aws.amazon.com/verification",
  },
  {
    name: "Meta Front-End Developer Professional Certificate",
    issuer: "Coursera",
    issuedOn: "2025-11-02",
    credentialId: "COURSERA-4F2A9",
    verifyUrl: "https://www.coursera.org/account/accomplishments/verify",
  },
];
