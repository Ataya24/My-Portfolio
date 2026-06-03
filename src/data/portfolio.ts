export type SkillLevel = "Beginner" | "Intermediate" | "Advanced";

export type Project = {
  id: string;
  title: string;
  description: string;
  tools: string[];
  screenshots: { label: string; src: string }[];
};

export type ExperienceItem = {
  id: string;
  title: string;
  org?: string;
  period: string;
  bullets: string[];
};

export type Achievement = {
  id: string;
  title: string;
  year?: string;
  description?: string;
  image?: string;
};

export const profile = {
  name: "Ataya Nafis Rizqulah",
  title: "Front End Enthusiast | Website Developer | Desktop Developer",
  tagline:
    "Creating responsive web solutions with clean design and reliable functionality.",
  about:
    "Saya memiliki ketertarikan pada pengembangan website & desktop, baik di sisi Front End maupun Back End. Menggunakan teknologi seperti Laravel, PHP, Node.js, React, Next.js, Tailwind CSS, My SQL dan Visual Basic untuk membangun aplikasi yang responsif, fungsional, serta user friendly. Saya senang mempelajari teknologi baru, kerjasama tim/individu, serta terus mengembangkan skill dalam menciptakan solusi digital yang efektif dan mudah digunakan.",
  email: "atayanafisrizqulah@gmail.com",
  photo: "/Me_.webp",
  socials: {
    instagram: "https://tinyurl.com/2n2kree2",
    discord: "https://discord.com/users/a.n.r",
    linkedin: "https://tinyurl.com/588cptym",
    github: "https://github.com/Ataya24",
  },
} as const;

