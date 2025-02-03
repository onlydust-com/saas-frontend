import { z } from "zod";

export const editProgramPanelFormValidation = z.object({
  name: z.string().min(1),
  url: z.string().min(1),
  logoUrl: z.string().optional().nullable(),
  logoFile: z.any().optional().nullable(),
  leadIds: z.array(z.string()).min(0),
});
