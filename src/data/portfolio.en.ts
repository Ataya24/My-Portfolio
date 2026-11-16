import type { Achievement, ExperienceItem, Project } from "./portfolio";

// English content layer. Titles / names that are proper nouns are kept as-is.

export const profileEn = {
  tagline:
    "Creating responsive application solutions with clean design and reliable functionality.",
  about:
    "I'm interested in web and desktop application development, with hands-on experience using Laravel, PHP, Node.js, TypeScript, React, Next.js, Tailwind CSS, Bootstrap, Visual Basic, MySQL, and Microsoft SQL Server. I have the skills to build applications that are responsive, functional, and aligned with user needs. I keep improving both my technical abilities and my teamwork to create effective, high-quality solutions.",
} as const;

export const projectsEn: Project[] = [
  {
    id: "project-1",
    title: "Vendor Management",
    description:
      "A vendor management website that lets users manage vendor information, including name, address, contacts, and the products they offer. The app also provides features to add, edit, and delete vendor data with ease.",
    tools: ["PHP", "MySQL"],
    screenshots: [
      { label: "Screenshot 1", src: "/Screevendor-management-1.webp" },
      { label: "Screenshot 2", src: "/vendor-management-2.webp" },
    ],
  },
  {
    id: "project-2",
    title: "Integration Tracker App",
    description:
      "An Integration Tracker App website built to simplify recording the project development process for the place where I did my internship.",
    tools: ["Laravel", "MySQL"],
    screenshots: [],
  },
  {
    id: "project-3",
    title: "Company Profile PT TEKNOPRO SUKSES PERSADA",
    description:
      "A company profile website for PT TEKNOPRO SUKSES PERSADA meant to provide information about the company, including its profile, offered services, project portfolio, contacts, and address.",
    tools: ["React", "Tailwind CSS"],
    screenshots: [],
  },
  {
    id: "project-4",
    title: "Perombakan Website Resmi SMK Telekomunikasi Telesandi Bekasi",
    description:
      "A revamp of the official SMK Telekomunikasi Telesandi Bekasi website, done by me and my team, aimed at refreshing the look and improving the school website's functionality.",
    tools: ["Laravel", "Tailwind CSS"],
    screenshots: [],
  },
];

export const experiencesEn: ExperienceItem[] = [
  {
    id: "exp-1",
    title: "Software Developer Intern",
    org: "PT TEKNOPRO SUKSES PERSADA",
    period: "Jul — Oct 2025",
    bullets: [
      "Developed web applications for the company's internal needs.",
      "Collaborated with the team on new feature development and application maintenance.",
      "Used technologies such as React and Tailwind CSS in the projects I worked on.",
    ],
  },
  {
    id: "exp-2",
    title: "Front End Developer (Produk Kreatif dan Kewirausahaan)",
    org: "SM Dev Creative",
    period: "2024 — 2025",
    bullets: [
      "Built responsive and user-friendly website interfaces.",
      "Implemented new features based on user requirements.",
      "Used technologies such as Laravel, Bootstrap, and Tailwind CSS in the projects I worked on.",
    ],
  },
  {
    id: "exp-3",
    title: "Lecturer & Deputy",
    org: "English Club SMK Telekomunikasi Telesandi",
    period: "2024 — 2025",
    bullets: [
      "Helped ensure activities were carried out properly.",
      "Served as the documentation section for every activity.",
      "Served as a speaker and deputy in the English Club extracurricular activities.",
    ],
  },
];

export const achievementsEn: Achievement[] = [
  {
    id: "ach-1",
    title: "ITecno Cup 2025 - Front End Dev Competition",
    year: "2025",
    description: "2nd Place in Front End Dev Competition, High School/Vocational Category",
    image: "/I-Tecno-Ataya.webp",
  },
];
