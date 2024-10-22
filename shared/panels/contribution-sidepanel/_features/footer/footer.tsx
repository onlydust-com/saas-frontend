import { Github } from "lucide-react";
import { useMemo } from "react";

import { ButtonPort } from "@/design-system/atoms/button/button.types";
import { Button } from "@/design-system/atoms/button/variants/button-default";

import { BaseLink } from "@/shared/components/base-link/base-link";
import { useGithubPermissionsContext } from "@/shared/features/github-permissions/github-permissions.context";
import { SidePanelFooter } from "@/shared/features/side-panels/side-panel-footer/side-panel-footer";
import { useContributionActions } from "@/shared/hooks/contributions/use-contribution-actions";
import { ManageApplicantsModal } from "@/shared/modals/manage-applicants-modal/manage-applicants-modal";
import { useManageApplicantsModal } from "@/shared/modals/manage-applicants-modal/manage-applicants-modal.hooks";
import { FooterProps } from "@/shared/panels/contribution-sidepanel/_features/footer/footer.types";

export function Footer({ contribution }: FooterProps) {
  const { isOpen: isManageApplicantsModalOpen, setIsOpen: setIsManageApplicantsModalOpen } = useManageApplicantsModal();

  const { isProjectOrganisationMissingPermissions, setIsGithubPermissionModalOpen } = useGithubPermissionsContext();

  function HandleManageApplicants() {
    if (isProjectOrganisationMissingPermissions(contribution.repo.id)) {
      setIsGithubPermissionModalOpen(true);
      return;
    }

    setIsManageApplicantsModalOpen(true);
  }

  const actions = useContributionActions(contribution) as ButtonPort<"button">[];

  const renderContributionActions = useMemo(() => {
    if (!actions.length && !contribution?.isNotAssigned()) {
      return <div />;
    }

    if (contribution?.isNotAssigned()) {
      return (
        <Button
          size={"md"}
          variant={"secondary"}
          onClick={HandleManageApplicants}
          translate={{ token: "panels:contribution.footer.actions.manageInFullPage" }}
        />
      );
    }

    if (
      contribution?.isInProgress() &&
      contribution.type !== "PULL_REQUEST" &&
      isProjectOrganisationMissingPermissions(contribution.repo.id)
    ) {
      return (
        <Button
          size={"md"}
          variant={"secondary"}
          onClick={() => setIsGithubPermissionModalOpen(true)}
          translate={{ token: "features:cardContributionKanban.actions.unassign" }}
        />
      );
    }

    return (
      <div className="flex gap-sm">
        {actions.map((action, index) => (
          <Button key={index} size={"md"} variant={"secondary"} {...action} />
        ))}
      </div>
    );
  }, [actions, contribution]);

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

        {renderContributionActions}
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
