import { Bell } from "lucide-react";

import { RegisterHackathonProps } from "@/app/hackathons/_features/register-hackathon/register-hackathon.types";

import { HackathonReactQueryAdapter } from "@/core/application/react-query-adapter/hackathon";
import { MeReactQueryAdapter } from "@/core/application/react-query-adapter/me";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { toast } from "@/design-system/molecules/toaster";

export function RegisterHackathon({ hackathonSlug }: RegisterHackathonProps) {
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
    <Button
      size={"md"}
      onClick={handleClick}
      startIcon={{ component: Bell }}
      classNames={{ base: "w-full" }}
      isLoading={isLoading || registerIsPending}
      isDisabled={isRegistered}
    >
      {isRegistered ? "Registered" : "Register"}
    </Button>
  );
}
