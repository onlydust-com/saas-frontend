import { Skeleton, SkeletonPort } from "@/design-system/atoms/skeleton";

export function TableHeaderLoading({ background }: { background?: SkeletonPort["background"] }) {
  return (
    <Skeleton
      background={background}
      classNames={{
        base: "w-full h-12",
      }}
    />
  );
}
