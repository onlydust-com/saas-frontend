import { TransactionsFiltersProps } from "@/shared/features/transactions/transactions-filters/transactions-filters.types";
import { TranslateProps } from "@/shared/translation/components/translate/translate.types";

export interface ExportCsvSidepanelProps {
  types: TransactionsFiltersProps["types"];
  dateRange: TransactionsFiltersProps["dateRange"];
  onDateRange: TransactionsFiltersProps["onDateRange"];
  exportedData: TranslateProps["token"][];
  onExport: () => void;
  onClose?: () => void;
}
