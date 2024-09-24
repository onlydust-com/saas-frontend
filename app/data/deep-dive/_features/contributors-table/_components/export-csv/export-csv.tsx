"use client";

import { Download } from "lucide-react";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Tooltip } from "@/design-system/atoms/tooltip";

import { useExportContributorsSidepanel } from "@/shared/panels/export-contributors-sidepanel/export-contributors-sidepanel.hooks";
import { Translate } from "@/shared/translation/components/translate/translate";

export function ExportCsv() {
  const { open } = useExportContributorsSidepanel();

  return (
    <Tooltip content={<Translate token={"panels:exportContributors.title"} />}>
      <Button variant={"secondary"} size="sm" startIcon={{ component: Download }} iconOnly onClick={() => open()} />
    </Tooltip>
  );
}
