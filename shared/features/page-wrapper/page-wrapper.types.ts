import { PropsWithChildren } from "react";

import { SecondaryNavigationProps } from "@/shared/features/navigation/secondary-navigation/secondary-navigation.types";

export interface PageWrapperProps extends PropsWithChildren {
  navigation?: SecondaryNavigationProps;
}
