import { useMemo } from "react";

import { LabelSelectorProps } from "@/app/(saas)/manage-projects/[projectSlug]/contributors/_features/contributors-table/_features/label-selector/label-selector.types";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";

import { MenuItemPort } from "@/design-system/molecules/menu-item";
import { Select } from "@/design-system/molecules/select";

export function LabelSelector({ selectedLabels, onAction, projectSlug }: LabelSelectorProps) {
  const { data } = ProjectReactQueryAdapter.client.useGetProjectContributorLabels({
    pathParams: { projectIdOrSlug: projectSlug },
  });

  const labelsItem: MenuItemPort[] = useMemo(() => {
    return (
      data?.labels?.map(label => ({
        id: label.id,
        label: label.name,
        searchValue: label.name,
        isCheckbox: true,
        mixed: selectedLabels?.find(selectedLabel => selectedLabel.id === label.id)?.mixed,
      })) ?? []
    );
  }, [data, selectedLabels]);

  function handleAction(id: string) {
    if (selectedLabels?.find(selectedLabel => selectedLabel.id === id)) {
      onAction?.(id, false, false);
    } else {
      onAction?.(id, true, false);
    }
  }

  return (
    <Select
      name={"label-selector"}
      items={labelsItem}
      isAutoComplete={true}
      selectedIds={selectedLabels?.map(label => label.id)}
      isPopover={false}
      isMultiple={true}
      onAction={handleAction}
      disabledAutoOrdering={true}
    />
  );
}
