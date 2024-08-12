import { BreadcrumbsPort } from "@/design-system/atoms/breadcrumbs";
import { IconPort } from "@/design-system/atoms/icon";

export interface SecondaryNavigationProps {
  iconName: IconPort["name"];
  breadcrumbs: BreadcrumbsPort["items"];
  onBack?: () => void;
}
