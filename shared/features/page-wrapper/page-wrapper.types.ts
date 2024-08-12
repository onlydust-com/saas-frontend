import { PropsWithChildren } from "react";

import { SecondaryNavigationTypes } from "@/shared/features/navigation/secondary-navigation/secondary-navigation.types";

export interface PageWrapperProps extends PropsWithChildren {
  navigation?: SecondaryNavigationTypes;
}
