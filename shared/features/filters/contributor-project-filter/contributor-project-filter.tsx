import { useTranslation } from "react-i18next";

import { AccordionFilter } from "@/shared/features/filters/accordion-filter/accordion-filter";
import { ContributorProjectFilterProps } from "@/shared/features/filters/contributor-project-filter/contributor-project-filter.types";
import { UserAutocomplete } from "@/shared/features/user/user-autocomplete/user-autocomplete";

export function ContributorProjectFilter({ selectedUser, onSelect }: ContributorProjectFilterProps) {
  const { t } = useTranslation();
  return (
    <AccordionFilter
      name={"contributor-project"}
      title={{ translate: { token: "features:filters.contributorProject.title" } }}
      selected={selectedUser?.length}
    >
      <UserAutocomplete
        name={"contributor-project"}
        selectedUser={selectedUser}
        isPopover={false}
        onSelect={onSelect}
        isMultiple={true}
        placeholder={t("features:filters.contributorProject.placeholder")}
        withInternalUserOnly={true}
      />
    </AccordionFilter>
  );
}
