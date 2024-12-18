"use client";

import { CircleDot, GitFork, Star, UserRound } from "lucide-react";
import Image from "next/image";
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
import Header from "./header.png";

function Metric({ icon, count }: MetricProps) {
  return (
    <div className="flex items-center gap-sm">
      <Icon component={icon} size="xxs" classNames={{ base: "text-foreground-quinary" }} />

      <Typo size="xs" weight="medium">
        {count}
      </Typo>
    </div>
  );
}

function AvatarWithEcosystems({ name, logoUrl, ecosystems }: AvatarWithEcosystemsProps) {
  const [avatarRef, { height }] = useMeasure<HTMLDivElement>();

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
      <div ref={avatarRef} style={{ marginTop: -height / 2 }} className="relative">
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
          <Badge key={category.name} color="grey" shape="rounded" size="xs" classNames={{ base: "js-badge" }}>
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
  if (!languages?.length) return null;

  const sortedLanguages = useMemo(() => languages.sort((a, b) => b.percentage - a.percentage), [languages]);

  return (
    <Tooltip
      background="primary"
      content={
        <div className="flex flex-col gap-1">
          {sortedLanguages.map(language => (
            <div key={language.id} className="flex items-center justify-between gap-md">
              <div className="flex items-center gap-md">
                <img src={language.transparentLogoUrl} loading="lazy" width={20} height={20} alt={language.name} />

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
      <div className="flex h-6 w-full gap-xs">
        {sortedLanguages.map(language => (
          <div
            key={language.id}
            className="relative flex h-full min-w-6 items-center justify-start overflow-hidden rounded-md p-xs"
            style={{
              width: `${Math.max(language.percentage, 24)}%`,
              backgroundColor: language.color,
            }}
          >
            <img src={language.logoUrl} loading="lazy" width={20} height={20} alt={language.name} />
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
      background="glass"
      border="none"
      classNames={{ base: cn(slots.base(), classNames?.base) }}
    >
      <div ref={cardRef}>
        <HoverEffect cardRef={cardRef} />
        <header className="relative z-10 h-[100px] w-full overflow-hidden rounded-t-md">
          <img src={logoUrl} alt={name} className="h-full w-full object-cover" />

          <Image
            src={Header}
            alt={name}
            className="absolute inset-0 object-cover mix-blend-luminosity backdrop-blur-xl backdrop-saturate-150"
          />
        </header>

        <div className="relative z-20 flex flex-col gap-2lg rounded-b-md p-lg pt-0">
          <div className="flex flex-col gap-sm">
            <AvatarWithEcosystems name={name} logoUrl={logoUrl} ecosystems={ecosystems} />

            <div className="flex flex-col gap-xs">
              <Typo variant="heading" size="xs" weight="medium" color="primary" classNames={{ base: "truncate" }}>
                {name}
              </Typo>

              <div className="flex items-center gap-md">
                <Metric icon={UserRound} count={contributorCount} />
                <Metric icon={Star} count={starCount} />
                <Metric icon={GitFork} count={forkCount} />
              </div>
            </div>
          </div>

          <div className="flex">
            <ButtonGroup
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

          <Languages languages={languages} />
        </div>
      </div>
    </Paper>
  );
}
