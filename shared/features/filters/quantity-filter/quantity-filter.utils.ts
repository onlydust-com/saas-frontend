import { QuantityFilterType } from "@/core/kernel/filters/filters-facade-port";

type Amount = { gte?: number; eq?: number; lte?: number };

export function getQuantityFilterType(amount?: Amount) {
  if (amount?.gte || amount?.gte === 0) {
    return QuantityFilterType.GREATER_THAN_OR_EQUAL;
  }

  if (amount?.lte || amount?.lte === 0) {
    return QuantityFilterType.LESS_THAN_OR_EQUAL;
  }
  return QuantityFilterType.EQUAL;
}

export function getQuantityFilterAmount({ gte, lte, eq }: Amount = {}) {
  if (gte || lte || eq) {
    return {
      gte,
      lte,
      eq,
    };
  }

  return undefined;
}
