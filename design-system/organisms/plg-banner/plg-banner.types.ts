import { RemixIconsName } from "@/design-system/atoms/icon/adapters/remix-icon/remix-icon-names.types";

interface Cta {
  text: string;
  href: string;
  isExternal?: boolean;
  icon?: RemixIconsName;
}

export interface PlgBannerProps {
  title: string;
  subTitle: string;
  date?: string;
  description: string;
  cta?: Cta;
}
