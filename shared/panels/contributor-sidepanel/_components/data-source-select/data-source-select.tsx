import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { MenuItemId, MenuItemPort } from "@/design-system/molecules/menu-item";
import { Select } from "@/design-system/molecules/select";

import { DataSourceSelectProps, DateSourceSelect } from "./data-source-select.types";

export function DataSourceSelect({
  user,
  onSelect,
  selectedProjects,
  selectedSource,
  ...selectProps
}: DataSourceSelectProps) {
  const { t } = useTranslation();
  const items: MenuItemPort[] = useMemo(() => {
    const projects =
      user?.projects?.map(project => ({
        id: project.id,
        label: project.name,
        searchValue: project.name,
      })) ?? [];

    const dataSource: MenuItemPort[] = [
      {
        id: DateSourceSelect.ALL,
        label: t("panels:contributor.timeline.filter.all"),
        searchValue: "all",
      },
      {
        id: DateSourceSelect.ONLYDUST,
        label: t("panels:contributor.timeline.filter.internal"),
        searchValue: "onlydust",
      },
    ];

    return [...dataSource, ...projects];
  }, [user]);

  function handleSelect(ids: MenuItemId[]) {
    const projectsIds = ids.filter(id => id !== DateSourceSelect.ALL && id !== DateSourceSelect.ONLYDUST) as string[];
    const findSource = ids.filter(id => id === DateSourceSelect.ALL || id === DateSourceSelect.ONLYDUST);
    const sources = (findSource.at(-1) as DateSourceSelect) ?? undefined;
    onSelect?.(projectsIds, sources);
  }

  const selectedIds = useMemo(() => {
    const projects = selectedProjects || [];
    const source = selectedSource || DateSourceSelect.ALL;
    return [source, ...projects];
  }, [selectedProjects, selectedSource]);

  return (
    <Select items={items} isAutoComplete={true} onSelect={handleSelect} selectedIds={selectedIds} {...selectProps} />
  );
}
