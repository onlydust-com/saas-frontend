import { PropsWithChildren } from "react";

export interface ApplyIssueSidepanelProps extends PropsWithChildren {}

export interface ApplyIssueSidepanelData {
  issueId: number;
  canGoBack?: boolean;
}
