import { RadioGroupButtonPort } from "@/design-system/molecules/radio-button-group";

interface Variants {}

interface ClassNames {
  base: string;
}

export interface TableGroupByPort extends Partial<Variants> {
  classNames?: Partial<ClassNames>;
  items: RadioGroupButtonPort<string>["items"];
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
}
