import { ArrowDownWideNarrow, ArrowUpNarrowWide, Download, Filter, Search } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Badge } from "@/design-system/atoms/badge";
import { Button } from "@/design-system/atoms/button/variants/button-default";
import { DateRangePicker } from "@/design-system/atoms/date-range-picker";
import { Icon, LucideIconPort } from "@/design-system/atoms/icon";
import { Input } from "@/design-system/atoms/input";
import { Popover } from "@/design-system/atoms/popover";
import { Typo } from "@/design-system/atoms/typo";
import { CheckboxButton } from "@/design-system/molecules/checkbox-button";

import { Translate } from "@/shared/translation/components/translate/translate";

import { SortDirection, TransactionsFiltersProps } from "./transactions-filters.types";

const sortIcons: Record<SortDirection, LucideIconPort> = {
  ASC: { component: ArrowDownWideNarrow },
  DESC: { component: ArrowUpNarrowWide },
};

export function TransactionsFilters({
  filters: { count, clear, isCleared },
  types,
  dateRange,
  onDateRange,
  sortDirection,
  onSort,
  search,
  onSearch,
  onOpenExport,
}: TransactionsFiltersProps) {
  const { t } = useTranslation("features");

  function handleSort() {
    onSort(sortDirection === SortDirection.ASC ? SortDirection.DESC : SortDirection.ASC);
  }

  return (
    <div className="flex items-center justify-between gap-md">
      <Popover>
        <Popover.Trigger>
          {() => (
            <div>
              <Button
                variant={count ? "primary" : "secondary"}
                size="sm"
                startIcon={{ component: Filter, classNames: { base: "text-components-buttons-button-secondary-fg" } }}
                iconOnly={!count}
                endContent={
                  count ? (
                    <Badge
                      size="xxs"
                      shape="rounded"
                      color={count ? "brand" : "grey"}
                      variant={count ? "solid" : "flat"}
                    >
                      {count}
                    </Badge>
                  ) : null
                }
              />
            </div>
          )}
        </Popover.Trigger>

        <Popover.Content>
          {() => (
            <div className="flex min-w-[250px] max-w-[360px] flex-col gap-lg">
              <div className="flex items-center justify-between gap-md">
                <Typo translate={{ token: "features:transactions.filters.title" }} />

                {!isCleared ? (
                  <Button
                    onClick={clear}
                    size="sm"
                    variant="secondary"
                    translate={{ token: "features:transactions.filters.clear" }}
                  />
                ) : null}
              </div>

              <div className="flex flex-col gap-lg">
                <Typo size="xs" color="secondary" translate={{ token: "features:transactions.filters.types.title" }} />

                <div className="flex flex-wrap gap-xs">
                  {types.map((type, index) => (
                    <CheckboxButton
                      key={`transaction-filter-type-${index}`}
                      value={types.includes(type)}
                      onChange={checked => type.onChange(checked)}
                    >
                      <Translate token={type.label} />
                    </CheckboxButton>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-lg">
                <Typo size="xs" color="secondary" translate={{ token: "features:transactions.filters.period.title" }} />

                <DateRangePicker value={dateRange} onChange={onDateRange} />
              </div>
            </div>
          )}
        </Popover.Content>
      </Popover>

      <Button
        variant={sortDirection ? "primary" : "secondary"}
        size="sm"
        iconOnly
        startIcon={{
          component: sortIcons[sortDirection].component,
          classNames: { base: "text-components-buttons-button-secondary-fg" },
        }}
        onClick={handleSort}
      />

      <Input
        name="searchTransactions"
        value={search}
        size="sm"
        onChange={e => onSearch(e.target.value)}
        startContent={<Icon component={Search} classNames={{ base: "text-foreground-tertiary" }} />}
        placeholder={t("transactions.filters.search.placeholder")}
      />

      <Button
        variant="secondary"
        size="sm"
        onClick={onOpenExport}
        translate={{
          token: "features:transactions.filters.export.button",
        }}
        endContent={<Icon component={Download} classNames={{ base: "text-components-buttons-button-secondary-fg" }} />}
      />
    </div>
  );
}
