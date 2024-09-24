import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { UserFilterType } from "@/core/kernel/filters/filters-facade-port";
import { AnyType } from "@/core/kernel/types";

import { MenuItemId, MenuItemPort } from "@/design-system/molecules/menu-item";
import { Select, SelectPort } from "@/design-system/molecules/select";

import { UserTypeAutocompleteProps } from "@/shared/features/autocompletes/user-type-autocomplete/user-type-autocomplete.types";

export function UserTypeAutocomplete({ selectedUserType, onSelect, ...selectProps }: UserTypeAutocompleteProps) {
  const { t } = useTranslation("common");
  const [search, setSearch] = useState("");

  const filteredUserType = useMemo(() => {
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
    return options.filter(
      option => typeof option.label === "string" && option.label.toLowerCase().includes(search.toLowerCase())
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const userTypesItems: MenuItemPort[] = useMemo(() => {
    return [...filteredUserType];
  }, [filteredUserType]);

  function handleSelect(ids: MenuItemId[]) {
    onSelect?.(ids as string[]);
  }

  return (
    <Select
      items={userTypesItems}
      isAutoComplete={true}
      onSelect={handleSelect}
      selectedIds={selectedUserType}
      controlledAutoComplete={{
        value: search,
        onChange: setSearch,
      }}
      {...selectProps}
    />
  );
}
