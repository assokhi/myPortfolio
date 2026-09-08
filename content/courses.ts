import type { Course } from "./types";

// TODO(you): confirm exact course titles and add each course's certificate
// URL once you have it (Coursera issues one per course, even for an audited
// specialization) — same "don't show an unverifiable badge" rule as
// certifications.ts, just without a completion date nobody asked for yet.
export const courses: Course[] = [
  {
    name: "Deep Learning Specialization",
    issuer: "DeepLearning.AI",
    instructor: "Andrew Ng",
    gradient: ["#c7385f", "#0e5b66"],
  },
  {
    name: "Machine Learning Specialization",
    issuer: "DeepLearning.AI · Stanford Online",
    instructor: "Andrew Ng",
    gradient: ["#1d4ed8", "#7c3aed"],
  },
  {
    name: "AI For Everyone",
    issuer: "DeepLearning.AI",
    instructor: "Andrew Ng",
    gradient: ["#f59e0b", "#db2777"],
  },
];
