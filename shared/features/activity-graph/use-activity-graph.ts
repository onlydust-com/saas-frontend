"use client";

import { isSameDay } from "date-fns";
import { useEffect, useMemo, useState } from "react";

import { ActivityGraphWeek, UseActivityGraph } from "@/shared/features/activity-graph/activity-graph.types";

import { createEndDate } from "./utils/createEndDate";
import { createStartDate } from "./utils/createStartDate";
import { createWeeks } from "./utils/createWeeks";
import { splitWeeksIntoSubArray } from "./utils/splitWeeks";

export const useActivityGraph = ({ endDate }: UseActivityGraph) => {
  const [start, setStart] = useState(createStartDate());
  const [end, setEnd] = useState(createEndDate());
  const [weeks, setWeeks] = useState<ActivityGraphWeek[]>([]);

  useEffect(() => {
    if (endDate && !isSameDay(end, endDate)) {
      setEnd(createEndDate(endDate));
      setStart(createStartDate(endDate));
    }
  }, [endDate]);

  useEffect(() => {
    setWeeks(createWeeks({ start, end }));
  }, [end, start]);

  const splitWeeks = useMemo(() => {
    // 7 array of 8 weeks
    return splitWeeksIntoSubArray({ weeks });
  }, [weeks]);

  return { splitWeeks, weeks, start, end };
};
