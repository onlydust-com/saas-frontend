import { useMemo } from "react";

import { LanguageReactQueryAdapter } from "@/core/application/react-query-adapter/language";

import { MenuItemId, MenuItemPort } from "@/design-system/molecules/menu-item";
import { Select } from "@/design-system/molecules/select";

import { LanguageAutocompleteProps } from "./language-autocomplete.types";

export function LanguageAutocomplete({ selectedLanguages, onSelect, ...selectProps }: LanguageAutocompleteProps) {
  const { data: data } = LanguageReactQueryAdapter.client.useGetLanguages({});

  const languagesItem: MenuItemPort[] = useMemo(() => {
    return (
      data?.languages?.map(language => ({
        id: language.id,
        label: language.name,
        searchValue: language.name,
        avatar: { src: language.logoUrl },
      })) ?? []
    );
  }, [data]);

  function handleSelect(ids: MenuItemId[]) {
    onSelect?.(ids as string[]);
  }

  return (
    <Select
      items={languagesItem}
      isAutoComplete={true}
      onSelect={handleSelect}
      selectedIds={selectedLanguages}
      {...selectProps}
    />
  );
}
