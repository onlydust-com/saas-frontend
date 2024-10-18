import { useMemo } from "react";

import { CurrencyReactQueryAdapter } from "@/core/application/react-query-adapter/currency";

import { MenuItemId, MenuItemPort } from "@/design-system/molecules/menu-item";
import { Select } from "@/design-system/molecules/select";

import { CurrencyAutocompleteProps } from "@/shared/features/autocompletes/currency-autocomplete/currency-autocomplete.types";

export function CurrencyAutocomplete({ selectedCurrencies, onSelect, ...selectProps }: CurrencyAutocompleteProps) {
  const { data } = CurrencyReactQueryAdapter.client.useGetSupportedCurrencies({});

  const currenciesItem: MenuItemPort[] = useMemo(() => {
    return (
      data?.currencies?.map(currency => ({
        id: currency.id,
        label: currency.name,
        searchValue: currency.name,
        avatar: { src: currency.logoUrl },
      })) ?? []
    );
  }, [data]);

  function handleSelect(ids: MenuItemId[]) {
    onSelect?.(ids as string[]);
  }

  return (
    <Select
      items={currenciesItem}
      isAutoComplete={true}
      onSelect={handleSelect}
      selectedIds={selectedCurrencies}
      {...selectProps}
    />
  );
}
