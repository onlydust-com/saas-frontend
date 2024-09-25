import { useTranslation } from "react-i18next";

import { AccordionFilter } from "@/shared/features/filters/accordion-filter/accordion-filter";
import { UserAutocomplete } from "@/shared/features/user/user-autocomplete/user-autocomplete";

import { LeadProjectFilterProps } from "./lead-project-filter.types";

export function LeadProjectFilter({ selectedUser, onSelect }: LeadProjectFilterProps) {
  const { t } = useTranslation("features");
  return (
    <AccordionFilter
      name={"lead-project"}
      title={{ translate: { token: "features:filters.leadProject.title" } }}
      selected={selectedUser?.length}
    >
      <UserAutocomplete
        name={"lead-project"}
        selectedUser={selectedUser}
        isPopover={false}
        onSelect={onSelect}
        isMultiple={true}
        placeholder={t("filters.leadProject.placeholder")}
        withInternalUserOnly={true}
      />
    </AccordionFilter>
  );
}
