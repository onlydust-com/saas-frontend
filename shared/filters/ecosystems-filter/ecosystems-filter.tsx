import { useMemo, useState } from "react";

import { EcosystemReactQueryAdapter } from "@/core/application/react-query-adapter/ecosystem";

import { Avatar, AvatarImage } from "@/shared/ui/avatar";
import { Combobox, ComboboxProps } from "@/shared/ui/combobox";

import { EcosystemsFilterProps } from "./ecosystems-filter.types";

export function EcosystemsFilter({ ecosystemsIds, onSelect }: EcosystemsFilterProps) {
  const [search, setSearch] = useState("");
  const { data, hasNextPage, fetchNextPage, isLoading } = EcosystemReactQueryAdapter.client.useSearchEcosystems({
    queryParams: {
      search: search || undefined,
    },
  });

  const ecosystems = useMemo(() => data?.pages.flatMap(({ ecosystems }) => ecosystems) ?? [], [data]);

  const options: ComboboxProps<string>["options"] = useMemo(() => {
    return (
      ecosystems.map(ecosystem => ({
        value: ecosystem.id,
        label: ecosystem.name,
        keywords: [ecosystem.name],
        startContent: (
          <Avatar className="size-4">
            <AvatarImage src={ecosystem.logoUrl} />
          </Avatar>
        ),
      })) ?? []
    );
  }, [data]);

  return (
    <Combobox
      options={options}
      value={ecosystemsIds}
      onChange={onSelect}
      search={{ value: search, onChange: setSearch }}
      selectedLabel="ecosystems"
      placeholder="Select ecosystems"
      pagination={{
        hasNextPage,
        onNextPage: fetchNextPage,
        loading: isLoading,
      }}
    />
  );
}
