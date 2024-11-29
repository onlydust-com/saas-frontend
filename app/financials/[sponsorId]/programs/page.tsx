"use client";

import { CreateProgramPanel } from "@/app/financials/[sponsorId]/programs/_features/create-program-panel/create-program-panel";
import { EditProgramPanel } from "@/app/financials/[sponsorId]/programs/_features/edit-program-panel/edit-program-panel";
import { ProgramsTable } from "@/app/financials/[sponsorId]/programs/_features/programs-table/programs-table";

import { AllocateProgramSidepanel } from "@/shared/panels/allocate-program-sidepanel/allocate-program-sidepanel";
import { useAllocateProgramSidepanel } from "@/shared/panels/allocate-program-sidepanel/allocate-program-sidepanel.hooks";
import { ProgramListSidepanel } from "@/shared/panels/program-list-sidepanel/program-list-sidepanel";
import { ProgramSidepanel } from "@/shared/panels/program-sidepanel/program-sidepanel";

export default function FinancialsProgramsPage({ params: { sponsorId } }: { params: { sponsorId: string } }) {
  const { open: openAllocateProgramSidepanel } = useAllocateProgramSidepanel();

  function handleOpenAllocateProgram(programId: string, canGoBack?: boolean) {
    openAllocateProgramSidepanel({ programId, sponsorId, canGoBack });
  }

  return (
    <>
      <ProgramsTable sponsorId={sponsorId} />

      <CreateProgramPanel />
      <EditProgramPanel />
      <ProgramSidepanel />
      <ProgramListSidepanel sponsorId={sponsorId} onProgramClick={handleOpenAllocateProgram} />
      <AllocateProgramSidepanel />
    </>
  );
}
