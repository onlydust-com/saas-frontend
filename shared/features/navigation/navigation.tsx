"use client";

import { usePathname } from "next/navigation";
import { PropsWithChildren, useEffect, useState } from "react";

import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { Header } from "@/shared/features/navigation/_components/header/header";
import { PrimaryBanner } from "@/shared/features/navigation/_components/primary-banner/primary-banner";
import { PrimaryMenu } from "@/shared/features/navigation/_components/primary-menu/primary-menu";
import { SecondaryMenu } from "@/shared/features/navigation/_components/secondary-menu/secondary-menu";
import { cn } from "@/shared/helpers/cn";

function MenuContainer({ children }: PropsWithChildren) {
  return <div className={"flex w-full flex-col gap-xs"}>{children}</div>;
}

export function Navigation({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const [opened, setIsOpened] = useState(false);

  useEffect(() => {
    setIsOpened(false);
  }, [pathname]);

  function handleToggle() {
    setIsOpened(prev => !prev);
  }

  return (
    <>
      <Header onToggle={handleToggle} isOpen={opened} />

      <div className="relative w-full flex-1 overflow-hidden">
        <nav
          className={cn(
            "absolute bottom-0 left-0 top-0 z-10 flex w-full flex-col overflow-hidden border-r-1 border-border-primary transition-transform duration-300 tablet:w-60",
            {
              "translate-x-0": opened,
              "-translate-x-full": !opened,
            }
          )}
        >
          <ScrollView className={"flex flex-col justify-between gap-xs px-2md py-xl"}>
            <MenuContainer>
              <PrimaryMenu />
            </MenuContainer>

            <div className={"flex flex-col gap-lg"}>
              <MenuContainer>
                <SecondaryMenu />
              </MenuContainer>

              <PrimaryBanner />
            </div>
          </ScrollView>
        </nav>

        <div className="mx-auto size-full">{children}</div>
      </div>
    </>
  );
}
