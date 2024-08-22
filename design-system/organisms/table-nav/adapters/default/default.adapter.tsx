import { Search } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Input } from "@/design-system/atoms/input";
import { TableColumnList } from "@/design-system/molecules/table-column-list";
import { TableFilter } from "@/design-system/molecules/table-filter";
import { TableGroupBy } from "@/design-system/molecules/table-group-by";
import { TableSort } from "@/design-system/molecules/table-sort";

import { cn } from "@/shared/helpers/cn";

import { TableNavPort } from "../../table-nav.types";
import { TableNavDefaultVariants } from "./default.variants";

export function TableNavDefaultAdapter({ classNames, filter, sort, groupBy, search, columnList }: TableNavPort) {
  const slots = TableNavDefaultVariants();
  const { t } = useTranslation("table");

  return (
    <nav className={cn(slots.base(), classNames?.base)}>
      {filter ? <TableFilter {...filter} /> : null}
      {sort ? <TableSort {...sort} /> : null}
      {groupBy ? <TableGroupBy {...groupBy} /> : null}
      {search ? (
        <Input
          placeholder={t("tableNav.search.placeholder")}
          startContent={
            <div className={"text-text-2"}>
              <Search size={16} />
            </div>
          }
          classNames={{ base: "flex-1" }}
          {...search}
        />
      ) : null}
      {columnList ? <TableColumnList {...columnList} /> : null}
    </nav>
  );
}
