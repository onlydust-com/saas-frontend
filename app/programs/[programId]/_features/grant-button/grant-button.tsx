"use client";

import { ChevronRight } from "lucide-react";

import { useGrantListSidePanel } from "@/app/programs/[programId]/_features/grant-list-sidepanel/grant-list-sidepanel.hooks";

import { ProgramReactQueryAdapter } from "@/core/application/react-query-adapter/program";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Tooltip } from "@/design-system/atoms/tooltip";

import { Translate } from "@/shared/translation/components/translate/translate";

export function GrantButton({ programId }: { programId: string }) {
  const { isOpen, open, close } = useGrantListSidePanel();

  const {
    data: program,
    isLoading,
    isError,
  } = ProgramReactQueryAdapter.client.useGetProgramById({
    pathParams: {
      programId,
    },
    options: {
      enabled: Boolean(programId),
    },
  });

  const isDisabled = isLoading || isError || !program?.totalAvailable.totalUsdEquivalent;

  function toggleGrantListPanel() {
    (isOpen ? close : open)();
  }

  return (
    <Tooltip content={<Translate token={"programs:details.projects.grant.tooltip"} />} enabled={isDisabled}>
      <Button
        variant={"primary"}
        endIcon={{ component: ChevronRight }}
        isTextButton
        size={"md"}
        onClick={toggleGrantListPanel}
        isDisabled={isDisabled}
      >
        <Translate token={"programs:details.projects.grant.button"} />
      </Button>
    </Tooltip>
  );
}
