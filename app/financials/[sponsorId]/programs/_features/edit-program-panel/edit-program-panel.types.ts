import { z } from "zod";

export const editProgramPanelFormValidation = z.object({
  name: z.string().min(1),
  url: z.string().min(1),
  logoUrl: z.string().optional(),
  logoFile: z.any().optional(),
  leadIds: z.array(z.string()).min(0),
});
