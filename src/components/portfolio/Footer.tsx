import { useLanguage } from "@/lib/i18n";
import { profile } from "@/lib/portfolio-data";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="container-editorial border-t border-border py-10 md:py-14">
      <div className="flex flex-col items-center gap-8 text-center md:flex-row md:items-baseline md:justify-between md:gap-6 md:text-left">
        <div>
          <p className="font-display text-sm font-bold uppercase tracking-[0.2em]">
            {profile.name}
          </p>
          <p className="mt-2 label-xs">{t.footer.rights}</p>
        </div>

        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
          {profile.socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target="_blank"
                rel="noreferrer noopener"
                className="link-underline inline-flex min-h-11 items-center font-display text-[11px] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
