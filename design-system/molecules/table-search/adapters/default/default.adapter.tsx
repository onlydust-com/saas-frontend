"use client";

import { Search } from "lucide-react";
import { ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import { useDebounce } from "react-use";

import { Input } from "@/design-system/atoms/input";

import { cn } from "@/shared/helpers/cn";

import { TableSearchPort } from "../../table-search.types";
import { TableSearchDefaultVariants } from "./default.variants";

export function TableSearchDefaultAdapter({
  classNames,
  value,
  onChange,
  onDebouncedChange,
  inputProps,
}: TableSearchPort) {
  const { t } = useTranslation("table");
  const slots = TableSearchDefaultVariants();

  useDebounce(
    () => {
      onDebouncedChange(value);
    },
    300,
    [value]
  );

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    onChange(value);
  }

  return (
    <Input
      {...(inputProps ?? {})}
      name={"table-search"}
      placeholder={t("tableSearch.placeholder")}
      startIcon={{ component: Search }}
      classNames={{ base: cn(slots.base(), classNames?.base) }}
      value={value}
      onChange={handleChange}
    />
  );
}
