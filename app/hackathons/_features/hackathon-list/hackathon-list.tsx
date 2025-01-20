import { useCallback } from "react";

import { ClosedHackathonCard } from "@/app/hackathons/_components/closed-hackathon-card/closed-hackathon-card";
import { LiveHackathonCard } from "@/app/hackathons/_components/live-hackathon-card/live-hackathon-card";

import { HackathonReactQueryAdapter } from "@/core/application/react-query-adapter/hackathon";

import { Skeleton } from "@/design-system/atoms/skeleton";

import { ErrorState } from "@/shared/components/error-state/error-state";
import { ScrollView } from "@/shared/components/scroll-view/scroll-view";

export function HackathonList() {
  const { data, isLoading, isError } = HackathonReactQueryAdapter.client.useGetHackathons({});

  const renderLiveHackathon = useCallback(() => {
    if (isLoading) {
      return <Skeleton className="h-[278px] w-full" />;
    }

    if (isError) return <ErrorState />;

    if (!data) return null;

    const liveHackathon = data.hackathons.find(hackathon => hackathon.isLive());

    if (!liveHackathon) return null;

    return <LiveHackathonCard hackathon={liveHackathon} />;
  }, [data, isError, isLoading]);

  const renderUpcomingHackathon = useCallback(() => {
    if (isLoading) {
      return <Skeleton className="h-[278px] w-full" />;
    }

    if (isError) return <ErrorState />;

    if (!data) return null;

    const upcomingHackathon = data.hackathons.find(hackathon => hackathon.isComingSoon());

    if (!upcomingHackathon) return null;

    return <LiveHackathonCard hackathon={upcomingHackathon} />;
  }, [data, isError, isLoading]);

  const renderClosedHackathons = useCallback(() => {
    if (isLoading) {
      return (
        <ScrollView direction="x" className="scroll-snap-mandatory flex w-full snap-x gap-xl">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-[278px] w-[460px] min-w-fit shrink-0 snap-start" />
          ))}
        </ScrollView>
      );
    }

    if (isError) return <ErrorState />;

    if (!data) return null;

    const mostRecentHackathons = [...data.hackathons].reverse();

    const closedHackathons = mostRecentHackathons.filter(hackathon => hackathon.isPast());

    return (
      <ScrollView direction="x" className="scroll-snap-mandatory flex w-full snap-x gap-xl">
        {closedHackathons.map(hackathon => (
          <div key={hackathon.id} className="min-w-fit max-w-[460px] snap-start">
            <ClosedHackathonCard hackathon={hackathon} />
          </div>
        ))}
      </ScrollView>
    );
  }, [data, isError, isLoading]);

  return (
    <div className="flex flex-col gap-4xl">
      {renderLiveHackathon()}
      {renderUpcomingHackathon()}
      {renderClosedHackathons()}
    </div>
  );
}
