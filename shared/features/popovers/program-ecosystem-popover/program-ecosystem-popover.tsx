import { ChevronDown } from "lucide-react";
import { useState } from "react";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Popover } from "@/design-system/atoms/popover";
import { MenuItemId } from "@/design-system/molecules/menu-item";

import { ProgramEcosystemAutocomplete } from "@/shared/features/autocompletes/program-ecosystem-autocomplete/program-ecosystem-autocomplete";
import { useProgramEcosystemAutocomplete } from "@/shared/features/autocompletes/program-ecosystem-autocomplete/program-ecosystem-autocomplete.hooks";
import { ProgramEcosystemPopoverProps } from "@/shared/features/popovers/program-ecosystem-popover/program-ecosystem-popover.types";
import { Translate } from "@/shared/translation/components/translate/translate";

export function ProgramEcosystemPopover({
  selectedProgramsEcosystems,
  onSelect,
  ...selectProps
}: ProgramEcosystemPopoverProps) {
  const [selectedValues, setSelectedValues] = useState("");
  const { programAndEcosystemItems } = useProgramEcosystemAutocomplete();

  function handleSelect(ids: MenuItemId[]) {
    setSelectedValues(
      ids
        .map(id => {
          const findInItems = programAndEcosystemItems.find(item => item.id === id);
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
    <div className="flex w-full flex-wrap gap-1">
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
              >
                {selectedValues ? selectedValues : <Translate token="data:details.allDataFilter.trigger" />}
              </Button>
            </div>
          )}
        </Popover.Trigger>
        <Popover.Content>
          {() => (
            <ProgramEcosystemAutocomplete
              {...selectProps}
              selectedProgramsEcosystems={selectedProgramsEcosystems}
              onSelect={handleSelect}
              isPopover={false}
              isMultiple
            />
          )}
        </Popover.Content>
      </Popover>
    </div>
  );
}
