"use client";

import { PropsWithChildren, useCallback, useEffect, useMemo, useRef, useState } from "react";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Tooltip } from "@/design-system/atoms/tooltip";
import { Tabs } from "@/design-system/molecules/tabs/tabs";

import { AnimatedColumn } from "@/shared/components/animated-column-group/animated-column/animated-column";
import { BaseLink } from "@/shared/components/base-link/base-link";
import { withClientOnly } from "@/shared/components/client-only/client-only";
import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { NEXT_ROUTER } from "@/shared/constants/router";
import { RepoIndexingAlert } from "@/shared/features/alerts/repo-indexing-alert/repo-indexing-alert";
import { GithubMissingPermissionsAlert } from "@/shared/features/github-permissions/_components/github-missing-permissions-alert/github-missing-permissions-alert";
import { GithubPermissionsProvider } from "@/shared/features/github-permissions/github-permissions.context";
import { PageContent } from "@/shared/features/page-content/page-content";
import { PageWrapper } from "@/shared/features/page-wrapper/page-wrapper";
import { ActionPoolingProvider } from "@/shared/hooks/action-pooling/action-pooling.context";
import { useCanReward } from "@/shared/hooks/rewards/use-can-reward";
import { useMatchPath } from "@/shared/hooks/router/use-match-path";
import { RewardFlowProvider, useRewardFlow } from "@/shared/panels/_flows/reward-flow/reward-flow.context";
import { UngrantFlowProvider, useUngrantFlow } from "@/shared/panels/_flows/ungrant-flow/ungrant-flow.context";
import { ContributionsSidepanel } from "@/shared/panels/contribution-sidepanel/contributions-sidepanel";
import { ContributorSidepanel } from "@/shared/panels/contributor-sidepanel/contributor-sidepanel";
import { FinancialDetailSidepanel } from "@/shared/panels/financial-detail-sidepanel/financial-detail-sidepanel";
import { useProjectTransactionsSidepanel } from "@/shared/panels/project-transactions-sidepanel/project-transactions-sidepanel.hooks";
import { ProjectUpdateSidepanel } from "@/shared/panels/project-update-sidepanel/project-update-sidepanel";
import { useProjectUpdateSidePanel } from "@/shared/panels/project-update-sidepanel/project-update-sidepanel.hooks";
import { RewardDetailSidepanel } from "@/shared/panels/reward-detail-sidepanel/reward-detail-sidepanel";
import { withAuthenticated } from "@/shared/providers/auth-provider";
import { PosthogCaptureOnMount } from "@/shared/tracking/posthog/posthog-capture-on-mount/posthog-capture-on-mount";
import { Translate } from "@/shared/translation/components/translate/translate";

enum Views {
  "CONTRIBUTIONS" = "CONTRIBUTIONS",
  "CONTRIBUTORS" = "CONTRIBUTORS",
  "FINANCIAL" = "FINANCIAL",
}

