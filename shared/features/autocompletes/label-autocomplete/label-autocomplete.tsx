import { useMemo } from "react";

import { MenuItemId, MenuItemPort } from "@/design-system/molecules/menu-item";
import { Select } from "@/design-system/molecules/select";

import { LabelAutocompleteProps } from "@/shared/features/autocompletes/label-autocomplete/label-autocomplete.types";

export function LabelAutocomplete({ selectedLabels, onSelect, ...selectProps }: LabelAutocompleteProps) {
  // TODO retrieve labels data with dedicated query hook
  // Temp mock data
  const data = {
    labels: [
      { id: "item1", name: "Item 1" },
      { id: "item2", name: "Item 2" },
      { id: "item3", name: "Item 3" },
    ],
  };

  const labelsItem: MenuItemPort[] = useMemo(() => {
    return (
      data?.labels?.map(label => ({
        id: label.id,
        label: label.name,
        searchValue: label.name,
      })) ?? []
    );
  }, [data]);

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
