import { Github } from "lucide-react";

import { ContributionReactQueryAdapter } from "@/core/application/react-query-adapter/contribution";

import { Button } from "@/design-system/atoms/button/variants/button-default";

import { BaseLink } from "@/shared/components/base-link/base-link";
import { SidePanelFooter } from "@/shared/features/side-panels/side-panel-footer/side-panel-footer";
import { ManageApplicantsModal } from "@/shared/modals/manage-applicants-modal/manage-applicants-modal";
import { useManageApplicantsModal } from "@/shared/modals/manage-applicants-modal/manage-applicants-modal.hooks";
import { FooterProps } from "@/shared/panels/contribution-sidepanel/_features/footer/footer.types";

export function Footer({ contribution }: FooterProps) {
  const { isOpen, setIsOpen } = useManageApplicantsModal();

  const { mutate } = ContributionReactQueryAdapter.client.usePatchContribution({
    pathParams: { contributionId: contribution?.id ?? "" },
    options: {
      onSuccess: () => {
        setIsOpen(false);
      },
    },
  });

  function handleAssign(githubUserId: number) {
    mutate({ assignees: [githubUserId] });
  }

  return (
    <SidePanelFooter>
      <div className={"flex w-full flex-row items-center justify-between gap-lg"}>
        <Button
          size={"md"}
          variant={"secondary"}
          as={BaseLink}
          iconOnly
          htmlProps={{ href: contribution?.githubHtmlUrl ?? "", target: "_blank" }}
          startIcon={{
            component: Github,
          }}
        />

        {contribution?.isNotAssigned() ? (
          <Button
            size={"md"}
            variant={"secondary"}
            onClick={() => setIsOpen(true)}
            translate={{ token: "panels:contribution.footer.actions.manageInFullPage" }}
          />
        ) : (
          <div />
        )}
      </div>
      <ManageApplicantsModal
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        projectId={"7d04163c-4187-4313-8066-61504d34fc56"}
        onAssign={handleAssign}
        contributionId={contribution?.id}
      />
    </SidePanelFooter>
  );
}
