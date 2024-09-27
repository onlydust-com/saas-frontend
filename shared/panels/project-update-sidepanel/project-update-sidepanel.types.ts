import { z } from "zod";

export interface ProjectUpdateSidePanelData {
  projectId: string;
  canGoBack?: boolean;
}

export const editProjectFormValidation = z.object({
  name: z.string().min(1),
});
