import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";

import { SkeletonNextUiAdapter } from "../adapters/next-ui/next-ui.adapter";
import { SkeletonPort } from "../skeleton.types";

export function Skeleton(props: SkeletonPort) {
  return withComponentAdapter<SkeletonPort>(SkeletonNextUiAdapter)(props);
}
