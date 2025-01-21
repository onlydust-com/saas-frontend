import { PropsWithChildren } from "react";

export interface PageWrapperProps extends PropsWithChildren {
  containerSize: "large" | "medium" | "small";
  shouldScroll?: boolean;
}
