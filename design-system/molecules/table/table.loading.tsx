import { TableHeaderLoading } from "@/design-system/atoms/table-header";
import { TableRowLoading } from "@/design-system/atoms/table-row";

export function TableLoading() {
  return (
    <div className="grid w-full gap-3">
      <TableHeaderLoading />
      <TableRowLoading />
      <TableRowLoading />
      <TableRowLoading />
    </div>
  );
}
