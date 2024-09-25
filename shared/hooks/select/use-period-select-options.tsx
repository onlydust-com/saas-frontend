import { bootstrap } from "@/core/bootstrap";
import { DateRangeType } from "@/core/kernel/date/date-facade-port";

import { MenuItemPort } from "@/design-system/molecules/menu-item";

import { Translate } from "@/shared/translation/components/translate/translate";

export function usePeriodSelectOptions(): MenuItemPort[] {
  const dateKernelPort = bootstrap.getDateKernelPort();

  const ranges: DateRangeType[] = [
    DateRangeType.LAST_WEEK,
    DateRangeType.LAST_MONTH,
    DateRangeType.LAST_SEMESTER,
    DateRangeType.LAST_YEAR,
    DateRangeType.CUSTOM,
  ];

  return ranges.map(range => {
    if (range === DateRangeType.CUSTOM) {
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
