import { QuantityFilterType } from "@/core/kernel/filters/filters-facade-port";

type Amount = { gte?: number; eq?: number; lte?: number };

export function getQuantityFilterType(amount?: Amount) {
  if (amount?.gte) {
    return QuantityFilterType.GREATER_THAN_OR_EQUAL;
  }

  if (amount?.lte) {
    return QuantityFilterType.LESS_THAN_OR_EQUAL;
  }
  return QuantityFilterType.EQUAL;
}

export function getQuantityFilterAmount(amount?: Amount) {
  if (amount?.gte || amount?.lte || amount?.eq) {
    return amount;
  }

  return undefined;
}

export function getQuantityFilterTypeFromArray(amounts: Array<Amount | undefined>) {
  const types = amounts.map(amount => {
    if (amount) {
      return getQuantityFilterType(amount);
    }

    return undefined;
  });

  return types.find(type => type !== undefined) ?? QuantityFilterType.EQUAL;
}

export function getQuantityFilterAmountFromArray(amounts: Array<Amount | undefined>) {
  const types = amounts.map(amount => {
    if (amount) {
      return getQuantityFilterAmount(amount);
    }
    return undefined;
  });

  return types.find(type => type !== undefined) ?? undefined;
}
