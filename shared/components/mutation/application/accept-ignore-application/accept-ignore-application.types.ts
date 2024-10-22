import { ReactNode } from "react";

import { ApplicationReactQueryAdapter } from "@/core/application/react-query-adapter/application";
import { FirstParameter } from "@/core/kernel/types";

export interface AcceptApplicationProps {
  applicationId: string;
  contributionId?: string;
  repoId: number;
  children: (props: { accept: () => void; ignore: () => void; unignore: () => void; isUpdating: boolean }) => ReactNode;
  acceptOptions?: NonNullable<
    FirstParameter<typeof ApplicationReactQueryAdapter.client.useAcceptApplication>
  >["options"];
}
