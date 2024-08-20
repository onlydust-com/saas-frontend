import { TagPort } from "@/design-system/atoms/tag";

interface Category {
  name: string;
  iconSlug: string;
}

export interface ProjectCategoriesGroupProps {
  categories: Category[];
  maxCategories?: number;
  className?: string;
  tagProps?: TagPort<"div">;
}
