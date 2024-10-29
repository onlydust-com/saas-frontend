import { useMemo, useState } from "react";

import { UserReactQueryAdapter } from "@/core/application/react-query-adapter/user";
import { SearchUsersModel } from "@/core/domain/user/user-contract.types";

import { MenuItemId, MenuItemPort } from "@/design-system/molecules/menu-item";
import { Select } from "@/design-system/molecules/select";

import { UserUuidAutocompleteProps } from "./user-uuid-autocomplete.types";

export function UserUuidAutocomplete({
  selectedUser,
  onSelect,
  initialUsers,
  ...selectProps
}: UserUuidAutocompleteProps) {
  const [search, setSearch] = useState("");
  const { data } = UserReactQueryAdapter.client.useSearchUser({
    queryParams: {
      login: search || undefined,
      internalSearchOnly: true,
    },
  });

  const createMenuItems = (users: SearchUsersModel["internalContributors"]): MenuItemPort[] => {
    return users.map(user => ({
      id: user.id ?? "",
      label: user.login,
      searchValue: user.login,
      avatar: { src: user.avatarUrl },
      isDisabled: !user.id,
    }));
  };

  const usersItem: MenuItemPort[] = useMemo(() => {
    return createMenuItems(data?.internalContributors || []);
  }, [data]);

  function handleSelect(ids: MenuItemId[]) {
    onSelect?.(ids as string[]);
  }

  return (
    <Select
      items={usersItem}
      isAutoComplete={true}
      onSelect={handleSelect}
      selectedIds={selectedUser}
      initialItems={initialUsers}
      controlledAutoComplete={{
        value: search,
        onChange: setSearch,
      }}
      {...selectProps}
    />
  );
}
