"use client";

import type { ReactNode } from "react";
import { useMemo, useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";
import { Navbar } from "@/components/Navbar";
import { ProjectModal } from "@/components/ProjectModal";
import { Section } from "@/components/Section";
import { SkillPill } from "@/components/SkillPill";
import { Timeline } from "@/components/Timeline";
import { achievements, experiences, profile, projects, skills, type Project } from "@/data/portfolio";

function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-medium text-foreground/80 underline decoration-black/20 underline-offset-4 hover:text-foreground hover:decoration-black/40"
    >
      {children}
    </a>
  );
}

export default function HomePage() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const closeTimeout = useRef<number | null>(null);

  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<null | { type: "ok" | "err"; msg: string }>(null);

  const socialLinks = useMemo(
    () => [
      { label: "Instagram", href: profile.socials.instagram },
      { label: "Discord", href: profile.socials.discord },
      { label: "LinkedIn", href: profile.socials.linkedin },
      { label: "GitHub", href: profile.socials.github },
    ],
    [],
  );

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus(null);

    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = String(fd.get("name") ?? "").trim();
    const fromEmail = String(fd.get("email") ?? "").trim();
    const subject = String(fd.get("subject") ?? "").trim();
    const message = String(fd.get("message") ?? "").trim();

    if (!name || !fromEmail || !message) {
      setStatus({ type: "err", msg: "Mohon lengkapi semua field." });
      return;
    }

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setStatus({
        type: "err",
        msg: "EmailJS belum dikonfigurasi. Isi env: NEXT_PUBLIC_EMAILJS_SERVICE_ID/TEMPLATE_ID/PUBLIC_KEY.",
      });
      return;
    }

    try {
      setSending(true);
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: name,
          from_email: fromEmail,
          message,
          subject,
          to_email: profile.email,
        },
        { publicKey },
      );
      form.reset();
      setStatus({ type: "ok", msg: "Pesan terkirim. Terima kasih!" });
    } catch {
      setStatus({ type: "err", msg: "Gagal mengirim pesan. Coba lagi ya." });
    } finally {
      setSending(false);
    }
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        // gracefully close with transition
        setLightboxOpen(false);
        if (closeTimeout.current) window.clearTimeout(closeTimeout.current);
        closeTimeout.current = window.setTimeout(() => {
          setLightboxImage(null);
          closeTimeout.current = null;
        }, 300);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      if (closeTimeout.current) window.clearTimeout(closeTimeout.current);
    };
  }, []);

  return (
    <div className="min-h-full bg-background text-foreground">
      <Navbar />

      <main>
        <section id="home" className="scroll-mt-24">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 sm:py-18 md:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-foreground/60">
                {profile.title}
              </p>
              <h1 className="mt-3 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
                {profile.name}
              </h1>
              <p className="mt-4 max-w-xl text-base leading-7 text-foreground/75 sm:text-lg sm:leading-8">
                {profile.tagline}
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a
                  href="#projects"
                  className="rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:opacity-95 transition-all duration-200 active:scale-95"
                >
                  Lihat Projects
                </a>
                <a
                  href="/CV.pdf"
                  target="_blank"
                  className="rounded-xl border border-black/10 bg-card px-4 py-2.5 text-sm font-semibold hover:bg-black/5"
                  download
                >
                  Download CV (PDF)
                </a>
              </div>

              <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm text-foreground/70">
                <span>
                  Email:{" "}
                  <a className="font-medium text-foreground hover:underline" href={`mailto:${profile.email}`}>
                    {profile.email}
                  </a>
                </span>
              </div>
            </div>

            <div className="flex justify-center md:justify-end">
              <div className="relative h-66 w-66 sm:h-80 sm:w-80">
                <div className="absolute inset-4 rounded-full border border-black/10 bg-card shadow-sm" />
                <div className="absolute inset-8 overflow-hidden rounded-full bg-black/5">
                  {profile.photo ? (
                    <img
                      src={profile.photo}
                      alt={`Foto ${profile.name}`}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-sm text-foreground/60">
                      Foto kamu (placeholder)
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <Section id="about" title="About Me">
          <div className="rounded-2xl border border-black/10 bg-card p-6 sm:p-8">
            <p className="max-w-3xl text-sm leading-7 text-foreground/80 sm:text-base sm:leading-8 text-justify">
              {profile.about}
            </p>
          </div>
        </Section>

        <Section
          id="projects"
          title="Projects"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            {projects.map((p) => (
              <article key={p.id} className="flex h-full flex-col justify-between rounded-2xl border border-black/10 bg-card p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="font-heading text-lg font-semibold tracking-tight">{p.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-foreground/70 text-justify">
                      {p.description}
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tools.map((t) => (
                    <span
                      key={`${p.id}-${t}`}
                      className="rounded-full border border-black/10 bg-background px-2.5 py-1 text-xs font-medium text-foreground/80"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-5 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveProject(p);
                      setModalOpen(true);
                    }}
                    className="rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-white transition-transform duration-150 ease-out hover:opacity-95 active:scale-[0.98]"
                  >
                    View details
                  </button>
                </div>
              </article>
            ))}
          </div>
        </Section>

        <Section id="skills" title="Skills">
          <div className="grid gap-3 grid-cols-2 sm:grid-cols-4 lg:grid-cols-3">
            {skills.map((s) => (
              <SkillPill key={s.name} name={s.name} level={s.level} />
            ))}
          </div>
        </Section>

        <Section id="experience" title="Experience">
          <Timeline items={experiences} />
        </Section>

        <Section id="achievements" title="Achievement">
          <div className="grid gap-4 sm:grid-cols-2">
            {achievements.map((a) => (
              <div key={a.id} className="rounded-2xl border border-black/10 bg-card p-5">
                <div className="flex items-start gap-3">
                  {a.image ? (
                    <div className="shrink-0">
                      <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-md overflow-hidden bg-black/5">
                        <img
                          src={a.image}
                          alt={a.title}
                          className="w-full h-full object-cover cursor-pointer transition-transform duration-150 hover:scale-105"
                          onClick={() => {
                            if (closeTimeout.current) {
                              window.clearTimeout(closeTimeout.current);
                              closeTimeout.current = null;
                            }
                            setLightboxImage(a.image ?? null);
                            // ensure open state happens after image is set
                            requestAnimationFrame(() => setLightboxOpen(true));
                          }}
                        />
                      </div>
                    </div>
                  ) : null}

                  <div className="min-w-0">
                    <div className="font-heading text-base font-semibold tracking-tight">{a.title}</div>
                    {a.description ? (
                      <p className="mt-2 text-sm leading-6 text-foreground/70">{a.description}</p>
                    ) : null}
                  </div>

                  {a.year ? (
                    <div className="ml-auto text-xs font-medium text-foreground/60">{a.year}</div>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section
          id="contact"
          title="Contact"
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-black/10 bg-card p-6">
              <div className="font-heading text-lg font-semibold tracking-tight">Get in touch</div>
              <p className="mt-2 text-sm leading-6 text-foreground/70">
                Kirim pesan lewat form, atau langsung email ke{" "}
                <a className="font-medium text-foreground hover:underline" href={`mailto:${profile.email}`}>
                  {profile.email}
                </a>
                .
              </p>

              <div className="mt-5 grid gap-2 text-sm">
                {socialLinks.map((s) => (
                  <div key={s.label} className="flex items-center justify-between gap-3">
                    <div className="text-foreground/70">{s.label}</div>
                    <ExternalLink href={s.href}>{s.href.replace("https://", "")}</ExternalLink>
                  </div>
                ))}
              </div>
            </div>

            <form onSubmit={onSubmit} className="rounded-2xl border border-black/10 bg-card p-6">
              <div className="font-heading text-lg font-semibold tracking-tight">Message</div>
              <div className="mt-4 grid gap-3">
                <label className="grid gap-1">
                  <span className="text-sm font-medium">Name</span>
                  <input
                    name="name"
                    className="h-11 rounded-xl border border-black/10 bg-background px-3 text-sm outline-none focus:border-accent"
                    placeholder="Nama kamu"
                    autoComplete="name"
                  />
                </label>
                <label className="grid gap-1">
                  <span className="text-sm font-medium">Email</span>
                  <input
                    name="email"
                    type="email"
                    className="h-11 rounded-xl border border-black/10 bg-background px-3 text-sm outline-none focus:border-accent"
                    placeholder="email@domain.com"
                    autoComplete="email"
                  />
                </label>
                <label className="grid gap-1">
                  <span className="text-sm font-medium">Subject</span>
                  <input
                    name="subject"
                    className="h-11 rounded-xl border border-black/10 bg-background px-3 text-sm outline-none focus:border-accent"
                    placeholder="Subject (optional)"
                  />
                </label>
                <label className="grid gap-1">
                  <span className="text-sm font-medium">Message</span>
                  <textarea
                    name="message"
                    rows={5}
                    className="resize-none rounded-xl border border-black/10 bg-background px-3 py-2 text-sm outline-none focus:border-accent"
                    placeholder="Tulis pesan kamu..."
                  />
                </label>
              </div>

              {status ? (
                <div
                  className={[
                    "mt-4 rounded-xl border px-3 py-2 text-sm",
                    status.type === "ok"
                      ? "border-emerald-200 bg-emerald-50 text-emerald-900"
                      : "border-rose-200 bg-rose-50 text-rose-900",
                  ].join(" ")}
                >
                  {status.msg}
                </div>
              ) : null}

              <button
                type="submit"
                disabled={sending}
                className="mt-5 inline-flex h-11 items-center justify-center rounded-xl bg-accent px-4 text-sm font-semibold text-white disabled:opacity-60"
              >
                {sending ? "Sending..." : "Send"}
              </button>
            </form>
          </div>
        </Section>

        <footer className="border-t border-black/10 bg-card/80 py-10 shadow-[0_-1px_0_rgba(0,0,0,0.02)]">
          <div className="mx-auto max-w-6xl px-4 text-sm text-foreground/65 sm:px-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="font-medium">
                © {new Date().getFullYear()} {profile.name}
              </div>
              <div className="flex items-center gap-3">
                <span className="text-foreground/50">CV:</span>
                <a className="font-medium text-foreground hover:underline" href="/CV.pdf" download target="_blank">
                  Download PDF
                </a>
              </div>
            </div>
          </div>
        </footer>
      </main>

      <ProjectModal
        project={activeProject}
        open={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        onClosed={() => setActiveProject(null)}
      />
      {lightboxImage ? (
        <div
          className={
            "fixed inset-0 z-50 flex items-center justify-center bg-black/60 transition-opacity duration-300 " +
            (lightboxOpen ? "opacity-100" : "opacity-0 pointer-events-none")
          }
          onClick={() => {
            setLightboxOpen(false);
            if (closeTimeout.current) window.clearTimeout(closeTimeout.current);
            closeTimeout.current = window.setTimeout(() => {
              setLightboxImage(null);
              closeTimeout.current = null;
            }, 300);
          }}
        >
          <div className="w-full px-4 sm:px-6 lg:px-0 flex justify-center">
            <div
              className={
                "relative max-w-[90vw] sm:max-w-2xl lg:max-w-3xl max-h-[80vh] w-full transform transition-all duration-300 ease-out " +
                (lightboxOpen ? "scale-100 opacity-100" : "scale-95 opacity-0")
              }
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={lightboxImage}
                alt="Achievement"
                className="w-full h-full object-contain rounded-md bg-white shadow-xl"
              />

              <button
                aria-label="Close"
                className="absolute top-3 right-3 sm:top-4 sm:right-4 rounded-lg border border-black/10 bg-card px-3 py-1.5 text-sm font-medium text-foreground shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent"
                onClick={() => {
                  setLightboxOpen(false);
                  if (closeTimeout.current) window.clearTimeout(closeTimeout.current);
                  closeTimeout.current = window.setTimeout(() => {
                    setLightboxImage(null);
                    closeTimeout.current = null;
                  }, 300);
                }}
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
