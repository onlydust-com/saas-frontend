import { Typo } from "@/design-system/atoms/typo";

import { EmptyStateLiteProps } from "@/shared/components/empty-state-lite/empty-state-lite.types";

export function EmptyStateLite({ message, title }: EmptyStateLiteProps) {
  return (
    <div className={"flex flex-col items-center gap-2 py-4"}>
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
