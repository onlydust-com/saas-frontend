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
  withIsRegistered = false,
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
      isRegistered: withIsRegistered,
    },
  });

  const createMenuItems = (
    users: SearchUsersModel["internalContributors"] | SearchUsersModel["externalContributors"]
  ): MenuItemPort<string>[] => {
    return users.map(user => ({
      id: user.id || "",
      label: user.login,
      login: user.login,
      searchValue: user.login,
      avatar: { src: user.avatarUrl },
      avatarUrl: user.avatarUrl,
    }));
  };

  const usersItem: MenuItemPort<string>[] = useMemo(() => {
    return [
      ...createMenuItems(data?.internalContributors || []),
      ...(withExternalUser ? createMenuItems(data?.externalContributors || []) : []),
    ].filter(user => !selectedUser?.includes(user.id));
  }, [data, withExternalUser, selectedUser]);

  function handleSelect(ids: MenuItemId<string>[]) {
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
    <Select<string>
      items={usersItem}
      isAutoComplete={true}
      onSelect={handleSelect}
      controlledAutoComplete={{
        value: search,
        onChange: setSearch,
      }}
      {...selectProps}
    />
  );
}
