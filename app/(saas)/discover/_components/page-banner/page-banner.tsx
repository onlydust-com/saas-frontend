import { Target } from "lucide-react";
import Link from "next/link";
import { useCallback } from "react";

import { LiveHackathonCard } from "@/app/(saas)/osw/_components/live-hackathon-card/live-hackathon-card";

import { HackathonReactQueryAdapter } from "@/core/application/react-query-adapter/hackathon";

import { ErrorState } from "@/shared/components/error-state/error-state";
import { NEXT_ROUTER } from "@/shared/constants/router";
import { ListBanner } from "@/shared/features/list-banner/list-banner";
import { Button } from "@/shared/ui/button";
import { Skeleton } from "@/shared/ui/skeleton";

export function PageBanner() {
  const { data, isLoading, isError } = HackathonReactQueryAdapter.client.useGetHackathons({});

  const renderLiveHackathon = useCallback(() => {
    if (isLoading) {
      return <Skeleton className="h-[254px] w-full" />;
    }

    if (isError) return <ErrorState />;

    if (!data)
      return (
        <ListBanner
          title={{
            children: (
              <>
                Embark on an <span className="text-indigo-500">ODQuest</span> Adventure
              </>
            ),
          }}
          subtitle={{
            children:
              "Unlock epic rewards by conquering challenges and join a thriving community of adventurers on an exciting Quest!",
          }}
          logo={<Target className="size-16 text-indigo-500" />}
          classNames={{
            base: "bg-gradient-to-br from-indigo-900 to-transparent to-80%",
          }}
        >
          <Button size="sm" asChild>
            <Link href={NEXT_ROUTER.quests.root}>Join now</Link>
          </Button>
        </ListBanner>
      );

    const liveHackathon = data.hackathons.find(hackathon => hackathon.isLive());

    if (!liveHackathon) return null;

    return <LiveHackathonCard hackathon={liveHackathon} />;
  }, [data, isError, isLoading]);

  return renderLiveHackathon();
}
