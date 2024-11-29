"use client";

import { withAuthenticationRequired } from "@auth0/auth0-react";
import { useState } from "react";

import { ResultGroup } from "@/app/pocs/search/components/result-group/result-group";
import { SearchBar } from "@/app/pocs/search/components/search-bar/search-bar";

import { SearchReactQueryAdapter } from "@/core/application/react-query-adapter/search";
import { SearchIndice } from "@/core/domain/search/search-contract.types";

import { withClientOnly } from "@/shared/components/client-only/client-only";

export function PocSearch() {
  const [inputValue, setInputValue] = useState<string | null>(null);
  const { data } = SearchReactQueryAdapter.client.useSearch({
    queryParams: {
      search: inputValue ?? undefined,
    },
    options: {
      enabled: !!inputValue,
    },
  });

  function onSearch(value: string | null) {
    setInputValue(value);
  }

  const groups = Object.keys(data?.groups ?? {}).map(item => ({
    data: data?.groups[item as SearchIndice],
    indice: item as SearchIndice,
  }));

  return (
    <div className={"flex w-full flex-row items-start justify-center py-2md"}>
      <div className={"w-full max-w-[600px]"}>
        <SearchBar
          value={inputValue}
          onChange={onSearch}
          prediction={inputValue ? data?.autoComplete?.getName() : undefined}
        >
          {groups.map(item => (
            <ResultGroup data={item.data} indice={item.indice} key={item?.indice} />
          ))}
        </SearchBar>
      </div>
    </div>
  );
}

export default withClientOnly(withAuthenticationRequired(PocSearch));
