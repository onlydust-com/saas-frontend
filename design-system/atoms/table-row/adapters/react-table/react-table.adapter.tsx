import { flexRender } from "@tanstack/react-table";

import { cn } from "@/shared/helpers/cn";

import { TableRowPort } from "../../table-row.types";
import { TableRowReactTableVariants } from "./react-table.variants";

export function TableRowReactTableAdapter<R>({ row, classNames, onRowClick }: TableRowPort<R>) {
  const slots = TableRowReactTableVariants();

  return (
    <tr
      key={row.id}
      className={cn(slots.base(), classNames?.base, {
        "cursor-pointer": Boolean(onRowClick),
      })}
      onClick={() => onRowClick?.(row)}
    >
      {row.getVisibleCells().map(cell => (
        <td key={cell.id} className={cn(slots.cell(), classNames?.cell)}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </td>
      ))}
    </tr>
  );
}
