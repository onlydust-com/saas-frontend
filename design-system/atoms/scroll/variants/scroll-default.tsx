import { ForwardedRef, forwardRef } from "react";

import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";

import { ScrollDefaultAdapter } from "../adapters/default/default.adapter";
import { ScrollPort } from "../scroll.types";

export const Scroll = forwardRef(function Scroll(props: ScrollPort, ref: ForwardedRef<HTMLDivElement>) {
  return withComponentAdapter<ScrollPort, HTMLDivElement>(ScrollDefaultAdapter)(props, ref);
});
