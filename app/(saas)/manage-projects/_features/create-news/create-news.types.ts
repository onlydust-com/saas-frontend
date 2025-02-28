import { PropsWithChildren } from "react";

import { ProjectInterface } from "@/core/domain/project/models/project-model";

export interface CreateNewsProps extends PropsWithChildren {
  project: ProjectInterface;
}
