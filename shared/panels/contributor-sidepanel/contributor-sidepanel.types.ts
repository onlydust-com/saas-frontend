import { PropsWithChildren, ReactNode } from "react";

import { UserPublicInterface } from "@/core/domain/user/models/user-public-model";

export interface ContributorSidepanelProps extends PropsWithChildren {
  customFooter?: (props: { data: UserPublicInterface }) => ReactNode;
}

export interface ContributorSidepanelData {
  login?: string;
  githubId?: number;
  canGoBack?: boolean;
}
