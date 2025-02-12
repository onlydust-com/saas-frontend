import { PropsWithChildren } from "react";

export interface ImageBannerProps extends PropsWithChildren {
  image?: string;
  className?: string;
  isLoading?: boolean;
}
