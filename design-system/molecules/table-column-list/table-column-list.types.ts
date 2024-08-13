interface Variants {}

interface ClassNames {
  base: string;
}

export interface TableColumnListPort extends Partial<Variants> {
  classNames?: Partial<ClassNames>;
  items: {
    id: string;
    label: string;
    value: boolean;
  }[];
  onChange: (id: string, value: boolean) => void;
  onClear: () => void;
}
