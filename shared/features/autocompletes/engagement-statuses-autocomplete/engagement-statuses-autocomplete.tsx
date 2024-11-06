import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { ContributorEngagementStatus, ContributorEngagementStatusesUnion } from "@/core/domain/bi/models/bi.types";
import { AnyType } from "@/core/kernel/types";

import { MenuItemId, MenuItemPort } from "@/design-system/molecules/menu-item";
import { Select, SelectPort } from "@/design-system/molecules/select";

import { EngagementStatusesAutocompleteProps } from "@/shared/features/autocompletes/engagement-statuses-autocomplete/engagement-statuses-autocomplete.types";

export function EngagementStatusesAutocomplete({
  selectedEngagementStatus,
  onSelect,
  ...selectProps
}: EngagementStatusesAutocompleteProps) {
  const { t } = useTranslation("common");

  const activityStatusItems: MenuItemPort<ContributorEngagementStatusesUnion>[] = useMemo(() => {
    const options: SelectPort<AnyType>["items"] = [
      {
        label: t("contributorEngagementStatus.NEW"),
        id: ContributorEngagementStatus.NEW,
      },
      {
        label: t("contributorEngagementStatus.ACTIVE"),
        id: ContributorEngagementStatus.ACTIVE,
      },
      {
        label: t("contributorEngagementStatus.INACTIVE"),
        id: ContributorEngagementStatus.INACTIVE,
      },
      {
        label: t("contributorEngagementStatus.REACTIVATED"),
        id: ContributorEngagementStatus.REACTIVATED,
      },
      {
        label: t("contributorEngagementStatus.CHURNED"),
        id: ContributorEngagementStatus.CHURNED,
      },
    ];
    return [...options];
  }, []);

  function handleSelect(ids: MenuItemId<ContributorEngagementStatusesUnion>[]) {
    onSelect?.(ids);
  }

  return (
    <Select<ContributorEngagementStatusesUnion>
      items={activityStatusItems}
      isAutoComplete={false}
      onSelect={handleSelect}
      selectedIds={selectedEngagementStatus}
      disabledAutoOrdering
      {...selectProps}
      isMultiple
    />
  );
}
