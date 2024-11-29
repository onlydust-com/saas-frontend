import { ChevronDown, Database } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Popover } from "@/design-system/atoms/popover";
import { MenuItemId } from "@/design-system/molecules/menu-item";

import { ProgramEcosystemAutocomplete } from "@/shared/features/autocompletes/program-ecosystem-autocomplete/program-ecosystem-autocomplete";
import { useProgramEcosystemAutocomplete } from "@/shared/features/autocompletes/program-ecosystem-autocomplete/program-ecosystem-autocomplete.hooks";
import { ProgramEcosystemPopoverProps } from "@/shared/features/popovers/program-ecosystem-popover/program-ecosystem-popover.types";
import { useDeleteSearchParams } from "@/shared/hooks/router/use-delete-search-params";
import { useUpdateSearchParams } from "@/shared/hooks/router/use-update-search-params";
import { Translate } from "@/shared/translation/components/translate/translate";

export function ProgramEcosystemPopover({
  selectedProgramsEcosystems,
  onSelect,
  buttonProps,
  searchParams,
  ...selectProps
}: ProgramEcosystemPopoverProps) {
  const { t } = useTranslation();
  const [selectedValues, setSelectedValues] = useState("");
  const { updateSearchParams, searchParams: getSearchParams } = useUpdateSearchParams();
  const { deleteSearchParams } = useDeleteSearchParams();
  const navigationParams = searchParams ? getSearchParams.get(searchParams) : undefined;
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
    if (searchParams) {
      if (ids.length) {
        updateSearchParams(searchParams, ids.join(","));
      } else {
        deleteSearchParams(searchParams);
      }
    }
    onSelect?.(ids);
  }

  useEffect(() => {
    if (navigationParams && navigationParams !== selectedProgramsEcosystems?.join(",")) {
      onSelect?.(navigationParams.split(","));
    }
  }, []);

  useEffect(() => {
    if (selectedProgramsEcosystems) {
      setSelectedValues(
        selectedProgramsEcosystems
          .map(id => {
            const findInItems = programAndEcosystemItems.find(item => item.id === id);
            if (findInItems) {
              return findInItems.label;
            }

            return id;
          })
          .join(", ")
      );
    }
  }, [selectedProgramsEcosystems]);

  return (
    <Popover>
      <Popover.Trigger>
        {() => (
          <div>
            <Button
              as={"div"}
              variant={selectedProgramsEcosystems?.length ? "primary" : "secondary"}
              size={"md"}
              endIcon={{ component: ChevronDown }}
              classNames={{
                base: "max-w-xs overflow-hidden",
                label: "whitespace-nowrap text-ellipsis overflow-hidden",
              }}
              startIcon={{ component: Database }}
              {...buttonProps}
            >
              {selectedValues ? selectedValues : <Translate token="features:popovers.programEcosystem.trigger" />}
            </Button>
          </div>
        )}
      </Popover.Trigger>
      <Popover.Content>
        {() => (
          <ProgramEcosystemAutocomplete
            placeholder={t("features:popovers.programEcosystem.placeholder")}
            {...selectProps}
            selectedProgramsEcosystems={selectedProgramsEcosystems}
            onSelect={handleSelect}
            isPopover={false}
            isMultiple
            disabledAutoOrdering
          />
        )}
      </Popover.Content>
    </Popover>
  );
}
