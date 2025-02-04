import { Modal } from "@/design-system/molecules/modal";

import { PageContent } from "@/shared/features/page-content/page-content";
import { SidePanelsProvider } from "@/shared/features/side-panels/side-panels.context";
import { Translate } from "@/shared/translation/components/translate/translate";

import { ContributorsTable } from "./_components/contributors-table/contributors-table";
import { ManageRewardsModalProps } from "./manage-rewards-modal.types";

export function ManageRewardsModal({ isOpen, onOpenChange, projectId }: ManageRewardsModalProps) {
  if (!projectId) return null;

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      titleProps={{
        children: <Translate token={"modals:manageRewards.title"} />,
      }}
      size="8xl"
      background="gradient"
      classNames={{ modal: "h-full" }}
    >
      <SidePanelsProvider absolute>
        <PageContent classNames={{ base: "h-full" }}>
          <ContributorsTable projectId={projectId} />
        </PageContent>
      </SidePanelsProvider>
    </Modal>
  );
}
