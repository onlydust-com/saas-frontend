import { bootstrap } from "@/core/bootstrap";
import { DateRangeType } from "@/core/kernel/date/date-facade-port";

export const useDefaultPeriod = () => {
  const START_DEFAULT_DATE = new Date();
  START_DEFAULT_DATE.setDate(new Date().getDate() - 20);

  const DEFAULT_RANGE_TYPE = DateRangeType.LAST_SEMESTER;

  const dateKernelPort = bootstrap.getDateKernelPort();
  const { from, to } = dateKernelPort.getRangeOfDates(DEFAULT_RANGE_TYPE);

  const defaultRange = {
    start: from ?? START_DEFAULT_DATE,
    end: to ?? new Date(),
  };

  return {
    rangeType: DEFAULT_RANGE_TYPE,
    from: from ? dateKernelPort.format(defaultRange.start, "yyyy-MM-dd") : undefined,
    to: to ? dateKernelPort.format(defaultRange.end, "yyyy-MM-dd") : undefined,
  };
};
