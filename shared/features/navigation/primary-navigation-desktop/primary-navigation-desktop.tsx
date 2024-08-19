"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

import { Paper } from "@/design-system/atoms/paper";

import { AnimatedColumn } from "@/shared/components/animated-column-group/animated-column/animated-column";
import { PrimaryMenu } from "@/shared/features/navigation/menu/primary-menu/primary-menu";
import { SecondaryMenu } from "@/shared/features/navigation/menu/secondary-menu/secondary-menu";
import { UserMenu } from "@/shared/features/navigation/menu/user-menu/user-menu";
import { PrimaryBanner } from "@/shared/features/navigation/primary-banner/primary-banner";
import { HeaderMenu } from "@/shared/features/navigation/primary-navigation-desktop/header-menu/header-menu";
import { useIsLaptop } from "@/shared/hooks/ui/use-media-query";

function MenuContainer({ children }: { children: ReactNode }) {
  return (
    <Paper size={"s"} classNames={{ base: "flex w-full flex-col gap-2" }} container={"2"} border={"none"}>
      {children}
    </Paper>
  );
}

const SIZES = {
  folded: 66,
  unfolded: 260,
};

export function PrimaryNavigationDesktop() {
  const mounted = useRef(false);
  const isLowerThanLaptop = useIsLaptop("lower");
  const isLargerThanLaptop = useIsLaptop("greater");
  const [folded, setFolded] = useState(true);

  function onFold(value: boolean) {
    setFolded(value);
  }

  useEffect(() => {
    if (isLowerThanLaptop) {
      mounted.current = true;
      setFolded(true);
    }
  }, [isLowerThanLaptop]);

  useEffect(() => {
    if (isLargerThanLaptop && !mounted.current) {
      mounted.current = true;
      setFolded(false);
    }
  }, [isLargerThanLaptop]);

  const navSize = folded ? SIZES.folded : SIZES.unfolded;

  return (
    <AnimatedColumn width={navSize} initialWidth={SIZES.folded} className="flex h-full flex-col justify-between gap-3">
      <MenuContainer>
        <HeaderMenu isFolded={folded} onFoldChange={onFold} />
      </MenuContainer>
      <MenuContainer>
        <PrimaryMenu isFolded={folded} />
      </MenuContainer>
      <PrimaryBanner isFolded={folded} />
      <MenuContainer>
        <SecondaryMenu isFolded={folded} />
      </MenuContainer>
      <MenuContainer>
        <UserMenu isFolded={folded} />
      </MenuContainer>
    </AnimatedColumn>
  );
}
