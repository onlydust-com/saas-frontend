import { Github } from "lucide-react";
import { useMemo } from "react";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Tooltip } from "@/design-system/atoms/tooltip";

import { BaseLink } from "@/shared/components/base-link/base-link";
import { useGithubPermissionsContext } from "@/shared/features/github-permissions/github-permissions.context";
import { SidePanelFooter } from "@/shared/features/side-panels/side-panel-footer/side-panel-footer";
import { useContributionActions } from "@/shared/hooks/contributions/use-contribution-actions";
import { ManageApplicantsModal } from "@/shared/modals/manage-applicants-modal/manage-applicants-modal";
import { useManageApplicantsModal } from "@/shared/modals/manage-applicants-modal/manage-applicants-modal.hooks";
import { FooterProps } from "@/shared/panels/contribution-sidepanel/_features/footer/footer.types";

export function Footer({ contribution }: FooterProps) {
  const { isOpen: isManageApplicantsModalOpen, setIsOpen: setIsManageApplicantsModalOpen } = useManageApplicantsModal();

  const { isProjectOrganisationMissingPermissions, canCurrentUserUpdatePermissions, setIsGithubPermissionModalOpen } =
    useGithubPermissionsContext();

  function HandleManageApplicants() {
    if (isProjectOrganisationMissingPermissions(contribution.repo.id)) {
      setIsGithubPermissionModalOpen(true);
      return;
    }

    setIsManageApplicantsModalOpen(true);
  }

  const { buttons, endContent } = useContributionActions(contribution);

  const renderContributionActions = useMemo(() => {
    if (!buttons.length && !endContent && !contribution?.isNotAssigned()) {
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
      isProjectOrganisationMissingPermissions(contribution.repo.id) &&
      canCurrentUserUpdatePermissions(contribution.repo.id)
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
        {buttons.map((action, index) => {
          if (action.tooltip) {
            return (
              <Tooltip key={index} {...action?.tooltip}>
                <Button size={"md"} variant={"secondary"} {...action} />
              </Tooltip>
            );
          }

          return <Button key={index} size={"md"} variant={"secondary"} {...action} />;
        })}
        {endContent}
      </div>
    );
  }, [buttons, contribution, endContent]);

  return (
    <SidePanelFooter>
      <div className={"flex w-full flex-row items-center justify-between gap-lg"}>
        {!contribution.isToReview() ? (
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
        ) : (
          <div />
        )}

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
