import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Badge } from "@/shared/ui/badge";
import { Card } from "@/shared/ui/card";
import { TypographyH4, TypographyMuted } from "@/shared/ui/typography";

import { CategoryCardProps } from "./category-card.types";

export function CategoryCard({ name, description, slug, projectCount }: CategoryCardProps) {
  return (
    <Card className="flex gap-4 p-3">
      <Avatar className="size-24 rounded-xl">
        <AvatarImage src={""} />
        <AvatarFallback className="rounded-xl">{name.charAt(0)}</AvatarFallback>
      </Avatar>

      <div className="flex flex-col gap-1.5">
        <TypographyH4>{name}</TypographyH4>
        <TypographyMuted className="line-clamp-2">{description}</TypographyMuted>
        <div>
          <Badge variant="outline">{projectCount} projects</Badge>
        </div>
      </div>
    </Card>
  );
}
