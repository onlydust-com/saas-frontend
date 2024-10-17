import { UseMutateFunction } from "@tanstack/react-query";
import { ReactNode } from "react";

import { ApplicationReactQueryAdapter } from "@/core/application/react-query-adapter/application";
import { FirstParameter } from "@/core/kernel/types";

export interface AcceptApplicationProps {
  applicationId: string;
  contributionGithubId?: number;
  children: (props: {
    accept: UseMutateFunction<never, Error, object, unknown>;
    isAccepting: boolean;
    ignore: UseMutateFunction<never, Error, object, unknown>;
    isIgnoring: boolean;
  }) => ReactNode;
  acceptOptions?: NonNullable<
    FirstParameter<typeof ApplicationReactQueryAdapter.client.useAcceptApplication>
  >["options"];
}
