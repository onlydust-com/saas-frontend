import { setWeek, setYear, startOfYear } from "date-fns";

import { bootstrap } from "@/core/bootstrap";

export function getDateFromWeekNumber(year: number, weekNumber: number) {
  const dateKernelPort = bootstrap.getDateKernelPort();
  return dateKernelPort.startOfWeek(setWeek(startOfYear(setYear(new Date(), year)), weekNumber));
}
