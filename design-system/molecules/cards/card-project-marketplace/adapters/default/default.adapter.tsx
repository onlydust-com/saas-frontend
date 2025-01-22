"use client";

import { Coins, GitFork, HandCoins, Star, UserRound } from "lucide-react";
import { ElementType, useCallback, useMemo, useRef } from "react";

import { ProjectTag } from "@/core/domain/project/project.types";

import { Avatar } from "@/design-system/atoms/avatar";
import { Badge } from "@/design-system/atoms/badge";
import { Icon } from "@/design-system/atoms/icon";
import { Paper } from "@/design-system/atoms/paper";
import { Tooltip } from "@/design-system/atoms/tooltip";
import { Typo } from "@/design-system/atoms/typo";
import { AvatarLabelSingle } from "@/design-system/molecules/avatar-label-single";

import { BaseLink } from "@/shared/components/base-link/base-link";
import { Categories } from "@/shared/features/projects/categories/categories";
import { Languages } from "@/shared/features/projects/languages/languages";
import { Metric } from "@/shared/features/projects/metric/metric";
import { cn } from "@/shared/helpers/cn";

import { HoverEffect } from "../../_components/hover-effect/hover-effect";
import { IssueButton } from "../../_components/issue-button/issue-button";
import { IssueCountType } from "../../_components/issue-button/issue-button.types";
import { AvatarWithEcosystemsProps, CardProjectMarketplacePort } from "../../card-project-marketplace.types";
import { CardProjectMarketplaceDefaultVariants } from "./default.variants";

function AvatarWithEcosystems({ name, logoUrl, ecosystems = [] }: AvatarWithEcosystemsProps) {
  function renderBadge() {
    if (!ecosystems.length) return null;

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
  tags,
  odHackStats,
}: CardProjectMarketplacePort<C>) {
  const slots = CardProjectMarketplaceDefaultVariants();
  const cardRef = useRef<HTMLDivElement>(null);

  const hasRetroactiveGrant = useMemo(() => {
    return Boolean(ecosystems?.find(ecosystem => ecosystem.slug === "stellar" || ecosystem.slug === "starknet"));
  }, [ecosystems]);

  const issueButtons = useMemo(() => {
    const buttons = [
      { count: availableIssueCount, type: "AVAILABLE_ISSUE" },
      { count: goodFirstIssueCount, type: "GOOD_FIRST_ISSUE" },
      { count: odHackStats?.availableIssueCount, totalCount: odHackStats?.issueCount, type: "ODHACK" },
    ]
      .filter(({ count }) => count !== undefined)
      .map(({ count, totalCount, type }) => (
        <IssueButton
          key={type}
          issueCount={count!}
          totalIssueCount={totalCount}
          issueCountType={type as IssueCountType}
          slug={slug}
        />
      ));

    return buttons;
  }, [availableIssueCount, goodFirstIssueCount, odHackStats, slug]);

  const renderTags = useCallback(() => {
    if (!tags?.length) return null;

    const likelyToReward = tags.find(tag => tag === ProjectTag.LIKELY_TO_REWARD);

    if (!likelyToReward) return null;

    return (
      <div className="shrink-0">
        <Tooltip
          content={
            <>
              <strong>Likely to reward:</strong> Projects with a high chance of rewarding valuable contributions.
            </>
          }
          placement="bottom-end"
          background="primary"
          canInteract
        >
          <Badge size="sm" iconOnly>
            <Icon component={HandCoins} />
          </Badge>
        </Tooltip>
      </div>
    );
  }, [tags]);

  const renderRetroactiveGrant = useCallback(() => {
    if (!hasRetroactiveGrant) return null;

    return (
      <div className="shrink-0">
        <Tooltip
          content={
            <>
              <strong>Retroactive Grants:</strong> Projects where OnlyDust rewards valuable contributions monthly.{" "}
              <BaseLink href="https://blog.onlydust.com/docs/faq-2/" className="underline">
                More info here
              </BaseLink>
            </>
          }
          canInteract
          placement="bottom-end"
          background="primary"
        >
          <Badge size="sm" iconOnly>
            <Icon component={Coins} />
          </Badge>
        </Tooltip>
      </div>
    );
  }, [hasRetroactiveGrant]);

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
        <HoverEffect cardRef={cardRef} showBorder={hasRetroactiveGrant} />

        <div className="relative z-20 flex h-full flex-col justify-between gap-2lg rounded-md border-border-primary p-xl">
          <div className="flex flex-col gap-2lg">
            <div className="flex justify-between gap-xl">
              <div className="flex min-w-0 flex-row gap-2lg">
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

              {renderRetroactiveGrant() ?? renderTags()}
            </div>

            {issueButtons.length ? <div className="flex gap-sm">{issueButtons.map(button => button)}</div> : null}

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
      </div>
    </Paper>
  );
}
