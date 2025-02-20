import { useMemo } from "react";

import { MeReactQueryAdapter } from "@/core/application/react-query-adapter/me";

import { Progress } from "@/shared/ui/progress";
import { TypographyMuted } from "@/shared/ui/typography";
import { cn } from "@/shared/utils";

import { ApplyCounterProps } from "./apply-counter.types";

export function ApplyCounter({ children }: ApplyCounterProps) {
  const { data } = MeReactQueryAdapter.client.useGetMyApplications({});

  const currentApplicationPercent = useMemo(() => {
    if (!data?.applicationCountOnLiveHackathon) {
      return 0;
    }

    if (data.isMaxApplicationsOnLiveHackathonReached()) {
      return 100;
    }

    return data.applicationCountOnLiveHackathon * 10;
  }, [data]);

  const remainingApplications = useMemo(() => {
    if (!data) return 0;

    return data.maxApplicationsOnLiveHackathon - data.applicationCountOnLiveHackathon;
  }, [data]);

  if (!data) return null;

  return (
    <>
      {children}
      <div className="flex flex-col items-end gap-1">
        <TypographyMuted className={cn(remainingApplications <= 0 && "text-red-500")}>
          {remainingApplications} application{remainingApplications === 1 ? "" : "s"} remaining
        </TypographyMuted>
        <Progress
          value={currentApplicationPercent}
          max={data.maxApplicationsOnLiveHackathon * 10}
          progressBarClassName={cn(remainingApplications <= 0 && "bg-red-500")}
        />
      </div>
    </>
  );
}
