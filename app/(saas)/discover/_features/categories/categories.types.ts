import { IconPort } from "@/design-system/atoms/icon";

export interface Category {
  id: string;
  title: string;
  description: string;
  icon: IconPort;
  count: number;
}

export interface CategoriesSectionProps {
  categories: Category[];
}
