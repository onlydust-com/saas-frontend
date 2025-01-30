import Link from "next/link";

import { Button } from "@/shared/ui/button";
import { TypographyH3 } from "@/shared/ui/typography";

import { SectionProps } from "./section.types";

export default function Section({ title, seeAll, children }: SectionProps) {
  return (
    <section className="flex flex-col gap-8">
      <header className="flex items-center justify-between">
        <TypographyH3>{title}</TypographyH3>

        {seeAll ? (
          <Button asChild variant="secondary">
            <Link href={seeAll}>See All</Link>
          </Button>
        ) : null}
      </header>

      <div>{children}</div>
    </section>
  );
}
