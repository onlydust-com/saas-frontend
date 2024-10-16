import { useMemo, useState } from "react";

import { UserReactQueryAdapter } from "@/core/application/react-query-adapter/user";
import { SearchUsersModel } from "@/core/domain/user/user-contract.types";

import { MenuItemId, MenuItemPort } from "@/design-system/molecules/menu-item";
import { Select } from "@/design-system/molecules/select";

import { UserAutocompleteProps } from "./user-autocomplete.types";

export function UserAutocomplete({
  withExternalUser = false,
  withInternalUserOnly = false,
  withExternalUserOnly = false,
  selectedUser,
  onSelect,
  initialUsers,
  ...selectProps
}: UserAutocompleteProps) {
  const [search, setSearch] = useState("");
  const { data } = UserReactQueryAdapter.client.useSearchUser({
    queryParams: {
      login: search || undefined,
      internalSearchOnly: withInternalUserOnly,
      externalSearchOnly: withExternalUserOnly,
    },
  });

  const createMenuItems = (
    users: SearchUsersModel["internalContributors"] | SearchUsersModel["externalContributors"]
  ): MenuItemPort[] => {
    return users
      .filter(user => user.githubUserId)
      .map(user => ({
        id: user.githubUserId.toString(),
        label: user.login,
        searchValue: user.login,
        avatar: { src: user.avatarUrl },
      }));
  };

  const usersItem: MenuItemPort[] = useMemo(() => {
    return [
      ...createMenuItems(data?.internalContributors || []),
      ...(withExternalUser ? createMenuItems(data?.externalContributors || []) : []),
    ];
  }, [data, withExternalUser]);

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
