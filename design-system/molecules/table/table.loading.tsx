import { TableHeaderLoading } from "@/design-system/atoms/table-header";
import { TableRowLoading } from "@/design-system/atoms/table-row";

export function TableLoading() {
  return (
    <div className="flex flex-col gap-lg">
      <TableHeaderLoading />
      <TableRowLoading />
      <TableRowLoading />
      <TableRowLoading />
    </div>
  );
}
