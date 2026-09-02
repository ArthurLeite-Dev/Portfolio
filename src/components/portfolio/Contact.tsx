import { motion } from "motion/react";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { usePointerFine } from "@/hooks/use-pointer-fine";
import { profile } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

// FormSubmit.co: free form-to-email relay, no signup or API key required.
// First submission triggers a one-time confirmation email that must be
// approved from the inbox at `profile.email` before messages start arriving.
const FORM_ENDPOINT = `https://formsubmit.co/ajax/${profile.email}`;

function BigWord({ children }: { children: string }) {
  const fine = usePointerFine();
  return (
    <motion.span
      className="inline-block origin-bottom will-change-transform"
      {...(fine ? { whileHover: { scale: 1.03, rotate: -1.2, y: -8, opacity: 0.85 } } : {})}
      transition={{ type: "spring", stiffness: 180, damping: 18 }}
    >
      {children}
    </motion.span>
  );
}

type Status = "idle" | "sending" | "sent" | "error";

const initialValues = { name: "", email: "", message: "" };

const fieldClass =
  "w-full border-b border-border bg-transparent py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-foreground sm:text-base";

export function Contact() {
  const fine = usePointerFine();
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
      setStatus("sent");
      setValues(initialValues);
    } catch (error) {
      console.error("Falha ao enviar formulário de contato:", error);
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="container-editorial scroll-mt-24 py-24 md:py-40">
      <Reveal className="flex items-baseline justify-between gap-4 border-t border-border pt-4">
        <span className="label-xs">05 / 06</span>
        <span className="label-xs">Disponível para novos projetos</span>
      </Reveal>

      <Reveal delay={1}>
        <h2 className="display-hero mt-10 md:mt-16">
          <span className="block">
            <BigWord>Let&apos;s</BigWord>
          </span>
          <span className="block">
            <BigWord>build</BigWord>
          </span>
          <span className="block text-muted-foreground">
            <BigWord>something.</BigWord>
          </span>
        </h2>
      </Reveal>

      <div className="mt-12 grid gap-14 md:mt-20 md:grid-cols-12">
        <Reveal delay={2} className="md:col-span-7">
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <label className="flex flex-col gap-2">
                <span className="label-xs">Nome</span>
                <input
                  required
                  type="text"
                  name="name"
                  autoComplete="name"
                  placeholder="Seu nome"
                  value={values.name}
                  onChange={handleChange("name")}
                  disabled={status === "sending"}
                  className={fieldClass}
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="label-xs">Email</span>
                <input
                  required
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="voce@email.com"
                  value={values.email}
                  onChange={handleChange("email")}
                  disabled={status === "sending"}
                  className={fieldClass}
                />
              </label>
            </div>

            <label className="flex flex-col gap-2">
              <span className="label-xs">Mensagem</span>
              <textarea
                required
                name="message"
                rows={4}
                placeholder="Conte um pouco sobre o projeto, a vaga ou a ideia..."
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
              <motion.button
                type="submit"
                disabled={status === "sending"}
                {...(fine && status !== "sending" ? { whileHover: { scale: 1.03 } } : {})}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                className="group relative inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-foreground px-8 py-3 font-display text-xs uppercase tracking-[0.18em] text-background transition-colors duration-500 hover:bg-foreground/90 disabled:cursor-not-allowed disabled:opacity-60 sm:px-8"
              >
                <span>{status === "sending" ? "Enviando..." : "Get in touch"}</span>
                <span
                  aria-hidden
                  className="inline-block transition-transform duration-500 group-hover:translate-x-1.5"
                >
                  →
                </span>
              </motion.button>

              {status === "sent" && (
                <p role="status" className="text-sm text-muted-foreground">
                  Mensagem enviada — retorno em breve.
                </p>
              )}
              {status === "error" && (
                <p role="alert" className="text-sm text-muted-foreground">
                  Algo deu errado. Tente de novo ou escreva direto para{" "}
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
            <p className="label-xs">Ou, direto no email</p>
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
