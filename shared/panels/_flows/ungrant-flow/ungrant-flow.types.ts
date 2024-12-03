import { PropsWithChildren } from "react";

import { ProjectProgramListItemInterface } from "@/core/domain/project/models/project-program-list-item";

export interface UngrantFlowContextInterface {
  projectId: string;
  program?: ProjectProgramListItemInterface;
  selectProgram: (program: ProjectProgramListItemInterface) => void;
  open: () => void;
}

export interface UngrantFlowContextProps extends PropsWithChildren {
  projectId?: string;
}
