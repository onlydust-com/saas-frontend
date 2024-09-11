import { useEditProgramPanel } from "@/app/financials/[sponsorId]/_features/edit-program-panel/edit-program-panel.hooks";

import { useSidePanel, useSinglePanelData } from "@/shared/features/side-panels/side-panel/side-panel";

export function EditProgramPanel() {
  const { name } = useEditProgramPanel();
  const { Panel } = useSidePanel({ name });
  const { programId } = useSinglePanelData<{ programId: string }>(name) ?? { programId: "" };
  return <Panel>{programId}</Panel>;
}
