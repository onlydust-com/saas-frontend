import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import { CircleDotDashed, Folder } from "lucide-react";
import { Children, ReactElement } from "react";

import { Badge } from "@/shared/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/shared/ui/carousel";
import { TypographyH3, TypographyMuted } from "@/shared/ui/typography";

import { PageCarouselProps } from "./page-carousel.types";

function ResourceBadge({ resourceType }: { resourceType: PageCarouselProps["resourceType"] }) {
  const badgeLabel = resourceType === "issue" ? "Issues" : "Projects";
  const badgeIcon =
    resourceType === "issue" ? (
      <CircleDotDashed className="size-4 text-green-500" />
    ) : (
      <Folder className="size-4 text-cyan-500" />
    );

  return (
    <Badge variant={"secondary"} className="flex flex-row items-center gap-2">
      {badgeIcon}
      {badgeLabel}
    </Badge>
  );
}

export function PageCarousel({ children, title, description, count, resourceType }: PageCarouselProps) {
  const childrenArray = Children.toArray(children) as ReactElement[];

  return (
    <section className="w-full">
      <Carousel plugins={[WheelGesturesPlugin()]}>
        <div className="flex w-full flex-row items-start justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex flex-row items-center justify-start gap-2">
              <ResourceBadge resourceType={resourceType} />
              <TypographyH3>
                {title}
                {count ? ` (${count})` : null}
              </TypographyH3>
            </div>
            <TypographyMuted>{description}</TypographyMuted>
          </div>
          <div className="flex flex-row items-center justify-end gap-2">
            <CarouselPrevious className="static translate-y-0" />
            <CarouselNext className="static translate-y-0" />
          </div>
        </div>
        <div className="mt-3 w-full">
          <CarouselContent className="-ml-6">
            {childrenArray.map((child, index) => (
              <CarouselItem key={index} className="pl-6 md:basis-1/2 lg:basis-1/3">
                {child}
              </CarouselItem>
            ))}
          </CarouselContent>
        </div>
      </Carousel>
    </section>
  );
}
