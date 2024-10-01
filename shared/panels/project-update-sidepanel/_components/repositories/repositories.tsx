import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Accordion } from "@/design-system/molecules/accordion";

import { EditProjectFormData } from "@/shared/panels/project-update-sidepanel/project-update-sidepanel.types";

import { RepositoriesProps } from "./repositories.types";

export function Repositories({ project }: RepositoriesProps) {
  const { t } = useTranslation("panels");
  const { control } = useFormContext<EditProjectFormData>();

  return (
    <Accordion
      defaultSelected={["repositories"]}
      id={"repositories"}
      titleProps={{ translate: { token: "panels:projectUpdate.repositories.title" } }}
    >
      <div className={"flex w-full flex-col gap-md"}>coucou</div>
    </Accordion>
  );
}
