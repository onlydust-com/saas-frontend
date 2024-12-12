import { Filter, Search, X } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Icon } from "@/design-system/atoms/icon";

import { useGlobalSearch } from "@/shared/features/global-search/global-search.context";

import { Suggestion } from "../suggestion/suggestion";

export function Header() {
  const { t } = useTranslation("features");
  const { onOpenFilterChange, onOpenChange, inputValue, onInputChange, isOpenFilter } = useGlobalSearch();

  return (
    <div
      className={
        "relative flex h-14 w-full flex-row items-center justify-start gap-1 border-b border-b-border-primary px-3"
      }
    >
      <Icon component={Search} size={"md"} classNames={{ base: "text-typography-tertiary" }} />
      <div className={"relative flex flex-1"}>
        <input
          value={inputValue ?? ""}
          autoFocus={true}
          className={
            "h-full w-full border-none bg-transparent font-inter text-[1rem] font-normal leading-[1.5rem] text-typography-primary outline-none placeholder:text-typography-tertiary"
          }
          placeholder={t("globalSearch.modal.placeholder")}
          onChange={e => onInputChange(e.target.value)}
        />
        <Suggestion />
      </div>
      <div className={"flex flex-row items-center justify-end gap-1"}>
        {!!inputValue && (
          <Button
            iconOnly={true}
            variant={isOpenFilter ? "primary" : "tertiary"}
            size={"sm"}
            startIcon={{ component: Filter }}
            onClick={() => onOpenFilterChange(!isOpenFilter)}
          />
        )}
        <Button
          iconOnly={true}
          variant={"tertiary"}
          size={"sm"}
          startIcon={{ component: X }}
          onClick={() => onOpenChange(false)}
        />
      </div>
    </div>
  );
}
