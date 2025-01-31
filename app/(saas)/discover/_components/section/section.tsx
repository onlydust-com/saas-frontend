import Link from "next/link";

import { Button } from "@/shared/ui/button";
import { TypographyH3 } from "@/shared/ui/typography";

import { SectionProps } from "./section.types";

export function Section({ title, seeMore, children }: SectionProps) {
  return (
    <section className="flex flex-col gap-8">
      <header className="flex items-center justify-between">
        <TypographyH3>{title}</TypographyH3>

        {seeMore ? (
          <Button asChild variant="secondary">
            <Link href={seeMore}>See More</Link>
          </Button>
        ) : null}
      </header>

      <div>{children}</div>
    </section>
  );
}
