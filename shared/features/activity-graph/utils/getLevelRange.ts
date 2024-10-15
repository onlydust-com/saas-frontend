import { ActivityGraphLevel } from "@/shared/features/activity-graph/activity-graph.types";

export function getLevelRange(counts: number[]): { [key in ActivityGraphLevel]: number } {
  const min = Math.min(...counts);
  const max = Math.max(...counts);

  return {
    0: 0,
    1: min,
    2: Math.round((max - min) / 3 + min),
    3: Math.round(((max - min) / 3) * 2 + min),
    4: max,
  };
}
