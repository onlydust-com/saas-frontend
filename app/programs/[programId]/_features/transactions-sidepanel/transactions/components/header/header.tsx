import { useContext } from "react";
import { useTranslation } from "react-i18next";

import { Badge } from "@/design-system/atoms/badge";
import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Icon } from "@/design-system/atoms/icon";
import { Input } from "@/design-system/atoms/input";
import { Popover } from "@/design-system/atoms/popover";
import { Typo } from "@/design-system/atoms/typo";
import { CheckboxButton } from "@/design-system/molecules/checkbox-button";

import { Translate } from "@/shared/translation/components/translate/translate";

import { TransactionsContext } from "../../context/transactions.context";
import { TransactionContextFilterStatus } from "../../context/transactions.context.types";

export function Header() {
  const { t } = useTranslation("");

  const {
    filters: {
      count,
      set,
      clear,
      values: { search, status },
      options: { status: statusOptions },
    },
  } = useContext(TransactionsContext);

  function handleSearch(value: string) {
    set({ search: value });
  }

  function handleStatus(statusId: TransactionContextFilterStatus, checked: boolean) {
    if (checked) {
      set({ status: [...status, statusId] });
    } else {
      set({ status: status.filter(s => s !== statusId) });
    }
  }

  function handleClose() {
    clear();
    close();
  }

  return (
    <div className="flex items-center justify-between gap-2">
      <Popover>
        <Popover.Trigger>
          {() => (
            <div>
              <Button
                size="l"
                variant="secondary-light"
                startIcon={{ name: "ri-filter-3-line" }}
                translate={{ token: "v2.pages.hackathons.details.issues.filters.button" }}
                endContent={
                  count ? (
                    <Badge size="s" style="outline">
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
                <Typo translate={{ token: "v2.pages.hackathons.details.issues.filters.modal.title" }} />
                <Button
                  onClick={clear}
                  size="s"
                  variant="secondary-light"
                  translate={{ token: "v2.pages.hackathons.details.issues.filters.modal.clear" }}
                />
              </div>

              <div className="flex flex-col gap-3">
                <Typo
                  size="xs"
                  color="text-2"
                  translate={{ token: "v2.pages.hackathons.details.issues.filters.modal.languages" }}
                />
                <div className="flex flex-wrap gap-1">
                  {statusOptions.map(s => (
                    <CheckboxButton key={s} value={status.includes(s)} onChange={checked => handleStatus(s, checked)}>
                      <Translate token={`v2.pages.hackathons.details.issues.filters.modal.status.${s}`} />
                    </CheckboxButton>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <Typo
                  size="xs"
                  color="text-2"
                  translate={{ token: "v2.pages.hackathons.details.issues.filters.modal.issuesStates.label" }}
                />
              </div>
            </div>
          )}
        </Popover.Content>
      </Popover>

      <Input
        value={search}
        onChange={e => handleSearch(e.target.value)}
        startContent={<Icon name="ri-search-line" className="text-text-2" />}
        placeholder={t("v2.pages.hackathons.details.issues.filters.search")}
      />

      <div>
        <Button
          onClick={handleClose}
          size="l"
          variant="secondary-light"
          hideText
          startIcon={{
            name: "ri-close-line",
          }}
        />
      </div>
    </div>
  );
}
