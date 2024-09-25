import { bootstrap } from "@/core/bootstrap";
import { CustomPeriodType } from "@/core/kernel/date/date-facade-port";

import { MenuItemPort } from "@/design-system/molecules/menu-item";

import { Translate } from "@/shared/translation/components/translate/translate";

export function usePeriodSelectOptions(): MenuItemPort[] {
  const dateKernelPort = bootstrap.getDateKernelPort();

  const ranges: CustomPeriodType[] = [
    CustomPeriodType.LAST_WEEK,
    CustomPeriodType.LAST_MONTH,
    CustomPeriodType.LAST_SEMESTER,
    CustomPeriodType.LAST_YEAR,
    CustomPeriodType.CUSTOM,
  ];

  return ranges.map(range => {
    if (range === CustomPeriodType.CUSTOM) {
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
