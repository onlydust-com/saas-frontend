"use client";

import { CircleDot, GitFork, Star, UserRound } from "lucide-react";
import { ElementType, useEffect, useMemo, useRef, useState } from "react";
import { useMeasure } from "react-use";

import { Avatar } from "@/design-system/atoms/avatar";
import { Badge } from "@/design-system/atoms/badge";
import { ButtonGroup } from "@/design-system/atoms/button/variants/button-group";
import { Icon } from "@/design-system/atoms/icon";
import { Paper } from "@/design-system/atoms/paper";
import { Tooltip } from "@/design-system/atoms/tooltip";
import { Typo } from "@/design-system/atoms/typo";
import { AvatarLabelSingle } from "@/design-system/molecules/avatar-label-single";

import { BaseLink } from "@/shared/components/base-link/base-link";
import { MARKETPLACE_ROUTER } from "@/shared/constants/router";
import { cn } from "@/shared/helpers/cn";
import { marketplaceRouting } from "@/shared/helpers/marketplace-routing";

import { HoverEffect } from "../../_components/hover-effect/hover-effect";
import {
  AvatarWithEcosystemsProps,
  CardProjectMarketplacePort,
  CategoriesProps,
  LanguagesProps,
  MetricProps,
} from "../../card-project-marketplace.types";
import { CardProjectMarketplaceDefaultVariants } from "./default.variants";

function Metric({ icon, count }: MetricProps) {
  return (
    <div className="flex items-center gap-sm">
      <Icon component={icon} size="xxs" classNames={{ base: "text-foreground-quinary" }} />

      <Typo size="xs" weight="medium">
        {Intl.NumberFormat().format(count)}
      </Typo>
    </div>
  );
}

function AvatarWithEcosystems({ name, logoUrl, ecosystems }: AvatarWithEcosystemsProps) {
  function renderBadge() {
    if (!ecosystems?.length) return null;

    const ecosystemCount = ecosystems.length;

    return (
      <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4">
        <Tooltip
          content={
            <ul className="flex flex-col gap-md">
              {ecosystems.map(ecosystem => (
                <li key={ecosystem.id}>
                  <AvatarLabelSingle
                    avatar={{
                      src: ecosystem.logoUrl,
                      alt: ecosystem.name,
                    }}
                    size="xxs"
                    shape="squared"
                    title={{
                      children: ecosystem.name,
                    }}
                  />
                </li>
              ))}
            </ul>
          }
          placement="right-start"
          background="primary"
        >
          <Avatar
            src={ecosystemCount === 1 ? ecosystems[0].logoUrl : undefined}
            name={ecosystemCount > 1 ? String(ecosystemCount) : undefined}
            size="xxs"
            shape="squared"
            classNames={{
              base: "bg-background-primary outline-[#4945FF]/30 cursor-default",
              name: "text-foreground-primary",
            }}
          />
        </Tooltip>
      </div>
    );
  }

  return (
    <div className="flex">
      <div className="relative">
        <Avatar src={logoUrl} alt={name} size="xl" shape="squared" />
        {renderBadge()}
      </div>
    </div>
  );
}

function Categories({ categories = [] }: CategoriesProps) {
  const [containerRef, { width: containerWidth }] = useMeasure<HTMLDivElement>();
  const [innerRef, { width: innerWidth }] = useMeasure<HTMLDivElement>();
  const [visibleCategories, setVisibleCategories] = useState<NonNullable<CategoriesProps["categories"]>>(categories);
  const [hiddenCategories, setHiddenCategories] = useState<NonNullable<CategoriesProps["categories"]>>([]);

  useEffect(() => {
    if (!containerWidth || !innerWidth || !categories?.length) return;

    if (innerWidth > containerWidth) {
      setVisibleCategories(prev => prev.slice(0, -1));
      setHiddenCategories(prev => [visibleCategories[visibleCategories.length - 1], ...prev]);
    }
  }, [containerWidth, innerWidth, categories?.length]);

  if (!categories.length) return null;

  return (
    <div ref={containerRef} className="w-full overflow-hidden">
      <div ref={innerRef} className="inline-flex items-center gap-xs">
        {visibleCategories.map(category => (
          <Badge
            key={category.name}
            color="grey"
            variant="outline"
            shape="rounded"
            size="xs"
            classNames={{ base: "js-badge" }}
          >
            {category.name}
          </Badge>
        ))}

        {hiddenCategories.length ? (
          <Tooltip
            background="primary"
            placement="bottom"
            content={
              <ul className="flex flex-col gap-md">
                {hiddenCategories.map(category => (
                  <Typo key={category.name} as="li" size="xs" weight="medium">
                    {category.name}
                  </Typo>
                ))}
              </ul>
            }
          >
            <Badge color="brand" shape="rounded" size="xs" variant="outline" classNames={{ base: "cursor-default" }}>
              +{hiddenCategories.length}
            </Badge>
          </Tooltip>
        ) : null}
      </div>
    </div>
  );
}

