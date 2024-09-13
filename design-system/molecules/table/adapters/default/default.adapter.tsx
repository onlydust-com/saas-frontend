import { TableHeader } from "@/design-system/atoms/table-header";
import { TableRow } from "@/design-system/atoms/table-row";

import { cn } from "@/shared/helpers/cn";

import { TablePort } from "../../table.types";
import { TableDefaultVariants } from "./default.variants";

export function TableDefaultAdapter<H>({ classNames, header, rows, onRowClick }: TablePort<H>) {
  const slots = TableDefaultVariants();

  return (
    <table className={cn(slots.base(), classNames?.base)}>
      <TableHeader {...header} />
      <tbody>
        {rows.map(row => (
          <TableRow key={row.id} row={row} onRowClick={onRowClick} />
        ))}
      </tbody>
    </table>
  );
}
