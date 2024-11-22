import { Github } from "lucide-react";

import { Button } from "@/design-system/atoms/button/variants/button-default";

import { BaseLink } from "@/shared/components/base-link/base-link";
import { SidePanelFooter } from "@/shared/features/side-panels/side-panel-footer/side-panel-footer";
import { ManageApplicantsModal } from "@/shared/modals/manage-applicants-modal/manage-applicants-modal";
import { useManageApplicantsModal } from "@/shared/modals/manage-applicants-modal/manage-applicants-modal.hooks";
import { useContributionPanelFooter } from "@/shared/panels/contribution-sidepanel/_features/footer/footer.hooks";
import { FooterProps } from "@/shared/panels/contribution-sidepanel/_features/footer/footer.types";

export function Footer({ contribution, as }: FooterProps) {
  const { isOpen: isManageApplicantsModalOpen, setIsOpen: setIsManageApplicantsModalOpen } = useManageApplicantsModal();

  const actions = useContributionPanelFooter({ as, contribution, setIsManageApplicantsModalOpen });

  return (
    <SidePanelFooter>
      <div className={"flex w-full flex-row items-center justify-between gap-lg"}>
        <Button
          size="md"
          variant="secondary"
          as={BaseLink}
          iconOnly
          htmlProps={{ href: contribution?.githubHtmlUrl, target: "_blank" }}
          startIcon={{
            component: Github,
          }}
        />

        {actions}
      </div>
      <ManageApplicantsModal
        isOpen={isManageApplicantsModalOpen}
        onOpenChange={setIsManageApplicantsModalOpen}
        projectId={contribution?.project?.id}
        contributionId={contribution?.id}
        repoId={contribution?.repo.id}
      />
    </SidePanelFooter>
  );
}
