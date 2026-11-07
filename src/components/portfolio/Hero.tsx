import { useLanguage } from "@/lib/i18n";
import { MagneticButton } from "./MagneticButton";

export function Hero() {
  const { t } = useLanguage();

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col pb-10 pt-28 md:pb-14 md:pt-32"
    >
      <div className="container-editorial flex flex-1 flex-col justify-center">
        <p className="label-xs">{t.hero.hello}</p>

        <h1 className="display-hero mt-5 md:mt-8">
          <span className="block">Arthur Leite</span>
          <span className="mt-1 block text-muted-foreground md:mt-2">{t.hero.roleLine1}</span>
          <span className="block text-muted-foreground">{t.hero.roleLine2}</span>
        </h1>

        <p className="mt-8 max-w-xl text-balance text-sm leading-relaxed text-muted-foreground sm:text-base md:mt-12">
          {t.hero.subtitle}
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center md:mt-12">
          <MagneticButton href="#work" variant="solid" className="w-full sm:w-auto">
            {t.hero.ctaProjects}
          </MagneticButton>
          <MagneticButton href="#contact" className="w-full sm:w-auto">
            {t.hero.ctaContact}
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