function Safe({ children, projectSlug }: PropsWithChildren<{ projectSlug: string }>) {
  const isContributors = useMatchPath(NEXT_ROUTER.manageProjects.contributors.root(projectSlug));
  const isContributions = useMatchPath(NEXT_ROUTER.manageProjects.contributions.root(projectSlug));
  const isFinancial = useMatchPath(NEXT_ROUTER.manageProjects.financial.root(projectSlug));

  const selectedId = useMemo(() => {
    if (isContributors) {
      return Views.CONTRIBUTORS;
    }

    if (isContributions) {
      return Views.CONTRIBUTIONS;
    }

    if (isFinancial) {
      return Views.FINANCIAL;
    }
  }, [isContributions, isContributors, isFinancial]);

  const [openAlert, setOpenAlert] = useState(false);
  const hasAlreadyClosedAlert = useRef(false);

  const { open: openProjectTransactions } = useProjectTransactionsSidepanel();
  const { open: openProject } = useProjectUpdateSidePanel();
  const { open: openRewardFlow } = useRewardFlow();
  const { open: openUngrantFlow } = useUngrantFlow();
  const canReward = useCanReward(projectSlug);

  const { data } = ProjectReactQueryAdapter.client.useGetProjectBySlug({
    pathParams: { slug: projectSlug },
    options: {
      enabled: Boolean(projectSlug),
    },
  });

  const projectId = useMemo(() => data?.id, [data]);

  useEffect(() => {
    if (data?.isSomeOrganizationMissingPermissions() && !hasAlreadyClosedAlert.current) {
      setOpenAlert(true);
    }
  }, [data]);

  function handleCloseAlert() {
    setOpenAlert(false);
    hasAlreadyClosedAlert.current = true;
  }

  function renderUngrantButton() {
    return (
      <Button
        variant={"secondary"}
        size={"sm"}
        translate={{ token: "manageProjects:detail.activity.actions.returnFunds" }}
        classNames={{
          base: "max-w-full overflow-hidden",
          label: "whitespace-nowrap text-ellipsis overflow-hidden",
        }}
        onClick={openUngrantFlow}
      />
    );
  }

  const renderActions = useCallback(() => {
    return (
      <div className="flex items-center gap-lg">
        {projectId ? (
          <Button
            variant={"secondary"}
            size={"sm"}
            translate={{ token: "manageProjects:detail.activity.actions.editProject" }}
            classNames={{
              base: "max-w-full overflow-hidden",
              label: "whitespace-nowrap text-ellipsis overflow-hidden",
            }}
            onClick={() => openProject({ projectId })}
          />
        ) : null}

        {isFinancial ? (
          <>
            {renderUngrantButton()}

            <Button
              variant={"secondary"}
              size={"sm"}
              translate={{ token: "manageProjects:detail.activity.actions.seeTransactions" }}
              onClick={openProjectTransactions}
              classNames={{
                base: "max-w-full overflow-hidden",
                label: "whitespace-nowrap text-ellipsis overflow-hidden",
              }}
            />
          </>
        ) : null}

        <Tooltip enabled={!canReward} content={<Translate token="common:tooltip.disabledReward" />}>
          <Button
            variant={"primary"}
            size={"sm"}
            translate={{ token: "manageProjects:detail.activity.actions.reward" }}
            onClick={() => openRewardFlow({ githubUserIds: [] })}
            classNames={{
              base: "max-w-full overflow-hidden",
              label: "whitespace-nowrap text-ellipsis overflow-hidden",
            }}
            isDisabled={!canReward}
          />
        </Tooltip>
      </div>
    );
  }, [projectId, isFinancial, canReward]);

  return (
    <>
      <AnimatedColumn className="h-full">
        <ScrollView className="flex flex-col gap-md">
          {openAlert ? <GithubMissingPermissionsAlert onClose={handleCloseAlert} /> : null}

          <RepoIndexingAlert indexingComplete={data?.isIndexingCompleted() ?? true} />

          <PageContent classNames={{ base: "tablet:overflow-hidden" }}>
            <div className="flex h-full flex-col gap-lg">
              <header className="flex flex-col flex-wrap items-start justify-between gap-md tablet:flex-row tablet:items-center">
                <Tabs
                  variant={"solid"}
                  searchParams={"data-view"}
                  tabs={[
                    {
                      id: Views.CONTRIBUTIONS,
                      children: <Translate token={"manageProjects:detail.views.contributions"} />,
                      as: BaseLink,
                      htmlProps: {
                        href: NEXT_ROUTER.manageProjects.contributions.root(projectSlug),
                      },
                    },
                    {
                      id: Views.CONTRIBUTORS,
                      children: <Translate token={"manageProjects:detail.views.contributors"} />,
                      as: BaseLink,
                      htmlProps: {
                        href: NEXT_ROUTER.manageProjects.contributors.root(projectSlug),
                      },
                    },
                    {
                      id: Views.FINANCIAL,
                      children: <Translate token={"manageProjects:detail.views.financial"} />,
                      as: BaseLink,
                      htmlProps: {
                        href: NEXT_ROUTER.manageProjects.financial.root(projectSlug),
                      },
                    },
                  ]}
                  selectedId={selectedId}
                />

                {renderActions()}
              </header>

              {children}
            </div>
          </PageContent>
        </ScrollView>
      </AnimatedColumn>

      <FinancialDetailSidepanel footer={renderUngrantButton()} />
    </>
  );
}

function ManageProjectsLayout({
  children,
  params: { projectSlug },
}: PropsWithChildren<{ params: { projectSlug: string } }>) {
  const { data } = ProjectReactQueryAdapter.client.useGetProjectBySlug({
    pathParams: { slug: projectSlug },
    options: {
      enabled: Boolean(projectSlug),
    },
  });

  const projectId = useMemo(() => data?.id, [data]);

  return (
    <PageWrapper containerSize="large">
      <PosthogCaptureOnMount
        eventName={"project_dashboard_viewed"}
        params={{
          project_id: projectId,
        }}
        paramsReady={Boolean(projectId)}
      />

      <ActionPoolingProvider interval={2000} limit={4}>
        <GithubPermissionsProvider projectSlug={projectSlug}>
          <RewardFlowProvider projectId={projectId}>
            <UngrantFlowProvider projectId={projectId}>
              <Safe projectSlug={projectSlug}>{children}</Safe>
              <ContributionsSidepanel />
            </UngrantFlowProvider>
          </RewardFlowProvider>
        </GithubPermissionsProvider>
      </ActionPoolingProvider>

      <RewardDetailSidepanel />
      <ContributorSidepanel />
      <ProjectUpdateSidepanel />
    </PageWrapper>
  );
}

export default withClientOnly(withAuthenticated(ManageProjectsLayout));
