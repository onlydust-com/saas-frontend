import { ForwardedRef, forwardRef } from "react";

import { InputDefaultAdapter } from "@/design-system/atoms/input/adapters/default/default.adapter";
import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";

import { InputPort } from "../input.types";

export const Input = forwardRef(function Input(props: InputPort, ref: ForwardedRef<HTMLInputElement>) {
  return withComponentAdapter<InputPort, HTMLInputElement>(InputDefaultAdapter)(props, ref);
});
