export enum DateRangeType {
  LAST_WEEK = "LAST_WEEK",
  LAST_MONTH = "LAST_MONTH",
  LAST_SEMESTER = "LAST_SEMESTER",
  LAST_YEAR = "LAST_YEAR",
  ALL_TIME = "ALL_TIME",
  CUSTOM = "CUSTOM",
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
  startOfWeek: (date: Date) => Date;
  formatDistanceToNow: (date: Date) => string;
  getRangeOfDates: (range: DateRangeType) => { from: Date | null; to: Date | null };
  getMonthRange: (date: Date) => { from: Date; to: Date };
  isDateRangeType: (value: string) => value is DateRangeType;
  isTimeGroupingType: (value: string) => value is TimeGroupingType;
  getDateFromWeekNumber: (year: number, weekNumber: number) => Date;
  getWeekNumber: (date: Date, options?: { hideMonths: boolean }) => string;
  isValid: (date: Date) => boolean;
}
