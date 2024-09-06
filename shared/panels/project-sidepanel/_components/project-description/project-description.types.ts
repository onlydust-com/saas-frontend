import { ProjectInterface } from "@/core/domain/project/models/project-model";

export interface ProjectDescriptionProps {
  description?: string;
  moreInfo: ProjectInterface["moreInfos"];
}
