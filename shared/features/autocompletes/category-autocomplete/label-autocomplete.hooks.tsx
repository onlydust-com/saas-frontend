import { useMemo } from "react";

import { MenuItemPort } from "@/design-system/molecules/menu-item";

export function useLabelAutocomplete() {
  // TODO retrieve labels data with dedicated query hook
  // Temp mock data
  const data = {
    labels: [
      { id: "item1", name: "Item 1" },
      { id: "item2", name: "Item 2" },
      { id: "item3", name: "Item 3" },
    ],
  };

  const labelsItem: MenuItemPort[] = useMemo(() => {
    return (
      data?.labels?.map(label => ({
        id: label.id,
        label: label.name,
        searchValue: label.name,
      })) ?? []
    );
  }, [data]);

  return { labelsItem };
}
