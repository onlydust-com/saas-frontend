import { IconType } from "react-icons";

export interface Category {
  id: string;
  title: string;
  description: string;
  icon: IconType;
  count: number;
}

export interface CategoriesSectionProps {
  categories: Category[];
} 