export const projects: Project[] = [
  {
    id: "project-1",
    title: "Vendor Management",
    description:
      "Sebuah website manajemen vendor yang memungkinkan pengguna untuk mengelola informasi vendor, termasuk nama, alamat, kontak, dan produk yang mereka tawarkan. Aplikasi ini juga menyediakan fitur untuk menambahkan, mengedit, dan menghapus data vendor dengan mudah.",
    tools: ["PHP", "MySQL"],
    screenshots: [
      { label: "Screenshot 1", src: "/Screevendor-management-1.webp" },
      { label: "Screenshot 2", src: "/vendor-management-2.webp" },
    ],
  },
  {
    id: "project-2",
    title: "Purchase Order",
    description:
      "Sebuah website yang berfungsi untuk mengelola proses pencatatan barang masuk & keluar, termasuk pengelolaan data supplier dengan 2 hak akses (Admin & Produksi).",
    tools: ["Laravel", "Bootstrap", "MySQL"],
    screenshots: [
      { label: "Screenshot 1", src: "/purchase-order (1).webp" },
      { label: "Screenshot 2", src: "/purchase-order (2).webp" },
      { label: "Screenshot 3", src: "/purchase-order (3).webp" },
      { label: "Screenshot 4", src: "/purchase-order (4).webp" },
      { label: "Screenshot 5", src: "/purchase-order (5).webp" },
      { label: "Screenshot 6", src: "/purchase-order (6).webp" },
      { label: "Screenshot 7", src: "/purchase-order (7).webp" },
      { label: "Screenshot 8", src: "/purchase-order (8).webp" },
      { label: "Screenshot 9", src: "/purchase-order (9).webp" },
      { label: "Screenshot 10", src: "/purchase-order (10).webp" },
      { label: "Screenshot 11", src: "/purchase-order (11).webp" },
      { label: "Screenshot 12", src: "/purchase-order (12).webp" },
      { label: "Screenshot 13", src: "/purchase-order (13).webp" },
      { label: "Screenshot 14", src: "/purchase-order (14).webp" },
      { label: "Screenshot 15", src: "/purchase-order (15).webp" },
      { label: "Screenshot 16", src: "/purchase-order (16).webp" },
    ],
  },
  
  {
    id: "project-3",
    title: "Sistem Pemesanan Teknopro",
    description:
      "Website  sistem pemesanan Teknopro yang bertujuan untuk memudahkan perusahaan dalam mengelola pemesanan dari vendor. Aplikasi ini memungkinkan pihak perusahaan untuk membuat, mengedit, dan menghapus pemesanan dengan mudah, serta menyediakan fitur untuk melihat riwayat pemesanan dan statusnya.",
    tools: ["Laravel", "MySQL"],
    screenshots: [
      { label: "Screenshot 1", src: "/sistem-pemesanan (1).webp" },
      { label: "Screenshot 2", src: "/sistem-pemesanan (2).webp" },
      { label: "Screenshot 3", src: "/sistem-pemesanan (3).webp" },
      { label: "Screenshot 4", src: "/sistem-pemesanan (4).webp" },
      { label: "Screenshot 5", src: "/sistem-pemesanan (5).webp" },
      { label: "Screenshot 6", src: "/sistem-pemesanan (6).webp" },
      { label: "Screenshot 7", src: "/sistem-pemesanan (7).webp" },
      { label: "Screenshot 8", src: "/sistem-pemesanan (8).webp" },
      { label: "Screenshot 9", src: "/sistem-pemesanan (9).webp" },
      { label: "Screenshot 10", src: "/sistem-pemesanan (10).webp" },
      { label: "Screenshot 11", src: "/sistem-pemesanan (11).webp" },
      { label: "Screenshot 12", src: "/sistem-pemesanan (12).webp" },
    ],
  },
  {
    id: "project-4",
    title: "Integration Tracker App",
    description:
      "Website Integration Tracker App yang bertujuan untuk membuat serta memudahkan pencatatan proses pembuatan suatu proyek",
    tools: ["Laravel", "MySQL"],
    screenshots: [
      { label: "Screenshot 1", src: "/login-integration.webp" },
      { label: "Screenshot 2", src: "/logout-integration.webp" },
      { label: "Screenshot 3", src: "/integration-tracker (1).webp" },
      { label: "Screenshot 4", src: "/integration-tracker (2).webp" },
      { label: "Screenshot 5", src: "/integration-tracker (3).webp" },
      { label: "Screenshot 6", src: "/integration-tracker (4).webp" },
      { label: "Screenshot 7", src: "/integration-tracker (5).webp" },
      { label: "Screenshot 8", src: "/integration-tracker (6).webp" },
      { label: "Screenshot 9", src: "/integration-tracker (7).webp" },
      { label: "Screenshot 10", src: "/integration-tracker (8).webp" },
      { label: "Screenshot 11", src: "/integration-tracker (9).webp" },
      { label: "Screenshot 12", src: "/integration-tracker (10).webp" },
      { label: "Screenshot 13", src: "/integration-tracker (11).webp" },
      { label: "Screenshot 14", src: "/integration-tracker (12).webp" },
    ],
  },
  {
    id: "project-5",
    title: "Company Profile PT TEKNOPRO SUKSES PERSADA",
    description:
      "Website company profile untuk PT TEKNOPRO SUKSES PERSADA yang bertujuan untuk memberikan informasi tentang perusahaan, termasuk profil perusahaan, layanan yang ditawarkan, portofolio proyek, kontak, dan alamat.",
    tools: ["React", "Tailwind CSS"],
    screenshots: [
      { label: "Screenshot 1", src: "/company-profile-teknopro (1).webp" },
      { label: "Screenshot 2", src: "/company-profile-teknopro (2).webp" },
      { label: "Screenshot 3", src: "/company-profile-teknopro (3).webp" },
      { label: "Screenshot 4", src: "/company-profile-teknopro (4).webp" },
      { label: "Screenshot 5", src: "/company-profile-teknopro (5).webp" },
      { label: "Screenshot 6", src: "/company-profile-teknopro (6).webp" },
      { label: "Screenshot 7", src: "/company-profile-teknopro (7).webp" },
      { label: "Screenshot 8", src: "/company-profile-teknopro (8).webp" },
      { label: "Screenshot 9", src: "/company-profile-teknopro (9).webp" },
      { label: "Screenshot 10", src: "/company-profile-teknopro (10).webp" },
      { label: "Screenshot 11", src: "/company-profile-teknopro (11).webp" },
      { label: "Screenshot 12", src: "/company-profile-teknopro (12).webp" },
      { label: "Screenshot 13", src: "/company-profile-teknopro (13).webp" },
      { label: "Screenshot 14", src: "/company-profile-teknopro (14).webp" },
      { label: "Screenshot 15", src: "/company-profile-teknopro (15).webp" },
      { label: "Screenshot 16", src: "/company-profile-teknopro (16).webp" },
      { label: "Screenshot 17", src: "/company-profile-teknopro (17).webp" },
    ],
  },

  {
    id: "project-6",
    title: "Perombakan Website Resmi SMK Telekomunikasi Telesandi Bekasi",
    description:
      "Perombakan website resmi SMK Telekomunikasi Telesandi Bekasi yang dikerjakan oleh Saya tim Saya dan bertujuan untuk memperbarui tampilan serta meningkatkan fungsionalitas website sekolah.",
    tools: ["Laravel", "Tailwind CSS"],
    screenshots: [
      { label: "Screenshot 1", src: "/web-smk-telesandi (1).webp" },
      { label: "Screenshot 2", src: "/web-smk-telesandi (2).webp" },
      { label: "Screenshot 3", src: "/web-smk-telesandi (3).webp" },
      { label: "Screenshot 4", src: "/web-smk-telesandi (4).webp" },
      { label: "Screenshot 5", src: "/web-smk-telesandi (5).webp" },
      { label: "Screenshot 6", src: "/web-smk-telesandi (6).webp" },
      { label: "Screenshot 7", src: "/web-smk-telesandi (7).webp" },
      { label: "Screenshot 8", src: "/web-smk-telesandi (8).webp" },
      { label: "Screenshot 9", src: "/web-smk-telesandi (9).webp" },
      { label: "Screenshot 10", src: "/web-smk-telesandi (10).webp" },
    ],
  },
];

