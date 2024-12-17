"use client";

import { CircleDot, GitFork, Star, UserRound } from "lucide-react";
import Image from "next/image";
import { ElementType, useEffect, useState } from "react";
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
import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { MARKETPLACE_ROUTER } from "@/shared/constants/router";
import { cn } from "@/shared/helpers/cn";
import { marketplaceRouting } from "@/shared/helpers/marketplace-routing";

import {
  AvatarProps,
  CardProjectMarketplacePort,
  CategoriesProps,
  LanguageProps,
  MetricProps,
} from "../../card-project-marketplace.types";
import { CardProjectMarketplaceDefaultVariants } from "./default.variants";
import Header from "./header.png";

function getLanguageColor(id: string) {
  return `hsl(${(parseInt(id, 36) * 137.5) % 360}deg, 65%, 50%)`;
}

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

function Language({ id, name, percentage, nameClassNames = "" }: LanguageProps) {
  return (
    <div className="flex items-center gap-xs">
      <div
        className="size-1.5 rounded-full"
        style={{
          backgroundColor: getLanguageColor(id),
        }}
      />

      <Typo size="xs" classNames={{ base: nameClassNames }}>
        {name}
      </Typo>

      <Typo size="xs" color="quaternary">
        {percentage}%
      </Typo>
    </div>
  );
}

function AvatarWithEcosystems({ name, logoUrl, ecosystems }: AvatarProps) {
  const [avatarRef, { height }] = useMeasure<HTMLDivElement>();

  function renderBadge() {
    if (!ecosystems) return null;

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

  return (
    <Paper
      as={as}
      htmlProps={htmlProps}
      size="none"
      background="primary-alt"
      classNames={{ base: cn(slots.base(), classNames?.base) }}
    >
      <header className="relative h-[100px] w-full overflow-hidden">
        <img src={logoUrl} alt={name} className="h-full w-full object-cover" />

        <Image
          src={Header}
          alt={name}
          className="absolute inset-0 object-cover mix-blend-luminosity backdrop-blur-xl backdrop-saturate-150"
        />
      </header>

      <div className="relative z-10 flex flex-col gap-2lg p-lg pt-0">
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

        {languages?.length ? (
          <div className="flex flex-col gap-2md pt-md">
            <div className="flex h-1.5 w-full overflow-hidden rounded-full">
              {languages.map(language => (
                <div
                  key={language.id}
                  className="h-full"
                  style={{
                    width: `${language.percentage}%`,
                    backgroundColor: getLanguageColor(language.id),
                  }}
                >
                  <Tooltip
                    content={<Language {...language} nameClassNames="text-inherit" />}
                    classNames={{ wrapper: "size-full" }}
                  />
                </div>
              ))}
            </div>

            <ScrollView>
              <div className="flex max-w-full gap-lg">
                {languages
                  .sort((a, b) => b.percentage - a.percentage)
                  .slice(0, 3)
                  .map(language => (
                    <Language key={language.id} {...language} nameClassNames="truncate" />
                  ))}
              </div>
            </ScrollView>
          </div>
        ) : null}
      </div>
    </Paper>
  );
}
