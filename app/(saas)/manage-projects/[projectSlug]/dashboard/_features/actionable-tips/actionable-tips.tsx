"use client";

import { useRouter } from "next/navigation";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";

import { NEXT_ROUTER } from "@/shared/constants/router";
import { useProjectUpdateSidePanel } from "@/shared/panels/project-update-sidepanel/project-update-sidepanel.hooks";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { TypographyH3, TypographyMuted, TypographyP } from "@/shared/ui/typography";

import { AcquisitionTipIdentifier, ActionableTipsProps, TipAction } from "./actionable-tips.types";

function createTipToActionMap(
  navigate: (path: string) => void,
  openProject: ({ projectId }: { projectId: string }) => void
): Record<AcquisitionTipIdentifier, TipAction> {
  return {
    MISSING_LOGO: {
      label: "Add project logo",
      description: "Add a logo to your project to make it more recognizable.",
      action: projectId => openProject({ projectId }),
    },
    MISSING_CATEGORY: {
      label: "Set project category",
      description: "Set a category for your project to help users find it.",
      action: projectId => openProject({ projectId }),
    },
    MISSING_ECOSYSTEM: {
      label: "Set project ecosystem",
      description: "Set an ecosystem for your project to help users find it.",
      action: projectId => openProject({ projectId }),
    },
    MISSING_README: {
      label: "Add README file",
      description: "Add a README file to your project to help users understand it.",
      action: projectId => openProject({ projectId }),
    },
    DESCRIPTION_TOO_SHORT: {
      label: "Improve project description",
      description: "Improve your project description to help users understand it.",
      action: projectId => openProject({ projectId }),
    },
    README_TOO_SHORT: {
      label: "Expand README content",
      description: "Expand the README content to help users understand it.",
      action: projectId => openProject({ projectId }),
    },
    OUTDATED_DESCRIPTION: {
      label: "Update project description",
      description: "Update your project description to help users understand it.",
      action: projectId => openProject({ projectId }),
    },
    MISSING_AVAILABLE_ISSUES: {
      label: "Add available issues",
      description: "Add available issues to your project to help users understand it.",
      action: projectId => navigate(NEXT_ROUTER.manageProjects.contributions.root(projectId)),
    },
  };
}

export function ActionableTips({ projectId }: ActionableTipsProps) {
  const router = useRouter();
  const { open: openProject } = useProjectUpdateSidePanel();

  const { data: projectAcquisitionTip } = ProjectReactQueryAdapter.client.useGetProjectAcquisitionTip({
    pathParams: { projectIdOrSlug: projectId },
    options: {
      enabled: Boolean(projectId),
    },
  });

  const tipActions = createTipToActionMap(path => router.push(path), openProject);

  if (!projectAcquisitionTip) {
    return null;
  }

  const { identifier, url } = projectAcquisitionTip;
  const tipAction = tipActions[identifier];

  const handleAction = () => {
    if (url) {
      window.open(url, "_blank");
    } else {
      tipAction.action(projectId);
    }
  };

  return (
    <Card className="flex flex-col gap-4 bg-gradient-to-br from-blue-950 to-transparent to-50% p-4">
      <TypographyH3>Actionable Tips</TypographyH3>

      <div className="flex flex-col gap-0">
        <TypographyP>{tipAction.label}</TypographyP>
        <TypographyMuted>{tipAction.description}</TypographyMuted>
      </div>

      <Button onClick={handleAction} className="w-fit">
        Action
      </Button>
    </Card>
  );
}
