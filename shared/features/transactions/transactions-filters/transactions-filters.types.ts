import { DateRangePickerValue } from "@/design-system/atoms/date-range-picker";

import { TranslateProps } from "@/shared/translation/components/translate/translate.types";

interface Types {
  label: TranslateProps["token"];
  value: boolean;
  onChange: (checked: boolean) => void;
}

export enum SortDirection {
  ASC = "ASC",
  DESC = "DESC",
}

export interface TransactionsFiltersProps {
  filters: {
    count: number;
    clear: () => void;
    isCleared: boolean;
  };
  types: Types[];
  dateRange?: DateRangePickerValue;
  onDateRange: (dateRange: DateRangePickerValue) => void;
  sortDirection: SortDirection;
  onSort: (direction: SortDirection) => void;
  search: string;
  onSearch: (search: string) => void;
  onOpenExport: () => void;
}
