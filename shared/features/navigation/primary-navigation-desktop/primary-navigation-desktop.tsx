"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

import { AnimatedColumn } from "@/shared/components/animated-column-group/animated-column/animated-column";
import { PrimaryMenu } from "@/shared/features/navigation/menu/primary-menu/primary-menu";
import { SecondaryMenu } from "@/shared/features/navigation/menu/secondary-menu/secondary-menu";
import { UserMenu } from "@/shared/features/navigation/menu/user-menu/user-menu";
import { PrimaryBanner } from "@/shared/features/navigation/primary-banner/primary-banner";
import { HeaderMenu } from "@/shared/features/navigation/primary-navigation-desktop/header-menu/header-menu";
import { useIsLaptop } from "@/shared/hooks/ui/use-media-query";

function MenuContainer({ children }: { children: ReactNode }) {
  return <div className={"flex w-full flex-col gap-xs"}>{children}</div>;
}

const SIZES = {
  folded: 66,
  unfolded: 260,
};

export function PrimaryNavigationDesktop() {
  const mounted = useRef(false);
  const isLowerThanLaptop = useIsLaptop("lower");
  const isLargerThanLaptop = useIsLaptop("greater");
  const [folded, setFolded] = useState(false);

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
    <AnimatedColumn
      width={navSize}
      initialWidth={SIZES.unfolded}
      className="flex h-full flex-col justify-between gap-lg px-sm pb-sm pt-xs"
    >
      <MenuContainer>
        <HeaderMenu isFolded={folded} onFoldChange={onFold} />
      </MenuContainer>
      <MenuContainer>
        <PrimaryMenu isFolded={folded} />
      </MenuContainer>
      <div className={"flex-1"} />
      <MenuContainer>
        <SecondaryMenu isFolded={folded} />
      </MenuContainer>
      <PrimaryBanner isFolded={folded} />
      <hr className={"border-border-primary"} />
      <MenuContainer>
        <UserMenu isFolded={folded} />
      </MenuContainer>
    </AnimatedColumn>
  );
}
