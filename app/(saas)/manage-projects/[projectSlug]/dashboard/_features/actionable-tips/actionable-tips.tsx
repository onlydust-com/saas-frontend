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
      actionLabel: "Edit your project",
      title: "Enhance the project's visual identity with a logo",
      justification: "60% of contributors prefer selecting a project with a logo.",
      action: projectId => openProject({ projectId }),
    },
    MISSING_CATEGORY: {
      actionLabel: "Edit your project",
      title: "Define categories to help with project discoverability",
      justification: "Proper categorization increases visibility by 60% in open-source directories.",
      action: projectId => openProject({ projectId }),
    },
    MISSING_ECOSYSTEM: {
      actionLabel: "Edit your project",
      title: "Identify relevant technology ecosystems",
      justification: "Projects that clarify their ecosystem see a 45% increase in relevant contributions.",
      action: projectId => openProject({ projectId }),
    },
    MISSING_README: {
      actionLabel: "Edit your project",
      title: "Provide a README file with project details",
      justification: "Projects without a README lose 90% of potential contributors.",
      action: projectId => openProject({ projectId }),
    },
    DESCRIPTION_TOO_SHORT: {
      actionLabel: "Edit your project",
      title: "Expand the project description to include objectives and impact",
      justification: "Projects with detailed descriptions see a 55% increase in contributor interest.",
      action: projectId => openProject({ projectId }),
    },
    README_TOO_SHORT: {
      actionLabel: "Edit your project",
      title: "Improve the README by adding installation and contribution guidelines",
      justification: "Projects with comprehensive READMEs attract 80% more contributors.",
      action: projectId => openProject({ projectId }),
    },
    OUTDATED_DESCRIPTION: {
      actionLabel: "Edit your project",
      title: "Keep your project description up-to-date",
      justification: "Regularly updated descriptions result in a 50% higher contributor retention rate.",
      action: projectId => openProject({ projectId }),
    },
    MISSING_AVAILABLE_ISSUES: {
      actionLabel: "Create good first issues",
      title: "Make it easy for visitors to find ways to contribute",
      justification: "Lowering barriers to entry results in a 65% increase in first-time contributions.",
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
        <TypographyP>{tipAction.title}</TypographyP>
        <TypographyMuted>{tipAction.justification}</TypographyMuted>
      </div>

      <Button onClick={handleAction} className="w-fit">
        {tipAction.actionLabel}
      </Button>
    </Card>
  );
}
