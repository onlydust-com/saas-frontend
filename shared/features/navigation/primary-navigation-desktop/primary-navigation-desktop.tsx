"use client";

import { useState } from "react";

import { Paper } from "@/design-system/atoms/paper";

import { AnimatedColumn } from "@/shared/components/animated-column-group/animated-column/animated-column";
import { PrimaryMenu } from "@/shared/features/navigation/primary-menu/primary-menu";
import { SecondaryMenu } from "@/shared/features/navigation/secondary-menu/secondary-menu";
import { UserMenu } from "@/shared/features/navigation/user-menu/user-menu";

function MenuContainer({ children }: { children: React.ReactNode }) {
  return (
    <Paper size={"s"} classNames={{ base: "flex w-full flex-col gap-2" }} container={"2"} border={"none"}>
      {children}
    </Paper>
  );
}

const SIZES = {
  folded: 64.7,
  unfolded: 260,
};

export function PrimaryNavigationDesktop() {
  const [folded, setFolded] = useState(false);
  function onFold() {
    setFolded(!folded);
  }

  const navSize = folded ? SIZES.folded : SIZES.unfolded;

  return (
    <AnimatedColumn
      autoWidth={false}
      width={navSize}
      initialWidth={260}
      className="flex h-full flex-col justify-between gap-3"
      onClick={onFold}
    >
      <div />
      <MenuContainer>
        <PrimaryMenu isFolded={folded} />
      </MenuContainer>
      <div className="flex-1" />
      <MenuContainer>
        <SecondaryMenu isFolded={folded} />
      </MenuContainer>
      <MenuContainer>
        <UserMenu isFolded={folded} />
      </MenuContainer>
    </AnimatedColumn>
  );
}
