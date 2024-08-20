import { ForwardedRef, forwardRef } from "react";

import { DateRangePickerNextUiAdapter } from "@/design-system/atoms/date-range-picker/adapters/next-ui/next-ui.adapter";
import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";

import { DateRangePickerPort } from "../date-range-picker.types";

export const DateRangePicker = forwardRef(function DateRangePicker(
  props: DateRangePickerPort,
  ref: ForwardedRef<HTMLInputElement>
) {
  return withComponentAdapter<DateRangePickerPort, HTMLInputElement>(DateRangePickerNextUiAdapter)(props, ref);
});
