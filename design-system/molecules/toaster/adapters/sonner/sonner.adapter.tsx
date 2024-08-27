import { CircleDashed, X } from "lucide-react";
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
      {icon ? (
        <Icon
          {...icon}
          classNames={{
            base: "text-foreground-white",
          }}
        />
      ) : null}

      <Typo size="xs" weight="medium" color="white">
        {children}
      </Typo>

      <button
        className="rounded p-0.5 transition-colors hover:bg-utility-alpha-white-10"
        onClick={() => toast.dismiss(t)}
      >
        <Icon
          component={X}
          size="xxs"
          classNames={{
            base: "text-foreground-white",
          }}
        />
      </button>
    </div>
  ));
}

export const toastSonnerAdapter: ToastPort = {
  default: children =>
    handleToast({
      children,
      type: "default",
      icon: {
        component: CircleDashed,
      },
    }),
  error: children =>
    handleToast({
      children,
      type: "error",
      icon: {
        component: CircleDashed,
      },
    }),
};
