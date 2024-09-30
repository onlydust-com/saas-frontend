import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Popover } from "@/design-system/atoms/popover";
import { MenuItemId } from "@/design-system/molecules/menu-item";

import { useLabelAutocomplete } from "@/shared/features/autocompletes/category-autocomplete/label-autocomplete.hooks";
import { LabelAutocomplete } from "@/shared/features/autocompletes/label-autocomplete/label-autocomplete";
import { LabelPopoverProps } from "@/shared/features/popovers/label-popover/label-popover.types";
import { Translate } from "@/shared/translation/components/translate/translate";

export function LabelPopover({ selectedLabels, onSelect, buttonProps, ...selectProps }: LabelPopoverProps) {
  const { t } = useTranslation();
  const [selectedValues, setSelectedValues] = useState("");
  const { labelsItem } = useLabelAutocomplete();

  function handleSelect(ids: MenuItemId[]) {
    setSelectedValues(
      ids
        .map(id => {
          const findInItems = labelsItem.find(item => item.id === id);
          if (findInItems) {
            return findInItems.label;
          }

          return id;
        })
        .join(", ")
    );
    onSelect?.(ids);
  }

  return (
    <Popover>
      <Popover.Trigger>
        {() => (
          <div>
            <Button
              as={"div"}
              variant={"secondary"}
              size={"md"}
              endIcon={{ component: ChevronDown }}
              classNames={{
                base: "max-w-xs overflow-hidden",
                label: "whitespace-nowrap text-ellipsis overflow-hidden",
              }}
              {...buttonProps}
            >
              {selectedValues ? selectedValues : <Translate token="features:popovers.label.trigger" />}
            </Button>
          </div>
        )}
      </Popover.Trigger>
      <Popover.Content>
        {() => (
          <LabelAutocomplete
            placeholder={t("features:popovers.label.placeholder")}
            {...selectProps}
            selectedLabels={selectedLabels}
            onSelect={handleSelect}
            isPopover={false}
            isMultiple
          />
        )}
      </Popover.Content>
    </Popover>
  );
}
