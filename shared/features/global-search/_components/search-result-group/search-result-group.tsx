import { SearchRessourceType } from "@/core/domain/search/models/search.types";

import { Badge } from "@/design-system/atoms/badge";
import { Button } from "@/design-system/atoms/button/variants/button-default";

import { TypographyH4 } from "@/shared/ui/typography";
import { cn } from "@/shared/utils";

import { useGlobalSearch } from "../../global-search.context";
import { SearchResultGroupProps } from "./search-result-group.types";

export function SearchResultGroup({ children, type, border = true }: SearchResultGroupProps) {
  const label = type === SearchRessourceType.PROJECT ? "Projects" : "Contributors";

  const { onFiltersTypeChange, getTypeFacetCount } = useGlobalSearch();

  function onTypeChange() {
    onFiltersTypeChange(type);
  }

  return (
    <div className={cn("flex flex-col gap-3 pt-3", border && "border-t border-border-primary")}>
      <div className="flex flex-row items-center justify-between gap-1 px-4">
        <div className="flex flex-row items-center justify-start gap-1">
          <TypographyH4>{label}</TypographyH4>
          <Badge count={getTypeFacetCount(type)} size="xs" shape="squared" />
        </div>
        <Button isTextButton size={"xs"} variant="secondary" onClick={() => onTypeChange()}>
          See all
        </Button>
      </div>
      <div className="flex flex-col gap-3">{children}</div>
    </div>
  );
}
