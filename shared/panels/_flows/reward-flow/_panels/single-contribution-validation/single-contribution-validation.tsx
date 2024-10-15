import { useQueries } from "@tanstack/react-query";

import { bootstrap } from "@/core/bootstrap";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { ContributionInlinePort } from "@/design-system/molecules/contribution-inline";

import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelFooter } from "@/shared/features/side-panels/side-panel-footer/side-panel-footer";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { useSidePanel } from "@/shared/features/side-panels/side-panel/side-panel";
import { UserProfileCard } from "@/shared/panels/_flows/reward-flow/_panels/_components/user-profile-card/user-profile-card";
import { AmountSelectorSummary } from "@/shared/panels/_flows/reward-flow/_panels/single-contribution-validation/_components/amount-selector-summary/amount-selector-summary";
import { useSingleContributionValidation } from "@/shared/panels/_flows/reward-flow/_panels/single-contribution-validation/single-contribution-validation.hooks";
import { useRewardFlow } from "@/shared/panels/_flows/reward-flow/reward-flow.context";
import { Translate } from "@/shared/translation/components/translate/translate";

export function SingleContributionValidation() {
  const { name, isOpen } = useSingleContributionValidation();
  const { Panel } = useSidePanel({ name });
  const { selectedContributionIds } = useRewardFlow();

  const contributionStoragePort = bootstrap.getContributionStoragePortForClient();

  const { data: contributions, isLoading } = useQueries({
    queries:
      selectedContributionIds?.map(contributionId => {
        const { tag, request } = contributionStoragePort.getContributionsById({
          pathParams: {
            contributionId,
          },
        });

        return {
          queryKey: tag,
          queryFn: request,
          enabled: Boolean(selectedContributionIds) && isOpen,
        };
      }) ?? [],
    combine: results => {
      return {
        data: results.map(result => result.data).filter(Boolean),
        isLoading: results.some(result => result.isLoading),
      };
    },
  });

  return (
    <Panel>
      <SidePanelHeader
        title={{
          translate: {
            token: "panels:singleContributionSelection.title",
          },
        }}
        canGoBack
        canClose
      />

      <SidePanelBody>
        <UserProfileCard
          timelineContributionProps={
            !isLoading && Boolean(contributions)
              ? {
                  titleProps: {
                    children: (
                      <>
                        <Translate token={"common:contributions"} /> ({selectedContributionIds?.length})
                      </>
                    ),
                  },
                  contributions: contributions
                    .map(c =>
                      c
                        ? {
                            githubTitle: c.githubTitle,
                            contributionBadgeProps: {
                              type: c.type,
                              githubStatus: c.githubStatus,
                              number: c.githubNumber,
                            },
                          }
                        : null
                    )
                    .filter(Boolean) as ContributionInlinePort<"span">[],
                }
              : undefined
          }
        />

        <AmountSelectorSummary />
      </SidePanelBody>

      <SidePanelFooter>
        <Button
          variant={"secondary"}
          size={"md"}
          translate={{
            token: "common:reward",
          }}
          onClick={() =>
            // TODO
            alert("Reward contributor")
          }
        />
      </SidePanelFooter>
    </Panel>
  );
}
