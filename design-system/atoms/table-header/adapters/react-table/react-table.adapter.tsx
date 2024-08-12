import { flexRender } from "@tanstack/react-table";

import { Typo } from "@/design-system/atoms/typo";

import { cn } from "@/shared/helpers/cn";

import { TableHeaderPort } from "../../table-header.types";
import { TableHeaderReactTableVariants } from "./react-table.variants";

export function TableHeaderReactTableAdapter<H>({ headerGroups, classNames }: TableHeaderPort<H>) {
  const slots = TableHeaderReactTableVariants();

  return (
    <thead className={cn(slots.base(), classNames?.base)}>
      {headerGroups.map(headerGroup => (
        <tr key={headerGroup.id} className={cn(slots.row(), classNames?.row)}>
          {headerGroup.headers.map(header => (
            <th key={header.id} className={cn(slots.header(), classNames?.header)}>
              <Typo size={"xs"} weight={"regular"} color={"text-1"}>
                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
              </Typo>
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
}
