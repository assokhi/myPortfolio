import type { Education } from "./types";

// Major first, then the minor, then school — a recruiter reads the primary
// credential first, not the most recent row.
// TODO(you): `notes` on every entry below are placeholder bullets, fabricated
// to match the Experience section's bulleted layout — swap each for real
// coursework, projects and results before this ships.
export const education: Education[] = [
  {
    institution: "Punjab Engineering College",
    qualification: "B.Tech, Electrical and Electronics Engineering (Major)",
    start: "2023-08",
    end: "2027-07",
    location: "Chandigarh",
    logo: "/education/pec.png",
    notes: [
      "Coursework in Control Systems, Power Electronics, Digital Signal Processing and Embedded Systems.",
      "Built a solar MPPT charge controller reaching 96% conversion efficiency, presented at the department's annual project showcase.",
      "Teaching assistant for the second-year Electrical Circuits lab, grading and mentoring a cohort of 40 students.",
    ],
  },
  {
    institution: "Punjab Engineering College",
    qualification: "B.Tech, Computer Science Engineering (Minor)",
    start: "2024-07",
    end: "2027-06",
    location: "Chandigarh",
    logo: "/education/pec.png",
    notes: [
      "Coursework in Data Structures & Algorithms, DBMS, Operating Systems and Computer Networks.",
      "Placed 2nd at the college's 24-hour hackathon, shipping a real-time attendance tracker for a 200-student class.",
      "Core member of the Google Developer Student Club, running weekly DSA problem-solving sessions.",
    ],
  },
  {
    institution: "Hill Top School",
    qualification: "High School Diploma, Pure Science (with Computer Science)",
    start: "2008-03",
    end: "2022-05",
    location: "Jamshedpur",
    notes: [
      "Grade: 92.5%",
      "School topper in Computer Science, two years running.",
      "Led the robotics club to a regional finals placement at a state-level science exhibition.",
    ],
    kind: "school",
    logo: "/education/school.jpg",
  },
];
