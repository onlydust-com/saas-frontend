import { Day } from "../day/day";
import { ColumnProps } from "./column.types";

export function Column({ days }: ColumnProps) {
  return (
    <div className={"flex flex-col gap-[2px]"}>
      {days.map((day, index) => (
        <Day day={day} key={index} />
      ))}
    </div>
  );
}
