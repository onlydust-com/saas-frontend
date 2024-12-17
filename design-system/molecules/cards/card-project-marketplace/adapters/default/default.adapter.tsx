"use client";

import { motion } from "framer-motion";
import { CircleDot, GitFork, Star, UserRound } from "lucide-react";
import Image from "next/image";
import { ElementType, useEffect, useRef, useState } from "react";
import { useDebounce } from "react-use";

import { Avatar } from "@/design-system/atoms/avatar";
import { Badge } from "@/design-system/atoms/badge";
import { ButtonGroup } from "@/design-system/atoms/button/variants/button-group";
import { Icon } from "@/design-system/atoms/icon";
import { Paper } from "@/design-system/atoms/paper";
import { Tooltip } from "@/design-system/atoms/tooltip";
import { Typo } from "@/design-system/atoms/typo";

import { BaseLink } from "@/shared/components/base-link/base-link";
import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { MARKETPLACE_ROUTER } from "@/shared/constants/router";
import { cn } from "@/shared/helpers/cn";
import { marketplaceRouting } from "@/shared/helpers/marketplace-routing";

import { CardProjectMarketplacePort, LanguageProps, MetricProps } from "../../card-project-marketplace.types";
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

function HoverEffect({ cardRef }: { cardRef: React.RefObject<HTMLDivElement> }) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isHoveredDebounced, setIsHoveredDebounced] = useState(false);

  useDebounce(
    () => {
      setIsHoveredDebounced(isHovered);
    },
    450,
    [isHovered]
  );

  const createBorderPolygon = () => {
    const right = "100%";
    const bottom = "100%";
    const borderWidth = "1.5px";

    return `polygon(
			0 0,                                    /* Top-left start */
			${borderWidth} 0,                       /* Top border start */
			${borderWidth} ${bottom},               /* Right inner border */
			0 ${bottom},                           /* Bottom-left corner */
			0 0,                                    /* Back to top-left */
			${right} 0,                            /* Top-right corner */
			${right} ${bottom},                    /* Right border full length */
			calc(${right} - ${borderWidth}) ${bottom},  /* Bottom-right inner corner */
			calc(${right} - ${borderWidth}) ${borderWidth},  /* Top-right inner corner */
			${borderWidth} ${borderWidth},         /* Top-left inner corner */
			${borderWidth} calc(${bottom} - ${borderWidth}),  /* Inner bottom */
			calc(${right} - ${borderWidth}) calc(${bottom} - ${borderWidth}),  /* Inner bottom-right */
			${right} ${bottom},                    /* Back to bottom-right */
			0 ${bottom}                            /* Bottom-left end */
		)`
      .replace(/\s+/g, " ")
      .trim();
  };

  const polygonPath = createBorderPolygon();

  useEffect(() => {
    if (cardRef.current) {
      const handleMouseMove = (e: MouseEvent) => {
        const rect = cardRef.current?.getBoundingClientRect();
        if (!rect || !cursorRef.current) return;

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        cursorRef.current.style.mask = `radial-gradient(circle ${Math.min(150, Math.sqrt(x * x + y * y))}px at ${x}px ${y}px, black, transparent)`;
      };

      const handleMouseLeave = () => {
        if (cursorRef.current) {
          cursorRef.current.style.opacity = "0";
        }
        setIsHovered(false);
      };

      const handleMouseEnter = () => {
        if (cursorRef.current) {
          cursorRef.current.style.opacity = "1";
        }
        setIsHovered(true);
        setIsHoveredDebounced(true);
      };

      cardRef.current.addEventListener("mousemove", handleMouseMove);
      cardRef.current.addEventListener("mouseleave", handleMouseLeave);
      cardRef.current.addEventListener("mouseenter", handleMouseEnter);

      return () => {
        cardRef.current?.removeEventListener("mousemove", handleMouseMove);
        cardRef.current?.removeEventListener("mouseleave", handleMouseLeave);
        cardRef.current?.removeEventListener("mouseenter", handleMouseEnter);
      };
    }
  }, [cursorRef.current, cardRef.current, followerRef.current]);

  return (
    <>
      <div
        className="absolute inset-0 -z-[1] opacity-0"
        ref={cursorRef}
        style={{ transition: "all linear 0.2s, opacity 0.5s ease-in" }}
      >
        <div className="card-hover-gradient absolute inset-0 -z-[1]" />
      </div>
      <div
        className={cn("absolute inset-0 z-10 opacity-0", isHovered && "opacity-100")}
        style={{
          clipPath: polygonPath,
          transition: "opacity 0.5s ease-in",
        }}
      >
        <div className="absolute left-1/2 top-1/2 aspect-square w-[200%] -translate-x-1/2 -translate-y-1/2">
          {isHoveredDebounced && (
            <motion.div
              className="card-hover-gradient-solid absolute inset-0"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
            />
          )}
        </div>
      </div>
    </>
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
}: CardProjectMarketplacePort<C>) {
  const slots = CardProjectMarketplaceDefaultVariants();
  const avatarRef = useRef<HTMLDivElement>(null);
  const [avatarOffset, setAvatarOffset] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (avatarRef.current) {
      setAvatarOffset(-avatarRef.current.offsetHeight / 2);
    }
  }, [avatarRef.current]);

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
            <div ref={avatarRef} style={{ marginTop: avatarOffset }}>
              <Avatar src={logoUrl} alt={name} size="xl" shape="squared" />
            </div>

            <div className="flex flex-col gap-xs">
              <Typo variant="heading" size="xs" weight="medium" color="primary">
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

          <div>
            <Typo size="sm" color="tertiary">
              {description}
            </Typo>
          </div>

          {categories?.length ? (
            <ul className="flex flex-wrap gap-xs">
              {categories.map(category => (
                <li key={category.name}>
                  <Badge color="grey" shape="squared" size="xs">
                    {category.name}
                  </Badge>
                </li>
              ))}
            </ul>
          ) : null}

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
      </div>
    </Paper>
  );
}
