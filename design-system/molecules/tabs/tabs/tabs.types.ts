import { AnyType } from "@/core/kernel/types";

import { TabItemPort } from "@/design-system/molecules/tabs/tab-item";

interface Variants {}

interface ClassNames {
  base: string;
  item: TabItemPort<AnyType>["classNames"];
}

export interface TabsPort extends Partial<Variants> {
  classNames?: Partial<ClassNames>;
  variant?: TabItemPort<AnyType>["variant"];
  size?: TabItemPort<AnyType>["size"];
  tabs: TabItemPort<AnyType>[];
  isFullWidth?: boolean;
  layout?: "horizontal" | "vertical";
  selectedId?: string;
  onTabClick?: (id: string) => void;
  searchParams?: string;
}
