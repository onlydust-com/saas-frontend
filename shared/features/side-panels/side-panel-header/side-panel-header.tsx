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
}: SidePanelHeaderProps) {
  const { back, close } = useSidePanelsContext();
  const showStartContent = canGoBack || !!startContent;
  const showEndContent = canClose || !!endContent;

  function handleClose() {
    close();
    onClose?.();
  }

  return (
    <div className={"flex w-full flex-row items-center justify-between gap-1"}>
      {showStartContent && (
        <div className={"flex w-full flex-row items-center justify-start gap-1"}>
          {canGoBack && (
            <Button
              hideText={true}
              variant="secondary-light"
              size="l"
              startIcon={{ name: "ri-arrow-left-s-line" }}
              onClick={() => back()}
            />
          )}
          {startContent}
        </div>
      )}
      {title && <Typo size={"2xl"} variant={"brand"} translate={title} />}
      {showEndContent && (
        <div className={"flex w-full flex-row items-center justify-end gap-1"}>
          {endContent}
          {canClose && (
            <Button
              hideText={true}
              variant="secondary-light"
              size="l"
              startIcon={{ name: "ri-close-line" }}
              onClick={handleClose}
            />
          )}
        </div>
      )}
    </div>
  );
}
