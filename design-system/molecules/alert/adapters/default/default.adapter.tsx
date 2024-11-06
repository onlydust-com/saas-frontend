import { Info, X } from "lucide-react";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Icon } from "@/design-system/atoms/icon";
import { Typo } from "@/design-system/atoms/typo";

import { cn } from "@/shared/helpers/cn";

import { AlertPort } from "../../alert.types";
import { AlertDefaultVariants } from "./default.variants";

export function AlertDefaultAdapter({
  classNames,
  title,
  description,
  icon,
  hasIcon = true,
  primaryButton,
  secondaryButton,
  color,
  onClose,
}: AlertPort) {
  const slots = AlertDefaultVariants({ color });

  const defaultIcon: AlertPort["icon"] = {
    component: Info,
  };

  return (
    <div className={cn(slots.base(), classNames?.base)}>
      {hasIcon ? <Icon {...(icon || defaultIcon)} size="md" classNames={{ base: slots.icon() }} /> : null}

      <div className="flex w-full flex-col gap-lg">
        <div className="flex w-full justify-between gap-xs">
          <div className="flex flex-col gap-1">
            <Typo size="sm" weight="medium" classNames={{ base: slots.title() }}>
              {title}
            </Typo>

            <Typo size="sm" color="secondary">
              {description}
            </Typo>
          </div>

          {onClose ? (
            <Button
              variant="tertiary"
              size="xs"
              iconOnly
              startIcon={{
                component: X,
                classNames: {
                  base: "text-components-buttons-button-tertiary-fg",
                },
              }}
              onClick={onClose}
              classNames={{
                base: "-mr-1 -mt-1",
              }}
            />
          ) : null}
        </div>

        {primaryButton || secondaryButton ? (
          <div className="flex items-center gap-xl">
            {secondaryButton ? <Button {...secondaryButton} isTextButton size="xs" variant="secondary" /> : null}

            {primaryButton ? <Button {...primaryButton} isTextButton size="xs" variant="primary" /> : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
