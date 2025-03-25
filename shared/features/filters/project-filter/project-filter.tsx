import { useTranslation } from "react-i18next";

import { ProjectAutocomplete } from "@/shared/features/autocompletes/project-autocomplete/project-autocomplete";
import { AccordionFilter } from "@/shared/features/filters/accordion-filter/accordion-filter";

import { ProjectFilterProps } from "./project-filter.types";

export function ProjectFilter({ selectedProjects, onSelect }: ProjectFilterProps) {
  const { t } = useTranslation("features");
  return (
    <AccordionFilter
      name={"projects"}
      title={{ translate: { token: "features:filters.project.title" } }}
      selected={selectedProjects?.length}
    >
      <ProjectAutocomplete
        name={"projects"}
        selectedProjects={selectedProjects}
        isPopover={false}
        onSelect={onSelect}
        isMultiple={true}
        placeholder={t("filters.project.placeholder")}
      />
    </AccordionFilter>
  );
}
