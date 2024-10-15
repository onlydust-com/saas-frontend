import { PropsWithChildren } from "react";

export interface ActivityGraphProps extends PropsWithChildren {}

export type ActivityGraphLevel = 0 | 1 | 2 | 3 | 4;

export type ActivityGraphLevelRange = { [key in ActivityGraphLevel]: number };

export interface ActivityGraphData {
  year: number;
  week: number;
  date: string;
  codeReviewCount: number;
  issueCount: number;
  pullRequestCount: number;
  rewardCount: number;
}
