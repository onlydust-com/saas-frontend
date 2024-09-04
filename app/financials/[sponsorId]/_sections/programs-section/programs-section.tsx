import { ChevronRight } from "lucide-react";

import { useCreateProgramPanel } from "@/app/financials/[sponsorId]/_features/create-program-panel/create-program-panel.context";
import { ProgramsTable } from "@/app/financials/[sponsorId]/_features/programs-table/programs-table";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Typo } from "@/design-system/atoms/typo";

import { Translate } from "@/shared/translation/components/translate/translate";

export function ProgramsSection() {
  const { open } = useCreateProgramPanel();
  return (
    <div className="grid gap-3">
      <header className={"flex items-center justify-between"}>
        <Typo
          variant={"heading"}
          size={"xs"}
          weight={"medium"}
          translate={{
            token: "financials:details.programs.title",
          }}
        />
        <div className={"flex flex-row items-center justify-end gap-lg"}>
          <Button variant={"primary"} endIcon={{ component: ChevronRight }} isTextButton size={"md"} onClick={() => {}}>
            <Translate token={"financials:details.programs.actions.allocate"} />
          </Button>
          <Button
            variant={"primary"}
            endIcon={{ component: ChevronRight }}
            isTextButton
            size={"md"}
            onClick={() => open()}
          >
            <Translate token={"financials:details.programs.actions.create"} />
          </Button>
        </div>
      </header>

      <ProgramsTable />
    </div>
  );
}
