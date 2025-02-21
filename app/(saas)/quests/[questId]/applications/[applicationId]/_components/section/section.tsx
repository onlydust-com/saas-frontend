import { TypographyH3 } from "@/shared/ui/typography";

import { SectionProps } from "./section.types";

export function Section({ title, children }: SectionProps) {
  return (
    <section className="flex flex-col gap-8">
      <header className="flex items-center justify-between">
        <TypographyH3>{title}</TypographyH3>
      </header>

      <div>{children}</div>
    </section>
  );
}
