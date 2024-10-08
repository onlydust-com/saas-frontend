import { useMemo } from "react";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";

import { MenuItemId, MenuItemPort } from "@/design-system/molecules/menu-item";
import { Select } from "@/design-system/molecules/select";

import { ProjectRepoAutocompleteProps } from "@/shared/features/autocompletes/project-repo-autocomplete/project-repo-autocomplete.types";

export function ProjectRepoAutocomplete({
  selectedRepos,
  onSelect,
  projectSlug,
  ...selectProps
}: ProjectRepoAutocompleteProps) {
  const { data } = ProjectReactQueryAdapter.client.useGetProjectBySlug({
    pathParams: { slug: projectSlug ?? "" },
    options: {
      enabled: !!projectSlug,
    },
  });

  const reposItem: MenuItemPort[] = useMemo(() => {
    return (
      data?.getProjectRepos()?.map(repo => ({
        id: repo.id.toString(),
        label: repo.name,
        searchValue: repo.name,
      })) ?? []
    );
  }, [data]);

  function handleSelect(ids: MenuItemId[]) {
    onSelect?.(ids as string[]);
  }

  return (
    <Select
      items={reposItem}
      isAutoComplete={true}
      onSelect={handleSelect}
      selectedIds={selectedRepos}
      {...selectProps}
    />
  );
}
