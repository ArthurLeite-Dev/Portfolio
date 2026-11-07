import { Reveal } from "./Reveal";

export function SectionHeading({
  title,
  index,
  meta,
}: {
  title: string;
  index: string;
  meta?: string;
}) {
  return (
    <div className="flex flex-col gap-6">
      <Reveal className="flex items-baseline justify-between gap-4 border-t border-border pt-4">
        <span className="label-xs">{index}</span>
        {meta ? <span className="label-xs text-right">{meta}</span> : null}
      </Reveal>
      <Reveal delay={1}>
        <h2 className="display-section">{title}</h2>
      </Reveal>
    </div>
  );
}
