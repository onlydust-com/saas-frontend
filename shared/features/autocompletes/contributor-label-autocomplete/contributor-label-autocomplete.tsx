import { useParams } from "next/navigation";
import { useMemo } from "react";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";

import { MenuItemId, MenuItemPort } from "@/design-system/molecules/menu-item";
import { Select } from "@/design-system/molecules/select";

import { ContributorLabelAutocompleteProps } from "@/shared/features/autocompletes/contributor-label-autocomplete/contributor-label-autocomplete.types";

export function ContributorLabelAutocomplete({
  selectedLabels,
  onSelect,
  ...selectProps
}: ContributorLabelAutocompleteProps) {
  const { projectSlug = "" } = useParams<{ projectSlug: string }>();
  const { data } = ProjectReactQueryAdapter.client.useGetProjectContributorLabels({
    pathParams: { projectIdOrSlug: projectSlug },
  });

  const labelsItem: MenuItemPort[] = useMemo(() => {
    return (
      data?.labels?.map(label => ({
        id: label.id,
        label: label.name,
        searchValue: label.name,
      })) ?? []
    );
  }, [data]);

  function handleSelect(ids: MenuItemId[]) {
    onSelect?.(ids as string[]);
  }

  return (
    <Select
      items={labelsItem}
      isAutoComplete={true}
      onSelect={handleSelect}
      selectedIds={selectedLabels}
      {...selectProps}
    />
  );
}
