"use client";

import { useState } from "react";

import { Paper } from "@/design-system/atoms/paper";

import { AnimatedColumn } from "@/shared/components/animated-column-group/animated-column/animated-column";
import { PrimaryMenu } from "@/shared/features/navigation/primary-menu/primary-menu";

import { PrimaryNavigationDesktopProps } from "./primary-navigation-desktop.types";

function MenuContainer({ children }: { children: React.ReactNode }) {
  return (
    <Paper size={"s"} classNames="w-full" container={"2"} border={"none"}>
      {children}
    </Paper>
  );
}
export function PrimaryNavigationDesktop({ children }: PrimaryNavigationDesktopProps) {
  const [folded, setFolded] = useState(false);
  function onFold() {
    setFolded(!folded);
  }

  const navSize = folded ? 64.7 : 260;

  return (
    <AnimatedColumn autoWidth={false} width={navSize} initialWidth={260} className="h-full" onClick={onFold}>
      <MenuContainer>
        <PrimaryMenu />
      </MenuContainer>
    </AnimatedColumn>
  );
}
