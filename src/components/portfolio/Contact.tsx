import { useState, type ChangeEvent, type FormEvent } from "react";
import { useLanguage } from "@/lib/i18n";
import { profile } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

// FormSubmit.co: free form-to-email relay, no signup or API key required.
// First submission triggers a one-time confirmation email that must be
// approved from the inbox at `profile.email` before messages start arriving.
const FORM_ENDPOINT = `https://formsubmit.co/ajax/${profile.email}`;

type Status = "idle" | "sending" | "sent" | "error";

const initialValues = { name: "", email: "", message: "" };

const fieldClass =
  "w-full border-b border-border bg-transparent py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-foreground sm:text-base";

export function Contact() {
  const { t } = useLanguage();
  const [status, setStatus] = useState<Status>("idle");
  const [values, setValues] = useState(initialValues);

  const handleChange =
    (field: keyof typeof initialValues) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setValues((v) => ({ ...v, [field]: e.target.value }));

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          message: values.message,
          _subject: `Novo contato via portfólio — ${values.name}`,
          _template: "table",
          _captcha: "false",
        }),
      });

      if (!res.ok) throw new Error(`Request failed with ${res.status}`);
      // FormSubmit can answer 200 with { success: "false" } (e.g. form not activated yet).
      const data = (await res.json().catch(() => null)) as { success?: string | boolean } | null;
      if (data && (data.success === false || data.success === "false")) {
        throw new Error("FormSubmit rejected the submission");
      }
      setStatus("sent");
      setValues(initialValues);
    } catch (error) {
      console.error("Falha ao enviar formulário de contato:", error);
      setStatus("error");
    }
  }

  const [line1, line2, line3] = t.contact.heading;

  return (
    <section id="contact" className="container-editorial scroll-mt-24 py-24 md:py-40">
      <Reveal className="flex items-baseline justify-between gap-4 border-t border-border pt-4">
        <span className="label-xs">04 / 04</span>
        <span className="label-xs">{t.contact.available}</span>
      </Reveal>

      <Reveal delay={1}>
        <h2 className="display-hero mt-10 md:mt-16">
          <span className="block">{line1}</span>
          <span className="block">{line2}</span>
          <span className="block text-muted-foreground">{line3}</span>
        </h2>
      </Reveal>

      <div className="mt-12 grid gap-14 md:mt-20 md:grid-cols-12">
        <Reveal delay={2} className="md:col-span-7">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <label className="flex flex-col gap-2">
                <span className="label-xs">{t.contact.nameLabel}</span>
                <input
                  required
                  type="text"
                  name="name"
                  autoComplete="name"
                  placeholder={t.contact.namePlaceholder}
                  value={values.name}
                  onChange={handleChange("name")}
                  disabled={status === "sending"}
                  className={fieldClass}
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="label-xs">{t.contact.emailLabel}</span>
                <input
                  required
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder={t.contact.emailPlaceholder}
                  value={values.email}
                  onChange={handleChange("email")}
                  disabled={status === "sending"}
                  className={fieldClass}
                />
              </label>
            </div>

            <label className="flex flex-col gap-2">
              <span className="label-xs">{t.contact.messageLabel}</span>
              <textarea
                required
                name="message"
                rows={4}
                placeholder={t.contact.messagePlaceholder}
                value={values.message}
                onChange={handleChange("message")}
                disabled={status === "sending"}
                className={cn(fieldClass, "resize-none")}
              />
            </label>

            {/* Honeypot: hidden from real visitors, filters bot submissions. */}
            <input
              type="text"
              name="_honey"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
            />

            <div className="mt-2 flex flex-wrap items-center gap-5">
              <button
                type="submit"
                disabled={status === "sending"}

                className="group relative inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-foreground px-8 py-3 font-display text-xs uppercase tracking-[0.18em] text-background transition-colors duration-500 hover:bg-foreground/90 disabled:cursor-not-allowed disabled:opacity-60 sm:px-8"
              >
                <span>{status === "sending" ? t.contact.submitSending : t.contact.submitIdle}</span>
                <span
                  aria-hidden
                  className="inline-block transition-transform duration-500 group-hover:translate-x-1.5"
                >
                  →
                </span>
              </button>

              {status === "sent" && (
                <p role="status" className="text-sm text-muted-foreground">
                  {t.contact.sentMessage}
                </p>
              )}
              {status === "error" && (
                <p role="alert" className="text-sm text-muted-foreground">
                  {t.contact.errorMessage}{" "}
                  <a href={`mailto:${profile.email}`} className="link-underline text-foreground">
                    {profile.email}
                  </a>
                  .
                </p>
              )}
            </div>
          </form>
        </Reveal>

        <Reveal delay={3} className="flex flex-col gap-6 md:col-span-5">
          <div>
            <p className="label-xs">{t.contact.orEmail}</p>
            <a
              href={`mailto:${profile.email}`}
              className="link-underline mt-3 inline-block text-base text-muted-foreground transition-colors hover:text-foreground sm:text-lg"
            >
              {profile.email}
            </a>
          </div>

          <ul className="grid grid-cols-1 gap-px overflow-hidden border border-border bg-border sm:grid-cols-2">
            {profile.socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex min-h-14 items-center justify-between bg-background px-5 py-4 font-display text-xs uppercase tracking-[0.18em] transition-colors duration-500 hover:bg-surface-hover"
                >
                  {s.label}
                  <span aria-hidden className="text-muted-foreground">
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
