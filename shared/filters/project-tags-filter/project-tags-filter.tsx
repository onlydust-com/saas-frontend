import { useMemo } from "react";

import { PROJECT_TAG, PROJECT_TAG_METADATA, ProjectTagUnion } from "@/shared/constants/project-tags";
import { Combobox, ComboboxProps } from "@/shared/ui/combobox";

import { ProjectTagsFilterProps } from "./project-tags-filter.types";

export function ProjectTagsFilter({ tags, onSelect }: ProjectTagsFilterProps) {
  const options: ComboboxProps<ProjectTagUnion>["options"] = useMemo(() => {
    return (
      Object.values(PROJECT_TAG)?.map(tag => ({
        value: tag,
        label: PROJECT_TAG_METADATA[tag].label,
        keywords: [PROJECT_TAG_METADATA[tag].label],
      })) ?? []
    );
  }, []);

  return <Combobox options={options} value={tags} onChange={onSelect} selectedLabel="tags" placeholder="Select tags" />;
}
