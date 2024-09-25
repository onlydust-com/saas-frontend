export type PeriodValue = {
  fromDate?: string;
  toDate?: string;
};

export interface PeriodFilterProps {
  onChange: (value: PeriodValue) => void;
}
