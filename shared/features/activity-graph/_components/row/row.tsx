import { useMemo } from "react";

import { bootstrap } from "@/core/bootstrap";

import { Typo } from "@/design-system/atoms/typo";

import { cn } from "@/shared/helpers/cn";
import { Translate } from "@/shared/translation/components/translate/translate";

import { Week } from "../week/week";
import { ActivityGraphRowProps } from "./row.types";

export function Row({ weeks, data, asLabel, isLastRow }: ActivityGraphRowProps) {
  const lastWeek = useMemo(() => weeks.at(-1), [weeks]);
  const dateKernelPort = bootstrap.getDateKernelPort();
  const weekNumber = useMemo(
    () => (lastWeek ? dateKernelPort.getWeekNumber(lastWeek.startDate, { hideMonths: true }) : undefined),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [lastWeek]
  );

  const findData = (weekId: string) => {
    return data?.[weekId];
  };

  const label = useMemo(() => {
    return (
      <>
        <Translate token={"features:activityGraph.week"} /> {weekNumber}
      </>
    );
  }, [isLastRow]);

  return (
    <div className="flex w-full flex-row items-center justify-between gap-4">
      <div className="flex w-full flex-row items-center justify-start gap-1">
        {weeks.map(week => (
          <Week week={week} key={week.id} data={findData(week.id)} />
        ))}
      </div>
      {asLabel ? (
        <Typo
          size={"xs"}
          as="div"
          color={"primary"}
          classNames={{
            base: cn("w-full whitespace-nowrap"),
          }}
        >
          {label}
        </Typo>
      ) : (
        <div />
      )}
    </div>
  );
}
