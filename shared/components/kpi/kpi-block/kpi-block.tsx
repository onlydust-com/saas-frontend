import { Paper } from "@/design-system/atoms/paper";
import { Typo } from "@/design-system/atoms/typo";

import { KpiBlockProps } from "./kpi-block.types";

export function KpiBlock({ title, value }: KpiBlockProps) {
  return (
    <Paper
      size={"md"}
      background={"primary"}
      border={"primary"}
      classNames={{ base: "flex flex-col gap-md flex-1 justify-between" }}
    >
      <Typo size={"xs"} color={"secondary"}>
        {title}
      </Typo>

      <Typo variant={"heading"} size={"xs"} color={"secondary"}>
        {value}
      </Typo>
    </Paper>
  );
}
