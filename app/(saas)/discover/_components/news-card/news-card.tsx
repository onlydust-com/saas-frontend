import { bootstrap } from "@/core/bootstrap";

import { Badge } from "@/shared/ui/badge";
import { Card } from "@/shared/ui/card";
import { TypographyH4, TypographyMuted, TypographySmall } from "@/shared/ui/typography";

import { NewsCardProps } from "./news-card.types";

export function NewsCard({ title, description, imageUrl, categories, date }: NewsCardProps) {
  const dateKernelPort = bootstrap.getDateKernelPort();

  return (
    <Card className="flex flex-col gap-4 border-none">
      <img
        src={imageUrl}
        alt={title}
        className="aspect-video w-full rounded-xl object-cover"
        width={500}
        height={200}
      />

      <div className="flex flex-col gap-1.5">
        <TypographyH4>{title}</TypographyH4>

        <TypographyMuted>{description}</TypographyMuted>

        <div className="flex items-center gap-1">
          <div className="flex gap-1">
            {categories.map(category => (
              <Badge variant="outline" key={category}>
                {category}
              </Badge>
            ))}
          </div>

          <TypographySmall>{dateKernelPort.format(new Date(date), "dd MMM. yyyy")}</TypographySmall>
        </div>
      </div>
    </Card>
  );
}
