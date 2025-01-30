import Link from "next/link";

import { NEXT_ROUTER } from "@/shared/constants/router";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Badge } from "@/shared/ui/badge";
import { Card } from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";
import { TypographyH4, TypographyMuted } from "@/shared/ui/typography";

import { CategoryCardProps } from "./category-card.types";

export function CategoryCard({ name, description, slug, projectCount }: CategoryCardProps) {
  return (
    <Link href={NEXT_ROUTER.categories.details.root(slug)} className="transition-opacity hover:opacity-80">
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
    </Link>
  );
}

export function CategoryCardSkeleton() {
  return <Skeleton className="h-[120px] w-full rounded-xl" />;
}
