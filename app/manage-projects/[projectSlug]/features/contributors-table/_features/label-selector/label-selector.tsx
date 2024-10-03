import { useParams } from "next/navigation";
import { useMemo } from "react";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";

import { MenuItemPort } from "@/design-system/molecules/menu-item";
import { Select } from "@/design-system/molecules/select";

import { LabelSelectorProps } from "./label-selector.types";

export function LabelSelector({ selectedLabels, onAction }: LabelSelectorProps) {
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
    />
  );
}
