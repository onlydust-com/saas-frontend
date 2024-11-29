import { ChevronDown, GitCommitHorizontal, HandCoins, Wallet } from "lucide-react";
import { useMemo } from "react";

import {
  SplineType,
  SplineTypeMenuProps,
} from "@/app/data/_components/histograms/menus/spline-type-menu/spline-type-menu.types";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Menu } from "@/design-system/molecules/menu";
import { MenuItemPort } from "@/design-system/molecules/menu-item";

import { Translate } from "@/shared/translation/components/translate/translate";

export function SplineTypeMenu({ selectedSplineType, onAction }: SplineTypeMenuProps) {
  const items: MenuItemPort[] = [
    {
      label: <Translate token="data:histograms.splineTypes.PR" />,
      id: SplineType.PR,
    },
    {
      label: <Translate token="data:histograms.splineTypes.GRANTED" />,
      id: SplineType.GRANTED,
    },
    {
      label: <Translate token="data:histograms.splineTypes.REWARDED" />,
      id: SplineType.REWARDED,
    },
  ];

  const startIcon = useMemo(() => {
    switch (selectedSplineType) {
      case SplineType.REWARDED:
        return HandCoins;
      case SplineType.GRANTED:
        return Wallet;
      case SplineType.PR:
      default:
        return GitCommitHorizontal;
    }
  }, [selectedSplineType]);

  return (
    <Menu items={items} selectedIds={[selectedSplineType]} onAction={onAction} isPopOver closeOnSelect>
      <Button
        as={"div"}
        variant={"secondary"}
        size={"xs"}
        startIcon={{ component: startIcon }}
        endIcon={{ component: ChevronDown }}
        translate={{ token: `data:histograms.splineTypes.${selectedSplineType}` }}
      />
    </Menu>
  );
}
