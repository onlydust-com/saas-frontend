import { useMemo } from "react";

import { IssueReactQueryAdapter } from "@/core/application/react-query-adapter/issue";

import { Skeleton } from "@/design-system/atoms/skeleton";
import { Modal } from "@/design-system/molecules/modal";

import { ErrorState } from "@/shared/components/error-state/error-state";
import { PageContent } from "@/shared/features/page-content/page-content";
import { SidePanelsProvider } from "@/shared/features/side-panels/side-panels.context";
import { ApplicantsTable } from "@/shared/modals/manage-applicants-modal/_components/applicants-table/applicants-table";
import { ManageApplicantsModalProps } from "@/shared/modals/manage-applicants-modal/manage-applicants-modal.types";
import { Translate } from "@/shared/translation/components/translate/translate";

export function ManageApplicantsModal({
  isOpen,
  onOpenChange,
  projectId,
  contributionId = "",
  repoId,
}: ManageApplicantsModalProps) {
  const { data, isLoading, isError } = IssueReactQueryAdapter.client.useGetIssueApplicants({
    pathParams: { contributionUuid: contributionId },
    options: { enabled: !!contributionId && isOpen },
  });
  const totalItemNumber = useMemo(() => data?.pages[0].totalItemNumber, [data]);

  if (!projectId) return null;

  function renderContent() {
    if (isLoading) {
      return <Skeleton classNames={{ base: "h-full" }} />;
    }

    if (isError) {
      return (
        <PageContent classNames={{ base: "h-full flex flex-col justify-center" }}>
          <ErrorState />
        </PageContent>
      );
    }

    return (
      <SidePanelsProvider absolute>
        <PageContent classNames={{ base: "h-full" }}>
          <ApplicantsTable
            projectId={projectId ?? ""}
            contributionId={contributionId}
            repoId={repoId}
            onAssign={() => onOpenChange?.(false)}
          />
        </PageContent>
      </SidePanelsProvider>
    );
  }

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      titleProps={{
        children: <Translate token={"modals:manageApplicants.title"} count={totalItemNumber} />,
      }}
      size="8xl"
      background="gradient"
      classNames={{ modal: "h-full" }}
    >
      {renderContent()}
    </Modal>
  );
}
