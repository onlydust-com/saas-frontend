import { Check, CircleX, X } from "lucide-react";
import { Toaster, toast } from "sonner";

import { Icon } from "@/design-system/atoms/icon";
import { Typo } from "@/design-system/atoms/typo";

import { cn } from "@/shared/helpers/cn";

import { ToastPort, ToastProps, ToasterPort } from "../../toaster.types";
import { ToasterSonnerVariants } from "./sonner.variants";

export function ToasterSonnerAdapter({ position = "bottom-left" }: ToasterPort) {
  return <Toaster position={position} />;
}

function handleToast({ classNames, children, icon, type }: ToastProps) {
  const slots = ToasterSonnerVariants({ type });

  toast.custom(t => (
    <div className={cn(slots.base(), classNames?.base)}>
      <div className="flex gap-2">
        {icon ? (
          <Icon
            {...icon}
            classNames={{
              base: slots.icon(),
            }}
          />
        ) : null}

        <Typo
          size="xs"
          weight="medium"
          classNames={{
            base: slots.text(),
          }}
        >
          {children}
        </Typo>
      </div>

      <button
        className="rounded p-xxs transition-colors hover:bg-utility-alpha-white-10"
        onClick={() => toast.dismiss(t)}
      >
        <Icon
          component={X}
          size="xxs"
          classNames={{
            base: slots.closeIcon(),
          }}
        />
      </button>
    </div>
  ));
}

export const toastSonnerAdapter: ToastPort = {
  success: children =>
    handleToast({
      children,
      type: "default",
      icon: {
        component: Check,
      },
    }),
  default: children =>
    handleToast({
      children,
      type: "default",
    }),
  error: children =>
    handleToast({
      children,
      type: "error",
      icon: {
        component: CircleX,
      },
    }),
};
