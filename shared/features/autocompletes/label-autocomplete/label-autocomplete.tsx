import { MenuItemId } from "@/design-system/molecules/menu-item";
import { Select } from "@/design-system/molecules/select";

import { useLabelAutocomplete } from "@/shared/features/autocompletes/category-autocomplete/label-autocomplete.hooks";
import { LabelAutocompleteProps } from "@/shared/features/autocompletes/label-autocomplete/label-autocomplete.types";

export function LabelAutocomplete({ selectedLabels, onSelect, ...selectProps }: LabelAutocompleteProps) {
  const { labelsItem } = useLabelAutocomplete();

  function handleSelect(ids: MenuItemId[]) {
    onSelect?.(ids as string[]);
  }

  return (
    <Select
      items={labelsItem}
      isAutoComplete={true}
      onSelect={handleSelect}
      selectedIds={selectedLabels}
      {...selectProps}
    />
  );
}
