interface Variants {}

interface ClassNames {
  base: string;
  track: string;
  indicator: string;
}

export interface ProgressBarPort extends Partial<Variants> {
  classNames?: Partial<ClassNames>;
  min?: number;
  max?: number;
  value: number;
}
