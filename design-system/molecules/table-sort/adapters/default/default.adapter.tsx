import { useTranslation } from "react-i18next";

import { ButtonSecondaryLight } from "@/design-system/atoms/button/variants/button-secondary-light";
import { RemixIconsName } from "@/design-system/atoms/icon/adapters/remix-icon/remix-icon-names.types";
import { Popover } from "@/design-system/atoms/popover";
import { Tooltip } from "@/design-system/atoms/tooltip";
import { Typo } from "@/design-system/atoms/typo";
import { RadioButtonGroup } from "@/design-system/molecules/radio-button-group";

import { cn } from "@/shared/helpers/cn";
import { Translate } from "@/shared/translation/components/translate/translate";

import { SortDirection, TableSortPort } from "../../table-sort.types";
import { TableSortDefaultVariants } from "./default.variants";

export function TableSortDefaultAdapter({ children, classNames, direction, onDirectionChange }: TableSortPort) {
  const slots = TableSortDefaultVariants();
  const { t } = useTranslation("tableSort");

  const sortIcons: Record<SortDirection, RemixIconsName> = {
    ASC: "ri-sort-asc",
    DESC: "ri-sort-desc",
  };

  return (
    <Popover>
      <Popover.Trigger>
        {() => (
          <Tooltip content={<Translate token={"tableSort:title"} />}>
            <div className={cn(slots.base(), classNames?.base)}>
              <ButtonSecondaryLight size="l" hideText startIcon={{ name: sortIcons[direction] }} />
            </div>
          </Tooltip>
        )}
      </Popover.Trigger>

      <Popover.Content>
        {() => (
          <div className="grid max-w-[360px] gap-3">
            <Typo translate={{ token: "tableSort:title" }} />

            <div className="grid gap-2">
              <Typo size="xs" color="text-2" translate={{ token: "tableSort:direction.title" }} />

              <RadioButtonGroup
                variant={"secondary-light"}
                value={direction}
                items={[
                  {
                    value: SortDirection.ASC,
                    label: t("direction.ascending"),
                  },
                  {
                    value: SortDirection.DESC,
                    label: t("direction.descending"),
                  },
                ]}
                onChange={onDirectionChange}
              />
            </div>

            {children}
          </div>
        )}
      </Popover.Content>
    </Popover>
  );
}
