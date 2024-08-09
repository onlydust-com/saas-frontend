import { AvatarPort } from "../../atoms/avatar";

interface Cta {
  text: string;
  href: string;
  isExternal?: boolean;
  avatar: AvatarPort;
}

export interface PlgBannerProps {
  title: string;
  subTitle: string;
  date: string;
  description: string;
  cta?: Cta;
}
