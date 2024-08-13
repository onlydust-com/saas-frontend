import { useTranslation } from "react-i18next";

import { Icon } from "@/design-system/atoms/icon";
import { Input } from "@/design-system/atoms/input";
import { TableFilter } from "@/design-system/molecules/table-filter";

import { cn } from "@/shared/helpers/cn";

import { TableNavPort } from "../../table-nav.types";
import { TableNavDefaultVariants } from "./default.variants";

export function TableNavDefaultAdapter({ classNames }: TableNavPort) {
  const slots = TableNavDefaultVariants();
  const { t } = useTranslation("table");

  return (
    <nav className={cn(slots.base(), classNames?.base)}>
      <TableFilter onClear={() => {}} />
      <Input
        placeholder={t("tableNav.search.placeholder")}
        startContent={<Icon name={"ri-search-line"} classNames={{ base: "text-text-2" }} />}
        classNames={{ base: "flex-1" }}
      />
    </nav>
  );
}
