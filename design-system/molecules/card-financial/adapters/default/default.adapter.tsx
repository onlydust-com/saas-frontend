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
}: CardFinancialPort<C>) {
  const Component = as || "div";
  const slots = CardFinancialDefaultVariants({ size });

  return (
    <Component {...htmlProps} className={cn(slots.base(), classNames?.base)}>
      <Paper size={"s"} classNames={{ base: cn(slots.paper(), classNames?.paper) }} container={"2"} border={"none"}>
        <div className="flex flex-col gap-2">
          <Typo size={size === "m" ? "xxs" : "m"} color={"text-1"}>
            {title}
          </Typo>
          <div className="flex gap-1">
            <Typo size={size === "m" ? "s" : "xl"} color={"text-1"}>
              {amount}
            </Typo>
            <Typo size={size === "m" ? "s" : "xl"} color={"text-2"}>
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
              size={size === "m" ? "s" : "l"}
              shape="round"
            />
          ) : null}
          {cta ? (
            <Button
              size={size === "m" ? "s" : "l"}
              variant="secondary-light"
              canInteract={false}
              classNames={{
                label: "leading-4",
              }}
              startIcon={{ name: "ri-arrow-right-s-line" }}
              {...cta}
            />
          ) : null}
        </div>
      </Paper>
    </Component>
  );
}
