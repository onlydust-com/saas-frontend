"use client";

import { useRouter } from "next/navigation";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";

import { useProjectUpdateSidePanel } from "@/shared/panels/project-update-sidepanel/project-update-sidepanel.hooks";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { TypographyH3, TypographyP } from "@/shared/ui/typography";

import { ActionableTipsProps, createTipToActionMap } from "./actionable-tips.types";

export function ActionableTips({ projectId }: ActionableTipsProps) {
  const router = useRouter();
  const { open: openProject } = useProjectUpdateSidePanel();

  const { data: projectAcquisitionTip } = ProjectReactQueryAdapter.client.useGetProjectAcquisitionTip({
    pathParams: { projectIdOrSlug: projectId },
    options: {
      enabled: Boolean(projectId),
    },
  });

  const tipActions = createTipToActionMap(
    path => router.push(path),
    projectId => openProject({ projectId })
  );

  if (!projectAcquisitionTip) {
    return null;
  }

  const { identifier, url } = projectAcquisitionTip;
  const tipAction = tipActions[identifier];

  return (
    <Card className="flex flex-col gap-4 bg-gradient-to-br from-blue-950 to-transparent to-50% p-4">
      <TypographyH3>Actionable Tips</TypographyH3>
      <TypographyP>{url}</TypographyP>
      <Button variant="secondary" onClick={() => tipAction.action(projectId)}>
        {tipAction.label}
      </Button>
    </Card>
  );
}
