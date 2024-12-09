import { Kbd } from "@nextui-org/kbd";
import { Command } from "cmdk";
import { Star, User } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Input } from "@/design-system/atoms/input";

import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { GlobalSearchProvider, useGlobalSearch } from "@/shared/features/global-search/global-search.context";

import { Header } from "./_components/header/header";
import { ModalPortal } from "./_components/modal-container/modal-container";
import { Result } from "./_components/result/result";

export function SafeGlobalSearch() {
  const { t } = useTranslation("features");
  const { isOpen } = useGlobalSearch();

  return (
    <>
      <Input
        name={"global-search"}
        placeholder={t("globalSearch.menu.placeholder")}
        readOnly={true}
        canInteract={false}
        endContent={
          <Kbd
            keys={["command"]}
            classNames={{
              base: "bg-background-primary rounded-sm shadow-none",
            }}
          >
            K
          </Kbd>
        }
      />
      <ModalPortal isOpen={isOpen}>
        <div className={"w-full max-w-[730px] overflow-hidden rounded-xl bg-background-primary effect-box-shadow-sm"}>
          <Command>
            <Header />
            <div className={"h-auto overflow-hidden p-2"}>
              <ScrollView className="max-h-[400px]">
                <Command.List className="flex w-full flex-col gap-3 outline-none">
                  <Command.Item value="kakarot" className="group/item">
                    <Result
                      name="Kakarot"
                      description="Kakarot is the best project for kaka open source"
                      type="project"
                      tags={["typescript", "IA"]}
                      metrics={[
                        { icon: User, count: 100 },
                        { icon: Star, count: 100 },
                      ]}
                    />
                  </Command.Item>
                  <Command.Item value="starknet" className="group/item">
                    <Result
                      name="Starknet"
                      description="Kakarot is the best project for kaka open source"
                      type="project"
                      tags={["typescript", "IA"]}
                      metrics={[
                        { icon: User, count: 100 },
                        { icon: Star, count: 100 },
                      ]}
                    />
                  </Command.Item>
                </Command.List>
              </ScrollView>
            </div>
          </Command>
        </div>
      </ModalPortal>
    </>
  );
}

export function GlobalSearch() {
  return (
    <GlobalSearchProvider>
      <SafeGlobalSearch />
    </GlobalSearchProvider>
  );
}
