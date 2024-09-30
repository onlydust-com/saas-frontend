import { useMemo, useState } from "react";

import { UserReactQueryAdapter } from "@/core/application/react-query-adapter/user";
import { SearchUsersModel } from "@/core/domain/user/user-contract.types";

import { MenuItemId, MenuItemPort } from "@/design-system/molecules/menu-item";
import { isMenuItemAvatar } from "@/design-system/molecules/menu-item/menu-item.utils";
import { Select } from "@/design-system/molecules/select";

import { GithubUserAutocompleteProps } from "./github-user-autocomplete.types";

export function GithubUserAutocomplete({
  withExternalUser = false,
  withInternalUserOnly = false,
  withExternalUserOnly = false,
  selectedUser,
  onSelect,
  ...selectProps
}: GithubUserAutocompleteProps) {
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
  ): MenuItemPort<number>[] => {
    return users.map(user => ({
      id: user.githubUserId,
      label: user.login,
      searchValue: user.login,
      avatar: { src: user.avatarUrl },
    }));
  };

  const usersItem: MenuItemPort<number>[] = useMemo(() => {
    return [
      ...createMenuItems(data?.internalContributors || []),
      ...(withExternalUser ? createMenuItems(data?.externalContributors || []) : []),
    ];
  }, [data, withExternalUser]);

  function handleSelect(ids: MenuItemId<number>[]) {
    const users = usersItem.filter(user => ids.includes(user.id));
    onSelect?.(
      ids,
      users?.map(user => ({
        ...user,
        label: user.label ?? "",
        avatar: isMenuItemAvatar(user) ? { src: user.avatar?.src } : { src: "" },
      }))
    );
  }

  return (
    <Select<number>
      items={usersItem}
      isAutoComplete={true}
      onSelect={handleSelect}
      selectedIds={selectedUser}
      controlledAutoComplete={{
        value: search,
        onChange: setSearch,
      }}
      {...selectProps}
    />
  );
}
