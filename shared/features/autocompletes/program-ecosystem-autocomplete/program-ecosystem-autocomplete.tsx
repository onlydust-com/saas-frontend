import { MenuItemId } from "@/design-system/molecules/menu-item";
import { Select } from "@/design-system/molecules/select";

import { useProgramEcosystemAutocomplete } from "@/shared/features/autocompletes/program-ecosystem-autocomplete/program-ecosystem-autocomplete.hooks";
import { ProgramEcosystemAutocompleteProps } from "@/shared/features/autocompletes/program-ecosystem-autocomplete/program-ecosystem-autocomplete.types";

export function ProgramEcosystemAutocomplete({
  selectedProgramsEcosystems,
  onSelect,
  ...selectProps
}: ProgramEcosystemAutocompleteProps) {
  const { programAndEcosystemItems } = useProgramEcosystemAutocomplete();

  function handleSelect(ids: MenuItemId[]) {
    onSelect?.(ids as string[]);
  }

  return (
    <Select
      items={programAndEcosystemItems}
      isAutoComplete={true}
      onSelect={handleSelect}
      selectedIds={selectedProgramsEcosystems}
      {...selectProps}
    />
  );
}
