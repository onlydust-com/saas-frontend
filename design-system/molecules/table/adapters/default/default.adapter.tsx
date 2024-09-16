import { TableHeader } from "@/design-system/atoms/table-header";
import { TableRow } from "@/design-system/atoms/table-row";

import { EmptyStateLite } from "@/shared/components/empty-state-lite/empty-state-lite";
import { cn } from "@/shared/helpers/cn";

import { TablePort } from "../../table.types";
import { TableDefaultVariants } from "./default.variants";

export function TableDefaultAdapter<H, R>({ classNames, header, rows, onRowClick, emptyState }: TablePort<H, R>) {
  const slots = TableDefaultVariants();
  const rowLength = rows.length;
  const headersLength = header?.headerGroups[0]?.headers.length ?? 1;

  return (
    <>
      <table className={cn(slots.base(), classNames?.base)}>
        <TableHeader {...header} />
        <tbody>
          {rows.map(row => (
            <TableRow key={row.id} row={row} onRowClick={onRowClick} />
          ))}
          {rowLength === 0 && (
            <tr>
              <td colSpan={headersLength}>
                <EmptyStateLite {...(emptyState || {})} className={"py-16"} />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}
