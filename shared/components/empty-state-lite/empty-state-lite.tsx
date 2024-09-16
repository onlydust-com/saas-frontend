import { Typo } from "@/design-system/atoms/typo";

import { EmptyStateLiteProps } from "@/shared/components/empty-state-lite/empty-state-lite.types";
import { cn } from "@/shared/helpers/cn";

export function EmptyStateLite({ message, title, className }: EmptyStateLiteProps) {
  return (
    <div className={cn("flex flex-col items-center gap-2 py-4", className)}>
      {!!title && <Typo variant="heading" size={"sm"} align={"center"} translate={{ token: title }} />}
      <Typo
        align={"center"}
        translate={{
          token: message ?? "common:state.empty.title",
        }}
        color={"secondary"}
        size={"sm"}
      />
    </div>
  );
}
