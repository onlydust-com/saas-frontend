import { useState } from "react";

import { UserReactQueryAdapter } from "@/core/application/react-query-adapter/user";

import { Avatar } from "@/design-system/atoms/avatar";
import { Accordion } from "@/design-system/molecules/accordion";

import { ContributorProfileCompactLoading } from "@/shared/features/contributors/contributor-profile-compact/contributor-profile-compact.loading";
import { UserContributions } from "@/shared/panels/_flows/reward-flow/_panels/_components/user-contributions/user-contributions";

import { SingleUserFlowProps } from "./single-user-flow.types";

export function SingleUserFlow({ githubUserId }: SingleUserFlowProps) {
  const [step, setStep] = useState<"select" | "validate">("select");
  const { data, isLoading, isError } = UserReactQueryAdapter.client.useGetUserById({
    pathParams: { githubId: githubUserId },
    options: {
      enabled: Boolean(githubUserId),
    },
  });

  if (isLoading) {
    return <ContributorProfileCompactLoading />;
  }

  if (!data || isError) return null;

  return (
    <Accordion
      id={`bulk-user-${githubUserId}`}
      titleProps={{ children: data.login }}
      startContent={<Avatar size={"xxs"} shape={"squared"} src={data.avatarUrl} />}
    >
      {step === "select" && (
        <div>
          <UserContributions githubUserId={githubUserId} />
        </div>
      )}
    </Accordion>
  );
}
