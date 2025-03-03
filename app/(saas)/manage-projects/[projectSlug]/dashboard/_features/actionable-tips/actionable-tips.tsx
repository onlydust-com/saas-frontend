"use client";

import { ExternalLink } from "lucide-react";
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
      title: "🎨 Give your project a face — add a logo!",
      justification: "Branding matters. Projects with a logo get more visitors. Stand out from the crowd. 🏆",
      action: projectId => openProject({ projectId }),
    },
    MISSING_CATEGORY: {
      actionLabel: "Edit your project",
      title: "📌 Categorize your project for MAX visibility",
      justification: "No category? You're invisible. Proper categorization boosts discoverability. Be seen. 👀",
      action: projectId => openProject({ projectId }),
    },
    MISSING_ECOSYSTEM: {
      actionLabel: "Edit your project",
      title: "🌍 Connect your project to the right ecosystem",
      justification:
        "Projects linked to an ecosystem attract more contributors. Don't build in isolation — be part of something bigger. 🔗",
      action: projectId => openProject({ projectId }),
    },
    MISSING_README: {
      actionLabel: "Edit on GitHub",
      title: "🚨 No README? No credibility. Fix this ASAP.",
      justification:
        "No README = no trust. Contributors need context before they dive in. Get one up now, and make it count. ✅",
      action: projectId => openProject({ projectId }),
    },
    DESCRIPTION_TOO_SHORT: {
      actionLabel: "Edit your project",
      title: "📢 Tell people WHY your project matters",
      justification:
        "A vague description won't cut it. Projects that tell a compelling story see more interest. Sell your vision! 💡",
      action: projectId => openProject({ projectId }),
    },
    README_TOO_SHORT: {
      actionLabel: "Edit on GitHub",
      title: "📖 Your README needs more love — add installation & contribution steps",
      justification:
        "Great projects have great READMEs. More details = more contributors. No one wants to guess how to get started. 🔧",
      action: projectId => openProject({ projectId }),
    },
    OUTDATED_DESCRIPTION: {
      actionLabel: "Edit your project",
      title: "🕰️ Keep your project description fresh & relevant",
      justification:
        "A stale description = missed opportunities. Stay sharp, stay updated, and keep the right contributors coming in. 🔥",
      action: projectId => openProject({ projectId }),
    },
    MISSING_AVAILABLE_ISSUES: {
      actionLabel: "Create good first issues",
      title: "🚀 Make it stupidly easy for visitors to contribute",
      justification:
        "No open issues? No new contributors. Let's fix that. Give them something to work on, and watch engagement skyrocket. 📈",
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
      <TypographyH3>Actionable Tip</TypographyH3>

      <div className="flex flex-col gap-0">
        <TypographyP>{tipAction.title}</TypographyP>
        <TypographyMuted>{tipAction.justification}</TypographyMuted>
      </div>

      <Button onClick={handleAction} className="w-fit">
        {tipAction.actionLabel}
        {!!url && <ExternalLink />}
      </Button>
    </Card>
  );
}
