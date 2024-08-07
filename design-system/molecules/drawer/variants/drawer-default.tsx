import { ElementType } from "react";

import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";
import { DrawerNextUiAdapter } from "@/design-system/molecules/drawer/adapters/next-ui/next-ui.adapter";

import { withClientOnly } from "@/shared/components/client-only/client-only";

import { DrawerPort } from "../drawer.types";

function DrawerClientOnly<C extends ElementType = "div">(props: DrawerPort<C>) {
  return withComponentAdapter<DrawerPort<C>>(DrawerNextUiAdapter)(props);
}

export const Drawer = withClientOnly(DrawerClientOnly);
