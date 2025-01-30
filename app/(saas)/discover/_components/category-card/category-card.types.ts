import { ProjectCategory } from "@/core/domain/project-category/models/project-category-model";

export interface CategoryCardProps {
  category: ProjectCategory;
  onClick?: () => void;
  className?: string;
}
