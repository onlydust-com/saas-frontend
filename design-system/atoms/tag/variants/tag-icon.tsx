import { ElementType } from "react";

import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";

import { TagDefaultAdapter } from "../adapters/default/default.adapter";
import { TagIconPort } from "../tag.types";

export function TagIcon<C extends ElementType = "span">({ icon: Icon, iconProps, ...props }: TagIconPort<C>) {
  return withComponentAdapter<Omit<TagIconPort<C>, "icon">>(TagDefaultAdapter)({
    ...props,
    startContent: <Icon {...iconProps} />,
  });
}
