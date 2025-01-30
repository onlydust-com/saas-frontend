import Image from "next/image";
import { useRouter } from "next/navigation";

import { NEXT_ROUTER } from "@/shared/constants/router";
import { Badge } from "@/shared/ui/badge";
import { Card, CardDescription, CardTitle } from "@/shared/ui/card";

import { ProjectCardProps } from "./project-card.types";

const FALLBACK_IMAGE = "/images/logos/onlydust-logo-space.webp";

export function ProjectCard({ project }: ProjectCardProps) {
  const router = useRouter();
  const { slug, name, shortDescription, logoUrl, categories = [], languages = [] } = project;

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    if (target.src !== FALLBACK_IMAGE) {
      target.src = FALLBACK_IMAGE;
    }
  };

  return (
    <Card
      className="group cursor-pointer border-none transition-colors"
      onClick={() => router.push(NEXT_ROUTER.projects.details.overview.root(slug))}
    >
      <div className="flex gap-4">
        {/* Image container with fixed size */}
        <div className="relative h-32 w-32 flex-shrink-0 overflow-hidden rounded-lg">
          <Image
            src={logoUrl || FALLBACK_IMAGE}
            alt={name}
            width={128}
            height={128}
            className="h-full w-full object-cover"
            onError={handleImageError}
            unoptimized={!logoUrl}
          />
        </div>

        {/* Content container */}
        <div className="flex h-32 flex-grow flex-col">
          <div className="flex-grow">
            <CardTitle className="text-lg">{name}</CardTitle>
            <CardDescription className="mt-2 line-clamp-2">{shortDescription}</CardDescription>
          </div>

          {/* Tags container with categories on left and language icons on right */}
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {categories?.map(category => (
                <Badge
                  key={category.id}
                  variant="outline"
                  className="border border-primary/20 text-xs hover:bg-primary/10"
                >
                  {category.name}
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              {languages?.map(language => (
                <div key={language.id} className="relative h-6 w-6 overflow-hidden rounded-full bg-background">
                  <Image
                    src={language.logoUrl}
                    alt={language.name}
                    width={24}
                    height={24}
                    className="h-full w-full object-cover"
                    onError={handleImageError}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
