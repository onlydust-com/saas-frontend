import { TransactionsSidepanelProps } from "../../transactions-sidepanel.types";

export interface ExportCsvSidepanelProps {
  filters: TransactionsSidepanelProps["filters"];
  exportedData: TransactionsSidepanelProps["exportedData"];
  onExport: TransactionsSidepanelProps["onExport"];
}
