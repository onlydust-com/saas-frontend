import {
  addMinutes as addMinutesDateFns,
  compareAsc,
  compareDesc,
  eachDayOfInterval as eachDayOfIntervalDateFns,
  format as formatDateFns,
  formatDistanceToNowStrict,
  isFuture as isFutureDateFns,
  isPast as isPastDateFns,
  isToday as isTodayDateFns,
  setWeek,
  setYear,
  startOfWeek as startOfWeekDateFns,
  startOfYear,
  subMonths,
  subWeeks,
  subYears,
} from "date-fns";

import { CustomPeriodType, DateFacadePort, DateRangeType, TimeGroupingType } from "./date-facade-port";

function getRangeOfDates(range: DateRangeType | CustomPeriodType): { from: Date | null; to: Date | null } {
  switch (range) {
    case DateRangeType.LAST_WEEK: {
      const today = new Date();
      const lastWeek = subWeeks(today, 1);
      return { from: lastWeek, to: today };
    }
    case DateRangeType.LAST_MONTH: {
      const today = new Date();
      const lastMonth = subMonths(today, 1);
      return { from: lastMonth, to: today };
    }
    case DateRangeType.LAST_YEAR: {
      const today = new Date();
      const lastYears = subYears(today, 1);
      return { from: lastYears, to: today };
    }
    case DateRangeType.LAST_SEMESTER: {
      const today = new Date();
      const lastSemester = subMonths(today, 6);
      return { from: lastSemester, to: today };
    }
    default: {
      return { from: null, to: null };
    }
  }
}

function getMonthRange(date: Date): { from: Date; to: Date } {
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return { from: firstDay, to: lastDay };
}

function isDateRangeType(value: string): value is DateRangeType {
  return Object.values(DateRangeType).includes(value as DateRangeType);
}

function isTimeGroupingType(value: string): value is TimeGroupingType {
  return Object.values(TimeGroupingType).includes(value as TimeGroupingType);
}

export function getDateFromWeekNumber(year: number, weekNumber: number) {
  return startOfWeekDateFns(setWeek(startOfYear(setYear(new Date(), year)), weekNumber));
}

export function getWeekNumber(date: Date, options?: { hideMonths: boolean }): string {
  if (options?.hideMonths) {
    return formatDateFns(date, "w yyyy");
  }
  return formatDateFns(date, "w, MMM yyyy");
}

export const DateFnsAdapter: DateFacadePort = {
  eachDayOfInterval: (start: Date, end: Date) => eachDayOfIntervalDateFns({ start, end }),
  isToday: (date: Date) => isTodayDateFns(date),
  isPast: (date: Date) => isPastDateFns(date),
  isFuture: (date: Date) => isFutureDateFns(date),
  compareAsc: (dateLeft: Date, dateRight: Date) => compareAsc(dateLeft, dateRight),
  compareDesc: (dateLeft: Date, dateRight: Date) => compareDesc(dateLeft, dateRight),
  format: (date: Date, pattern: string) => formatDateFns(date, pattern),
  addMinutes: (date: Date, minutes: number) => addMinutesDateFns(date, minutes),
  formatDistanceToNow: (date: Date) => formatDistanceToNowStrict(date, { addSuffix: true }),
  getRangeOfDates,
  startOfWeek: (date: Date) => startOfWeekDateFns(date, { weekStartsOn: 1 }),
  getMonthRange,
  isDateRangeType,
  isTimeGroupingType,
  getDateFromWeekNumber,
  getWeekNumber,
};
