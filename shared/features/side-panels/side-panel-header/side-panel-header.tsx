import { ArrowLeft, X } from "lucide-react";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Paper } from "@/design-system/atoms/paper";
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
  onBack,
  titleEndContent,
}: SidePanelHeaderProps) {
  const { back, close } = useSidePanelsContext();
  const showStartContent = canGoBack || !!startContent;
  const showEndContent = canClose || !!endContent;
  const showEmptyEndContent = !showEndContent && showStartContent;

  function handleClose() {
    close();
    onClose?.();
  }

  function handleBack() {
    back();
    onBack?.();
  }

  return (
    <Paper
      as={"header"}
      background={"primary-alt"}
      classNames={{
        base: "relative flex w-full flex-row items-center justify-between gap-lg rounded-b-none overflow-hidden",
      }}
      py={"lg"}
      px={"xl"}
    >
      {showStartContent && (
        <div className={"flex flex-row items-center justify-start gap-1"}>
          {canGoBack && (
            <Button iconOnly variant="tertiary" size="sm" startIcon={{ component: ArrowLeft }} onClick={handleBack} />
          )}
          {startContent}
        </div>
      )}
      {title && (
        <div className={"item-center flex flex-row justify-start gap-lg overflow-hidden"}>
          <Typo {...title} size={"xs"} weight={"medium"} variant={"heading"} classNames={{ base: "overflow-hidden" }} />
          {titleEndContent}
        </div>
      )}
      {showEndContent && (
        <div className={"flex flex-row items-center justify-end gap-1"}>
          {endContent}
          {canClose && (
            <Button iconOnly variant="tertiary" size="sm" startIcon={{ component: X }} onClick={handleClose} />
          )}
        </div>
      )}
      {showEmptyEndContent && <div />}
    </Paper>
  );
}
