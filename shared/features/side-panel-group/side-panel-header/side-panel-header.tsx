import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Typo } from "@/design-system/atoms/typo";

import { useSidePanelGroup } from "@/shared/features/side-panel-group/side-panel-group.context";

import { SidePanelHeaderProps } from "./side-panel-header.types";

export function SidePanelHeader({ canGoBack, canClose, title, startContent, endContent }: SidePanelHeaderProps) {
  const { onBack, closePanel } = useSidePanelGroup();
  const showStartContent = canGoBack || !!startContent;
  const showEndContent = canClose || !!endContent;

  return (
    <div className={"flex w-full flex-row items-center justify-between gap-1"}>
      {showStartContent && (
        <div className={"flex w-full flex-row items-center justify-start gap-1"}>
          {canGoBack && (
            <Button
              hideText={true}
              variant={"secondary-light"}
              startIcon={{ name: "ri-arrow-left-s-line" }}
              onClick={() => onBack()}
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
              variant={"secondary-light"}
              startIcon={{ name: "ri-close-line" }}
              onClick={() => closePanel()}
            />
          )}
        </div>
      )}
    </div>
  );
}
