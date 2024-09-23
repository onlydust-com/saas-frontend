import { ChevronDown } from "lucide-react";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { User } from "@/core/domain/user/models/user-model";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Popover } from "@/design-system/atoms/popover";
import { MenuItemId, MenuItemPort } from "@/design-system/molecules/menu-item";
import { Select } from "@/design-system/molecules/select";

import { useAuthUser } from "@/shared/hooks/auth/use-auth-user";
import { Translate } from "@/shared/translation/components/translate/translate";

import { ProgramEcosystemAutocompleteProps } from "./program-ecosystem-autocomplete.types";

export function ProgramEcosystemAutocomplete({
  selectedProgramAndEcosystem,
  onSelect,
  ...selectProps
}: ProgramEcosystemAutocompleteProps) {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const { user } = useAuthUser();

  const filteredPrograms = useMemo(() => {
    return user?.programs?.filter(program => program.name.toLowerCase().includes(search.toLowerCase()));
  }, [search, user?.programs]);

  const filteredEcosystems = useMemo(() => {
    return user?.ecosystems?.filter(ecosystem => ecosystem.name.toLowerCase().includes(search.toLowerCase()));
  }, [search, user?.ecosystems]);

  const createMenuItems = (items: User["programs"] | User["sponsors"]): MenuItemPort[] => {
    return (
      items?.map(item => ({
        id: item.id,
        label: item.name,
        avatar: { src: item.logoUrl },
      })) ?? []
    );
  };

  const programAndEcosystemItems: MenuItemPort[] = useMemo(() => {
    const programsItems = createMenuItems(filteredPrograms || []);
    const programs = programsItems.length
      ? [
          { id: "programs", label: t("data:details.allDataFilter.programSeparatorLabel"), isSeparator: true },
          ...programsItems,
        ]
      : [];
    const ecosystemsItems = createMenuItems(filteredEcosystems || []);
    const ecosystems = ecosystemsItems.length
      ? [
          { id: "ecosystems", label: t("data:details.allDataFilter.ecosystemSeparatorLabel"), isSeparator: true },
          ...ecosystemsItems,
        ]
      : [];
    return [...programs, ...ecosystems];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredPrograms, filteredEcosystems]);

  const selectedValues = useMemo(() => {
    if (selectedProgramAndEcosystem?.length) {
      return selectedProgramAndEcosystem
        .map(id => {
          const findInItems = programAndEcosystemItems.find(item => item.id === id);
          if (findInItems) {
            return findInItems.label;
          }

          return id;
        })
        .join(", ");
    }
  }, [selectedProgramAndEcosystem, programAndEcosystemItems]);

  function handleSelect(ids: MenuItemId[]) {
    onSelect?.(ids as string[]);
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
                {selectedValues ?? <Translate token="data:details.allDataFilter.trigger" />}
              </Button>
            </div>
          )}
        </Popover.Trigger>
        <Popover.Content>
          {() => (
            <Select
              items={programAndEcosystemItems}
              isAutoComplete={true}
              onSelect={handleSelect}
              selectedIds={selectedProgramAndEcosystem}
              controlledAutoComplete={{
                value: search,
                onChange: setSearch,
              }}
              {...selectProps}
              isPopover={false}
            />
          )}
        </Popover.Content>
      </Popover>
    </div>
  );
}
