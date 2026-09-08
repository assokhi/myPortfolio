import type { Certification } from "./types";

// No certifications yet — the AWS/Meta entries this used to hold were
// fabricated example data. Add an entry here once there's a real,
// publicly verifiable credential: only list certificates that have a public
// verification URL. An unverifiable badge is worth less than no badge.
// Completed-but-uncertified courses (the Andrew Ng / DeepLearning.AI ones)
// live in content/courses.ts instead, in their own Education bento row.
export const certifications: Certification[] = [];
