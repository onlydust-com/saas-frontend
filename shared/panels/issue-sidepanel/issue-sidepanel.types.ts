import { z } from "zod";

export const issueSidepanelzodSchema = z.object({
  githubComment: z.string().min(1),
});

export type IssueSidepanelFormSchema = z.infer<typeof issueSidepanelzodSchema>;
