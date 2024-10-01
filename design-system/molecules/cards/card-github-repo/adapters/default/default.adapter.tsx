import { GitPullRequest, Star } from "lucide-react";
import { ElementType } from "react";

import { Badge } from "@/design-system/atoms/badge";
import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Paper } from "@/design-system/atoms/paper";
import { Typo } from "@/design-system/atoms/typo";

import { cn } from "@/shared/helpers/cn";

import { CardGithubRepoPort } from "../../card-github-repo.types";
import { CardGithubRepoDefaultVariants } from "./default.variants";

export function CardGithubRepoDefaultAdapter<C extends ElementType = "div">({
  as,
  classNames,
  htmlProps,
  name,
  topActions,
  description,
  badges,
  starsCount,
  prCount,
}: CardGithubRepoPort<C>) {
  const Component = as || "div";
  const slots = CardGithubRepoDefaultVariants();
  const showHeader = !!topActions || !!name;
  const showPrCount = !!prCount || prCount === 0;
  const showStarsCount = !!starsCount || starsCount === 0;
  const showBadges = !!badges?.length || showPrCount || showStarsCount;

  return (
    <Paper
      classNames={{ base: cn(slots.base(), classNames?.base) }}
      background={"primary-alt"}
      border={"primary"}
      as={Component}
      {...htmlProps}
    >
      {showHeader || !!description ? (
        <div className={"flex w-full flex-col gap-md"}>
          {showHeader && (
            <div className={"flex w-full flex-row items-center justify-between gap-1 overflow-hidden"}>
              {name ? (
                <Typo
                  size={"sm"}
                  weight={"medium"}
                  as={"div"}
                  classNames={{ base: "flex-1 overflow-ellipsis overflow-hidden whitespace-nowrap" }}
                >
                  {name}
                </Typo>
              ) : null}
              {topActions && <Button variant={"secondary"} size={"xs"} {...topActions} />}
            </div>
          )}
          {!!description && (
            <div className={"w-full"}>
              <Typo
                size={"xs"}
                as={"div"}
                classNames={{ base: "width-full overflow-ellipsis overflow-hidden whitespace-nowrap" }}
              >
                {description}
              </Typo>
            </div>
          )}
        </div>
      ) : null}
      {showBadges && (
        <div className={"flex w-full flex-row flex-wrap gap-md"}>
          {showStarsCount && (
            <Badge icon={{ component: Star }} color={"grey"} shape={"rounded"} size={"xs"}>
              {starsCount}
            </Badge>
          )}
          {showPrCount && (
            <Badge icon={{ component: GitPullRequest }} color={"grey"} shape={"rounded"} size={"xs"}>
              {prCount}
            </Badge>
          )}
          {badges?.map((badge, index) => <Badge key={index} color={"grey"} shape={"rounded"} size={"xs"} {...badge} />)}
        </div>
      )}
    </Paper>
  );
}
