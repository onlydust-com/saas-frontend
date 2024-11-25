import { Filter, Search } from "lucide-react";
import { useTranslation } from "react-i18next";

import { useTransactionsContext } from "@/app/financials/[sponsorId]/_views/financial/transactions-sidepanel/context/transactions.context";
import { TransactionsContextFilterTypes } from "@/app/financials/[sponsorId]/_views/financial/transactions-sidepanel/context/transactions.context.types";

import { Badge } from "@/design-system/atoms/badge";
import { Button } from "@/design-system/atoms/button/variants/button-default";
import { DateRangePicker, DateRangePickerValue } from "@/design-system/atoms/date-range-picker";
import { Icon } from "@/design-system/atoms/icon";
import { Input } from "@/design-system/atoms/input";
import { Popover } from "@/design-system/atoms/popover";
import { Typo } from "@/design-system/atoms/typo";
import { CheckboxButton } from "@/design-system/molecules/checkbox-button";

import { Translate } from "@/shared/translation/components/translate/translate";

export function Header() {
  const { t } = useTranslation("financials");

  const {
    filters: {
      count,
      set,
      clear,
      isCleared,
      values: { search, types, dateRange },
      options: { types: typesOptions },
    },
  } = useTransactionsContext();

  function handleSearch(value: string) {
    set({ search: value });
  }

  function handleTypes(newType: TransactionsContextFilterTypes, checked: boolean) {
    if (checked) {
      set({ types: [...types, newType] });
    } else {
      set({ types: types.filter(type => type !== newType) });
    }
  }

  function handleDateRange(value: DateRangePickerValue) {
    set({ dateRange: value });
  }

  return (
    <div className="flex items-center justify-between gap-2">
      <Popover>
        <Popover.Trigger>
          {() => (
            <div>
              <Button
                variant={count ? "primary" : "secondary"}
                size="sm"
                startIcon={{ component: Filter }}
                iconOnly={!count}
                endContent={
                  count ? (
                    <Badge
                      size="sm"
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
            <div className="flex max-w-[360px] flex-col gap-3">
              <div className="flex items-center justify-between gap-2">
                <Typo translate={{ token: "financials:transactionPanel.filters.title" }} />

                {!isCleared ? (
                  <Button
                    onClick={clear}
                    size="sm"
                    variant="secondary"
                    translate={{ token: "financials:transactionPanel.filters.clear" }}
                  />
                ) : null}
              </div>

              <div className="flex flex-col gap-3">
                <Typo
                  size="xs"
                  color="secondary"
                  translate={{ token: "financials:transactionPanel.filters.options.types.title" }}
                />

                <div className="flex flex-wrap gap-1">
                  {typesOptions.map(type => (
                    <CheckboxButton
                      key={type}
                      value={types.includes(type)}
                      onChange={checked => handleTypes(type, checked)}
                    >
                      <Translate token={`financials:transactionPanel.filters.options.types.choices.${type}`} />
                    </CheckboxButton>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <Typo
                  size="xs"
                  color="secondary"
                  translate={{ token: "financials:transactionPanel.filters.options.period.title" }}
                />

                <DateRangePicker value={dateRange} onChange={handleDateRange} />
              </div>
            </div>
          )}
        </Popover.Content>
      </Popover>

      <Input
        name={"searchTransactions"}
        value={search}
        size={"sm"}
        onChange={e => handleSearch(e.target.value)}
        startContent={<Icon component={Search} classNames={{ base: "text-text-2" }} />}
        placeholder={t("transactionPanel.transactions.search.placeholder")}
      />
    </div>
  );
}
