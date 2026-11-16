export type Locale = "id" | "en";

export const locales: Locale[] = ["id", "en"];

export const localeMeta: Record<Locale, { label: string; short: string }> = {
  id: { label: "Indonesia", short: "ID" },
  en: { label: "English", short: "EN" },
};

export const translations = {
  id: {
    nav: {
      home: "Home",
      about: "Tentang Saya",
      projects: "Projects",
      skills: "Skills",
      experience: "Pengalaman",
      achievements: "Prestasi",
      contact: "Kontak",
    },
    hero: {
      viewProjects: "Lihat Proyek",
      downloadCv: "Download CV (PDF)",
      email: "Email",
      photoAlt: "Foto",
      photoPlaceholder: "Foto kamu (placeholder)",
    },
    sections: {
      about: "Tentang Saya",
      projects: "Projects",
      skills: "Skills",
      experience: "Pengalaman",
      achievements: "Prestasi",
      contact: "Kontak",
    },
    projects: {
      viewDetails: "Lihat Detail",
      prev: "Sebelumnya",
      next: "Berikutnya",
      gallery: "Galeri",
      noScreenshots: "Belum ada screenshot",
      close: "Tutup",
      detailsLabel: "detail",
    },
    skills: {
      Beginner: "Pemula",
      Intermediate: "Menengah",
      Advanced: "Mahir",
    },
    contact: {
      getInTouch: "Hubungi Saya",
      introBefore: "Kirim pesan lewat form, atau langsung email ke",
      socialMedia: "Media Sosial",
      messageTitle: "Pesan",
      name: "Nama",
      namePlaceholder: "Nama kamu",
      email: "Email",
      subject: "Subjek",
      subjectPlaceholder: "Subjek (opsional)",
      message: "Pesan",
      messagePlaceholder: "Tulis pesan kamu...",
      send: "Kirim",
      sending: "Mengirim...",
      errRequired: "Mohon lengkapi semua field.",
      errNotConfigured:
        "EmailJS belum dikonfigurasi. Isi env: NEXT_PUBLIC_EMAILJS_SERVICE_ID, NEXT_PUBLIC_EMAILJS_TEMPLATE_ID, dan NEXT_PUBLIC_EMAILJS_PUBLIC_KEY.",
      okSent: "Pesan terkirim. Terima kasih!",
      errSend: "Gagal mengirim pesan. Coba lagi ya.",
    },
    footer: {
      cv: "CV:",
      downloadPdf: "Download PDF",
    },
    a11y: {
      goHome: "Ke halaman utama",
      openMenu: "Buka menu",
      closeMenu: "Tutup menu",
      switchTo: "Ganti bahasa ke",
    },
  },
  en: {
    nav: {
      home: "Home",
      about: "About Me",
      projects: "Projects",
      skills: "Skills",
      experience: "Experience",
      achievements: "Achievement",
      contact: "Contact",
    },
    hero: {
      viewProjects: "View Projects",
      downloadCv: "Download CV (PDF)",
      email: "Email",
      photoAlt: "Photo of",
      photoPlaceholder: "Your photo (placeholder)",
    },
    sections: {
      about: "About Me",
      projects: "Projects",
      skills: "Skills",
      experience: "Experience",
      achievements: "Achievement",
      contact: "Contact",
    },
    projects: {
      viewDetails: "View details",
      prev: "Prev",
      next: "Next",
      gallery: "Gallery",
      noScreenshots: "No screenshots yet",
      close: "Close",
      detailsLabel: "details",
    },
    skills: {
      Beginner: "Beginner",
      Intermediate: "Intermediate",
      Advanced: "Advanced",
    },
    contact: {
      getInTouch: "Get in touch",
      introBefore: "Send a message through the form, or email directly at",
      socialMedia: "Social Media",
      messageTitle: "Message",
      name: "Name",
      namePlaceholder: "Your name",
      email: "Email",
      subject: "Subject",
      subjectPlaceholder: "Subject (optional)",
      message: "Message",
      messagePlaceholder: "Write your message...",
      send: "Send",
      sending: "Sending...",
      errRequired: "Please fill in all fields.",
      errNotConfigured:
        "EmailJS is not configured. Set env: NEXT_PUBLIC_EMAILJS_SERVICE_ID, NEXT_PUBLIC_EMAILJS_TEMPLATE_ID, and NEXT_PUBLIC_EMAILJS_PUBLIC_KEY.",
      okSent: "Message sent. Thank you!",
      errSend: "Failed to send message. Please try again.",
    },
    footer: {
      cv: "CV:",
      downloadPdf: "Download PDF",
    },
    a11y: {
      goHome: "Go to home",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      switchTo: "Switch language to",
    },
  },
};

export type Dictionary = (typeof translations)["id"];

export function getDictionary(locale: Locale): Dictionary {
  return translations[locale];
}
