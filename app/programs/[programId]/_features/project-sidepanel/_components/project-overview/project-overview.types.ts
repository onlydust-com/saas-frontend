import { PropsWithChildren } from "react";

import { ProjectInterface } from "@/core/domain/project/models/project-model";
import { PropsWithChildren } from "react";

export interface ProjectOverviewProps extends PropsWithChildren {
  description?: string;
  moreInfo: ProjectInterface["moreInfos"];
  languages: ProjectInterface["languages"];
  categories: ProjectInterface["categories"];
}
