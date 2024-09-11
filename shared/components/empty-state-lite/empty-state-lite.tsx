import { Typo } from "@/design-system/atoms/typo";

export function EmptyStateLite() {
  return (
    <div className={"py-16 text-center"}>
      <Typo
        translate={{
          token: "common:state.empty.title",
        }}
        color={"secondary"}
        size={"sm"}
      />
    </div>
  );
}
