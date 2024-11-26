import { Filter, Search } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Badge } from "@/design-system/atoms/badge";
import { Button } from "@/design-system/atoms/button/variants/button-default";
import { DateRangePicker } from "@/design-system/atoms/date-range-picker";
import { Icon } from "@/design-system/atoms/icon";
import { Input } from "@/design-system/atoms/input";
import { Popover } from "@/design-system/atoms/popover";
import { Typo } from "@/design-system/atoms/typo";
import { CheckboxButton } from "@/design-system/molecules/checkbox-button";

import { Translate } from "@/shared/translation/components/translate/translate";

import { HeaderProps } from "./header.types";

export function Header({
  filters: { types, dateRange, onDateRange, search, onSearch, count, isCleared, clear },
}: HeaderProps) {
  const { t } = useTranslation("panels");

  return (
    <div className="flex items-center justify-between gap-md">
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
            <div className="flex max-w-[360px] flex-col gap-lg">
              <div className="flex items-center justify-between gap-md">
                <Typo translate={{ token: "panels:transactions.filters.title" }} />

                {!isCleared ? (
                  <Button
                    onClick={clear}
                    size="sm"
                    variant="secondary"
                    translate={{ token: "panels:transactions.filters.clear" }}
                  />
                ) : null}
              </div>

              <div className="flex flex-col gap-lg">
                <Typo
                  size="xs"
                  color="secondary"
                  translate={{ token: "panels:transactions.filters.options.types.title" }}
                />

                <div className="flex flex-wrap items-center gap-xs">
                  {types.map((type, index) => (
                    <CheckboxButton key={`export-csv-type-${index}`} value={type.value} onChange={type.onChange}>
                      <Translate token={type.label} />
                    </CheckboxButton>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-lg">
                <Typo
                  size="xs"
                  color="secondary"
                  translate={{ token: "panels:transactions.filters.options.period.title" }}
                />

                <DateRangePicker value={dateRange} onChange={onDateRange} />
              </div>
            </div>
          )}
        </Popover.Content>
      </Popover>

      <Input
        name="searchTransactions"
        value={search}
        size="sm"
        onChange={e => onSearch(e.target.value)}
        startContent={<Icon component={Search} classNames={{ base: "text-text-2" }} />}
        placeholder={t("transactions.filters.options.search.placeholder")}
      />
    </div>
  );
}
