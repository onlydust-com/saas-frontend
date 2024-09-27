import { useMemo, useState } from "react";

import { EcosystemReactQueryAdapter } from "@/core/application/react-query-adapter/ecosystem";

import { MenuItemId, MenuItemPort } from "@/design-system/molecules/menu-item";
import { Select } from "@/design-system/molecules/select";

import { EcosystemsAutocompleteProps } from "./ecosystems-autocomplete.types";

export function EcosystemsAutocomplete({
  onSelect,
  selectedEcosystems,
  initialEcosystems,
  ...selectProps
}: EcosystemsAutocompleteProps) {
  const [search, setSearch] = useState("");
  const { data, hasNextPage, fetchNextPage } = EcosystemReactQueryAdapter.client.useSearchEcosystem({
    queryParams: {
      search: search || undefined,
    },
  });

  const ecosystems = useMemo(() => data?.pages.flatMap(({ ecosystems }) => ecosystems) ?? [], [data]);

  const ecosystemsItem: MenuItemPort[] = useMemo(() => {
    return ecosystems.map(ecosystem => ({
      id: ecosystem.id,
      label: ecosystem.name,
      searchValue: ecosystem.name,
      avatar: { src: ecosystem.logoUrl },
    }));
  }, [ecosystems]);

  function handleSelect(ids: MenuItemId[]) {
    onSelect?.(ids as string[]);
  }

  return (
    <Select
      items={ecosystemsItem}
      isAutoComplete={true}
      onSelect={handleSelect}
      hasNextPage={hasNextPage}
      onNextPage={fetchNextPage}
      selectedIds={selectedEcosystems}
      controlledAutoComplete={{
        value: search,
        onChange: setSearch,
      }}
      initialItems={initialEcosystems}
      {...selectProps}
    />
  );
}
