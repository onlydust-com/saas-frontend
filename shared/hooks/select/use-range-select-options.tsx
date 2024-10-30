import { bootstrap } from "@/core/bootstrap";
import { DateRangeType } from "@/core/kernel/date/date-facade-port";

import { MenuItemPort } from "@/design-system/molecules/menu-item";

import { Translate } from "@/shared/translation/components/translate/translate";

export function useRangeSelectOptions(options?: { excludedRange?: DateRangeType[] }): MenuItemPort[] {
  const dateKernelPort = bootstrap.getDateKernelPort();

  const ranges: DateRangeType[] = [
    ...(options?.excludedRange?.includes(DateRangeType.LAST_WEEK) ? [] : [DateRangeType.LAST_WEEK]),
    ...(options?.excludedRange?.includes(DateRangeType.LAST_MONTH) ? [] : [DateRangeType.LAST_MONTH]),
    ...(options?.excludedRange?.includes(DateRangeType.LAST_SEMESTER) ? [] : [DateRangeType.LAST_SEMESTER]),
    ...(options?.excludedRange?.includes(DateRangeType.LAST_YEAR) ? [] : [DateRangeType.LAST_YEAR]),
    ...(options?.excludedRange?.includes(DateRangeType.ALL_TIME) ? [] : [DateRangeType.ALL_TIME]),
  ];

  return ranges.map(range => {
    if (range === DateRangeType.ALL_TIME) {
      return {
        label: <Translate token={`common:dateRangeType.${range}`} />,
        id: range,
      };
    }

    const { from, to } = dateKernelPort.getRangeOfDates(range);

    if (!from || !to) {
      return {
        label: <Translate token={`common:dateRangeType.${range}`} />,
        id: range,
      };
    }

    const fromFormated = dateKernelPort.format(from, "MMM yyyy");
    const toFormated = dateKernelPort.format(to, "MMM yyyy");
    return {
      label: (
        <Translate
          token={`common:dateRangeTypeLong.${range}`}
          values={{
            from: fromFormated,
            to: toFormated,
          }}
        />
      ),
      id: range,
    };
  });
}
