import { ElementType } from "react";


import { CardProjectOverviewPort } from "../../card-project-overview.types";
import { CardProjectOverviewDefaultVariants } from "./default.variants";
import { cn } from "@/shared/helpers/cn";
import { Paper } from "@/design-system/atoms/paper";
import { Categories } from "@/shared/features/projects/categories/categories";
import { Metric } from "@/shared/features/projects/metric/metric";
import { Star } from "lucide-react";
import { GitFork } from "lucide-react";
import { Typo } from "@/design-system/atoms/typo";
import { UserRound } from "lucide-react";
import { Avatar } from "@/design-system/atoms/avatar";
import { Languages } from "@/shared/features/projects/languages/languages";

export function CardProjectOverviewDefaultAdapter<C extends ElementType = "div">({
    as,
    htmlProps,
    classNames,
    logoUrl,
    name,
    contributorCount,
    starCount,
    forkCount,
    description,
    categories,
    languages,
}: CardProjectOverviewPort<C>) {
  const slots = CardProjectOverviewDefaultVariants();
  
  return (
    <Paper
      as={as}
      htmlProps={htmlProps}
      size="none"
      background="glass"
      border="primary"
      classNames={{ base: cn(slots.base(), classNames?.base) }}
    >
      <div className="relative z-20 flex h-full flex-col justify-between gap-2lg rounded-md border-border-primary p-xl">
          <div className="flex flex-col gap-2lg">
            <div className="flex flex-row gap-2lg">
            <Avatar src={logoUrl} alt={name} size="xl" shape="squared" />
              <div className="flex h-full flex-col justify-between overflow-hidden">
                <Typo variant="heading" size="xs" weight="medium" color="primary" classNames={{ base: "truncate" }}>
                  {name}
                </Typo>

                <div className="flex items-center gap-md">
                  <Metric icon={Star} count={starCount} />
                  <Metric icon={GitFork} count={forkCount} />
                  <Metric icon={UserRound} count={contributorCount} />
                </div>
              </div>
            </div>

            {description ? (
              <div>
                <Typo size="sm" color="tertiary" classNames={{ base: "line-clamp-3" }}>
                  {description}
                </Typo>
              </div>
            ) : null}

            <Categories categories={categories} />
          </div>

          <Languages languages={languages} />
        </div>
    </Paper>
  );
} 