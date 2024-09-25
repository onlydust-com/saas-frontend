export type PeriodValue = {
  fromDate?: string | null;
  toDate?: string | null;
};

export interface PeriodFilterProps {
  onChange: (value: PeriodValue) => void;
}
