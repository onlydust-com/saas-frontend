import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { ContributionTypeUnion } from "@/core/domain/contribution/models/contribution.types";
import { ContributionFilterType } from "@/core/kernel/filters/filters-facade-port";
import { AnyType } from "@/core/kernel/types";

import { MenuItemId, MenuItemPort } from "@/design-system/molecules/menu-item";
import { Select, SelectPort } from "@/design-system/molecules/select";

import { ContributionTypeAutocompleteProps } from "@/shared/features/autocompletes/contribution-type-autocomplete/contribution-type-autocomplete.types";

export function ContributionTypeAutocomplete({
  selectedContributionType,
  onSelect,
  excludeContributionTypes,
  ...selectProps
}: ContributionTypeAutocompleteProps) {
  const { t } = useTranslation("common");

  function addContributionType(option: SelectPort<AnyType>["items"][0]): SelectPort<AnyType>["items"] {
    if (excludeContributionTypes?.includes(option.id)) return [];

    return [option];
  }

  const contributionTypesItems: MenuItemPort<ContributionTypeUnion>[] = useMemo(() => {
    const options: SelectPort<AnyType>["items"] = [
      ...addContributionType({
        label: t("contributionType.PULL_REQUEST"),
        id: ContributionFilterType.PULL_REQUEST,
      }),
      ...addContributionType({
        label: t("contributionType.CODE_REVIEW"),
        id: ContributionFilterType.CODE_REVIEW,
      }),
      ...addContributionType({
        label: t("contributionType.ISSUE"),
        id: ContributionFilterType.ISSUE,
      }),
    ];
    return [...options];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSelect(types: MenuItemId<ContributionTypeUnion>[]) {
    onSelect?.(types.length ? types : undefined);
  }

  return (
    <Select<ContributionTypeUnion>
      items={contributionTypesItems}
      isAutoComplete={true}
      onSelect={handleSelect}
      selectedIds={selectedContributionType}
      isMultiple
      {...selectProps}
    />
  );
}
