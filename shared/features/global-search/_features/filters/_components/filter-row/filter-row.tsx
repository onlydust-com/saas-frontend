import { Icon } from "@/design-system/atoms/icon";
import { Typo } from "@/design-system/atoms/typo";

import { ScrollView } from "@/shared/components/scroll-view/scroll-view";

import { FilterRowProps } from "./filter-row.types";

export function FilterRow({ label, icon, children }: FilterRowProps) {
  return (
    <div className={"flex w-full flex-row justify-start gap-4 overflow-hidden"}>
      <div className={"flex flex-row items-center justify-start gap-2"}>
        <Icon size="sm" classNames={{ base: "text-typography-tertiary" }} {...icon} />
        <Typo size="sm" color="tertiary" translate={label} />
      </div>
      <div className={"w-full overflow-hidden"}>
        <ScrollView direction="x">
          <div className={"flex flex-row items-center gap-2"}>{children}</div>
        </ScrollView>
      </div>
    </div>
  );
}
