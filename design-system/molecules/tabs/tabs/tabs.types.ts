import { TabItemPort } from "@/design-system/molecules/tabs/tab-item";

interface Variants {}

interface ClassNames {
  base: string;
  item: TabItemPort["classNames"];
}

export interface TabsPort extends Partial<Variants> {
  classNames?: Partial<ClassNames>;
  variant?: TabItemPort["variant"];
  size?: TabItemPort["size"];
  tabs: TabItemPort[];
  isFullWidth?: boolean;
  layout?: "horizontal" | "vertical";
  selectedId?: string;
  onTabClick?: (id: string) => void;
}
