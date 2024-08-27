import { ChevronRight } from "lucide-react";
import { ElementType } from "react";

import { Icon } from "@/design-system/atoms/icon";
import { Paper } from "@/design-system/atoms/paper";
import { Typo, TypoSize } from "@/design-system/atoms/typo";
import { AvatarGroup } from "@/design-system/molecules/avatar-group";

import { cn } from "@/shared/helpers/cn";

import { CardFinancialPort } from "../../card-financial.types";
import { CardFinancialDefaultVariants } from "./default.variants";

export function CardFinancialDefaultAdapter<C extends ElementType = "div">({
  as,
  classNames,
  htmlProps,
  title,
  amount,
  currency,
  avatarGroup,
  cta,
  size = "xl",
  color = "grey",
}: CardFinancialPort<C>) {
  const Component = as || cta ? "button" : "div";
  const slots = CardFinancialDefaultVariants({ size, color });
  const isSizeM = size === "m";
  const titleSize: TypoSize = isSizeM ? "xs" : "sm";
  const contentSize: TypoSize = isSizeM ? "sm" : "md";
  const avatarSize = isSizeM ? "xs" : "sm";

  return (
    <Paper
      classNames={{ base: cn(slots.base(), classNames?.base) }}
      background={"transparent"}
      border={"none"}
      as={Component}
      onClick={cta ? cta.onClick : undefined}
      {...htmlProps}
    >
      <div className="flex flex-col gap-2">
        <Typo size={titleSize} translate={title} classNames={{ base: "text-inherit" }} />
        <div className="flex gap-1">
          <Typo size={contentSize} weight={"medium"} classNames={{ base: "text-inherit" }}>
            {amount}
          </Typo>
          <Typo size={contentSize} weight={"medium"} classNames={{ base: "text-inherit" }}>
            {currency}
          </Typo>
        </div>
      </div>
      <div className="flex w-full items-center gap-2">
        {avatarGroup ? (
          <AvatarGroup
            classNames={{
              base: "flex-1",
            }}
            {...avatarGroup}
            size={avatarSize}
          />
        ) : null}
        {cta ? (
          <div className={cn(slots.cta(), classNames?.cta)}>
            <Icon component={ChevronRight} size={"sm"} />
          </div>
        ) : null}
      </div>
    </Paper>
  );
}
