import { Bell } from "lucide-react";

import { RegisterHackathonProps } from "@/app/hackathons/_features/register-hackathon/register-hackathon.types";

import { HackathonReactQueryAdapter } from "@/core/application/react-query-adapter/hackathon";
import { MeReactQueryAdapter } from "@/core/application/react-query-adapter/me";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Tooltip } from "@/design-system/atoms/tooltip";
import { toast } from "@/design-system/molecules/toaster";

import { usePosthog } from "@/shared/tracking/posthog/use-posthog";

export function RegisterHackathon({ hackathonSlug }: RegisterHackathonProps) {
  const { capture } = usePosthog();

  const {
    data: hackathon,
    isLoading: hackathonIsLoading,
    isError: hackathonIsError,
  } = HackathonReactQueryAdapter.client.useGetHackathonBySlug({
    pathParams: {
      hackathonSlug,
    },
    options: {
      enabled: Boolean(hackathonSlug),
    },
  });

  const isPast = hackathon?.isPast();

  const {
    data: hackathonRegistration,
    isLoading: hackathonRegistrationIsLoading,
    isError: hackathonRegistrationIsError,
  } = MeReactQueryAdapter.client.useGetMyHackathonRegistration({
    pathParams: { hackathonId: hackathon?.id ?? "" },
    options: {
      enabled: Boolean(hackathon?.id),
    },
  });

  const { mutate: register, isPending: registerIsPending } = MeReactQueryAdapter.client.useRegisterToHackathon({
    pathParams: {
      hackathonId: hackathon?.id ?? "",
    },
    invalidateTagParams: {
      getHackathonBySlug: {
        pathParams: {
          hackathonSlug,
        },
      },
    },
    options: {
      onSuccess: () => {
        toast.success(`Registered to ${hackathon?.title}`);

        capture("hackathon_registration", { hackathon_id: hackathon?.id });
      },
      onError: () => {
        toast.error(`Error registering to ${hackathon?.title}`);
      },
    },
  });

  const isError = hackathonIsError || hackathonRegistrationIsError;
  const isLoading = hackathonIsLoading || hackathonRegistrationIsLoading;
  const isRegistered = hackathonRegistration?.isRegistered;

  function handleClick() {
    register({});
  }

  if (isError) return null;

  return (
    <Tooltip content={"The event is over"} enabled={isPast}>
      <Button
        size={"md"}
        onClick={handleClick}
        startIcon={{ component: Bell }}
        classNames={{ base: "w-full" }}
        isLoading={isLoading || registerIsPending}
        isDisabled={isRegistered || isPast}
      >
        {isRegistered ? "Registered" : "Register"}
      </Button>
    </Tooltip>
  );
}
