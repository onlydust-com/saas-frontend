export interface ActivityGraphData {
  date: Date;
  count: number;
  hasReward: boolean;
}

export interface ActivityGraphProps {
  data?: ActivityGraphData[];
}

export type ActivityGraphLevel = 0 | 1 | 2 | 3 | 4;

export type ActivityGraphLevelRange = { [key in ActivityGraphLevel]: number };
