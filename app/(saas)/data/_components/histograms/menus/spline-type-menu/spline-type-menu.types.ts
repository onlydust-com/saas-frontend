export enum SplineType {
  GRANTED = "GRANTED",
  REWARDED = "REWARDED",
  PR = "PR",
}

export interface SplineTypeMenuProps {
  selectedSplineType: SplineType;
  onAction: (splineType: string) => void;
}
