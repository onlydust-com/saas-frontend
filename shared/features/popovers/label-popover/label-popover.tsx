import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Popover } from "@/design-system/atoms/popover";

import { LabelAutocomplete } from "@/shared/features/autocompletes/label-autocomplete/label-autocomplete";
import { LabelPopoverProps } from "@/shared/features/popovers/label-popover/label-popover.types";
import { Translate } from "@/shared/translation/components/translate/translate";

export function LabelPopover({ selectedLabels, onSelect, buttonProps, ...selectProps }: LabelPopoverProps) {
  const { t } = useTranslation();
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
              {selectedLabels?.length ? (
                selectedLabels?.map(item => item).join(", ")
              ) : (
                <Translate token="features:popovers.label.trigger" />
              )}
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
            onSelect={onSelect}
            isPopover={false}
            isMultiple
          />
        )}
      </Popover.Content>
    </Popover>
  );
}
