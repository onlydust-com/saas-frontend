import { Skeleton } from "@/design-system/atoms/skeleton";

export function CardTemplateLoading() {
  return (
    <Skeleton
      container="interactions-black"
      style={{
        width: "100%",
        height: 100,
      }}
    />
  );
}
