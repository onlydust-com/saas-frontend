import { Github } from "lucide-react";
import { useParams } from "next/navigation";
import { useMemo } from "react";

import { ButtonPort } from "@/design-system/atoms/button/button.types";
import { Button } from "@/design-system/atoms/button/variants/button-default";

import { BaseLink } from "@/shared/components/base-link/base-link";
import { SidePanelFooter } from "@/shared/features/side-panels/side-panel-footer/side-panel-footer";
import { useContributionActions } from "@/shared/hooks/contributions/use-contribution-actions";
import { useGithubPermissions } from "@/shared/hooks/github-permissions/use-github-permissions";
import { GithubPermissionModal } from "@/shared/modals/github-permission-modal/github-permission-modal";
import { ManageApplicantsModal } from "@/shared/modals/manage-applicants-modal/manage-applicants-modal";
import { useManageApplicantsModal } from "@/shared/modals/manage-applicants-modal/manage-applicants-modal.hooks";
import { FooterProps } from "@/shared/panels/contribution-sidepanel/_features/footer/footer.types";

export function Footer({ contribution }: FooterProps) {
  const { projectSlug = "" } = useParams<{ projectSlug: string }>();
  const { isOpen: isManageApplicantsModalOpen, setIsOpen: setIsManageApplicantsModalOpen } = useManageApplicantsModal();

  const {
    isProjectOrganisationMissingPermissions,
    handleRedirectToGithubFlow,
    isGithubPermissionModalOpen,
    setIsGithubPermissionModalOpen,
  } = useGithubPermissions({ projectSlug, repoId: contribution.repo.id });

  function HandleManageApplicants() {
    if (isProjectOrganisationMissingPermissions) {
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

    if (contribution?.isInProgress() && isProjectOrganisationMissingPermissions) {
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
      <GithubPermissionModal
        onRedirect={handleRedirectToGithubFlow}
        isOpen={isGithubPermissionModalOpen}
        onOpenChange={setIsGithubPermissionModalOpen}
      />
      <ManageApplicantsModal
        isOpen={isManageApplicantsModalOpen}
        onOpenChange={setIsManageApplicantsModalOpen}
        // TODO - replace with real projectId
        projectId={"7d04163c-4187-4313-8066-61504d34fc56"}
        // TODO - rename prop to contributionGithubId
        issueId={contribution?.githubId}
      />
    </SidePanelFooter>
  );
}
