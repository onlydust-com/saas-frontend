import { BreadcrumbsPort } from "@/design-system/atoms/breadcrumbs";
import { IconPort } from "@/design-system/atoms/icon";

export interface SecondaryNavigationProps {
  iconProps: IconPort;
  breadcrumbs: BreadcrumbsPort["items"];
  onBack?: () => void;
}
