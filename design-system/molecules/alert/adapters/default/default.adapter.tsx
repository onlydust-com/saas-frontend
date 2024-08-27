import { X } from "lucide-react";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Icon } from "@/design-system/atoms/icon";
import { Typo } from "@/design-system/atoms/typo";
import { getDefaultIcon } from "@/design-system/molecules/alert/alert.utils";

import { cn } from "@/shared/helpers/cn";

import { AlertPort } from "../../alert.types";
import { AlertDefaultVariants } from "./default.variants";

export function AlertDefaultAdapter({
  classNames,
  title,
  description,
  icon,
  primaryButton,
  secondaryButton,
  color,
  onClose,
}: AlertPort) {
  const slots = AlertDefaultVariants({ color });

  const iconComponent = icon?.component || getDefaultIcon(color);

  return (
    <div className={cn(slots.base(), classNames?.base)}>
      <Icon component={iconComponent} size="md" classNames={{ base: slots.icon() }} />

      <div className="flex w-full flex-col gap-3">
        <div className="flex w-full justify-between gap-1">
          <div className="flex flex-col gap-1">
            <Typo size="sm" weight="medium">
              {title}
            </Typo>

            <Typo size="sm">{description}</Typo>
          </div>

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
        </div>

        {primaryButton || secondaryButton ? (
          <div className="flex items-center gap-4">
            {secondaryButton ? <Button {...secondaryButton} isTextButton size="xs" variant="secondary" /> : null}

            {primaryButton ? <Button {...primaryButton} isTextButton size="xs" variant="primary" /> : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
