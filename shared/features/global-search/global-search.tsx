import { Command } from "cmdk";
import { AnimatePresence, motion } from "framer-motion";
import { Search } from "lucide-react";

import { SearchRessourceType } from "@/core/domain/search/models/search.types";

import { EmptyStateLite } from "@/shared/components/empty-state-lite/empty-state-lite";
import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { ShowMore } from "@/shared/components/show-more/show-more";
import { GlobalSearchProvider, useGlobalSearch } from "@/shared/features/global-search/global-search.context";
import { useIsTablet } from "@/shared/hooks/ui/use-media-query";
import { Button } from "@/shared/ui/button";

import { Header } from "./_components/header/header";
import { ModalPortal } from "./_components/modal-container/modal-container";
import { SearchResultGroup } from "./_components/search-result-group/search-result-group";
import { Filters } from "./_features/filters/filters";
import { Result } from "./_features/result/result";

export function SafeGlobalSearch() {
  const { hasNextPage, fetchNextPage, isFetchingNextPage, results, onOpenChange, inputValue } = useGlobalSearch();
  const isTablet = useIsTablet("lower");

  return (
    <>
      <Button variant={"outline"} size={isTablet ? "icon" : "default"} onClick={() => onOpenChange(true)}>
        <Search />
        <span className="hidden w-36 text-left sm:inline">Search</span>
        <kbd className="pointer-events-none hidden select-none items-center gap-0.5 font-mono text-xs font-medium text-muted-foreground opacity-100 sm:inline-flex">
          <span className="text-base">⌘</span>K
        </kbd>
      </Button>

      <ModalPortal>
        <Command
          className={
            "flex h-fit w-[730px] max-w-[95%] flex-col overflow-hidden rounded-xl border border-border-primary bg-background-primary-alt effect-box-shadow-sm"
          }
        >
          <Header />
          <AnimatePresence>
            {!!inputValue && (
              <motion.div
                className="flex flex-col overflow-hidden"
                initial={{ height: 0 }}
                animate={{ height: 400 }}
                transition={{ duration: 0.2 }}
                exit={{ height: 0 }}
                key={"container"}
              >
                <Filters />
                <div className={"flex-1 overflow-hidden p-2"}>
                  <ScrollView>
                    <Command.Empty>
                      <EmptyStateLite />
                    </Command.Empty>
                    <Command.List className="flex w-full flex-col gap-3 outline-none">
                      {results.PROJECT?.length ? (
                        <SearchResultGroup type={SearchRessourceType.PROJECT} border={false}>
                          {results.PROJECT?.map((r, i) => <Result data={r} key={i} />)}
                        </SearchResultGroup>
                      ) : null}
                      {results.CONTRIBUTOR?.length ? (
                        <SearchResultGroup type={SearchRessourceType.CONTRIBUTOR}>
                          {results.CONTRIBUTOR?.map((r, i) => <Result data={r} key={i} />)}
                        </SearchResultGroup>
                      ) : null}
                      {hasNextPage && fetchNextPage ? (
                        <ShowMore onNext={fetchNextPage} loading={isFetchingNextPage} />
                      ) : null}
                    </Command.List>
                  </ScrollView>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Command>
      </ModalPortal>
    </>
  );
}

export function GlobalSearch({ byPassFlag = false }: { byPassFlag?: boolean }) {
  if (process.env.NEXT_PUBLIC_ENABLE_GLOBAL_SEARCH === "true" || byPassFlag) {
    return (
      <GlobalSearchProvider>
        <SafeGlobalSearch />
      </GlobalSearchProvider>
    );
  }

  return null;
}
