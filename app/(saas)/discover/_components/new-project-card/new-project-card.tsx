import { GitFork, Star, UserRound } from "lucide-react";
import { useCallback } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Badge } from "@/shared/ui/badge";
import { Card, CardContent, CardFooter, CardTitle } from "@/shared/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/tooltip";
import { TypographyH4, TypographyMuted, TypographySmall } from "@/shared/ui/typography";
import { cn } from "@/shared/utils";

import { NewProjectCardProps } from "./new-project-card.types";

function Metrics({ stars, forks, contributors }: { stars: number; forks: number; contributors: number }) {
  return (
    <div className="flex items-center gap-md">
      <div className="flex items-center gap-sm">
        <Star className="size-3.5 shrink-0 text-muted-foreground" />

        <TypographySmall className="text-muted-foreground">{Intl.NumberFormat().format(stars)}</TypographySmall>
      </div>
      <div className="flex items-center gap-sm">
        <GitFork className="size-3.5 shrink-0 text-muted-foreground" />

        <TypographySmall className="text-muted-foreground">{Intl.NumberFormat().format(forks)}</TypographySmall>
      </div>
      <div className="flex items-center gap-sm">
        <UserRound className="size-3.5 shrink-0 text-muted-foreground" />

        <TypographySmall className="text-muted-foreground">{Intl.NumberFormat().format(contributors)}</TypographySmall>
      </div>
    </div>
  );
}

export function NewProjectCard({
  name,
  logoUrl,
  description,
  categories,
  languages,
  stars,
  forks,
  contributors,
  className,
}: NewProjectCardProps) {
  const limitedCategories = categories?.slice(0, 2) ?? [];

  const renderLanguages = useCallback(() => {
    if (!languages?.length) return null;

    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-1">
            {languages.slice(0, 2).map(language => (
              <Avatar className="size-5" key={language.name}>
                <AvatarImage src={language.logoUrl} />
                <AvatarFallback className="rounded-xl">{language.name.charAt(0)}</AvatarFallback>
              </Avatar>
            ))}
          </div>
        </TooltipTrigger>

        <TooltipContent side="bottom" align="end">
          <ul className="flex flex-col gap-2">
            {languages?.map(language => (
              <li key={language.name} className="flex items-center justify-between gap-10">
                <div className="flex items-center gap-1">
                  <Avatar className="size-5" key={language.name}>
                    <AvatarImage src={language.logoUrl} />
                    <AvatarFallback className="rounded-xl">{language.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <TypographySmall>{language.name}</TypographySmall>
                </div>

                <TypographySmall>{language.percentage}%</TypographySmall>
              </li>
            ))}
          </ul>
        </TooltipContent>
      </Tooltip>
    );
  }, [languages]);

  return (
    <Card className={cn("flex flex-col gap-4 p-4", className)}>
      <CardTitle className="flex w-full flex-row items-center justify-start gap-2">
        <Avatar className="size-12 rounded-xl">
          <AvatarImage src={logoUrl} />
          <AvatarFallback className="rounded-xl">{name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1">
          <div className="line-clamp-1 flex-1">
            <TypographyH4>{name}</TypographyH4>
          </div>
          <Metrics stars={stars} forks={forks} contributors={contributors} />
        </div>
      </CardTitle>

      <CardContent className="flex-1 p-0">
        <TypographyMuted className="line-clamp-3">{description}</TypographyMuted>
      </CardContent>

      <CardFooter className="flex flex-row items-center justify-between gap-4 p-0">
        <div className="flex flex-row items-center justify-end gap-1">
          {limitedCategories.map(label => (
            <Badge variant={"secondary"} key={label}>
              {label}
            </Badge>
          ))}
        </div>

        {renderLanguages()}
      </CardFooter>
    </Card>
  );
}
