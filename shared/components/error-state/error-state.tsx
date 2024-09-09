import { Typo } from "@/design-system/atoms/typo";

export function ErrorState() {
  return (
    <div className={"py-16 text-center"}>
      <Typo
        translate={{
          token: "common:state.error.title",
        }}
        color={"secondary"}
        size={"sm"}
      />
    </div>
  );
}
