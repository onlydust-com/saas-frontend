import { DateRangePickerValue } from "@/design-system/atoms/date-range-picker";

import { TranslateProps } from "@/shared/translation/components/translate/translate.types";

interface Types {
  label: TranslateProps["token"];
  value: boolean;
  onChange: (checked: boolean) => void;
}

interface MonthlyTransaction {
  date: string;
  count: number;
}

export interface TransactionsSidepanelProps {
  filters: {
    types: Types[];
    dateRange?: DateRangePickerValue;
    onDateRange: (value: DateRangePickerValue) => void;
    search: string;
    onSearch: (value: string) => void;
    count: number;
    isCleared: boolean;
    clear: () => void;
  };
  monthlyTransactions: MonthlyTransaction[];
  dataByAccordionKey: Record<string, any>;
  onAccordionOpen: (accordionKey: string, fromDate: Date, toDate: Date) => void;
  exportedData: TranslateProps["token"][];
  onExport: () => void;
}