export const skills: { name: string; level: SkillLevel }[] = [
  { name: "PHP", level: "Advanced" },
  { name: "Laravel", level: "Intermediate" },
  { name: "TypeScript", level: "Intermediate" },
  { name: "Next.js", level: "Intermediate" },
  { name: "React", level: "Intermediate" },
  { name: "Node.js", level: "Intermediate" },
  { name: "Bootstrap", level: "Advanced" },
  { name: "Tailwind CSS", level: "Advanced" },
  { name: "HTML", level: "Advanced" },
  { name: "CSS", level: "Advanced" },
  { name: "JavaScript", level: "Intermediate" },
  { name: "Visual Basic(VB.NET)", level: "Intermediate" },
  { name: "C#", level: "Beginner" },
  { name: "MySQL", level: "Intermediate" },
  { name: "Microsoft SQL Server", level: "Intermediate" },
  {name: "Git", level: "Intermediate" },
  { name: "Ms Excel", level: "Intermediate" },
  { name: "Ms Powerpoint", level: "Intermediate" },
  { name: "Ms Word", level: "Advanced" },
  { name: "Figma", level: "Beginner" },
];

export const experiences: ExperienceItem[] = [
  {
    id: "exp-1",
    title: "Software Deleveloper Intern",
    org: "PT TEKNOPRO SUKSES PERSADA",
    period: "Jul — Oct 2025",
    bullets: [
      "Mengembangan web application untuk kebutuhan internal perusahaan.",
      "Kerjasama tim dalam pengembangan fitur baru dan pemeliharaan aplikasi.",
      "Menggunakan teknologi seperti React, dan Tailwind CSS dalam proyek-proyek yang dikerjakan.",
    ],
  },
  {
    id: "exp-2",
    title: "Front End Developer(PKK)",
    org: "SM Dev Creative",
    period: "2024 — 2025",
    bullets: [
      "Mengembangkan tampilan website yang responsif dan user-friendly.",
      "Mengimplementasikan fitur baru berdasarkan kebutuhan pengguna.",
      "Menggunakan teknologi seperti Laravel, Bootstrap, ataupun Tailwind CSS dalam proyek-proyek yang dikerjakan.",
    ],
  },
  {
    id: "exp-3",
    title: "Lecture & Deputy",
    org: "English Club SMK Telekomunikasi Telesandi",
    period: "2024 — 2025",
    bullets: ["Membantu pelaksanaan kegiatan agar terlaksana dengan baik.", 
      "Menjadi seksi dokumentasi setiap kegiatan.", 
      "Menjadi Pemateri dan wakil dalam aktivitas pelaksanaan kegiatan Ekstrakurikuler English Club."],
  },
];

export const achievements: Achievement[] = [
  {
    id: "ach-1",
    title: "ITecno Cup 2025 -Front End Dev Competition",
    year: "2025",
    description: "Juara 2 Lomba Front End Dev Kategori SMA/K",
    image: "/I-Tecno-Ataya.webp",
  },
];

