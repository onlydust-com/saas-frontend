import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { IssueReactQueryAdapter } from "@/core/application/react-query-adapter/issue";

import { Typo } from "@/design-system/atoms/typo";
import { ContributionBadge } from "@/design-system/molecules/contribution-badge";

import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelFooter } from "@/shared/features/side-panels/side-panel-footer/side-panel-footer";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { useSidePanel, useSinglePanelData } from "@/shared/features/side-panels/side-panel/side-panel";

import { Apply } from "./_components/apply/apply";
import { Metrics } from "./_components/metrics/metrics";
import { Summary } from "./_components/summary/summary";
import { useApplyIssueSidePanel } from "./apply-issue-sidepanel.hooks";
import {
  ApplyIssueSidepanelData,
  ApplyIssueSidepanelForm,
  ApplyIssueSidepanelProps,
  ApplyIssueSidepanelValidation,
} from "./apply-issue-sidepanel.types";

function Content() {
  const { name } = useApplyIssueSidePanel();
  const { issueId = 0, canGoBack = false } = useSinglePanelData<ApplyIssueSidepanelData>(name) ?? {
    issueId: undefined,
  };

  const {
    data: issue,
    isLoading,
    isError,
  } = IssueReactQueryAdapter.client.useGetIssue({
    pathParams: { issueId },
  });

  const form = useForm<ApplyIssueSidepanelForm>({
    resolver: zodResolver(ApplyIssueSidepanelValidation),
    defaultValues: {
      githubComment: application?.githubComment ?? "",
    },
  });

  if (isLoading) return <SidePanelBody>Loading</SidePanelBody>;
  if (isError) return <div>Error loading issue</div>;
  if (!issue) return null;

  console.log("issue", issue);

  return (
    <>
      <SidePanelHeader
        title={{
          children: (
            <div className={"flex w-full flex-row items-center justify-start gap-lg overflow-hidden"}>
              <ContributionBadge type={"ISSUE"} number={issue.number} githubStatus={issue.status} />

              <Typo
                size={"xs"}
                weight={"medium"}
                variant={"heading"}
                as={"div"}
                classNames={{ base: "flex-1 overflow-ellipsis overflow-hidden whitespace-nowrap" }}
              >
                {issue.title}
              </Typo>
            </div>
          ),
        }}
        canGoBack={canGoBack}
        canClose={true}
      />
      <SidePanelBody>
        <Metrics issue={issue} />
        <Summary issue={issue} />
        {/* // TODO MAKE OD HACK CARD */}
        <Apply issue={issue} />
      </SidePanelBody>
    </>
  );
}

export function ApplyIssueSidepanel({ children }: ApplyIssueSidepanelProps) {
  const { name, isOpen } = useApplyIssueSidePanel();
  const { Panel } = useSidePanel({ name });

  return (
    <Panel>
      <Content />
      <SidePanelFooter>footer</SidePanelFooter>
    </Panel>
  );
}
