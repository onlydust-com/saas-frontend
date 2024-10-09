import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { InView } from "react-intersection-observer";
import { useDebounce } from "react-use";

import { ContributionReactQueryAdapter } from "@/core/application/react-query-adapter/contribution";
import { GetContributionsQueryParams } from "@/core/domain/contribution/contribution-contract.types";

import { Input } from "@/design-system/atoms/input";
import { CardContributionKanban as Card } from "@/design-system/molecules/cards/card-contribution-kanban";

import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { useSidePanel, useSinglePanelData } from "@/shared/features/side-panels/side-panel/side-panel";
import { cn } from "@/shared/helpers/cn";
import { useIsssuesSearchSidepanel } from "@/shared/panels/contribution-sidepanel/_features/issues-search-sidepanel/issues-search-sidepanel.hooks";

import { IssuesSearchSidepanelData } from "./issues-search-sidepanel.types";

export function IssuesSearchSidepanel() {
  const { t } = useTranslation();
  const { name } = useIsssuesSearchSidepanel();
  const { Panel, isOpen, back } = useSidePanel({ name });
  const { relatedIssueId } = useSinglePanelData<IssuesSearchSidepanelData>(name) ?? {
    relatedIssueId: "",
  };

  const { data: contribution } = ContributionReactQueryAdapter.client.useGetContributionById({
    pathParams: { contributionId: relatedIssueId },
    options: {
      enabled: isOpen && !!relatedIssueId,
    },
  });

  const { mutateAsync, isPending: isAddingIssue } = ContributionReactQueryAdapter.client.usePatchContribution({
    pathParams: { contributionId: relatedIssueId },
  });

  async function onAddIssue(issueId: number) {
    if (isAddingIssue) return;

    if (!contribution?.linkedIssues?.find(issue => issue.githubId === issueId)) {
      await mutateAsync({
        linkedIssues: [...(contribution?.linkedIssues || []).map(issue => issue.githubId), issueId],
      });
    }

    back();
  }

  const [search, setSearch] = useState<string>();
  const [debouncedSearch, setDebouncedSearch] = useState<string>();

  useDebounce(
    () => {
      setDebouncedSearch(search);
    },
    300,
    [search]
  );

  const queryParams: Partial<GetContributionsQueryParams> = useMemo(
    () => ({
      search: debouncedSearch,
      statuses: ["IN_PROGRESS"],
    }),
    [debouncedSearch]
  );

  const { data, hasNextPage, fetchNextPage, isPending } = ContributionReactQueryAdapter.client.useGetContributions({
    queryParams,
    options: {
      enabled: isOpen && !!relatedIssueId,
    },
  });

  const issues = data?.pages.flatMap(page => page.contributions) || [];

  return (
    <Panel>
      <SidePanelHeader
        canGoBack={true}
        canClose={true}
        title={{ translate: { token: "panels:contribution.linkedIssues.panel.title" } }}
      />
      <SidePanelBody>
        <ScrollView>
          <div className={"flex flex-col gap-3"}>
            <Input
              name={"table-search"}
              placeholder={t("panels:contribution.linkedIssues.panel.searchPlaceholder")}
              startIcon={{ component: Search }}
              classNames={{ base: "w-full" }}
              value={search}
              onChange={e => {
                setSearch(e.target.value);
              }}
            />
            {issues?.map(issue => (
              <Card
                key={issue.id}
                type={issue.type}
                githubTitle={issue.githubTitle}
                githubStatus={issue.githubStatus}
                githubNumber={issue.githubNumber}
                lastUpdatedAt={issue.lastUpdatedAt}
                applicants={[]}
                contributors={[]}
                githubLabels={issue.githubLabels}
                htmlProps={{
                  onClick: () => onAddIssue(issue.githubId),
                }}
              />
            ))}
            {hasNextPage ? (
              <InView className={cn("flex w-full justify-center")} onChange={fetchNextPage} skip={isPending} />
            ) : null}
          </div>
        </ScrollView>
      </SidePanelBody>
    </Panel>
  );
}
