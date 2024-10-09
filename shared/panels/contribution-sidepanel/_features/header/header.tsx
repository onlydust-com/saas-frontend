import { Info } from "lucide-react";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Typo } from "@/design-system/atoms/typo";
import { ContributionBadge } from "@/design-system/molecules/contribution-badge";

import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { Translate } from "@/shared/translation/components/translate/translate";

import { HeaderProps } from "./header.types";

export function Header({ contribution, onToggleHelper }: HeaderProps) {
  if (!contribution) {
    return null;
  }

  const showHelper = contribution.isNotAssigned() || contribution.isToReview();

  return (
    <SidePanelHeader
      canGoBack={false}
      canClose={true}
      title={{
        children: (
          <div className={"flex w-full flex-row items-center justify-start gap-lg overflow-hidden"}>
            <ContributionBadge
              type={contribution.type}
              number={contribution.githubNumber}
              githubStatus={contribution.githubStatus}
            />

            <Typo
              size={"xs"}
              weight={"medium"}
              variant={"heading"}
              as={"div"}
              classNames={{ base: "flex-1 overflow-ellipsis overflow-hidden whitespace-nowrap" }}
            >
              <Translate token={`panels:contribution.header.${contribution.type}.title`} />
            </Typo>

            {showHelper ? (
              <Button
                variant="secondary"
                size="sm"
                iconOnly
                startIcon={{
                  component: Info,
                }}
                onClick={onToggleHelper}
              />
            ) : null}
          </div>
        ),
      }}
    />
  );
}
