import { UseFormReturn } from "react-hook-form";

import { EditProjectFormData } from "../../project-update-sidepanel.types";

export interface ProjectLeadProps {
  form: UseFormReturn<EditProjectFormData, unknown>;
}
