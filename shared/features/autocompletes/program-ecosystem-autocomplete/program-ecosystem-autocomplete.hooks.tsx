import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { MeInterface } from "@/core/domain/me/models/me-model";

import { MenuItemPort } from "@/design-system/molecules/menu-item";

import { useAuthUser } from "@/shared/hooks/auth/use-auth-user";

export function useProgramEcosystemAutocomplete() {
  const { t } = useTranslation();
  const { user } = useAuthUser();

  const createMenuItems = (items: MeInterface["programs"] | MeInterface["sponsors"]): MenuItemPort[] => {
    return (
      items?.map(item => ({
        id: item.id,
        label: item.name,
        searchValue: item.name,
        avatar: { src: item.logoUrl },
      })) ?? []
    );
  };

  const programAndEcosystemItems: MenuItemPort[] = useMemo(() => {
    const programsItems = createMenuItems(user?.programs || []);
    const programs = programsItems.length
      ? [
          { id: "programs", label: t("data:details.allDataFilter.programSeparatorLabel"), isLabel: true },
          ...programsItems,
        ]
      : [];
    const ecosystemsItems = createMenuItems(user?.ecosystems || []);
    const ecosystems = ecosystemsItems.length
      ? [
          { id: "ecosystems", label: t("data:details.allDataFilter.ecosystemSeparatorLabel"), isLabel: true },
          ...ecosystemsItems,
        ]
      : [];
    return [...programs, ...ecosystems];
  }, [user]);

  return { programAndEcosystemItems };
}
