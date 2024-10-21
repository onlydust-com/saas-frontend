import { ReactNode } from "react";

import { ApplicationReactQueryAdapter } from "@/core/application/react-query-adapter/application";
import { FirstParameter } from "@/core/kernel/types";

export interface AcceptApplicationProps {
  applicationId: string;
  contributionGithubId?: number;
  repoId: number;
  children: (props: { accept: () => void; isAccepting: boolean; ignore: () => void; isIgnoring: boolean }) => ReactNode;
  acceptOptions?: NonNullable<
    FirstParameter<typeof ApplicationReactQueryAdapter.client.useAcceptApplication>
  >["options"];
}
