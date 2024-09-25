import { useMemo, useState } from "react";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";

import { MenuItemId, MenuItemPort } from "@/design-system/molecules/menu-item";
import { Select } from "@/design-system/molecules/select";

import { ProjectAutocompleteProps } from "./project-autocomplete.types";

export function ProjectAutocomplete({ onSelect, selectedProjects, ...selectProps }: ProjectAutocompleteProps) {
  const [search, setSearch] = useState("");
  const { data, hasNextPage, fetchNextPage } = ProjectReactQueryAdapter.client.useGetProjects({
    queryParams: {
      search: search || undefined,
    },
  });

  const projects = useMemo(() => data?.pages.flatMap(({ projects }) => projects) ?? [], [data]);

  const projectsItem: MenuItemPort[] = useMemo(() => {
    return projects.map(project => ({
      id: project.id,
      label: project.name,
      searchValue: project.name,
      avatar: { src: project.logoUrl },
    }));
  }, [projects]);

  function handleSelect(ids: MenuItemId[]) {
    onSelect?.(ids as string[]);
  }

  return (
    <Select
      items={projectsItem}
      isAutoComplete={true}
      onSelect={handleSelect}
      hasNextPage={hasNextPage}
      onNextPage={fetchNextPage}
      selectedIds={selectedProjects}
      controlledAutoComplete={{
        value: search,
        onChange: setSearch,
      }}
      {...selectProps}
    />
  );
}
