import { useKeenSlider } from "keen-slider/react";
import { useCallback } from "react";

import { ClosedHackathonCard } from "@/app/hackathons/_components/closed-hackathon-card/closed-hackathon-card";
import { LiveHackathonCard } from "@/app/hackathons/_components/live-hackathon-card/live-hackathon-card";

import { HackathonReactQueryAdapter } from "@/core/application/react-query-adapter/hackathon";

import { Skeleton } from "@/design-system/atoms/skeleton";

import { ErrorState } from "@/shared/components/error-state/error-state";
import { BREAKPOINTS } from "@/shared/constants/breakpoints";

export function HackathonList() {
  const { data, isLoading, isError } = HackathonReactQueryAdapter.client.useGetHackathons({});

  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    disabled: !data,
    initial: 0,
    mode: "snap",
    slides: {
      perView: 1.2,
      spacing: 16,
    },
    breakpoints: {
      [`(max-width: ${BREAKPOINTS.wide}px)`]: {
        slides: {
          perView: 4.1,
          spacing: 16,
        },
      },
      [`(max-width: ${BREAKPOINTS.desktop}px)`]: {
        slides: {
          perView: 3.1,
          spacing: 16,
        },
      },
      [`(max-width: ${BREAKPOINTS.laptop}px)`]: {
        slides: {
          perView: 2.1,
          spacing: 16,
        },
      },
      [`(max-width: ${BREAKPOINTS.tablet}px)`]: {
        slides: {
          perView: 1.1,
          spacing: 16,
        },
      },
      [`(max-width: ${BREAKPOINTS.mobile}px)`]: {
        slides: {
          perView: 1.1,
          spacing: 16,
        },
      },
    },
  });

  const renderLiveHackathon = useCallback(() => {
    if (isLoading) {
      return Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="keen-slider__slide">
          <Skeleton className="h-[278px] w-full" />
        </div>
      ));
    }

    if (isError) return <ErrorState />;

    if (!data) return null;

    const liveUpcomingHackathon = data.hackathons.find(hackathon => hackathon.isLive() || hackathon.isComingSoon());

    if (!liveUpcomingHackathon) return null;

    return <LiveHackathonCard hackathon={liveUpcomingHackathon} />;
  }, [data, isError, isLoading]);

  const renderClosedHackathons = useCallback(() => {
    if (isLoading) {
      return Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="keen-slider__slide">
          <Skeleton className="h-[278px] w-full" />
        </div>
      ));
    }

    if (isError) return <ErrorState />;

    if (!data) return null;

    const closedHackathons = data.hackathons.filter(hackathon => hackathon.isPast());

    return closedHackathons.map(hackathon => (
      <div key={hackathon.id} className="keen-slider__slide">
        <ClosedHackathonCard hackathon={hackathon} />
      </div>
    ));
  }, [data, isError, isLoading]);

  return (
    <div className="flex flex-col gap-4xl">
      {renderLiveHackathon()}

      <div ref={sliderRef} className="keen-slider">
        {renderClosedHackathons()}
      </div>
    </div>
  );
}
