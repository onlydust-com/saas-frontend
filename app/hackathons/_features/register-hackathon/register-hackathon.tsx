import { Bell } from "lucide-react";

import { RegisterHackathonProps } from "@/app/hackathons/_features/register-hackathon/register-hackathon.types";

import { HackathonReactQueryAdapter } from "@/core/application/react-query-adapter/hackathon";
import { MeReactQueryAdapter } from "@/core/application/react-query-adapter/me";

import { Button } from "@/design-system/atoms/button/variants/button-default";

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

  const { data: hackathonRegistration, isLoading: hackathonRegistrationIsLoading } =
    MeReactQueryAdapter.client.useGetMyHackathonRegistration({
      pathParams: { hackathonId: hackathon?.id ?? "" },
      options: {
        enabled: Boolean(hackathon?.id),
      },
    });

  const isLoading = hackathonIsLoading || hackathonRegistrationIsLoading;
  const isRegistered = hackathonRegistration?.isRegistered;

  // todo handle error
  // todo handle click

  return (
    <Button
      size={"md"}
      onClick={() => {}}
      startIcon={{ component: Bell }}
      classNames={{ base: "w-full" }}
      isLoading={isLoading}
      isDisabled={isRegistered}
    >
      {isRegistered ? "Registered" : "Register"}
    </Button>
  );
}
