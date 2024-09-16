import { PropsWithChildren } from "react";

export interface ContributorSidepanelProps extends PropsWithChildren {}

export interface ContributorSidepanelData {
  slug?: string;
  githubId?: number;
}
