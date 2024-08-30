import { ArrowLeft, X } from "lucide-react";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Typo } from "@/design-system/atoms/typo";

import { useSidePanelsContext } from "@/shared/features/side-panels/side-panels.context";

import { SidePanelHeaderProps } from "./side-panel-header.types";

export function SidePanelHeader({
  canGoBack,
  canClose,
  title,
  startContent,
  endContent,
  onClose,
  titleEndContent,
}: SidePanelHeaderProps) {
  const { back, close } = useSidePanelsContext();
  const showStartContent = canGoBack || !!startContent;
  const showEndContent = canClose || !!endContent;

  function handleClose() {
    close();
    onClose?.();
  }

  return (
    <div className={"relative flex w-full flex-row items-center justify-between gap-1 py-lg"}>
      {showStartContent && (
        <div className={"flex flex-row items-center justify-start gap-1"}>
          {canGoBack && (
            <Button
              iconOnly={true}
              variant="tertiary"
              size="sm"
              startIcon={{ component: ArrowLeft }}
              onClick={() => back()}
            />
          )}
          {startContent}
        </div>
      )}
      {title && (
        <div className={"item-center flex flex-row justify-start gap-lg"}>
          <Typo size={"xs"} weight={"medium"} variant={"heading"} translate={title} />
          {titleEndContent}
        </div>
      )}
      {showEndContent && (
        <div className={"flex flex-row items-center justify-end gap-1"}>
          {endContent}
          {canClose && (
            <Button iconOnly={true} variant="tertiary" size="sm" startIcon={{ component: X }} onClick={handleClose} />
          )}
        </div>
      )}
      <hr className="absolute -left-lg -right-lg bottom-0 h-px border-border-primary" />
    </div>
  );
}
