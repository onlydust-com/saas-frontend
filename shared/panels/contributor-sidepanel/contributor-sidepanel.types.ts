import { PropsWithChildren, ReactNode } from "react";

import { BiContributorInterface } from "@/core/domain/bi/models/bi-contributor-model";

export interface ContributorSidepanelProps extends PropsWithChildren {
  customFooter?: (props: { data: BiContributorInterface; applicationId?: string }) => ReactNode;
}

export interface ContributorSidepanelData {
  login?: string;
  githubId?: number;
  canGoBack?: boolean;
  applicationId?: string;
}
