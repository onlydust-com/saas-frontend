import { CellBadge } from "@/shared/features/table/cell/cell-badge/cell-badge";

import { CellCategoriesProps } from "./cell-categories.types";

export function CellCategories({ categories }: CellCategoriesProps) {
  return (
    <CellBadge
      items={categories.map(category => ({
        content: category.name,
      }))}
    />
  );
}
