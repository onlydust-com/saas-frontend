import { PropsWithChildren } from "react";

import { Separator } from "@/shared/ui/separator";
import { Skeleton } from "@/shared/ui/skeleton";
import { TypographyH4 } from "@/shared/ui/typography";

export function ProjectAsideSection({
  title,
  children,
  hasSeparator = false,
}: PropsWithChildren<{ title: string; hasSeparator?: boolean }>) {
  return (
    <>
      {hasSeparator && <Separator />}

      <section className="space-y-3">
        <TypographyH4>{title}</TypographyH4>

        {children}
      </section>
    </>
  );
}

ProjectAsideSection.Skeleton = function ProjectAsideSectionSkeleton({
  children,
  hasSeparator,
}: PropsWithChildren<{ hasSeparator?: boolean }>) {
  return (
    <>
      {hasSeparator && <Separator />}

      <section className="space-y-3">
        <Skeleton className="h-7 w-full" />

        {children}
      </section>
    </>
  );
};
