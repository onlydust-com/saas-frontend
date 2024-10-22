import { Day } from "../day/day";
import { ColumnProps } from "./column.types";

export function Column({ days, data, levelRange }: ColumnProps) {
  return (
    <div className={"flex flex-col gap-[2px]"}>
      {days.map((day, index) => (
        <Day levelRange={levelRange} data={data} day={day} key={index} />
      ))}
    </div>
  );
}
