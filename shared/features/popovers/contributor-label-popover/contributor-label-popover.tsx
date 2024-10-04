import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Popover } from "@/design-system/atoms/popover";

import { ContributorLabelAutocomplete } from "@/shared/features/autocompletes/contributor-label-autocomplete/contributor-label-autocomplete";
import { ContributorLabelPopoverProps } from "@/shared/features/popovers/contributor-label-popover/contributor-label-popover.types";
import { Translate } from "@/shared/translation/components/translate/translate";

export function ContributorLabelPopover({
  selectedLabels,
  onSelect,
  buttonProps,
  projectIdOrSlug,
  ...selectProps
}: ContributorLabelPopoverProps) {
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
                selectedLabels?.map(item => item.name).join(", ")
              ) : (
                <Translate token="features:popovers.label.trigger" />
              )}
            </Button>
          </div>
        )}
      </Popover.Trigger>
      <Popover.Content>
        {() => (
          <ContributorLabelAutocomplete
            projectIdOrSlug={projectIdOrSlug}
            placeholder={t("features:popovers.label.placeholder")}
            {...selectProps}
            selectedLabels={selectedLabels?.map(item => item.id)}
            onSelect={onSelect}
            isPopover={false}
            isMultiple
          />
        )}
      </Popover.Content>
    </Popover>
  );
}
