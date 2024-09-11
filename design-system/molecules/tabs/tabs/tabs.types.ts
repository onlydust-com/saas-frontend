import { TabItemPort } from "@/design-system/molecules/tabs/tab-item";

interface Variants {}

interface ClassNames {
  base: string;
  item: TabItemPort<"button">["classNames"];
}

export interface TabsPort extends Partial<Variants> {
  classNames?: Partial<ClassNames>;
  variant?: TabItemPort<"button">["variant"];
  size?: TabItemPort<"button">["size"];
  tabs: TabItemPort<"button">[];
  isFullWidth?: boolean;
  layout?: "horizontal" | "vertical";
  selectedId?: string;
  onTabClick?: (id: string) => void;
}
