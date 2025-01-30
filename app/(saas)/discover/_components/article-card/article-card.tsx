import Image from "next/image";

import { Badge } from "@/shared/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { TypographyH4, TypographyP } from "@/shared/ui/typography";

import { ArticleCardProps } from "./article-card.types";

export function ArticleCard({ title, description, categories, date, image }: ArticleCardProps) {
  return (
    <Card className="group flex flex-col justify-between gap-4 border-none transition-colors hover:border-primary/50">
      <div className="flex flex-col gap-6">
        <div className="relative h-56 w-full overflow-hidden">
          <Image
            src={image || "https://placehold.co/800x400"}
            alt={title}
            width={800}
            height={400}
            className="h-full w-full rounded-lg object-cover"
            unoptimized={!image}
          />
        </div>

        <CardHeader className="flex flex-col p-0">
          <CardTitle className="line-clamp-2">
            <TypographyH4>{title}</TypographyH4>
          </CardTitle>
          <CardDescription className="mt-2 line-clamp-3">
            <TypographyP>{description}</TypographyP>
          </CardDescription>
        </CardHeader>
      </div>

      <CardContent className="flex flex-col gap-2 p-0">
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <Badge key={category} variant="outline" className="border border-primary/20 text-xs hover:bg-primary/10">
                {category}
              </Badge>
            ))}
          </div>
          <span className="text-sm text-muted-foreground">{date}</span>
        </div>
      </CardContent>
    </Card>
  );
}
