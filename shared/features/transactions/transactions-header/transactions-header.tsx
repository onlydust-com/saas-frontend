import { Badge } from "@/design-system/atoms/badge";
import { Typo } from "@/design-system/atoms/typo";

import { TransactionsHeaderProps } from "./transactions-header.types";

export function TransactionsHeader({ count }: TransactionsHeaderProps) {
  return (
    <div className="flex items-center gap-xs">
      <Typo
        weight="medium"
        translate={{
          token: "features:transactions.header.title",
        }}
      />

      {count ? <Badge size="xxs">{count}</Badge> : null}
    </div>
  );
}
