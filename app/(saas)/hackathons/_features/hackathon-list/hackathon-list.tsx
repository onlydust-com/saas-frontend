import { useCallback } from "react";

import { ClosedHackathonCard } from "@/app/(saas)/hackathons/_components/closed-hackathon-card/closed-hackathon-card";
import { LiveHackathonCard } from "@/app/(saas)/hackathons/_components/live-hackathon-card/live-hackathon-card";

import { HackathonReactQueryAdapter } from "@/core/application/react-query-adapter/hackathon";

import { ErrorState } from "@/shared/components/error-state/error-state";
import { Skeleton } from "@/shared/ui/skeleton";

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
      return Array.from({ length: 4 }).map((_, index) => <Skeleton key={index} className="h-[278px]" />);
    }

    if (isError)
      return (
        <div className="col-span-full">
          <ErrorState />
        </div>
      );

    if (!data) return null;

    const mostRecentHackathons = [...data.hackathons].reverse();

    const closedHackathons = mostRecentHackathons.filter(hackathon => hackathon.isPast());

    return closedHackathons.map(hackathon => <ClosedHackathonCard key={hackathon.id} hackathon={hackathon} />);
  }, [data, isError, isLoading]);

  return (
    <div className="flex flex-col gap-4xl">
      {renderLiveHackathon()}

      {renderUpcomingHackathon()}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">{renderClosedHackathons()}</div>
    </div>
  );
}