function Languages({ languages }: LanguagesProps) {
  const sortedLanguages = useMemo(() => languages?.sort((a, b) => b.percentage - a.percentage), [languages]);

  if (!sortedLanguages?.length) return null;

  return (
    <Tooltip
      background="primary"
      content={
        <div className="flex flex-col gap-1">
          {sortedLanguages.map(language => (
            <div key={language.id} className="flex items-center justify-between gap-md">
              <div className="flex items-center gap-md">
                <img src={language.transparentLogoUrl} loading="lazy" alt={language.name} className="w-5" />

                <Typo size="xs" classNames={{ base: "text-inherit" }}>
                  {language.name}
                </Typo>
              </div>

              <Typo size="xs" color="quaternary">
                {language.percentage}%
              </Typo>
            </div>
          ))}
        </div>
      }
    >
      <div className="flex h-auto w-full gap-xs">
        {sortedLanguages.map(language => (
          <div
            key={language.id}
            className="relative flex h-full min-w-7 items-center justify-start overflow-hidden rounded-md p-xxs"
            style={{
              width: `${language.percentage}%`,
              backgroundColor: language.color,
            }}
          >
            <img src={language.logoUrl} loading="lazy" alt={language.name} className="w-5" />
          </div>
        ))}
      </div>
    </Tooltip>
  );
}

export function CardProjectMarketplaceDefaultAdapter<C extends ElementType = "div">({
  as,
  htmlProps,
  classNames,
  logoUrl,
  name,
  slug,
  contributorCount,
  starCount,
  forkCount,
  availableIssueCount,
  goodFirstIssueCount,
  description,
  categories,
  languages,
  ecosystems,
}: CardProjectMarketplacePort<C>) {
  const slots = CardProjectMarketplaceDefaultVariants();
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <Paper
      as={as}
      htmlProps={htmlProps}
      size="none"
      background="transparent"
      border="primary"
      classNames={{ base: cn(slots.base(), classNames?.base) }}
    >
      <div ref={cardRef} className="flex h-full w-full flex-col">
        <HoverEffect cardRef={cardRef} />

        <div className="relative z-20 flex h-full flex-col justify-between gap-2lg rounded-md border-border-primary p-xl">
          <div className="flex flex-col gap-2lg">
            <div className="flex flex-row gap-2lg">
              <AvatarWithEcosystems name={name} logoUrl={logoUrl} ecosystems={ecosystems} />

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

            <div className="flex w-full">
              <ButtonGroup
                fullWidth
                variant="tertiary"
                buttons={[
                  {
                    as: BaseLink,
                    htmlProps: {
                      href: marketplaceRouting(MARKETPLACE_ROUTER.projects.details.root(slug)),
                    },
                    translate: {
                      token: "common:count.openIssues",
                      values: { count: availableIssueCount },
                    },
                    classNames: {
                      startIcon: "text-utility-secondary-green-500",
                    },
                    startIcon: {
                      component: CircleDot,
                      size: "xs",
                    },
                  },
                  {
                    as: BaseLink,
                    htmlProps: {
                      href: marketplaceRouting(MARKETPLACE_ROUTER.projects.details.root(slug)),
                    },
                    translate: {
                      token: "common:count.goodFirstIssues",
                      values: { count: goodFirstIssueCount },
                    },
                    startContent: (
                      <div className="relative mr-0.5 size-1.5">
                        <div className="absolute -inset-px animate-ping rounded-full bg-utility-secondary-green-500 opacity-75" />
                        <div className="size-full rounded-full bg-utility-secondary-green-500" />
                      </div>
                    ),
                  },
                ]}
                size="xs"
              />
            </div>

            {description ? (
              <div>
                <Typo size="sm" color="tertiary" classNames={{ base: "line-clamp-4" }}>
                  {description}
                </Typo>
              </div>
            ) : null}

            <Categories categories={categories} />
          </div>
          <Languages languages={languages} />
        </div>
      </div>
    </Paper>
  );
}
