import { SortDirection, flexRender } from "@tanstack/react-table";

import { bootstrap } from "@/core/bootstrap";

import { Typo } from "@/design-system/atoms/typo";
import { TableResizer } from "@/design-system/molecules/table-resizer";
import { TableSort, SortDirection as TableSortDirection, TableSortPort } from "@/design-system/molecules/table-sort";

import { cn } from "@/shared/helpers/cn";

import { TableHeaderPort } from "../../table-header.types";
import { TableHeaderReactTableVariants } from "./react-table.variants";

export function TableHeaderReactTableAdapter<H>({ headerGroups, classNames }: TableHeaderPort<H>) {
  const slots = TableHeaderReactTableVariants();

  const styleKernelPort = bootstrap.getStyleKernelPort();

  function getDirection(direction: SortDirection | false): TableSortPort["direction"] {
    if (!direction) return undefined;

    return direction === "asc" ? TableSortDirection.ASC : TableSortDirection.DESC;
  }

  return (
    <thead className={cn(slots.base(), classNames?.base)}>
      {headerGroups.map(headerGroup => (
        <tr key={headerGroup.id} className={cn(slots.row(), classNames?.row)}>
          {headerGroup.headers.map(header => {
            const direction = getDirection(header.column.getIsSorted());

            return (
              <th
                key={header.id}
                className={cn(slots.header(), classNames?.header)}
                colSpan={header.colSpan}
                style={{
                  width: styleKernelPort.pxToRem(header.getSize()),
                  minWidth: header.column.columnDef.minSize
                    ? styleKernelPort.pxToRem(header.column.columnDef.minSize)
                    : undefined,
                  maxWidth: header.column.columnDef.maxSize
                    ? styleKernelPort.pxToRem(header.column.columnDef.maxSize)
                    : undefined,
                }}
              >
                <div
                  className={cn(slots.headerInner(), classNames?.headerInner, {
                    "hover:bg-background-secondary": header.column.getCanSort(),
                  })}
                >
                  <Typo
                    size="xs"
                    weight={header.column.getIsSorted() ? "medium" : "regular"}
                    color="quaternary"
                    classNames={{
                      base: cn("block transition-all", {
                        "group-hover/header-inner:text-typography-secondary": header.column.getCanSort(),
                        "text-typography-secondary": header.column.getIsSorted(),
                      }),
                    }}
                  >
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </Typo>

                  {header.column.getCanSort() ? (
                    <TableSort
                      direction={direction}
                      onClick={header.column.getToggleSortingHandler()}
                      isSorted={!!header.column.getIsSorted()}
                    />
                  ) : null}
                </div>

                {header.column.getCanResize() ? (
                  <TableResizer
                    onDoubleClick={() => header.column.resetSize()}
                    onMouseDown={header.getResizeHandler()}
                    onTouchStart={header.getResizeHandler()}
                    isResizing={header.column.getIsResizing()}
                  />
                ) : null}
              </th>
            );
          })}
        </tr>
      ))}
    </thead>
  );
}
