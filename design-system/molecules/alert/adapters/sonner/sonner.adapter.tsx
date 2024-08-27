import { X } from "lucide-react";
import { Toaster, toast } from "sonner";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Icon } from "@/design-system/atoms/icon";
import { Typo } from "@/design-system/atoms/typo";
import { getDefaultIcon } from "@/design-system/molecules/alert/alert.utils";

import { cn } from "@/shared/helpers/cn";

import { AlertManagerPort, AlertPort, AlertProps } from "../../alert.types";
import { AlertSonnerVariants } from "./sonner.variants";

export function AlertSonnerAdapter({ position = "bottom-left" }: AlertPort) {
  return <Toaster position={position} />;
}

export function AlertComponent({
  classNames,
  title,
  description,
  icon,
  primaryButton,
  secondaryButton,
  color,
  toastId,
}: AlertProps & { toastId: string | number }) {
  const slots = AlertSonnerVariants({ color });

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
            onClick={() => toast.dismiss(toastId)}
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

function handleAlert(props: AlertProps) {
  toast.custom(t => <AlertComponent {...props} toastId={t} />);
}

export const alertSonnerAdapter: AlertManagerPort = {
  white: props =>
    handleAlert({
      color: "white",
      ...props,
    }),
  grey: props =>
    handleAlert({
      color: "grey",
      ...props,
    }),
  brand: props =>
    handleAlert({
      color: "brand",
      ...props,
    }),
  error: props =>
    handleAlert({
      color: "error",
      ...props,
    }),
  warning: props =>
    handleAlert({
      color: "warning",
      ...props,
    }),
  success: props =>
    handleAlert({
      color: "success",
      ...props,
    }),
};
