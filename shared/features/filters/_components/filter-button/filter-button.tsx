import { Filter } from "lucide-react";

import { Badge } from "@/design-system/atoms/badge";
import { Button } from "@/design-system/atoms/button/variants/button-default";

import { FilterButtonProps } from "@/shared/features/filters/_components/filter-button/filter-button.types";
import { useFilterData } from "@/shared/features/filters/_contexts/filter-data/filter-data.context";
import { UserContributionsFilters } from "@/shared/panels/_flows/reward-flow/_panels/_components/user-contributions/user-contributions";

export function FilterButton({ onClick }: FilterButtonProps) {
  const { filterCount } = useFilterData<UserContributionsFilters>();

  return (
    <Button
      variant={"secondary"}
      size="sm"
      startIcon={{ component: Filter }}
      iconOnly={!filterCount}
      onClick={onClick}
      classNames={{
        content: "w-fit",
      }}
      endContent={filterCount ? <Badge size={"xxs"}>{filterCount}</Badge> : undefined}
    />
  );
}
