import { RemixIconsName } from "@/design-system/atoms/icon/adapters/remix-icon/remix-icon-names.types";
import { RemixIcon } from "@/design-system/atoms/icon/variants/icon-remix";

import { cn } from "@/shared/helpers/cn";
import { Badge } from "@/shared/ui/badge";
import { Card, CardContent } from "@/shared/ui/card";
import { TypographyH3, TypographyP } from "@/shared/ui/typography";

import { CategoryCardProps } from "./category-card.types";

const colorClasses = {
  blue: "bg-blue-500",
  green: "bg-green-500",
  purple: "bg-purple-500",
  orange: "bg-orange-500",
  pink: "bg-pink-500",
  teal: "bg-teal-500",
} as const;

export function CategoryCard({ category, className, onClick }: CategoryCardProps) {
  const { iconSlug, name, projectCount, description } = category;

  function getRandomColor() {
    const colorKeys = Object.keys(colorClasses) as Array<keyof typeof colorClasses>;
    return colorClasses[colorKeys[Math.floor(Math.random() * colorKeys.length)]];
  }

  return (
    <Card
      className={cn(
        "group transition-colors hover:border-primary/50",
        {
          "cursor-pointer": !!onClick,
        },
        className
      )}
      onClick={onClick}
    >
      <CardContent className="flex h-full gap-6 p-6">
        <RemixIcon
          name={iconSlug as RemixIconsName}
          size="lg"
          classNames={{
            base: cn("w-18 aspect-square rounded-md", getRandomColor()),
          }}
        />

        <div className="flex flex-col justify-between gap-2">
          <div className="flex flex-1 flex-col gap-2">
            <TypographyH3 className="font-brand text-xl font-medium">{name}</TypographyH3>
            <TypographyP className="text-sm text-muted-foreground">{description}</TypographyP>
          </div>
          <div className="flex items-center gap-2">
            {projectCount !== undefined && (
              <Badge variant="outline" className="w-fit">
                {projectCount.toLocaleString()} Projects
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
