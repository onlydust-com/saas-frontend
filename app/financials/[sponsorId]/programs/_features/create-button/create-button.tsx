import { CreateButtonProps } from "@/app/financials/[sponsorId]/programs/_features/create-button/create-button.types";
import { useCreateProgramPanel } from "@/app/financials/[sponsorId]/programs/_features/create-program-panel/create-program-panel.hooks";

import { Button } from "@/design-system/atoms/button/variants/button-default";

export function CreateButton({ sponsorId }: CreateButtonProps) {
  const { open: openCreateProgram } = useCreateProgramPanel();

  return (
    <Button
      variant={"secondary"}
      size={"sm"}
      onClick={() => openCreateProgram({ sponsorId })}
      translate={{ token: "financials:details.programs.actions.create" }}
    />
  );
}
