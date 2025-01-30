import { RemixIconsName } from "@/design-system/atoms/icon/adapters/remix-icon/remix-icon-names.types";

export interface CategoryCardProps {
  title: string;
  description: string;
  icon: RemixIconsName;
  projectCount: number;
  color: string;
}
