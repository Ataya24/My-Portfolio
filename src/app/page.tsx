"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";
import { Navbar } from "@/components/Navbar";
import { ProjectModal } from "@/components/ProjectModal";
import { Section } from "@/components/Section";
import { SkillPill } from "@/components/SkillPill";
import { Timeline } from "@/components/Timeline";
import { profile, skills, type Project } from "@/data/portfolio";
import { useLocale } from "@/lib/locale-context";

const emailjsConfig = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_jje1ps6",
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_nzp89n3",
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "ClkR2bRgIYk9mvLZX",
};

function InstagramIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function DiscordIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}

function LinkedInIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v7.6H9.2v-7.6H6.46M7.83 6.44a1.6 1.6 0 1 0 1.6 1.6 1.6 1.6 0 0 0-1.6-1.6z" />
    </svg>
  );
}

function GitHubIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

export default function HomePage() {
  const { t, projects, experiences, achievements, about, tagline } = useLocale();
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const closeTimeout = useRef<number | null>(null);

  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<null | { type: "ok" | "err"; msg: string }>(null);

  const socialLinks = useMemo(
    () => [
      {
        label: "Instagram",
        href: profile.socials.instagram,
        icon: InstagramIcon,
        hoverClass: "hover:border-pink-500 hover:text-pink-600 hover:bg-pink-500/10",
      },
      {
        label: "Discord",
        href: profile.socials.discord,
        icon: DiscordIcon,
        hoverClass: "hover:border-[#5865F2] hover:text-[#5865F2] hover:bg-[#5865F2]/10",
      },
      {
        label: "LinkedIn",
        href: profile.socials.linkedin,
        icon: LinkedInIcon,
        hoverClass: "hover:border-[#0A66C2] hover:text-[#0A66C2] hover:bg-[#0A66C2]/10",
      },
      {
        label: "GitHub",
        href: profile.socials.github,
        icon: GitHubIcon,
        hoverClass: "hover:border-black hover:text-black hover:bg-black/10",
      },
    ],
    [],
  );

  async function sendMessage(form: HTMLFormElement) {
    setStatus(null);

    const fd = new FormData(form);
    const name = String(fd.get("name") ?? "").trim();
    const fromEmail = String(fd.get("email") ?? "").trim();
    const subject = String(fd.get("subject") ?? "").trim();
    const message = String(fd.get("message") ?? "").trim();

    if (!name || !fromEmail || !message) {
      setStatus({ type: "err", msg: t.contact.errRequired });
      return;
    }

    const { serviceId, templateId, publicKey } = emailjsConfig;

    if (!serviceId || !templateId || !publicKey) {
      setStatus({
        type: "err",
        msg: t.contact.errNotConfigured,
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
      setStatus({ type: "ok", msg: t.contact.okSent });
    } catch {
      setStatus({ type: "err", msg: t.contact.errSend });
    } finally {
      setSending(false);
    }
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    void sendMessage(e.currentTarget);
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
              {/* Static by design: title and name stay untranslated. */}
              <p className="text-sm font-semibold uppercase tracking-wide text-foreground/60">
                {profile.title}
              </p>
              <h1 className="mt-3 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
                {profile.name}
              </h1>
              <p className="mt-4 max-w-xl text-base leading-7 text-foreground/75 sm:text-lg sm:leading-8">
                {tagline}
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a
                  href="#projects"
                  className="rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:opacity-95 transition-all duration-200 active:scale-95"
                >
                  {t.hero.viewProjects}
                </a>
                <a
                  href="/CV.pdf"
                  target="_blank"
                  className="rounded-xl border border-black/10 bg-card px-4 py-2.5 text-sm font-semibold hover:bg-black/5"
                  download
                >
                  {t.hero.downloadCv}
                </a>
              </div>

              <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm text-foreground/70">
                <span>
                  {t.hero.email}:{" "}
                  <a className="font-medium text-foreground hover:underline" href={`mailto:${profile.email}`}>
                    {profile.email}
                  </a>
                </span>
              </div>
            </div>

            <div className="flex justify-center md:justify-end">
              <div className="relative h-64 w-64 sm:h-80 sm:w-80 overflow-hidden rounded-full shadow-lg">
                {profile.photo ? (
                  <img
                    src={profile.photo}
                    alt={`${t.hero.photoAlt} ${profile.name}`}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-sm text-foreground/60 bg-black/5">
                    {t.hero.photoPlaceholder}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <Section id="about" title={t.sections.about}>
          <div className="rounded-2xl border border-black/10 bg-card p-6 sm:p-8">
            <p className="text-sm leading-7 text-foreground/80 sm:text-base sm:leading-8 text-justify">
              {about}
            </p>
          </div>
        </Section>

        <Section
          id="projects"
          title={t.sections.projects}
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
                  {p.tools.map((tool) => (
                    <span
                      key={`${p.id}-${tool}`}
                      className="rounded-full border border-black/10 bg-background px-2.5 py-1 text-xs font-medium text-foreground/80"
                    >
                      {tool}
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
                    {t.projects.viewDetails}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </Section>

        <Section id="skills" title={t.sections.skills}>
          <div className="grid gap-3 grid-cols-2 sm:grid-cols-4 lg:grid-cols-3">
            {skills.map((s) => (
              <SkillPill key={s.name} name={s.name} level={s.level} />
            ))}
          </div>
        </Section>

        <Section id="experience" title={t.sections.experience}>
          <Timeline items={experiences} />
        </Section>

        <Section id="achievements" title={t.sections.achievements}>
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
          title={t.sections.contact}
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="flex flex-col justify-between rounded-2xl border border-black/10 bg-card p-6">
              <div>
                <div className="font-heading text-lg font-semibold tracking-tight">{t.contact.getInTouch}</div>
                <p className="mt-2 text-sm leading-6 text-foreground/70">
                  {t.contact.introBefore}{" "}
                  <a className="font-medium text-foreground hover:underline" href={`mailto:${profile.email}`}>
                    {profile.email}
                  </a>
                  .
                </p>

                <div className="mt-6">
                  <div className="text-xs font-semibold uppercase tracking-wider text-foreground/50 mb-3">
                    {t.contact.socialMedia}
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    {socialLinks.map((s) => {
                      const Icon = s.icon;
                      return (
                        <a
                          key={s.label}
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={s.label}
                          title={s.label}
                          className={`group relative flex h-12 w-12 items-center justify-center rounded-xl border border-black/10 bg-background text-foreground/80 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:shadow-md active:scale-95 ${s.hoverClass}`}
                        >
                          <Icon className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
                          <span className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 rounded-md bg-foreground px-2 py-0.5 text-[11px] font-medium text-background opacity-0 shadow-xs transition-opacity duration-200 group-hover:opacity-100 whitespace-nowrap z-10">
                            {s.label}
                          </span>
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={onSubmit} className="rounded-2xl border border-black/10 bg-card p-6">
              <div className="font-heading text-lg font-semibold tracking-tight">{t.contact.messageTitle}</div>
              <div className="mt-4 grid gap-3">
                <label className="grid gap-1">
                  <span className="text-sm font-medium">{t.contact.name}</span>
                  <input
                    name="name"
                    className="h-11 rounded-xl border border-black/10 bg-background px-3 text-sm outline-none focus:border-accent"
                    placeholder={t.contact.namePlaceholder}
                    autoComplete="name"
                  />
                </label>
                <label className="grid gap-1">
                  <span className="text-sm font-medium">{t.contact.email}</span>
                  <input
                    name="email"
                    type="email"
                    className="h-11 rounded-xl border border-black/10 bg-background px-3 text-sm outline-none focus:border-accent"
                    placeholder="email@domain.com"
                    autoComplete="email"
                  />
                </label>
                <label className="grid gap-1">
                  <span className="text-sm font-medium">{t.contact.subject}</span>
                  <input
                    name="subject"
                    className="h-11 rounded-xl border border-black/10 bg-background px-3 text-sm outline-none focus:border-accent"
                    placeholder={t.contact.subjectPlaceholder}
                  />
                </label>
                <label className="grid gap-1">
                  <span className="text-sm font-medium">{t.contact.message}</span>
                  <textarea
                    name="message"
                    rows={5}
                    className="resize-none rounded-xl border border-black/10 bg-background px-3 py-2 text-sm outline-none focus:border-accent"
                    placeholder={t.contact.messagePlaceholder}
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
                {sending ? t.contact.sending : t.contact.send}
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
                <span className="text-foreground/50">{t.footer.cv}</span>
                <a className="font-medium text-foreground hover:underline" href="/CV.pdf" download target="_blank">
                  {t.footer.downloadPdf}
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
                aria-label={t.projects.close}
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
