import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { RewardedFilterType } from "@/core/kernel/filters/filters-facade-port";
import { AnyType } from "@/core/kernel/types";

import { MenuItemId, MenuItemPort } from "@/design-system/molecules/menu-item";
import { Select, SelectPort } from "@/design-system/molecules/select";

import { RewardedAutocompleteProps } from "@/shared/features/autocompletes/rewarded-autocomplete/rewarded-autocomplete.types";

export function RewardedAutocomplete({ selectedRewardedType, onSelect, ...selectProps }: RewardedAutocompleteProps) {
  const { t } = useTranslation("common");

  const rewardedTypesItems: MenuItemPort[] = useMemo(() => {
    const options: SelectPort<AnyType>["items"] = [
      {
        label: t("rewardedType.ALL"),
        id: RewardedFilterType.ALL,
      },
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSelect(ids: MenuItemId[]) {
    onSelect?.(ids as string[]);
  }

  return (
    <Select
      items={rewardedTypesItems}
      isAutoComplete={true}
      onSelect={handleSelect}
      selectedIds={selectedRewardedType}
      disabledAutoOrdering
      {...selectProps}
    />
  );
}
