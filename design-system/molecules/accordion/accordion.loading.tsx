import { Skeleton } from "@/design-system/atoms/skeleton";

export function AccordionLoading({ width }: { width?: string }) {
  return (
    <div
      className="flex w-full flex-col gap-4"
      style={{
        width,
      }}
    >
      <Skeleton classNames={{ base: "h-10" }} />

      <div className="flex flex-col gap-2">
        <Skeleton classNames={{ base: "h-12" }} />
        <Skeleton classNames={{ base: "h-12" }} />
        <Skeleton classNames={{ base: "h-12" }} />
      </div>
    </div>
  );
}
