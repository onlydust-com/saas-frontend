import { useMemo } from "react";
import Flag from "react-flagpack";

import { CountryReactQueryAdapter } from "@/core/application/react-query-adapter/country";

import { MenuItemId, MenuItemPort } from "@/design-system/molecules/menu-item";
import { Select } from "@/design-system/molecules/select";

import { CountryAutocompleteProps } from "@/shared/features/autocompletes/country-autocomplete/country-autocomplete.types";

export function CountryAutocomplete({ selectedCountries, onSelect, ...selectProps }: CountryAutocompleteProps) {
  const { data: data } = CountryReactQueryAdapter.client.useGetCountries({});

  const countriesItem: MenuItemPort[] = useMemo(() => {
    return (
      data?.countries?.map(country => ({
        id: country.code,
        label: (
          <div className="flex items-center gap-2">
            <Flag code={country.code} hasBorder={false} size={"m"} />
            <span>{country.code}</span>
          </div>
        ),
        searchValue: country.code,
      })) ?? []
    );
  }, [data]);

  function handleSelect(ids: MenuItemId[]) {
    onSelect?.(ids as string[]);
  }

  return (
    <Select
      items={countriesItem}
      isAutoComplete={true}
      onSelect={handleSelect}
      selectedIds={selectedCountries}
      {...selectProps}
    />
  );
}
