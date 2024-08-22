import { Check, CircleAlert, CircleX } from "lucide-react";
import { Toaster, toast } from "sonner";

import { Typo } from "@/design-system/atoms/typo";

import { ToastPort, ToastProps, ToasterPort } from "../../toaster.types";
import { ToasterSonnerVariants } from "./sonner.variants";

export function ToasterSonnerAdapter({ position = "bottom-left" }: ToasterPort) {
  return <Toaster position={position} />;
}

function handleToast({ children, variants, iconContent }: ToastProps) {
  const slots = ToasterSonnerVariants(variants);

  toast.custom(t => (
    <div className={slots.base()}>
      <div className={slots.messageWrapper()}>
        {iconContent}

        <Typo size={"s"}>{children}</Typo>
      </div>

      <button type={"button"} onClick={() => toast.dismiss(t)} className={slots.closeButton()}>
        <CircleX size={16} />
      </button>
    </div>
  ));
}

export const toastSonnerAdapter: ToastPort = {
  default: children => handleToast({ children, variants: { variant: "default" } }),
  success: children => handleToast({ children, variants: { variant: "default" }, iconContent: <Check size={16} /> }),
  error: children => handleToast({ children, variants: { variant: "error" }, iconContent: <CircleAlert size={16} /> }),
};
