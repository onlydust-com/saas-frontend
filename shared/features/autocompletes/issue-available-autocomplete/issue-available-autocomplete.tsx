import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { AnyType } from "@/core/kernel/types";

import { MenuItemId, MenuItemPort } from "@/design-system/molecules/menu-item";
import { Select, SelectPort } from "@/design-system/molecules/select";

import { IssueAvailabilityType, IssueAvailableAutocompleteProps } from "./issue-available-autocomplete.types";

export function IssueAvailableAutocomplete({
  selectedAvailability,
  onSelect,
  ...selectProps
}: IssueAvailableAutocompleteProps) {
  const { t } = useTranslation("common");

  const availabilityItems: MenuItemPort[] = useMemo(() => {
    const options: SelectPort<AnyType>["items"] = [
      {
        label: t("issueAvailable.AVAILABLE"),
        id: IssueAvailabilityType.AVAILABLE,
      },
      {
        label: t("issueAvailable.UNAVAILABLE"),
        id: IssueAvailabilityType.UNAVAILABLE,
      },
    ];
    return [...options];
  }, []);

  function handleSelect(ids: MenuItemId[]) {
    onSelect?.(ids as string[]);
  }

  return (
    <Select
      items={availabilityItems}
      isAutoComplete={true}
      onSelect={handleSelect}
      selectedIds={selectedAvailability}
      {...selectProps}
    />
  );
}
