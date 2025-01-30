import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Badge } from "@/shared/ui/badge";
import { Card, CardContent } from "@/shared/ui/card";
import { TypographyH4, TypographyMuted } from "@/shared/ui/typography";

import type { ProjectCardProps } from "./project-card.types";

export function ProjectCard({ name, description, logoUrl, categories, languageIcon }: ProjectCardProps) {
  return (
    <Card className="w-full">
      <CardContent className="flex w-full flex-col items-start gap-6 p-0">
        <div className="flex w-full items-start gap-4 p-6">
          <Avatar className="h-24 w-24 rounded-xl">
            <AvatarImage src={logoUrl} alt={name} />
            <AvatarFallback className="rounded-xl">{name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex w-full flex-col gap-1">
            <TypographyH4>{name}</TypographyH4>
            <TypographyMuted>{description}</TypographyMuted>
            <div className="flex w-full items-center justify-between pt-4">
              <div className="flex items-center gap-2.5">
                {categories.map(category => (
                  <Badge key={category} variant="secondary" className="rounded-md px-2.5 py-0.5">
                    {category}
                  </Badge>
                ))}
              </div>
              {languageIcon && (
                <Avatar className="h-5 w-5 rounded-full">
                  <AvatarImage src={languageIcon} alt="Language" />
                  <AvatarFallback className="text-xs">L</AvatarFallback>
                </Avatar>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
