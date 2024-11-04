import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { ContributorActivityStatusesUnion } from "@/core/domain/bi/models/bi.types";
import { RewardedFilterType } from "@/core/kernel/filters/filters-facade-port";
import { AnyType } from "@/core/kernel/types";

import { MenuItemId, MenuItemPort } from "@/design-system/molecules/menu-item";
import { Select, SelectPort } from "@/design-system/molecules/select";

import { ActivityStatusesAutocompleteProps } from "@/shared/features/autocompletes/activity-statuses-autocomplete/activity-statuses-autocomplete.types";

export function ActivityStatusesAutocomplete({
  selectedActivityStatus,
  onSelect,
  ...selectProps
}: ActivityStatusesAutocompleteProps) {
  const { t } = useTranslation("common");

  const activityStatusItems: MenuItemPort<ContributorActivityStatusesUnion>[] = useMemo(() => {
    const options: SelectPort<AnyType>["items"] = [
      {
        label: t("rewardedType.REWARDED"),
        id: RewardedFilterType.REWARDED,
      },
      {
        label: t("rewardedType.UNREWARDED"),
        id: RewardedFilterType.UNREWARDED,
      },
    ];
    return [...options];
  }, []);

  function handleSelect(ids: MenuItemId[]) {
    onSelect?.(ids as string[]);
  }

  return (
    <Select
      items={activityStatusItems}
      isAutoComplete={false}
      onSelect={handleSelect}
      selectedIds={selectedActivityStatus}
      disabledAutoOrdering
      {...selectProps}
      isMultiple
    />
  );
}
