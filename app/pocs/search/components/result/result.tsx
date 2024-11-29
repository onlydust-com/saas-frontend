import { WandSparkles } from "lucide-react";

import { Badge } from "@/design-system/atoms/badge";
import { Paper } from "@/design-system/atoms/paper";
import { Typo } from "@/design-system/atoms/typo";

import { ResultProps } from "./result.types";

export function Result({ data }: ResultProps) {
  if (!data) return null;

  const title = data.getName();
  const description = data.getDescription();
  const tag = data.getTag();
  const isFilter = data.isFilter();
  const filterValue = data.getFilterValue();

  return (
    <Paper background={"secondary"}>
      <div className={"flex w-full flex-row items-center justify-between"}>
        <div className={"flex w-full flex-row items-center justify-start gap-2"}>
          <Typo size={"lg"}>{title}</Typo>
          <Badge color={"grey"} variant={"flat"} shape={"rounded"}>
            {tag}
          </Badge>
        </div>
        <div className={"flex w-full flex-row items-center justify-end"}>
          {isFilter && (
            <Badge
              color={"brand"}
              variant={"flat"}
              size={"xs"}
              shape={"squared"}
              iconOnly={true}
              icon={{ component: WandSparkles }}
              as={"button"}
              htmlProps={{
                onClick: () => {
                  alert(filterValue);
                },
              }}
            />
          )}
        </div>
      </div>
      {description && (
        <Typo size={"sm"} color={"secondary"}>
          {description}
        </Typo>
      )}
    </Paper>
  );
}
