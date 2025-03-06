import { PropsWithChildren } from "react";

export interface CategoriesFilterProps {
  categoriesIds: string[];
  onSelect: (categoriesIds: string[]) => void;
}
