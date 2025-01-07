import { SkeletonPort } from "@/design-system/atoms/skeleton";
import { TableHeaderLoading } from "@/design-system/atoms/table-header";
import { TableRowLoading } from "@/design-system/atoms/table-row";

export function TableLoading({ background }: { background?: SkeletonPort["background"] }) {
  return (
    <div className="flex flex-col gap-lg">
      <TableHeaderLoading background={background} />
      <TableRowLoading background={background} />
      <TableRowLoading background={background} />
      <TableRowLoading background={background} />
    </div>
  );
}
