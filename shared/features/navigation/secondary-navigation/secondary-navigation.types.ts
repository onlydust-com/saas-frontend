import { LucideIcon } from "lucide-react";

import { BreadcrumbsPort } from "@/design-system/atoms/breadcrumbs";

export interface SecondaryNavigationProps {
  icon: LucideIcon;
  breadcrumbs: BreadcrumbsPort["items"];
  onBack?: () => void;
}
