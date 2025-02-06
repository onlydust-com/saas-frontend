import { ProjectInterface } from "@/core/domain/project/models/project-model";
import { UseFormReturn } from "react-hook-form";
import { EditProjectFormData } from "../../project-update-sidepanel.types";

export interface GlobalInformationProps {
  project: ProjectInterface;
  form: UseFormReturn<EditProjectFormData, unknown>;
}
