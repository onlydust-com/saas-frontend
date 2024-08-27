import { CircleX } from "lucide-react";
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
      <div className="">
        {icon ? <Icon {...icon} /> : null}

        <Typo size={"sm"}>{children}</Typo>
      </div>

      <button type={"button"} onClick={() => toast.dismiss(t)} className={slots.closeButton()}>
        <Icon component={CircleX} />
      </button>
    </div>
  ));
}

export const toastSonnerAdapter: ToastPort = {
  default: children => handleToast({ children, type: "default" }),
  error: children => handleToast({ children, type: "error" }),
};
