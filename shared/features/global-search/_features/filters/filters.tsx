import { AnimatePresence, motion } from "framer-motion";

import { SearchRessourceType } from "@/core/domain/search/search-contract.types";

import { useGlobalSearch } from "../../global-search.context";
import { CollapsedFilters } from "./_components/collapsed-filters/collapsed-filters";
import { ProjectFilters } from "./_components/project-filters/project-filters";
import { TypeFilters } from "./_components/type-filters/type-filters";

function AnimatedFilter({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      style={{ overflow: "hidden" }}
      initial={{ height: 0 }}
      animate={{ height: "auto" }}
      transition={{ duration: 0.2 }}
      exit={{ height: 0 }}
      key={"container"}
    >
      {children}
    </motion.div>
  );
}

export function Filters() {
  const { isOpenFilter, onClearAllFilters, filters } = useGlobalSearch();

  const hasFilters =
    !!filters.type || !!filters.categories?.length || !!filters.ecosystems?.length || !!filters.languages?.length;

  const showCollapsed = !isOpenFilter && hasFilters;

  return (
    <>
      <AnimatePresence>
        {isOpenFilter && (
          <AnimatedFilter>
            <TypeFilters onClearAll={onClearAllFilters} />
            <AnimatePresence>
              {filters.type === SearchRessourceType.PROJECT && (
                <AnimatedFilter>
                  <ProjectFilters />
                </AnimatedFilter>
              )}
            </AnimatePresence>
          </AnimatedFilter>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showCollapsed && (
          <AnimatedFilter>
            <CollapsedFilters />
          </AnimatedFilter>
        )}
      </AnimatePresence>
    </>
  );
}
