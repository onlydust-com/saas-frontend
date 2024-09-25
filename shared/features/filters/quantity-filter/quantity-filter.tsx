import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { QuantityFilterType } from "@/core/kernel/filters/filters-facade-port";
import { AnyType } from "@/core/kernel/types";

import { Input } from "@/design-system/atoms/input";
import { Select, SelectPort } from "@/design-system/molecules/select";

import { QuantityFilterProps } from "./quantity-filter.types";

export function QuantityFilter({ value: _value, onChange, name, unit }: QuantityFilterProps) {
  const { t } = useTranslation("common");
  const options: SelectPort<AnyType>["items"] = [
    {
      label: t("quantityFilterType.GREATER_THAN_OR_EQUAL"),

      id: QuantityFilterType.GREATER_THAN_OR_EQUAL,
    },
    {
      label: t("quantityFilterType.EQUAL"),
      id: QuantityFilterType.EQUAL,
    },
    {
      label: t("quantityFilterType.LESS_THAN_OR_EQUAL"),
      id: QuantityFilterType.LESS_THAN_OR_EQUAL,
    },
  ];

  const value = useMemo(
    () => ({
      type: _value?.type ?? QuantityFilterType.EQUAL,
      amount: _value?.amount ?? {
        eq: undefined,
        gte: undefined,
        lte: undefined,
      },
    }),
    [_value]
  );

  function onValueChange(newValue: string) {
    const newAmount = {
      eq: value.type === "EQUAL" ? parseInt(newValue) : undefined,
      gte: value.type === "GREATER_THAN_OR_EQUAL" ? parseInt(newValue) : undefined,
      lte: value.type === "LESS_THAN_OR_EQUAL" ? parseInt(newValue) : undefined,
    };

    onChange?.({ type: value.type, amount: newAmount });
  }

  function onTypeChange(selected: string[]) {
    const amount = Object.values(value.amount).find(v => v !== undefined);
    const newAmount = {
      eq: selected[0] === "EQUAL" ? amount : undefined,
      gte: selected[0] === "GREATER_THAN_OR_EQUAL" ? amount : undefined,
      lte: selected[0] === "LESS_THAN_OR_EQUAL" ? amount : undefined,
    };

    onChange?.({ type: selected[0] as QuantityFilterType, amount: newAmount });
  }

  const amount = useMemo(() => {
    if (value?.type === "EQUAL") return value.amount.eq;
    if (value?.type === "LESS_THAN_OR_EQUAL") return value.amount.lte;
    if (value?.type === "GREATER_THAN_OR_EQUAL") return value.amount.eq;
  }, [value]);

  return (
    <div className={"flex flex-row items-center justify-start gap-md"}>
      <Select
        selectedIds={value.type ? [value.type] : []}
        name={`${name}-quantity-type`}
        items={options}
        size={"sm"}
        onSelect={onTypeChange}
        closeOnSelect={true}
        classNames={{ base: "w-full" }}
      />
      <Input
        name={`${name}-quantity-value`}
        value={amount || amount === 0 ? `${amount}` : undefined}
        onChange={e => onValueChange(e.target.value)}
        type={"number"}
        size={"sm"}
        classNames={{ base: "flex-1" }}
        endContent={unit ? unit : null}
      />
    </div>
  );
}
