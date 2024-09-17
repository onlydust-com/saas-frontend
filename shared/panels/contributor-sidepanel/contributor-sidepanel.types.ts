import { PropsWithChildren } from "react";

export interface ContributorSidepanelProps extends PropsWithChildren {}

export interface ContributorSidepanelData {
  login?: string;
  githubId?: number;
  canGoBack?: boolean;
}
