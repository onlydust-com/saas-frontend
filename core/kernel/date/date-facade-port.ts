export enum DateRangeType {
  LAST_WEEK = "LAST_WEEK",
  LAST_MONTH = "LAST_MONTH",
  LAST_SEMESTER = "LAST_SEMESTER",
  LAST_YEAR = "LAST_YEAR",
  ALL_TIME = "ALL_TIME",
}

export enum TimeGroupingType {
  DAY = "DAY",
  WEEK = "WEEK",
  MONTH = "MONTH",
  QUARTER = "QUARTER",
  YEAR = "YEAR",
}

export interface DateFacadePort {
  eachDayOfInterval: (start: Date, end: Date) => Date[];
  isToday: (date: Date) => boolean;
  isPast: (date: Date) => boolean;
  isFuture: (date: Date) => boolean;
  compareAsc: (dateLeft: Date, dateRight: Date) => number;
  compareDesc: (dateLeft: Date, dateRight: Date) => number;
  addMinutes: (date: Date, minutes: number) => Date;
  format: (date: Date, pattern: string) => string;
  formatDistanceToNow: (date: Date) => string;
  formatInEuropeTimeZone: (date: Date, pattern: string) => string;
  getRangeOfDates: (range: DateRangeType) => { from: Date | null; to: Date | null };
  getMonthRange: (date: Date) => { from: Date; to: Date };
}
