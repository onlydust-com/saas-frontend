import { ValidationResult } from "@react-types/shared";
import { ReactNode } from "react";

import { bootstrap } from "@/core/bootstrap";

import { Translate } from "@/shared/translation/components/translate/translate";

export function getErrorMessage({
  validation,
  minValue,
  maxValue,
}: {
  validation: ValidationResult;
  minValue?: Date;
  maxValue?: Date;
}): ReactNode {
  const dateKernelPort = bootstrap.getDateKernelPort();

  if (!validation.isInvalid) return null;

  if (validation.validationDetails.rangeOverflow && validation.validationDetails.rangeUnderflow) {
    return <Translate token="dateRangePicker:errors.rangeReversed" />;
  }

  if (validation.validationDetails.rangeOverflow && maxValue) {
    return (
      <Translate
        token="dateRangePicker:errors.rangeOverflow"
        values={{
          date: dateKernelPort.format(maxValue, "MM/dd/yyyy"),
        }}
      />
    );
  }

  if (validation.validationDetails.rangeUnderflow && minValue) {
    return (
      <Translate
        token="dateRangePicker:errors.rangeUnderflow"
        values={{
          date: dateKernelPort.format(minValue, "MM/dd/yyyy"),
        }}
      />
    );
  }

  if (validation.validationDetails.badInput) {
    return <Translate token="dateRangePicker:errors.unavailableDate" />;
  }

  return <Translate token="dateRangePicker:errors.unavailableDate" />;
}
