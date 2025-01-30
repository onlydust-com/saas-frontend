import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { Badge } from "@/shared/ui/badge";
import Image from "next/image";
import { ArticleCardProps } from "./article-card.types";

export function ArticleCard({ title, description, categories, date, image }: ArticleCardProps) {
  return (
    <Card className="group transition-colors hover:border-primary/50">
      {/* Header Image */}
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={image || "https://placehold.co/800x400"}
          alt={title}
          width={800}
          height={400}
          className="h-full w-full object-cover"
          unoptimized={!image}
        />
      </div>
      
      <CardHeader>
        <CardTitle className="line-clamp-2">{title}</CardTitle>
        <CardDescription className="line-clamp-2 mt-2">{description}</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge 
                key={category} 
                variant="outline"
                className="text-xs border border-primary/20 hover:bg-primary/10"
              >
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