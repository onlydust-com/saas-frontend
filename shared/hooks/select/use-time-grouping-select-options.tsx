import { DateRangeType, TimeGroupingType } from "@/core/kernel/date/date-facade-port";

import { MenuItemPort } from "@/design-system/molecules/menu-item";

import { Translate } from "@/shared/translation/components/translate/translate";

export function useTimeGroupingSelectOptions({
  relatedDateRangeType,
}: {
  relatedDateRangeType: DateRangeType;
}): MenuItemPort[] {
  const enabledTypes =
    {
      [DateRangeType.LAST_WEEK]: [TimeGroupingType.DAY, TimeGroupingType.WEEK],
      [DateRangeType.LAST_MONTH]: [TimeGroupingType.DAY, TimeGroupingType.WEEK, TimeGroupingType.MONTH],
      [DateRangeType.LAST_SEMESTER]: [
        TimeGroupingType.DAY,
        TimeGroupingType.WEEK,
        TimeGroupingType.MONTH,
        TimeGroupingType.QUARTER,
      ],
      [DateRangeType.LAST_YEAR]: [
        TimeGroupingType.DAY,
        TimeGroupingType.WEEK,
        TimeGroupingType.MONTH,
        TimeGroupingType.QUARTER,
        TimeGroupingType.YEAR,
      ],
      [DateRangeType.ALL_TIME]: [
        TimeGroupingType.DAY,
        TimeGroupingType.WEEK,
        TimeGroupingType.MONTH,
        TimeGroupingType.QUARTER,
        TimeGroupingType.YEAR,
      ],
      [DateRangeType.CUSTOM]: [
        TimeGroupingType.DAY,
        TimeGroupingType.WEEK,
        TimeGroupingType.MONTH,
        TimeGroupingType.QUARTER,
        TimeGroupingType.YEAR,
      ],
    }[relatedDateRangeType] || [];

  return [
    {
      label: <Translate token="common:timeGroupingType.DAY" />,
      id: TimeGroupingType.DAY,
      isDisabled: !enabledTypes.includes(TimeGroupingType.DAY),
    },
    {
      label: <Translate token="common:timeGroupingType.WEEK" />,
      id: TimeGroupingType.WEEK,
      isDisabled: !enabledTypes.includes(TimeGroupingType.WEEK),
    },
    {
      label: <Translate token="common:timeGroupingType.MONTH" />,
      id: TimeGroupingType.MONTH,
      isDisabled: !enabledTypes.includes(TimeGroupingType.MONTH),
    },
    {
      label: <Translate token="common:timeGroupingType.QUARTER" />,
      id: TimeGroupingType.QUARTER,
      isDisabled: !enabledTypes.includes(TimeGroupingType.QUARTER),
    },
    {
      label: <Translate token="common:timeGroupingType.YEAR" />,
      id: TimeGroupingType.YEAR,
      isDisabled: !enabledTypes.includes(TimeGroupingType.YEAR),
    },
  ];
}
