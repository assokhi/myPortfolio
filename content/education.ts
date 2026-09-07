import type { Education } from "./types";

// Major first, then the minor, then school — a recruiter reads the primary
// credential first, not the most recent row.
export const education: Education[] = [
  {
    institution: "Punjab Engineering College",
    qualification: "B.Tech, Electrical and Electronics Engineering (Major)",
    start: "2023-08",
    end: "2027-07",
    location: "Chandigarh",
    logo: "/education/pec.png",
  },
  {
    institution: "Punjab Engineering College",
    qualification: "B.Tech, Computer Science Engineering (Minor)",
    start: "2024-07",
    end: "2027-06",
    location: "Chandigarh",
    logo: "/education/pec.png",
  },
  {
    institution: "Hill Top School",
    qualification: "High School Diploma, Pure Science (with Computer Science)",
    start: "2008-03",
    end: "2022-05",
    location: "Jamshedpur",
    notes: ["Grade: 92.5%"],
    kind: "school",
    logo: "/education/school.jpg",
  },
];
