import { RemixIcon } from "@/design-system/atoms/icon/variants/icon-remix";

import { Card, CardContent } from "@/shared/ui/card";

import type { CategoryCardProps } from "./category-card.types";

export function CategoryCard({ title, description, icon, projectCount, color }: CategoryCardProps) {
  return (
    <Card className="h-full w-full">
      <CardContent className="p-6">
        <div className="flex items-start gap-6">
          {/* Category Icon */}
          <div
            className="flex h-24 w-24 shrink-0 items-center justify-center rounded-xl"
            style={{ backgroundColor: color }}
          >
            <RemixIcon name={icon} size="lg" />
          </div>

          <div className="flex min-w-0 flex-col gap-1">
            {/* Title */}
            <h3 className="font-brand truncate text-xl font-medium leading-none">{title}</h3>

            {/* Description */}
            <p className="font-main text-sm font-normal leading-[--sizes-small-line-height] text-muted-foreground">
              {description}
            </p>

            {/* Counter */}
            <div className="mt-1 inline-flex h-4 items-center">
              <span className="font-main rounded-md bg-black px-2 py-1 text-xs font-semibold leading-[--sizes-extra-small-line-height] text-white">
                {projectCount.toLocaleString()} Projects
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
