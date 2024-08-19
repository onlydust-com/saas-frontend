import { ElementType } from "react";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Paper } from "@/design-system/atoms/paper";
import { Typo } from "@/design-system/atoms/typo";
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
  color = "chart-1",
}: CardFinancialPort<C>) {
  const Component = as || "div";
  const slots = CardFinancialDefaultVariants({ size, color });

  const isSizeM = size === "m";

  return (
    <Paper
      size={"s"}
      classNames={{ base: cn(slots.base(), classNames?.base) }}
      container={"2"}
      border={"none"}
      as={Component}
      {...htmlProps}
    >
      <div className="flex flex-col gap-2">
        <Typo size={isSizeM ? "xxs" : "m"} color={"text-1"} translate={title} />
        <div className="flex gap-1">
          <Typo size={isSizeM ? "s" : "xl"} color={"text-1"}>
            {amount}
          </Typo>
          <Typo size={isSizeM ? "s" : "xl"} color={"text-2"}>
            {currency}
          </Typo>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {avatarGroup ? (
          <AvatarGroup
            classNames={{
              base: "flex-1",
            }}
            {...avatarGroup}
            size={isSizeM ? "s" : "l"}
            shape="round"
          />
        ) : null}
        {cta ? (
          <Button
            size={isSizeM ? "s" : "l"}
            variant="secondary-light"
            classNames={{
              label: "leading-4",
            }}
            startIcon={{ name: "ri-arrow-right-s-line" }}
            {...cta}
          />
        ) : null}
      </div>
    </Paper>
  );
}
