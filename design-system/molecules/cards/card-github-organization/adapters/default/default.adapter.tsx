import { ElementType } from "react";

import { Avatar } from "@/design-system/atoms/avatar";
import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Paper } from "@/design-system/atoms/paper";
import { Typo } from "@/design-system/atoms/typo";

import { cn } from "@/shared/helpers/cn";

import { CardGithubOrganizationPort } from "../../card-github-organization.types";
import { CardGithubOrganizationDefaultVariants } from "./default.variants";

export function CardGithubOrganizationDefaultAdapter<C extends ElementType = "div">({
  as,
  classNames,
  htmlProps,
  name,
  action,
  avatar,
  isNotAllowed,
}: CardGithubOrganizationPort<C>) {
  const Component = as || "div";
  const slots = CardGithubOrganizationDefaultVariants();
  const showName = !!name || !!avatar;

  return (
    <Paper
      classNames={{ base: cn(slots.base(), classNames?.base, { "cursor-not-allowed": isNotAllowed }) }}
      background={"primary-alt"}
      border={"primary"}
      as={Component}
      {...htmlProps}
    >
      {showName ? (
        <div className={"flex flex-1 flex-row gap-md overflow-hidden"}>
          {avatar ? <Avatar size={"xxs"} shape={"squared"} {...avatar} /> : null}
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
        </div>
      ) : null}
      {action ? <Button variant={"secondary"} size={"xs"} {...action} /> : null}
    </Paper>
  );
}
