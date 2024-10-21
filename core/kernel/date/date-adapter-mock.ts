import { DateFacadePort, DateRangeType } from "./date-facade-port";

export const DateAdapterMock: DateFacadePort = {
  eachDayOfInterval: (_start: Date, _end: Date) => [_start, _end],
  isToday: (_date: Date) => false,
  isPast: (_date: Date) => false,
  isFuture: (_date: Date) => false,
  addMinutes: (_date: Date, _minutes: number) => new Date(),
  compareAsc: (_dateLeft: Date, _dateRight: Date) => 1,
  compareDesc: (_dateLeft: Date, _dateRight: Date) => 1,
  format: (_date: Date, _pattern: string) => "",
  formatDistanceToNow: (_date: Date) => "",
  isValid: (_date: Date) => false,
  getRangeOfDates: (_range: DateRangeType) => ({ from: null, to: null }),
  startOfWeek: (_date: Date) => new Date(),
  getMonthRange: (_date: Date) => ({ from: new Date(), to: new Date() }),
  // @ts-expect-error next line is a mock
  isDateRangeType: (_value: string) => true,
  // @ts-expect-error next line is a mock
  isTimeGroupingType: (_value: string) => true,
  getDateFromWeekNumber: (_year: number, _weekNumber: number) => new Date(),
  getWeekNumber: (_date: Date, _options?: { hideMonths: boolean }) => "",
};
