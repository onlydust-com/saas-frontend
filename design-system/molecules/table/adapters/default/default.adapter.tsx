import React from "react";

import { bootstrap } from "@/core/bootstrap";

import { TableHeader } from "@/design-system/atoms/table-header";
import { TableRow } from "@/design-system/atoms/table-row";

import { EmptyStateLite } from "@/shared/components/empty-state-lite/empty-state-lite";
import { cn } from "@/shared/helpers/cn";

import { TableBodyProps, TablePort } from "../../table.types";
import { TableDefaultVariants } from "./default.variants";

const TableBody = <R,>({ rows, onRowClick, emptyState, headersLength }: TableBodyProps<R>) => (
  <tbody>
    {rows.map(row => (
      <TableRow key={row.id} row={row} onRowClick={onRowClick} />
    ))}

    {rows.length === 0 && (
      <tr>
        <td colSpan={headersLength}>
          <EmptyStateLite {...(emptyState || {})} className="py-16" />
        </td>
      </tr>
    )}
  </tbody>
);

const MemoizedTableBody = React.memo(
  TableBody,
  (prevProps, nextProps) =>
    prevProps.rows === nextProps.rows &&
    prevProps.headersLength === nextProps.headersLength &&
    prevProps.rowSelection === nextProps.rowSelection
) as typeof TableBody;

export function TableDefaultAdapter<H, R>({
  classNames,
  table,
  rowSelection,
  header,
  rows,
  onRowClick,
  emptyState,
}: TablePort<H, R>) {
  const slots = TableDefaultVariants();
  const headersLength = header?.headerGroups[0]?.headers.length ?? 1;

  const styleKernelPort = bootstrap.getStyleKernelPort();

  return (
    <>
      <table
        className={cn(slots.base(), classNames?.base)}
        style={{
          width: styleKernelPort.pxToRem(table.getCenterTotalSize()),
        }}
      >
        <TableHeader {...header} />

        <MemoizedTableBody
          rowSelection={rowSelection}
          rows={rows}
          onRowClick={onRowClick}
          emptyState={emptyState}
          headersLength={headersLength}
        />
      </table>
    </>
  );
}
