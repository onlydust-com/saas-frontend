import { ChevronRight } from "lucide-react";
import { useParams } from "next/navigation";

import { AllocateButton } from "@/app/financials/[sponsorId]/_features/allocate-button/allocate-button";
import { useCreateProgramPanel } from "@/app/financials/[sponsorId]/_features/create-program-panel/create-program-panel.hooks";
import { ProgramsTable } from "@/app/financials/[sponsorId]/_features/programs-table/programs-table";
import { ProgramsSectionProps } from "@/app/financials/[sponsorId]/_sections/programs-section/programs-section.types";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Typo } from "@/design-system/atoms/typo";

import { Translate } from "@/shared/translation/components/translate/translate";

export function ProgramsSection({ onAllocateClick }: ProgramsSectionProps) {
  const { sponsorId } = useParams<{ sponsorId: string }>();
  const { open: openCreateProgram } = useCreateProgramPanel();

  return (
    <div className="grid gap-3">
      <header
        className={"flex flex-col items-start justify-start tablet:flex-row tablet:items-center tablet:justify-between"}
      >
        <Typo
          variant={"heading"}
          size={"xs"}
          weight={"medium"}
          translate={{
            token: "financials:details.programs.title",
          }}
        />
        <div className={"flex flex-row items-center justify-end gap-lg"}>
          <AllocateButton sponsorId={sponsorId} />

          <Button
            variant={"primary"}
            endIcon={{ component: ChevronRight }}
            isTextButton
            size={"md"}
            onClick={() => openCreateProgram({ sponsorId })}
          >
            <Translate token={"financials:details.programs.actions.create"} />
          </Button>
        </div>
      </header>

      <ProgramsTable onAllocateClick={onAllocateClick} />
    </div>
  );
}
