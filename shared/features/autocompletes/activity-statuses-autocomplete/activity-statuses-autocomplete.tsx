import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { ContributorActivityStatus, ContributorActivityStatusesUnion } from "@/core/domain/bi/models/bi.types";
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
        label: t("contributorActivityStatus.NEW"),
        id: ContributorActivityStatus.NEW,
      },
      {
        label: t("contributorActivityStatus.ACTIVE"),
        id: ContributorActivityStatus.ACTIVE,
      },
      {
        label: t("contributorActivityStatus.INACTIVE"),
        id: ContributorActivityStatus.INACTIVE,
      },
      {
        label: t("contributorActivityStatus.REACTIVATED"),
        id: ContributorActivityStatus.REACTIVATED,
      },
      {
        label: t("contributorActivityStatus.CHURNED"),
        id: ContributorActivityStatus.CHURNED,
      },
    ];
    return [...options];
  }, []);

  function handleSelect(ids: MenuItemId<ContributorActivityStatusesUnion>[]) {
    onSelect?.(ids);
  }

  return (
    <Select<ContributorActivityStatusesUnion>
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
