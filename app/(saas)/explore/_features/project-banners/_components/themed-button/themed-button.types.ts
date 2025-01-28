import { AnyType } from "@/core/kernel/types";

import { ButtonSolidPort } from "@/design-system/atoms/button/button.types";

export interface ThemedButtonProps extends ButtonSolidPort<AnyType> {
  bannerTheme: "light" | "dark";
}
