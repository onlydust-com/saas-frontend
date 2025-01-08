import { PropsWithChildren } from "react";
import { z } from "zod";

export interface ApplyIssueSidepanelProps extends PropsWithChildren {}

export interface ApplyIssueSidepanelData {
  issueId: number;
  canGoBack?: boolean;
}

export const ApplyIssueSidepanelValidation = z.object({
  githubComment: z.string().min(1),
});

export type ApplyIssueSidepanelForm = z.infer<typeof ApplyIssueSidepanelValidation>;
