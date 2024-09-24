import { IconLucideAdapter } from "@/design-system/atoms/icon/adapters/lucide/lucide.adapter";
import { isRemixIcon } from "@/design-system/atoms/icon/icon.utils";
import { RemixIcon } from "@/design-system/atoms/icon/variants/icon-remix";
import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";

import { IconPort } from "../icon.types";

export function Icon(props: IconPort) {
  if (isRemixIcon(props)) {
    return <RemixIcon {...props} />;
  }

  return withComponentAdapter<IconPort>(IconLucideAdapter)(props);
}
