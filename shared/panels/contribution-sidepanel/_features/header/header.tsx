import { useState } from "react";

import { Typo } from "@/design-system/atoms/typo";
import { ContributionBadge } from "@/design-system/molecules/contribution-badge";

import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { Translate } from "@/shared/translation/components/translate/translate";

import { Helper } from "../helper/helper";
import { HeaderProps } from "./header.types";

export function Header({ contribution }: HeaderProps) {
  const [openHelper, setOpenHelper] = useState(false);

  function handleOpenHelper() {
    setOpenHelper(true);
  }

  function handleCloseHelper() {
    setOpenHelper(false);
  }

  if (!contribution) {
    return null;
  }

  return (
    <>
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

              <Button />
            </div>
          ),
        }}
      />

      <Helper type={contribution.activityStatus} />
    </>
  );
}
