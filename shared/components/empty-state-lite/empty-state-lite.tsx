import { Typo } from "@/design-system/atoms/typo";

import { EmptyStateLiteProps } from "@/shared/components/empty-state-lite/empty-state-lite.types";

export function EmptyStateLite({ message }: EmptyStateLiteProps) {
  return (
    <div className={"py-16 text-center"}>
      <Typo
        translate={{
          token: message ?? "common:state.empty.title",
        }}
        color={"secondary"}
        size={"sm"}
      />
    </div>
  );
}
