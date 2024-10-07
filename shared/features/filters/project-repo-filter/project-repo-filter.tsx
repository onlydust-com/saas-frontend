import { useParams } from "next/navigation";
import { useTranslation } from "react-i18next";

import { ProjectRepoAutocomplete } from "@/shared/features/autocompletes/project-repo-autocomplete/project-repo-autocomplete";
import { AccordionFilter } from "@/shared/features/filters/accordion-filter/accordion-filter";
import { ProjectRepoFilterProps } from "@/shared/features/filters/project-repo-filter/project-repo-filter.types";

export function ProjectRepoFilter({ selectedRepo, onSelect }: ProjectRepoFilterProps) {
  const { projectSlug = "" } = useParams<{ projectSlug: string }>();
  const { t } = useTranslation();
  return (
    <AccordionFilter
      name={"project-repo"}
      title={{ translate: { token: "features:filters.projectRepo.title" } }}
      selected={selectedRepo?.length}
    >
      <ProjectRepoAutocomplete
        name={"project-repo"}
        selectedRepos={selectedRepo}
        isPopover={false}
        onSelect={onSelect}
        isMultiple={true}
        placeholder={t("features:filters.projectRepo.placeholder")}
        projectSlug={projectSlug}
      />
    </AccordionFilter>
  );
}
