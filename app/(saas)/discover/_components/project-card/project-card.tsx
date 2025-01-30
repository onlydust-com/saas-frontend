import Link from "next/link";

import { NEXT_ROUTER } from "@/shared/constants/router";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Badge } from "@/shared/ui/badge";
import { Card } from "@/shared/ui/card";
import { TypographyH4, TypographyMuted } from "@/shared/ui/typography";

import { ProjectCardProps } from "./project-card.types";

export function ProjectCard({ name, description, slug, logoUrl, categories, languages }: ProjectCardProps) {
  return (
    <Link href={NEXT_ROUTER.projects.details.root(slug)}>
      <Card className="flex gap-4 p-3">
        <Avatar className="size-24 rounded-xl">
          <AvatarImage src={logoUrl} />
          <AvatarFallback className="rounded-xl">{name.charAt(0)}</AvatarFallback>
        </Avatar>

        <div className="flex flex-col gap-1.5">
          <TypographyH4>{name}</TypographyH4>
          <TypographyMuted className="line-clamp-2">{description}</TypographyMuted>
          <div className="flex items-center justify-between">
            <div>
              {categories.map(category => (
                <Badge variant="outline" key={category}>
                  {category}
                </Badge>
              ))}
            </div>

            <div>
              {languages.map(language => (
                <Badge variant="outline" key={language.name}>
                  {language.name}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
