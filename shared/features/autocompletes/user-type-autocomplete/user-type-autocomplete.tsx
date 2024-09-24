import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { UserFilterType } from "@/core/kernel/filters/filters-facade-port";
import { AnyType } from "@/core/kernel/types";

import { MenuItemId, MenuItemPort } from "@/design-system/molecules/menu-item";
import { Select, SelectPort } from "@/design-system/molecules/select";

import { UserTypeAutocompleteProps } from "@/shared/features/autocompletes/user-type-autocomplete/user-type-autocomplete.types";

export function UserTypeAutocomplete({ selectedUserType, onSelect, ...selectProps }: UserTypeAutocompleteProps) {
  const { t } = useTranslation("common");

  const userTypesItems: MenuItemPort[] = useMemo(() => {
    const options: SelectPort<AnyType>["items"] = [
      {
        label: t("userType.CONTRIBUTOR"),
        id: UserFilterType.CONTRIBUTOR,
      },
      {
        label: t("userType.MAINTAINER"),
        id: UserFilterType.MAINTAINER,
      },
      {
        label: t("userType.LEAD_PROGRAM"),
        id: UserFilterType.LEAD_PROGRAM,
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
      items={userTypesItems}
      isAutoComplete={true}
      onSelect={handleSelect}
      selectedIds={selectedUserType}
      {...selectProps}
    />
  );
}
