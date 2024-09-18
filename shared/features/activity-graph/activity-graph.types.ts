import { ReactNode } from "react";

import { IconPort } from "@/design-system/atoms/icon";

export type ActivityGraphLevel = 1 | 2 | 3 | 4;
export interface ActivityGraphWeekData<T> {
  level: ActivityGraphLevel;
  tooltipContent?: ReactNode;
  icon?: IconPort;
  data?: T;
}
export interface Day {
  date: Date;
  id: string;
}

export type ActivityGraphGetWeekId = (date: Date) => string;
export type ActivityGraphweekDataFunction = { getWeekId: ActivityGraphGetWeekId };
export type ActivityGraphWeeksData<T> = { [key: string]: ActivityGraphWeekData<T> };

export interface ActivityGraphWeek {
  id: string;
  startDate: Date;
  endDate: Date;
}

export interface ActivityGraphProps<T> {
  endDate?: Date;
  weekData?: ActivityGraphWeeksData<T>;
  isLoading?: boolean;
}

export interface UseActivityGraph {
  endDate?: Date;
}

export const ACTIVITY_WEEK_NUMBER = 54;
export const ACTIVITY_NUMBER_OF_ROW = 8;
