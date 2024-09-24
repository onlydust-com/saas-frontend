import { useTranslation } from "react-i18next";

import { QuantityFilterType } from "@/core/kernel/filters/filters-facade-port";
import { AnyType } from "@/core/kernel/types";

import { Input } from "@/design-system/atoms/input";
import { Typo } from "@/design-system/atoms/typo";
import { Select, SelectPort } from "@/design-system/molecules/select";

import { QuantityFilterProps } from "./quantity-filter.types";

export function QuantityFilter({
  value = {
    type: QuantityFilterType.EQUAL,
    amount: 0,
  },
  onChange,
  name,
  currency,
}: QuantityFilterProps) {
  const { t } = useTranslation("common");
  const { amount, type = QuantityFilterType.EQUAL } = value;
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

  function onValueChange(value: string) {
    onChange?.({ type, amount: parseInt(value) || 0 });
  }

  function onTypeChange(selected: string[]) {
    onChange?.({ type: selected[0] as QuantityFilterType, amount });
  }

  return (
    <div className={"flex flex-row items-center justify-start gap-md"}>
      <Select
        selectedIds={type ? [type] : []}
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
        endContent={
          currency ? (
            <Typo color={"tertiary"} size={"sm"}>
              {currency.code}
            </Typo>
          ) : null
        }
      />
    </div>
  );
}
