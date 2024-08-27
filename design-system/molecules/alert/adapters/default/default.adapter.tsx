import { X } from "lucide-react";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Icon } from "@/design-system/atoms/icon";
import { Typo } from "@/design-system/atoms/typo";

import { cn } from "@/shared/helpers/cn";

import { AlertPort } from "../../alert.types";
import { AlertDefaultVariants } from "./default.variants";

export function AlertDefaultAdapter({
  classNames,
  onClose,
  title,
  description,
  icon,
  primaryButton,
  secondaryButton,
  color,
}: AlertPort) {
  const slots = AlertDefaultVariants({ color });

  return (
    <div className={cn(slots.base(), classNames?.base)}>
      {icon ? <Icon component={icon.component} size="md" classNames={{ base: slots.icon() }} /> : null}

      <div className="relative flex flex-col gap-3">
        <button className="absolute -right-1 -top-1" onClick={onClose}>
          <Icon
            component={X}
            classNames={{
              base: "text-components-buttons-button-tertiary-fg",
            }}
          />
        </button>

        <div className="flex flex-col gap-1">
          <Typo size="sm" weight="medium">
            {title}
          </Typo>

          <Typo size="sm">{description}</Typo>
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
