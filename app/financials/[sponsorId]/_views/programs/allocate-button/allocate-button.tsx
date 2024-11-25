import { AllocateButtonProps } from "@/app/financials/[sponsorId]/_views/programs/allocate-button/allocate-button.types";

import { SponsorReactQueryAdapter } from "@/core/application/react-query-adapter/sponsor";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Tooltip } from "@/design-system/atoms/tooltip";

import { useProgramListSidepanel } from "@/shared/panels/program-list-sidepanel/program-list-sidepanel.hooks";
import { Translate } from "@/shared/translation/components/translate/translate";

export function AllocateButton({ sponsorId }: AllocateButtonProps) {
  const { open } = useProgramListSidepanel();

  const { data, isLoading, isError } = SponsorReactQueryAdapter.client.useGetSponsor({
    pathParams: {
      sponsorId,
    },
    options: {
      enabled: Boolean(sponsorId),
    },
  });

  const isDisabled = isLoading || isError || !data?.totalAvailable.totalUsdEquivalent;

  return (
    <Tooltip
      content={<Translate token={"financials:details.programs.actions.allocate.tooltip"} />}
      enabled={isDisabled}
    >
      <Button
        variant={"primary"}
        size={"sm"}
        onClick={open}
        isDisabled={isDisabled}
        translate={{ token: "financials:details.programs.actions.allocate.button" }}
      />
    </Tooltip>
  );
}
